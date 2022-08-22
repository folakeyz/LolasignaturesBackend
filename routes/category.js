const express = require("express");
const {
  getCategory,
  createCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/category");
const { protect } = require("../middleware/auth");
const Category = require("../models/Category");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(protect, advancedResults(Category), getCategory)
  .post(protect, createCategory);
router.route("/:id").delete(protect, deleteCategory).put(protect, editCategory);
module.exports = router;
