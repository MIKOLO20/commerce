import "dotenv/config";
import { connectDB, disconnectDB } from "../db.js";
import { Product } from "../models/Product.js";
import { products } from "../data/products.js";

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);
  await disconnectDB();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
