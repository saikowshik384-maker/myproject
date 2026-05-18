import React, { useEffect } from "react";

function App() {

  useEffect(() => {
    fetch("https://myproject-backend-x6p5.onrender.com/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(data.message);
      });
  }, []);

  return (
    <div>
      <h1>Frontend Connected Successfully 🚀</h1>
    </div>
  );
}

export default App;