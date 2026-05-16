import { useState, useEffect } from "react";

function App() {

  const [search, setSearch] = useState("");
  const [villages, setVillages] = useState([]);

  useEffect(() => {
    fetchVillages();
  }, []);

  const fetchVillages = async () => {

    const response = await fetch(
      "http://localhost:3000/villages"
    );

    const data = await response.json();

    setVillages(data);
  };

  const searchVillages = async () => {

    const response = await fetch(
      `http://localhost:3000/villages?name=${search}`
    );

    const data = await response.json();

    setVillages(data);
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Village Search</h1>

      <input
        type="text"
        placeholder="Enter village name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />

      <button onClick={searchVillages}>
        Search
      </button>

      <div style={{ marginTop: "20px" }}>

        {villages.map((village, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{village.village_name}</h3>

            <p>State: {village.state_name}</p>

            <p>District: {village.district_name}</p>

            <p>Subdistrict: {village.subdistrict_name}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;