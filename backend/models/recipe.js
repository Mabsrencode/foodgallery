const mongoose = require("mongoose");

const offersSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    selectedFile: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
    },
    source: {
      type: String,
    },
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  { timestamps: { type: String } }
);

const Offers = mongoose.model("recipe", offersSchema);
module.exports = Offers;
