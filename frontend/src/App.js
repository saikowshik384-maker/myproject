import React, { useState } from "react";

function App() {

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [search, setSearch] = useState("");

  const data = {
    "Andhra Pradesh": {
      Krishna: ["Vijayawada", "Machilipatnam", "Gudivada"],
      Guntur: ["Tenali", "Mangalagiri", "Sattenapalli"],
      NTR: ["Ibrahimpatnam", "Tiruvuru", "Kanchikacherla"]
    },

    Telangana: {
      Hyderabad: ["Madhapur", "Gachibowli", "Kukatpally"],
      Warangal: ["Hanamkonda", "Kazipet", "Parkal"]
    }
  };

  const villages =
    state && district
      ? data[state][district]
      : [];

  const filteredVillages = villages.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div style={{ padding: "30px" }}>

      <h1>Village Search System 🚀</h1>

      {/* STATE */}

      <h2>Select State</h2>

      <select
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setDistrict("");
          setVillage("");
        }}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "18px"
        }}
      >

        <option value="">
          Choose State
        </option>

        {Object.keys(data).map((item, index) => (

          <option key={index} value={item}>
            {item}
          </option>

        ))}

      </select>

      {/* DISTRICT */}

      <h2 style={{ marginTop: "30px" }}>
        Select District
      </h2>

      <select
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
          setVillage("");
        }}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "18px"
        }}
      >

        <option value="">
          Choose District
        </option>

        {state &&
          Object.keys(data[state]).map((item, index) => (

            <option key={index} value={item}>
              {item}
            </option>

          ))}

      </select>

      {/* SEARCH */}

      <h2 style={{ marginTop: "30px" }}>
        Search Village
      </h2>

      <input
        type="text"
        placeholder="Type village name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "280px",
          fontSize: "18px"
        }}
      />

      {/* VILLAGE */}

      <h2 style={{ marginTop: "30px" }}>
        Select Village
      </h2>

      <select
        value={village}
        onChange={(e) => setVillage(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "18px"
        }}
      >

        <option value="">
          Choose Village
        </option>

        {filteredVillages.map((item, index) => (

          <option key={index} value={item}>
            {item}
          </option>

        ))}

      </select>

      {/* RESULTS */}

      <div style={{ marginTop: "40px" }}>

        <h2>
          Selected State: {state}
        </h2>

        <h2>
          Selected District: {district}
        </h2>

        <h2>
          Selected Village: {village}
        </h2>

      </div>

    </div>

  );
}

export default App;