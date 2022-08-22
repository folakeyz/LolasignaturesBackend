const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
