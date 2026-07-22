import { Router } from "express";
import { Product } from "../models/Product.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: 1 });
  res.json(products);
});

productsRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

productsRouter.patch("/:id/stock", async (req, res) => {
  const { size, delta } = req.body;
  if (!size || typeof delta !== "number") {
    return res.status(400).json({ error: "size and numeric delta are required" });
  }

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const sizeEntry = product.sizes.find((s) => s.label === size);
  if (!sizeEntry) return res.status(404).json({ error: "Size not found on product" });

  const nextStock = sizeEntry.stock + delta;
  if (nextStock < 0) {
    return res.status(409).json({ error: "Not enough stock", stock: sizeEntry.stock });
  }

  sizeEntry.stock = nextStock;
  await product.save();
  res.json(product);
});
