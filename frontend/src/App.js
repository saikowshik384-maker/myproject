import "./App.css";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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
            jsonData.map((item) => item["STATE NAME"])
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
          .map((item) => item["DISTRICT NAME"])
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
          .map((item) => item["SUB-DISTRICT NAME"])
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
          .map((item) => item["Area Name"])
      )
    ];

    setVillages(filteredVillages);
  };

  return (

    <div className="main-container">

      <div className="glass-card">

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

              {villages.map((village, index) => (

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

          </div>

        )}

      </div>

    </div>

  );
}

export default App;