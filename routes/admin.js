const express = require("express");
const { getAdmin, createAdmin, deleteAdmin } = require("../controllers/admin");
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router
  .route("/")
  .get(protect, advancedResults(User), getAdmin)
  .post(protect, createAdmin);
router.route("/:id").delete(protect, deleteAdmin);
module.exports = router;
