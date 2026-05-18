import React, { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://myproject-backend-x6p5.onrender.com/api")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Village Search System 🚀</h1>

      <h2>Backend Message:</h2>

      <p>{message}</p>
    </div>
  );
}

export default App;