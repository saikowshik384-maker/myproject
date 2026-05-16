c:\Users\91905\OneDrive\Pictures\Documents\index.jsconst express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});