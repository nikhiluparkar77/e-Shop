const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  productname: { type: String },
  size: { type: String },
  description: { type: String },
  price: { type: Number },
  productImage: { type: String },
  productdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
