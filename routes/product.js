const express = require("express");
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").post(protect, addProduct).get(protect, getProduct);
router.route("/:id").put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;
