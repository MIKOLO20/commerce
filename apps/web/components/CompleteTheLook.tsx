"use client";

import { useEffect, useState } from "react";
import { api, flattenToCards, type Product } from "@/lib/api";
import { ProductCard } from "./ProductCard";

export function CompleteTheLook({ excludeProductId }: { excludeProductId: string }) {
  const [suggestions, setSuggestions] = useState<Product[] | null>(null);

  useEffect(() => {
    api
      .getProducts()
      .then((all) => setSuggestions(all.filter((p) => p._id !== excludeProductId)))
      .catch(() => setSuggestions([]));
  }, [excludeProductId]);

  if (!suggestions || suggestions.length === 0) return null;

  const cards = flattenToCards(suggestions).slice(0, 4);
  if (cards.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Complete the Look</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {cards.map((card) => (
          <ProductCard key={`${card.productId}-${card.colorName}`} card={card} />
        ))}
      </div>
    </section>
  );
}
