import { useEffect, useState } from "react";

function App() {

  const [states, setStates] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [subdistricts, setSubdistricts] = useState([]);

  const [selectedState, setSelectedState] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedSubdistrict, setSelectedSubdistrict] = useState("");

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {

    if (selectedState) {
      fetchDistricts(selectedState);
    }

  }, [selectedState]);

  useEffect(() => {

    if (selectedDistrict) {
      fetchSubdistricts(selectedDistrict);
    }

  }, [selectedDistrict]);

  const fetchStates = async () => {

    const response = await fetch(
      "http://localhost:3000/states"
    );

    const data = await response.json();

    setStates(data);
  };

  const fetchDistricts = async (state) => {

    const response = await fetch(
      `http://localhost:3000/districts?state=${state}`
    );

    const data = await response.json();

    setDistricts(data);
  };

  const fetchSubdistricts = async (district) => {

    const response = await fetch(
      `http://localhost:3000/subdistricts?district=${district}`
    );

    const data = await response.json();

    setSubdistricts(data);
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Village Search System</h1>

      <br />

      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        style={{
          padding: "10px",
          width: "300px"
        }}
      >

        <option value="">
          Select State
        </option>

        {states.map((state, index) => (

          <option
            key={index}
            value={state.state_name}
          >
            {state.state_name}
          </option>

        ))}

      </select>

      <br />
      <br />

      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        style={{
          padding: "10px",
          width: "300px"
        }}
      >

        <option value="">
          Select District
        </option>

        {districts.map((district, index) => (

          <option
            key={index}
            value={district.district_name}
          >
            {district.district_name}
          </option>

        ))}

      </select>

      <br />
      <br />

      <select
        value={selectedSubdistrict}
        onChange={(e) => setSelectedSubdistrict(e.target.value)}
        style={{
          padding: "10px",
          width: "300px"
        }}
      >

        <option value="">
          Select Subdistrict
        </option>

        {subdistricts.map((subdistrict, index) => (

          <option
            key={index}
            value={subdistrict.subdistrict_name}
          >
            {subdistrict.subdistrict_name}
          </option>

        ))}

      </select>

      <br />
      <br />

      <h3>
        Selected State: {selectedState}
      </h3>

      <h3>
        Selected District: {selectedDistrict}
      </h3>

      <h3>
        Selected Subdistrict: {selectedSubdistrict}
      </h3>

    </div>
  );
}

export default App;