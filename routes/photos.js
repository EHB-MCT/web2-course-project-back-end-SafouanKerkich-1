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
        const { cameraId, imageUrl, category, caption } = req.body;

        if (!cameraId || !imageUrl || !category) {
            return res.status(400).json({ error: "cameraId, imageUrl and category are required" });
        }
        const db = await connectDB();

        const newPhoto = {
            cameraId: Number(cameraId),
            imageUrl: String(imageUrl),
            category: String(category),
            caption: caption ? String(caption) : "",
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

        const { cameraId, imageUrl, category, caption } = req.body;

        // Only update fields that are provided
        const updates = {};
        if (cameraId !== undefined) updates.cameraId = Number(cameraId);
        if (imageUrl !== undefined) updates.imageUrl = String(imageUrl);
        if (caption !== undefined) updates.caption = String(caption);
        if (category !== undefined) updates.category = String(category);

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
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const result = await db
            .collection("photos")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Photo not found" });
        }

        res.json({ message: "Photo deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete photo" });
    }
});


module.exports = router;