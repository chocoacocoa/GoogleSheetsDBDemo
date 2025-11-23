const express = require("express");
//const fetch = require("node-fetch");
const app = express();

app.use(express.json()); // parse JSON bodies
//serve frontend files
app.use(express.static("public"));
// Proxy GET request
app.get("/api/data", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbydqzHiaGOzlg6M_uu6WpI13H64Rqyz5WWIg30HL6DUcDUjjVThSYJwmnDiFMThq2MYVQ/exec");
    const data = await response.json();
    res.json(data); // send back to frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Proxy POST request
app.post("/api/send", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbydqzHiaGOzlg6M_uu6WpI13H64Rqyz5WWIg30HL6DUcDUjjVThSYJwmnDiFMThq2MYVQ/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
