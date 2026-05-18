import React, { useState } from "react";

function App() {

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const data = {
    "Andhra Pradesh": [
      "Krishna",
      "Guntur",
      "NTR"
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Karimnagar"
    ]
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Village Search System 🚀</h1>

      <h2>Select State</h2>

      <select
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setDistrict("");
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

      <h2 style={{ marginTop: "30px" }}>
        Select District
      </h2>

      <select
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "18px"
        }}
      >
        <option value="">Choose District</option>

        {state &&
          data[state].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>

      <h2 style={{ marginTop: "30px" }}>
        Selected State: {state}
      </h2>

      <h2>
        Selected District: {district}
      </h2>

    </div>
  );
}

export default App;