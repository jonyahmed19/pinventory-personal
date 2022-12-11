const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
    user: {
      type: ObjectId,
      required: true,
      ref: "Users",
    },
    name: {
      type: String,
      required: [true, "Name must not be empty!"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU must not be empty!"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category must not be empty!"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Quantity must not be empty!"],
    },
    price: {
      type: String,
      required: [true, "Price must not be empty!"],
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
