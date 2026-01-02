// https://www.youtube.com/watch?v=_7UQPve99r4
// https://www.youtube.com/watch?v=SccSCuHhOw0
// https://www.youtube.com/watch?v=ha_leEpnT30
// https://www.youtube.com/watch?v=11aVPaJHsz0
const express = require("express");
const app = express();
const cors = require("cors");

// https://www.youtube.com/watch?v=4hkDPrl49KI
const port = process.env.PORT || 4000;

// MongoDB
const connectDB = require("./db");

// Middleware
app.use(express.json());
app.use(cors());

// Connection MongoDB
connectDB().catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Routes
const cameraRoutes = require("./routes/cameras");
const photoRoutes = require("./routes/photos");


app.get("/", (req, res) => {
    res.send("backend is running");
});

app.use("/api/cameras", cameraRoutes);
app.use("/api/photos", photoRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});