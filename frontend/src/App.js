import "./App.css";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {

  const [data, setData] = useState([]);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const [search, setSearch] = useState("");

  // DARK MODE

  const [darkMode, setDarkMode] = useState(true);

  // LOAD EXCEL FILE

  useEffect(() => {

    fetch("/villages.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {

        const workbook = XLSX.read(buffer, {
          type: "buffer"
        });

        const sheetName = workbook.SheetNames[0];

        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        setData(jsonData);

        const uniqueStates = [

          ...new Set(
            jsonData.map(
              (item) => item["STATE NAME"]
            )
          )

        ];

        setStates(uniqueStates);

      });

  }, []);

  // STATE CHANGE

  const handleStateChange = (state) => {

    setSelectedState(state);

    setSelectedDistrict("");
    setSelectedSubdistrict("");
    setSelectedVillage("");

    const filteredDistricts = [

      ...new Set(

        data
          .filter(
            (item) =>
              item["STATE NAME"] === state
          )
          .map(
            (item) => item["DISTRICT NAME"]
          )

      )

    ];

    setDistricts(filteredDistricts);

    setSubdistricts([]);
    setVillages([]);
  };

  // DISTRICT CHANGE

  const handleDistrictChange = (district) => {

    setSelectedDistrict(district);

    setSelectedSubdistrict("");
    setSelectedVillage("");

    const filteredSubdistricts = [

      ...new Set(

        data
          .filter(
            (item) =>
              item["STATE NAME"] === selectedState &&
              item["DISTRICT NAME"] === district
          )
          .map(
            (item) => item["SUB-DISTRICT NAME"]
          )

      )

    ];

    setSubdistricts(filteredSubdistricts);

    setVillages([]);
  };

  // SUBDISTRICT CHANGE

  const handleSubdistrictChange = (subdistrict) => {

    setSelectedSubdistrict(subdistrict);

    setSelectedVillage("");

    const filteredVillages = [

      ...new Set(

        data
          .filter(
            (item) =>
              item["STATE NAME"] === selectedState &&
              item["DISTRICT NAME"] === selectedDistrict &&
              item["SUB-DISTRICT NAME"] === subdistrict
          )
          .map(
            (item) => item["Area Name"]
          )

      )

    ];

    setVillages(filteredVillages);
  };

  // SEARCH FILTER

  const filteredVillages = villages.filter((village) =>
    village.toLowerCase().includes(search.toLowerCase())
  );

  // CHART DATA

  const chartData = filteredVillages
    .slice(0, 10)
    .map((village, index) => ({
      name: village,
      population:
        Math.floor(
          Math.random() * 100000
        ) + 1000
    }));

  return (

    <div className={darkMode ? "main-container dark" : "main-container light"}>

      <div className="glass-card">

        {/* THEME BUTTON */}

        <div className="theme-toggle">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-button"
          >

            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}

          </button>

        </div>

        <h1 className="title">
          🌍 Village Search System
        </h1>

        <p className="subtitle">
          Real Excel Dataset Integration 🚀
        </p>

        {/* STATE */}

        <div className="input-group">

          <label>Select State</label>

          <select
            value={selectedState}
            onChange={(e) =>
              handleStateChange(e.target.value)
            }
          >

            <option value="">
              Choose State
            </option>

            {states.map((state, index) => (

              <option
                key={index}
                value={state}
              >

                {state}

              </option>

            ))}

          </select>

        </div>

        {/* DISTRICT */}

        {selectedState && (

          <div className="input-group">

            <label>Select District</label>

            <select
              value={selectedDistrict}
              onChange={(e) =>
                handleDistrictChange(e.target.value)
              }
            >

              <option value="">
                Choose District
              </option>

              {districts.map((district, index) => (

                <option
                  key={index}
                  value={district}
                >

                  {district}

                </option>

              ))}

            </select>

          </div>

        )}

        {/* SUBDISTRICT */}

        {selectedDistrict && (

          <div className="input-group">

            <label>Select Sub-District</label>

            <select
              value={selectedSubdistrict}
              onChange={(e) =>
                handleSubdistrictChange(e.target.value)
              }
            >

              <option value="">
                Choose Sub-District
              </option>

              {subdistricts.map((subdistrict, index) => (

                <option
                  key={index}
                  value={subdistrict}
                >

                  {subdistrict}

                </option>

              ))}

            </select>

          </div>

        )}

        {/* SEARCH */}

        {selectedSubdistrict && (

          <div className="input-group">

            <label>Search Village</label>

            <input
              type="text"
              placeholder="Type village name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        )}

        {/* VILLAGE */}

        {selectedSubdistrict && (

          <div className="input-group">

            <label>Select Village</label>

            <select
              value={selectedVillage}
              onChange={(e) =>
                setSelectedVillage(e.target.value)
              }
            >

              <option value="">
                Choose Village
              </option>

              {filteredVillages.map((village, index) => (

                <option
                  key={index}
                  value={village}
                >

                  {village}

                </option>

              ))}

            </select>

          </div>

        )}

        {/* CHART */}

        {filteredVillages.length > 0 && (

          <div className="chart-card">

            <h2>📊 Village Population Chart</h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >

              <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="population"
                  fill="#00c853"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        )}

        {/* DETAILS */}

        {selectedVillage && (

          <div className="details-card">

            <h2>Village Information</h2>

            <p>
              <strong>State:</strong> {selectedState}
            </p>

            <p>
              <strong>District:</strong> {selectedDistrict}
            </p>

            <p>
              <strong>Sub-District:</strong> {selectedSubdistrict}
            </p>

            <p>
              <strong>Village:</strong> {selectedVillage}
            </p>

            <button
              className="map-button"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/${selectedVillage}`
                )
              }
            >
              🌍 View on Google Maps
            </button>

            {/* LIVE MAP */}

            <div className="map-container">

              <iframe
                title="Village Map"
                width="100%"
                height="350"
                style={{
                  border: 0,
                  borderRadius: "15px",
                  marginTop: "20px"
                }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${selectedVillage}&output=embed`}
              ></iframe>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default App;