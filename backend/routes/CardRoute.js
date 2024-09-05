const express = require("express");
const multer = require("multer");
const path = require("path");
const CardModel = require("../models/CardModel");

const router = express.Router();

// Set up multer for file uploads
const upload = multer({
  dest: "uploads/", // Directory to store uploaded files
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
});

// Add card route
router.post("/add-card", upload.single("image"), async (req, res) => {
  try {
    // Create a new card with uploaded image path
    const card = new CardModel({
      challengeName: req.body.challengeName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      image: req.file ? req.file.path : null, // Save image path
      level: req.body.level,
    });

    await card.save();
    res.status(201).json({ message: "Card added successfully" });
  } catch (error) {
    console.error("Error adding card:", error.message);
    res.status(500).json({ message: "Error adding card" });
  }
});

// Get all cards route
router.get("/get-cards", async (req, res) => {
  try {
    const cards = await CardModel.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error.message);
    res.status(500).json({ message: "Error fetching cards" });
  }
});

// Get a single card by id
router.get("/get-card/:id", async (req, res) => {
  try {
    const card = await CardModel.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error("Error fetching the card:", error.message);
    res.status(500).json({ message: "Error fetching the card" });
  }
});

// Update a card by id
router.put("/update-card/:id", async (req, res) => {
  try {
    const updatedCard = await CardModel.findByIdAndUpdate(
      req.params.id,
      {
        challengeName: req.body.challengeName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        image: req.body.image,
        level: req.body.level,
      },
      { new: true }
    ); // Return the updated document

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res
      .status(200)
      .json({ message: "Card updated successfully", card: updatedCard });
  } catch (error) {
    console.error("Error updating card:", error.message);
    res.status(500).json({ message: "Error updating card" });
  }
});

// Delete a card by id
router.delete("/delete-card/:id", async (req, res) => {
  try {
    const deletedCard = await CardModel.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error.message);
    res.status(500).json({ message: "Error deleting card" });
  }
});

module.exports = router;
