const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;


app.use(express.json());

app.use(cors());


app.get("/", (req, res) => {
    res.send("Working.");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});