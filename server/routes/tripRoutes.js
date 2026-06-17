const express = require("express");
const {
  createTrip,
  getTrips,
  getMyTrips,
  updateTrip,
  deleteTrip
} = require("../controllers/tripController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", getTrips);
router.get("/my-trips", protect, getMyTrips);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

module.exports = router;