import "./App.css";

import { useEffect, useState } from "react";

import Papa from "papaparse";

import Select from "react-select";

function App() {

  const [data, setData] = useState([]);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  // WEATHER STATES

  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState("");

  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [aqi, setAqi] = useState("");

  // LOCATION

  const [currentLocation, setCurrentLocation] = useState("");

  // GET USER LOCATION

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setCurrentLocation(
          `${lat}, ${lon}`
        );

      },

      (error) => {

        console.log(error);

      }

    );

  }, []);

  // WEATHER BASED ON DISTRICT

  useEffect(() => {

    if (
      selectedDistrict &&
      selectedState
    ) {

      const apiKey =
        "3dfe78b2ced29f23886759283c1a77d0";

      const city =
        selectedDistrict.label;

      fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`

      )

        .then((res) => res.json())

        .then((data) => {

          console.log(
            "DISTRICT WEATHER:",
            data
          );

          if (data.cod === 200) {

            setTemperature(
              data.main.temp
            );

            setWeather(
              data.weather[0].main
            );

            setHumidity(
              data.main.humidity
            );

            setWindSpeed(
              data.wind.speed
            );

            setSunrise(

              new Date(
                data.sys.sunrise * 1000
              ).toLocaleTimeString()

            );

            // AQI

            fetch(

              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`

            )

              .then((res) => res.json())

              .then((aqiData) => {

                setAqi(
                  aqiData.list[0].main.aqi
                );

              });

          }

        })

        .catch((err) => {

          console.log(err);

        });

    }

  }, [selectedDistrict, selectedState]);

  // LOAD CSV

  useEffect(() => {

    Papa.parse("/villages.csv", {

      download: true,
      header: true,

      complete: function(results) {

        const jsonData = results.data;

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

        ].sort();

        setStates(

          uniqueStates.map((state) => ({
            value: state,
            label: state
          }))

        );

      }

    });

  }, []);

  // STATE CHANGE

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
          .filter(Boolean)

      )

    ].sort();

    setDistricts(

      filteredDistricts.map(
        (district) => ({
          value: district,
          label: district
        })
      )

    );

  };

  // DISTRICT CHANGE

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
          .filter(Boolean)

      )

    ].sort();

    setSubdistricts(

      filteredSubdistricts.map(
        (subdistrict) => ({
          value: subdistrict,
          label: subdistrict
        })
      )

    );

  };

  // SUBDISTRICT CHANGE

  const handleSubdistrictChange = (selected) => {

    setSelectedSubdistrict(selected);

    setSelectedVillage(null);

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
          .filter(Boolean)

      )

    ].sort();

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

        <h1 className="title">
          🌍 Smart Tourism App
        </h1>

        <p className="subtitle">
          Premium India Village Finder 🇮🇳
        </p>

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
            isSearchable
          />

        </div>

        {/* DISTRICT */}

        {districts.length > 0 && (

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
              isSearchable
            />

          </div>

        )}

        {/* SUBDISTRICT */}

        {subdistricts.length > 0 && (

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
              isSearchable
            />

          </div>

        )}

        {/* VILLAGE */}

        {villages.length > 0 && (

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
              isSearchable
            />

          </div>

        )}

        {/* DETAILS */}

        {selectedVillage && (

          <div className="details-card">

            <h2>
              📍 Village Details
            </h2>

            <p>
              <strong>State:</strong>
              {" "}
              {selectedState.label}
            </p>

            <p>
              <strong>District:</strong>
              {" "}
              {selectedDistrict.label}
            </p>

            <p>
              <strong>Sub-District:</strong>
              {" "}
              {selectedSubdistrict.label}
            </p>

            <p>
              <strong>Village:</strong>
              {" "}
              {selectedVillage.label}
            </p>

            {/* WEATHER */}

            <div className="weather-card">

              <h3>
                🌦️ Live Weather
              </h3>

              <h2 className="temperature">

                🌡️ {

                  temperature
                    ? `${Math.round(temperature)}°C`
                    : "Loading..."

                }

              </h2>

              <p>

                Current Weather:
                <strong>
                  {" "}
                  {
                    weather ||
                    "Loading..."
                  }
                </strong>

              </p>

              <p>

                💧 Humidity:
                {" "}

                {
                  humidity
                    ? `${humidity}%`
                    : "Loading..."
                }

              </p>

              <p>

                💨 Wind Speed:
                {" "}

                {
                  windSpeed
                    ? `${windSpeed} m/s`
                    : "Loading..."
                }

              </p>

              <p>

                🌅 Sunrise:
                {" "}

                {
                  sunrise ||
                  "Loading..."
                }

              </p>

              <p>

                🌫️ AQI Index:
                {" "}

                {
                  aqi ||
                  "Loading..."
                }

              </p>

              <p>

                📍 Current Location:
                {" "}

                {
                  currentLocation
                }

              </p>

            </div>

            {/* BUS */}

            <div className="service-card">

              <h3>
                🚌 Bus Timings
              </h3>

              <ul>

                <li>
                  APSRTC → 6:30 AM
                </li>

                <li>
                  APSRTC → 9:15 AM
                </li>

                <li>
                  APSRTC → 1:45 PM
                </li>

                <li>
                  APSRTC → 6:00 PM
                </li>

              </ul>

            </div>

            {/* CAB */}

            <div className="service-card">

              <h3>
                🚕 Uber / Rapido
              </h3>

              <p>

                Uber:

                {

                  selectedDistrict?.label === "Hyderabad" ||
                  selectedDistrict?.label === "Bengaluru" ||
                  selectedDistrict?.label === "Chennai" ||
                  selectedDistrict?.label === "Mumbai" ||
                  selectedDistrict?.label === "Delhi"

                    ? " ✅ Available"

                    : " ❌ Not Available"

                }

              </p>

              <p>

                Rapido:

                {

                  selectedDistrict?.label === "Hyderabad" ||
                  selectedDistrict?.label === "Bengaluru" ||
                  selectedDistrict?.label === "Chennai" ||
                  selectedDistrict?.label === "Mumbai" ||
                  selectedDistrict?.label === "Delhi"

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

            {/* MAP */}

            <div className="map-card">

              <h3>
                🗺️ Village Map
              </h3>

              <iframe

                title="map"

                width="100%"

                height="400"

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