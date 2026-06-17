const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  generateItinerary,
} = require("../controllers/aiController");

const router = express.Router();

router.post(
  "/itinerary",
  protect,
  generateItinerary
);

module.exports = router;