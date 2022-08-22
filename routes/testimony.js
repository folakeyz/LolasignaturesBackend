const express = require("express");
const {
  getTestimony,
  createTestimony,
  deleteTestimony,
  editTestimony,
} = require("../controllers/testimony");
const { protect } = require("../middleware/auth");
const Testimony = require("../models/Testimony");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(protect, advancedResults(Testimony), getTestimony)
  .post(protect, createTestimony);
router
  .route("/:id")
  .delete(protect, deleteTestimony)
  .put(protect, editTestimony);
module.exports = router;
