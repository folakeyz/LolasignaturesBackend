const express = require("express");
const {
  getDelivery,
  createDelivery,
  deleteDelivery,
  editDelivery,
} = require("../controllers/delivery");
const { protect } = require("../middleware/auth");
const Delivery = require("../models/Delivery");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(protect, advancedResults(Delivery), getDelivery)
  .post(protect, createDelivery);
router.route("/:id").delete(protect, deleteDelivery).put(protect, editDelivery);
module.exports = router;
