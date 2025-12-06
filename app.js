const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

// Middleware
app.use(express.json());

app.use(cors());

// Routes
const cameraRoutes = require("./routes/cameras");

// Use camera routes with the /api/cameras prefix
app.get("/", (req, res) => {
    res.send("backend is running");
});

app.use("/api/cameras", cameraRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
