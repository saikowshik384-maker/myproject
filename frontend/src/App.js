import React, { useState } from "react";

function App() {

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");

  const data = {
    "Andhra Pradesh": {
      Krishna: ["Vijayawada", "Machilipatnam", "Gudivada"],
      Guntur: ["Tenali", "Mangalagiri", "Sattenapalli"],
      NTR: ["Ibrahimpatnam", "Tiruvuru", "Kanchikacherla"]
    },

    Telangana: {
      Hyderabad: ["Madhapur", "Gachibowli", "Kukatpally"],
      Warangal: ["Hanamkonda", "Kazipet", "Parkal"],
      Karimnagar: ["Jammikunta", "Huzurabad", "Manakondur"]
    }
  };

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
        <option value="">Choose State</option>

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
        <option value="">Choose District</option>

        {state &&
          Object.keys(data[state]).map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>

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
        <option value="">Choose Village</option>

        {state &&
          district &&
          data[state][district].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>

      {/* RESULTS */}

      <h2 style={{ marginTop: "40px" }}>
        Selected State: {state}
      </h2>

      <h2>
        Selected District: {district}
      </h2>

      <h2>
        Selected Village: {village}
      </h2>

    </div>
  );
}

export default App;