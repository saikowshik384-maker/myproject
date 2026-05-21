import "./App.css";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Select from "react-select";

function App() {

  // ================================
  // DATA STATES
  // ================================

  const [data, setData] = useState([]);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // ================================
  // SELECTED VALUES
  // ================================

  const [selectedState, setSelectedState] =
    useState(null);

  const [selectedDistrict, setSelectedDistrict] =
    useState(null);

  const [selectedSubdistrict, setSelectedSubdistrict] =
    useState(null);

  const [selectedVillage, setSelectedVillage] =
    useState(null);

  // ================================
  // WEATHER STATES
  // ================================

  const [temperature, setTemperature] =
    useState(null);

  const [weather, setWeather] =
    useState("");

  const [humidity, setHumidity] =
    useState("");

  const [windSpeed, setWindSpeed] =
    useState("");

  const [sunrise, setSunrise] =
    useState("");

  const [aqi, setAqi] =
    useState("");

  const [weatherError, setWeatherError] =
    useState("");

  // ================================
  // LOCATION
  // ================================

  const [currentLocation, setCurrentLocation] =
    useState("");

  // ================================
  // GET LIVE WEATHER USING GPS
  // ================================

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        setCurrentLocation(
          `${lat}, ${lon}`
        );

        const apiKey =
          "3dfe78b2ced29f23886759283c1a77d0";

        try {

          // WEATHER API

          const weatherResponse =
            await fetch(

              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

            );

          const weatherData =
            await weatherResponse.json();

          setTemperature(
            weatherData.main.temp
          );

          setWeather(
            weatherData.weather[0].main
          );

          setHumidity(
            weatherData.main.humidity
          );

          setWindSpeed(
            weatherData.wind.speed
          );

          setSunrise(

            new Date(
              weatherData.sys.sunrise * 1000
            ).toLocaleTimeString()

          );

          // AQI API

          const aqiResponse =
            await fetch(

              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`

            );

          const aqiData =
            await aqiResponse.json();

          setAqi(
            aqiData.list[0].main.aqi
          );

        } catch (error) {

          console.log(error);

          setWeatherError(
            "Unable to fetch weather"
          );

        }

      },

      () => {

        setWeatherError(
          "Location permission denied"
        );

      }

    );

  }, []);

  // ================================
  // LOAD CSV
  // ================================

  useEffect(() => {

    Papa.parse("/villages.csv", {

      download: true,
      header: true,

      complete: function(results) {

        const jsonData =
          results.data;

        setData(jsonData);

        const uniqueStates = [

          ...new Set(

            jsonData
              .map(
                (item) =>
                  item["STATE NAME"]
              )
              .filter(Boolean)

          )

        ];

        setStates(

          uniqueStates.map((state) => ({
            value: state,
            label: state
          }))

        );

      }

    });

  }, []);

  // ================================
  // STATE CHANGE
  // ================================

  const handleStateChange = (selected) => {

    setSelectedState(selected);

    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
    setSelectedVillage(null);

    const filteredDistricts = [

      ...new Set(

        data
          .filter(
            (item) =>
              item["STATE NAME"] ===
              selected.value
          )
          .map(
            (item) =>
              item["DISTRICT NAME"]
          )

      )

    ];

    setDistricts(

      filteredDistricts.map(
        (district) => ({
          value: district,
          label: district
        })
      )

    );

  };

  // ================================
  // DISTRICT CHANGE
  // ================================

  const handleDistrictChange = (selected) => {

    setSelectedDistrict(selected);

    setSelectedSubdistrict(null);
    setSelectedVillage(null);

    const filteredSubdistricts = [

      ...new Set(

        data
          .filter(
            (item) =>
              item["STATE NAME"] ===
                selectedState.value &&
              item["DISTRICT NAME"] ===
                selected.value
          )
          .map(
            (item) =>
              item["SUB-DISTRICT NAME"]
          )

      )

    ];

    setSubdistricts(

      filteredSubdistricts.map(
        (subdistrict) => ({
          value: subdistrict,
          label: subdistrict
        })
      )

    );

  };

  // ================================
  // SUBDISTRICT CHANGE
  // ================================

  const handleSubdistrictChange = (selected) => {

    setSelectedSubdistrict(selected);

    const filteredVillages = [

      ...new Set(

        data
          .filter(
            (item) =>
              item["STATE NAME"] ===
                selectedState.value &&
              item["DISTRICT NAME"] ===
                selectedDistrict.value &&
              item["SUB-DISTRICT NAME"] ===
                selected.value
          )
          .map(
            (item) =>
              item["Area Name"]
          )

      )

    ];

    setVillages(

      filteredVillages.map(
        (village) => ({
          value: village,
          label: village
        })
      )

    );

  };

  return (

    <div className="main-container">

      <div className="glass-card">

        {/* TITLE */}

        <h1 className="title">

          🇮🇳 Bharat Tourism AI

        </h1>

        <p className="subtitle">

          Smart Village Discovery & Travel Assistant

        </p>

        <div className="top-badges">

          <span>
            🌦️ Live Weather
          </span>

          <span>
            🗺️ Satellite Maps
          </span>

          <span>
            🚕 Transport
          </span>

          <span>
            📶 Public WiFi
          </span>

        </div>

        {/* STATE */}

        <div className="input-group">

          <label>
            Select State
          </label>

          <Select
            options={states}
            value={selectedState}
            onChange={
              handleStateChange
            }
            placeholder="Search State..."
          />

        </div>

        {/* DISTRICT */}

        {

          districts.length > 0 && (

            <div className="input-group">

              <label>
                Select District
              </label>

              <Select
                options={districts}
                value={selectedDistrict}
                onChange={
                  handleDistrictChange
                }
                placeholder="Search District..."
              />

            </div>

          )

        }

        {/* SUBDISTRICT */}

        {

          subdistricts.length > 0 && (

            <div className="input-group">

              <label>
                Select Sub-District
              </label>

              <Select
                options={subdistricts}
                value={selectedSubdistrict}
                onChange={
                  handleSubdistrictChange
                }
                placeholder="Search Sub-District..."
              />

            </div>

          )

        }

        {/* VILLAGE */}

        {

          villages.length > 0 && (

            <div className="input-group">

              <label>
                Select Village
              </label>

              <Select
                options={villages}
                value={selectedVillage}
                onChange={
                  setSelectedVillage
                }
                placeholder="Search Village..."
              />

            </div>

          )

        }

        {/* DETAILS */}

        {selectedVillage && (

          <div className="details-card">

            <div className="section-title">

              <h2>
                📍 Village Details
              </h2>

              <span className="live-badge">
                LIVE
              </span>

            </div>

            {/* INFO */}

            <div className="info-grid">

              <div className="info-box">
                <h4>State</h4>
                <p>{selectedState.label}</p>
              </div>

              <div className="info-box">
                <h4>District</h4>
                <p>{selectedDistrict.label}</p>
              </div>

              <div className="info-box">
                <h4>Sub-District</h4>
                <p>{selectedSubdistrict.label}</p>
              </div>

              <div className="info-box">
                <h4>Village</h4>
                <p>{selectedVillage.label}</p>
              </div>

            </div>

            {/* WEATHER */}

            <div className="weather-card">

              <h3>
                🌦️ Live Weather
              </h3>

              <h1 className="big-temp">

                {

                  temperature !== null
                    ? `${Math.round(temperature)}°C`
                    : "Loading..."

                }

              </h1>

              <p className="weather-text">

                {

                  weather ||
                  "Loading..."

                }

              </p>

              <div className="weather-grid">

                <div className="weather-box">
                  💧 Humidity
                  <span>{humidity}%</span>
                </div>

                <div className="weather-box">
                  💨 Wind
                  <span>{windSpeed} m/s</span>
                </div>

                <div className="weather-box">
                  🌅 Sunrise
                  <span>{sunrise}</span>
                </div>

                <div className="weather-box">
                  🌫️ AQI
                  <span>{aqi}</span>
                </div>

              </div>

              <div className="location-box">

                📍 Current Location:
                {" "}
                {currentLocation}

              </div>

              {

                weatherError && (

                  <p className="error-text">

                    {weatherError}

                  </p>

                )

              }

            </div>

            {/* SERVICES */}

            <div className="services-grid">

              {/* BUS */}

<div className="service-card">

  <h3>
    🚌 Smart Bus Timings
  </h3>

  {

    (() => {

      const hour =
        new Date().getHours();

      if (hour < 12) {

        return (

          <ul>

            <li>
              APSRTC → 6:30 AM
            </li>

            <li>
              APSRTC → 8:15 AM
            </li>

            <li>
              APSRTC → 10:00 AM
            </li>

          </ul>

        );

      }

      else if (hour < 18) {

        return (

          <ul>

            <li>
              APSRTC → 1:15 PM
            </li>

            <li>
              APSRTC → 3:00 PM
            </li>

            <li>
              APSRTC → 5:45 PM
            </li>

          </ul>

        );

      }

      else {

        return (

          <ul>

            <li>
              APSRTC → 7:00 PM
            </li>

            <li>
              APSRTC → 8:45 PM
            </li>

            <li>
              APSRTC → 10:15 PM
            </li>

          </ul>

        );

      }

    })()

  }

  <p
    style={{
      marginTop:"15px",
      color:"#aaa"
    }}
  >

    ⏱️ Timings updated based on current time

  </p>

</div>

              {/* UBER RAPIDO */}

              <div className="service-card">

                <h3>
                  🚕 Uber / Rapido
                </h3>

                <p>

                  Uber:

                  {

                    selectedDistrict?.label?.toLowerCase().includes("nellore") ||
                    selectedDistrict?.label?.toLowerCase().includes("hyderabad") ||
                    selectedDistrict?.label?.toLowerCase().includes("chennai") ||
                    selectedDistrict?.label?.toLowerCase().includes("bengaluru") ||
                    selectedDistrict?.label?.toLowerCase().includes("mumbai") ||
                    selectedDistrict?.label?.toLowerCase().includes("delhi")

                      ? " ✅ Available"

                      : " ❌ Not Available"

                  }

                </p>

                <p>

                  Rapido:

                  {

                    selectedDistrict?.label?.toLowerCase().includes("nellore") ||
                    selectedDistrict?.label?.toLowerCase().includes("hyderabad") ||
                    selectedDistrict?.label?.toLowerCase().includes("chennai") ||
                    selectedDistrict?.label?.toLowerCase().includes("bengaluru") ||
                    selectedDistrict?.label?.toLowerCase().includes("mumbai") ||
                    selectedDistrict?.label?.toLowerCase().includes("delhi")

                      ? " ✅ Available"

                      : " ❌ Not Available"

                  }

                </p>

              </div>

              {/* WIFI */}

              <div className="service-card">

                <h3>
                  📶 Public WiFi
                </h3>

                <ul>

                  <li>
                    Railway Station WiFi
                  </li>

                  <li>
                    Bus Stand Free WiFi
                  </li>

                  <li>
                    Government Office WiFi
                  </li>

                </ul>

              </div>

            </div>

            {/* MAP */}

            <div className="map-card">

              <h3>
                🗺️ Village Satellite Map
              </h3>

              <iframe

                title="map"

                width="100%"

                height="450"

                style={{
                  border: 0,
                  borderRadius: "20px"
                }}

                loading="lazy"

                allowFullScreen

                src={`https://maps.google.com/maps?q=${selectedVillage.label}&t=k&z=13&ie=UTF8&iwloc=&output=embed`}

              ></iframe>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;