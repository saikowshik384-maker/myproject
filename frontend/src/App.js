import "./App.css";
import { useState } from "react";

function App() {

  const data = {
    "Andhra Pradesh": {
      Krishna: ["Vijayawada", "Machilipatnam", "Gudivada"],
      Guntur: ["Tenali", "Mangalagiri", "Bapatla"],
      NTR: ["Ibrahimpatnam", "Tiruvuru", "Jaggaiahpet"],
    },

    Telangana: {
      Hyderabad: ["Madhapur", "Gachibowli", "Kukatpally"],
      Warangal: ["Hanamkonda", "Kazipet", "Parkal"],
      Karimnagar: ["Huzurabad", "Jammikunta", "Manakondur"],
    },
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [search, setSearch] = useState("");

  const states = Object.keys(data);

  const districts = selectedState
    ? Object.keys(data[selectedState])
    : [];

  const villages =
    selectedState && selectedDistrict
      ? data[selectedState][selectedDistrict]
      : [];

  const filteredVillages = villages.filter((village) =>
    village.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-container">

      <div className="glass-card">

        <h1 className="title">
          🌍 Village Search System
        </h1>

        <p className="subtitle">
          Search villages easily using dropdown filters
        </p>

        {/* STATE */}

        <div className="input-group">

          <label>Select State</label>

          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedDistrict("");
              setSelectedVillage("");
            }}
          >
            <option value="">
              Choose State
            </option>

            {states.map((state, index) => (
              <option key={index} value={state}>
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
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedVillage("");
              }}
            >
              <option value="">
                Choose District
              </option>

              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}

            </select>

          </div>

        )}

        {/* SEARCH */}

        {selectedDistrict && (

          <>

            <div className="input-group">

              <label>Search Village</label>

              <input
                type="text"
                placeholder="Type village name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* VILLAGE */}

            <div className="input-group">

              <label>Select Village</label>

              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
              >

                <option value="">
                  Choose Village
                </option>

                {filteredVillages.map((village, index) => (
                  <option key={index} value={village}>
                    {village}
                  </option>
                ))}

              </select>

            </div>

          </>

        )}

        {/* RESULT */}

        <div className="result-card">

          <h2>📍 Selected Details</h2>

          <p>
            <strong>State:</strong> {selectedState || "-"}
          </p>

          <p>
            <strong>District:</strong> {selectedDistrict || "-"}
          </p>

          <p>
            <strong>Village:</strong> {selectedVillage || "-"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default App;