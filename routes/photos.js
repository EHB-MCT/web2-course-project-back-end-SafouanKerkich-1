const express = require("express");
const router = express.Router();
const connectDB = require("../db");
const { ObjectId } = require("mongodb");

// GET all photos
router.get("/", async (req, res) => {
    try {
        const db = await connectDB();
        const photos = await db.collection("photos").find().toArray();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch photos" });
    }
});

// POST new photo
router.post("/", async (req, res) => {
    try {
        const { cameraId, imageUrl, caption } = req.body;

        if (!cameraId || !imageUrl) {
            return res.status(400).json({
                error: "cameraId and imageUrl are required"
            });
        }

        const db = await connectDB();

        const newPhoto = {
            cameraId: Number(cameraId),
            imageUrl,
            caption: caption || "",
            createdAt: new Date(),
        };

        const result = await db.collection("photos").insertOne(newPhoto);

        res.status(201).json({
            _id: result.insertedId,
            ...newPhoto
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to create photo" });
    }
});
// UPDATE photo
router.put("/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const id = new ObjectId(req.params.id);

        const { cameraId, imageUrl, caption } = req.body;

        // Only update fields that are provided
        const updates = {};
        if (cameraId !== undefined) updates.cameraId = Number(cameraId);
        if (imageUrl !== undefined) updates.imageUrl = String(imageUrl);
        if (caption !== undefined) updates.caption = String(caption);

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        const result = await db.collection("photos").findOneAndUpdate(
            { _id: id },
            { $set: updates },
            { returnDocument: "after" }
        );

        if (!result.value) {
            return res.status(404).json({ error: "Photo not found" });
        }

        res.json(result.value);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
});

// DELETE photo
router.delete("/:id", async (req, res) => {
    try {
        const db = await connectDB();
        const id = new ObjectId(req.params.id);

        const result = await db.collection("photos").findOneAndDelete({ _id: id });

        if (!result.value) {
            return res.status(404).json({ error: "Photo not found" });
        }

        res.json(result.value);
    } catch (err) {
        res.status(400).json({ error: "Invalid ID" });
    }
});


module.exports = router;