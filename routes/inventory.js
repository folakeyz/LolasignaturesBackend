const express = require("express");
const { getInventory } = require("../controllers/inventory");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").get(protect, getInventory);

module.exports = router;
