const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Delivery = require("../models/Delivery");

// @desc    Create Category
// @route   POST/api/category/
// @access   Private/Admin
exports.createDelivery = asyncHandler(async (req, res, next) => {
  const delivery = await Delivery.create(req.body);
  res.status(201).json({
    success: true,
    data: delivery,
  });
});

// @desc    GEt Category
// @route   GET/api/category/
// @access   Private/Admin
exports.getDelivery = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteDelivery = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findById(req.params.id);

  if (delivery) {
    await delivery.remove();
    res.json({ message: "Delivery removed" });
  } else {
    res.status(404);
    throw new Error("Delivery not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.editDelivery = asyncHandler(async (req, res) => {
  const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: delivery,
  });
});
