const mongoose = require("mongoose");

const testimonySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimony", testimonySchema);
