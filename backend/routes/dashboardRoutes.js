const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    getDashboardSummary
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard requires login
router.get("/summary", protect, getDashboardSummary);

module.exports = router;