const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api", (req, res) => {
  res.json({
    message: "API working successfully"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});