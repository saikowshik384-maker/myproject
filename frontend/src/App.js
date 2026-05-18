import React, { useState } from "react";

function App() {

  const [state, setState] = useState("");

  const states = [
    "Andhra Pradesh",
    "Telangana",
    "Tamil Nadu",
    "Karnataka"
  ];

  return (
    <div style={{ padding: "30px" }}>

      <h1>Village Search System 🚀</h1>

      <h2>Select State</h2>

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "18px"
        }}
      >
        <option value="">Choose State</option>

        {states.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <h2 style={{ marginTop: "30px" }}>
        Selected State: {state}
      </h2>

    </div>
  );
}

export default App;