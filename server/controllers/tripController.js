const Trip = require("../models/Trip");

const createTrip = async (req, res) => {
  try {
    const { title, destination, description, budget, image } = req.body;
    const trip = await Trip.create({
      title,
      destination,
      description,
      budget,
      image,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();

    res.status(200).json(trips);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      createdBy: req.user.id
    });

    res.status(200).json(trips);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Trip updated successfully",
      trip: updatedTrip
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found"
      });
    }

    if (trip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  createTrip,
  getTrips,
  getMyTrips,
  updateTrip,
  deleteTrip
};