import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

const sizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    basePrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    colors: { type: [colorSchema], validate: (v) => v.length > 0 },
    sizes: { type: [sizeSchema], validate: (v) => v.length > 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
