const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

// @desc    Create Category
// @route   POST/api/category/
// @access   Private/Admin
exports.createAdmin = asyncHandler(async (req, res, next) => {
  req.body.isAdmin = true;
  const admin = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: admin,
  });
});

// @desc    GEt Category
// @route   GET/api/category/
// @access   Private/Admin
exports.getAdmin = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.params.id);

  if (admin) {
    await admin.remove();
    res.json({ message: "Admin removed" });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
