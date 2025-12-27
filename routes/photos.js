const express = require("express");
const router = express.Router();

const photos = require("../data/photos");

router.get("/", (req, res) => {
    res.json(photos);
});

module.exports = router;