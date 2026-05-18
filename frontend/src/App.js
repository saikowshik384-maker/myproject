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
    <div className="container">
      <h1 className="title">
        Village Search System 🚀
      </h1>

      {/* State */}
      <h2 className="label">
        Select State
      </h2>

      <select
        className="select-box"
        value={selectedState}
        onChange={(e) => {
          setSelectedState(e.target.value);
          setSelectedDistrict("");
          setSelectedVillage("");
        }}
      >
        <option value="">Choose State</option>

        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* District */}
      {selectedState && (
        <>
          <h2 className="label">
            Select District
          </h2>

          <select
            className="select-box"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedVillage("");
            }}
          >
            <option value="">Choose District</option>

            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Village */}
      {selectedDistrict && (
        <>
          <h2 className="label">
            Search Village
          </h2>

          <input
            className="search-box"
            type="text"
            placeholder="Type village name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h2 className="label">
            Select Village
          </h2>

          <select
            className="select-box"
            value={selectedVillage}
            onChange={(e) => setSelectedVillage(e.target.value)}
          >
            <option value="">Choose Village</option>

            {filteredVillages.map((village, index) => (
              <option key={index} value={village}>
                {village}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Results */}
      <div className="result-box">
        <h2>
          Selected State: {selectedState}
        </h2>

        <h2>
          Selected District: {selectedDistrict}
        </h2>

        <h2>
          Selected Village: {selectedVillage}
        </h2>
      </div>
    </div>
  );
}

export default App;