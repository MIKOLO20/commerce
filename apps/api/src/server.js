import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import { Product } from "./models/Product.js";
import { products as seedProducts } from "./data/products.js";
import { productsRouter } from "./routes/products.js";

const PORT = process.env.PORT || 4000;

// If CORS_ORIGIN isn't set, allow any localhost/127.0.0.1 port — Next.js
// falls back to a different port whenever its default is already taken.
const explicitOrigins = process.env.CORS_ORIGIN?.split(",");
const corsOptions = {
  origin: explicitOrigins || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/,
};

async function ensureSeeded() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(seedProducts);
    console.log(`No products found — auto-seeded ${seedProducts.length} products`);
  }
}

async function main() {
  await connectDB();
  await ensureSeeded();

  const app = express();
  app.use(cors(corsOptions));
  app.use(express.json());

  app.get("/api/health", (req, res) => res.json({ ok: true }));
  app.use("/api/products", productsRouter);

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start API:", err);
  process.exit(1);
});
