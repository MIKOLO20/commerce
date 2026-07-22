"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api, flattenToCards, type Product } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeletons";

export default function HomePage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight"
        >
          Quality tees, made simple.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-neutral-500 max-w-xl mx-auto"
        >
          Premium 100% cotton essentials, in colors built to last.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {error && (
          <p className="text-center text-red-600 mb-6">
            Couldn&apos;t load products: {error}. Is the API running on port 4000?
          </p>
        )}

        {!products && !error && <ProductGridSkeleton />}

        {products && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {flattenToCards(products).map((card) => (
              <ProductCard key={`${card.productId}-${card.colorName}`} card={card} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
