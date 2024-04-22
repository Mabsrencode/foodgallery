const mongoose = require("mongoose");

const offersSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const Offers = mongoose.model("recipe", offersSchema);
module.exports = Offers;