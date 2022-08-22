const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Testimony = require("../models/Testimony");

// @desc    Create Category
// @route   POST/api/category/
// @access   Private/Admin
exports.createTestimony = asyncHandler(async (req, res, next) => {
  const delivery = await Testimony.create(req.body);
  res.status(201).json({
    success: true,
    data: delivery,
  });
});

// @desc    GEt Category
// @route   GET/api/category/
// @access   Private/Admin
exports.getTestimony = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteTestimony = asyncHandler(async (req, res) => {
  const delivery = await Testimony.findById(req.params.id);

  if (delivery) {
    await Testimony.remove();
    res.json({ message: "Delivery removed" });
  } else {
    res.status(404);
    throw new Error("Delivery not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.editTestimony = asyncHandler(async (req, res) => {
  const delivery = await Testimony.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: delivery,
  });
});
