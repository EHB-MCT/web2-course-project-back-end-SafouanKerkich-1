const express = require("express");
const router = express.Router();

const photos = require("../data/photos");


router.get("/", (req, res) => {
    res.json(photos);
});


router.post("/", (req, res) => {
    const { cameraId, imageUrl, caption } = req.body;


    if (!cameraId || !imageUrl) {
        return res.status(400).json({ error: "cameraId and imageUrl are required" });
    }


    const newId = photos.length === 0 ? 1 : photos[photos.length - 1].id + 1;

    const newPhoto = {
        id: newId,
        cameraId: Number(cameraId),
        imageUrl: String(imageUrl),
        caption: caption ? String(caption) : "",
    };

    photos.push(newPhoto);
    res.status(201).json(newPhoto);
});

module.exports = router;