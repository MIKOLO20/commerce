const IMAGE_BASE = "/clothes";

export const products = [
  {
    name: "Classic Cotton Round Neck T-Shirt",
    category: "Round Neck",
    description:
      "High-grade, soft 100% cotton round neck tee with a relaxed, everyday fit.",
    basePrice: 39000,
    discountedPrice: 29970,
    colors: [
      { name: "Dark Grey", image: `${IMAGE_BASE}/1-46-630x630.jpg` },
      { name: "Army Green", image: `${IMAGE_BASE}/1-47-630x630.jpg` },
      { name: "Coral Red", image: `${IMAGE_BASE}/1-48-630x630.jpg` },
      { name: "Almond", image: `${IMAGE_BASE}/1-49-630x630.jpg` },
      { name: "Olive Green", image: `${IMAGE_BASE}/1-50-630x630.jpg` },
      { name: "Forest Green", image: `${IMAGE_BASE}/1-51-630x630.jpg` },
      { name: "Charcoal Black", image: `${IMAGE_BASE}/4-20-630x630.jpg` },
      { name: "Red", image: `${IMAGE_BASE}/RED-ROUND-NECK-180-630x630.jpg` },
    ],
    sizes: [
      { label: "S", stock: 8 },
      { label: "M", stock: 2 },
      { label: "L", stock: 0 },
      { label: "XL", stock: 15 },
    ],
  },
  {
    name: "Navy Pocket T-Shirt",
    category: "Pocket Tee",
    description:
      "A wardrobe staple round neck tee with a clean chest pocket detail.",
    basePrice: 35000,
    discountedPrice: 27990,
    colors: [
      {
        name: "Navy Blue",
        image: `${IMAGE_BASE}/NAVY-BLUE-POCKET-TEES-630x630.jpg`,
      },
    ],
    sizes: [
      { label: "S", stock: 0 },
      { label: "M", stock: 5 },
      { label: "L", stock: 3 },
      { label: "XL", stock: 20 },
    ],
  },
];
