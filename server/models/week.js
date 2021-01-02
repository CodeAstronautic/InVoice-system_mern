const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weekSchema = new Schema(
  {
    week: {
      type: Number,

      unique: true,
      trim: true,
      minlength: 1,
      maxlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Week = mongoose.model("week", weekSchema);

module.exports = Week;
