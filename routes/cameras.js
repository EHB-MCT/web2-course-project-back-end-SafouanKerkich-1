const express = require("express");
const router = express.Router();

const cameras = require("../data/cameras");


router.get("/", (req, res) => {
  res.json(cameras);
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const camera = cameras.find(c => c.id === id);

  if (!camera) {
    return res.status(404).json({ error: "No camera found." });
  }

  res.json(camera);
});

module.exports = router;
