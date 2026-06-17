const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth Route Working");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Profile access granted",
    user: req.user
  });
});

module.exports = router;