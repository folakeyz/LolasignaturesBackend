const express = require("express");
const {
  createUser,
  adminlogin,
  getMe,
  getUsers,
  forgotPassword,
  resetPassword,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const User = require("../models/User");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router();

router.route("/").post(createUser).get(advancedResults(User), getUsers);
router.route("/login").post(adminlogin);
router.route("/me").get(protect, getMe);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
