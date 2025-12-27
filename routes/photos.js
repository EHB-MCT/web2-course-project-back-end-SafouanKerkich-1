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

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = photos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Photo not found" });
    }

    const deletedPhoto = photos.splice(index, 1);
    res.json(deletedPhoto[0]);
});

module.exports = router;