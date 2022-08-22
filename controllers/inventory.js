const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Category = require("../models/Category");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @desc    Create User
// @route   POST/api/users/
// @access   Public/Admin
exports.getInventory = asyncHandler(async (req, res, next) => {
  const clients = await User.find();
  const products = await Product.find().populate("category", "name");
  const orders = await Order.find();
  const category = await Category.find();

  const total = await Order.aggregate([
    {
      $group: {
        _id: null,
        sum: {
          $sum: {
            $toInt: "$totalPrice",
          },
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: clients,
    products,
    orders,
    income: total[0].sum,
    category,
  });
});
