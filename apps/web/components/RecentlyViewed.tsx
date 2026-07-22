"use client";

import { useEffect, useState } from "react";
import { api, type ProductCardData } from "@/lib/api";
import { useRecentlyViewedStore } from "@/lib/store/recentlyViewedStore";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ excludeProductId }: { excludeProductId?: string }) {
  const productIds = useRecentlyViewedStore((s) => s.productIds);
  const [cards, setCards] = useState<ProductCardData[]>([]);

  useEffect(() => {
    const ids = productIds.filter((id) => id !== excludeProductId);
    if (ids.length === 0) {
      setCards([]);
      return;
    }

    Promise.all(ids.map((id) => api.getProduct(id).catch(() => null)))
      .then((products) => {
        const valid = products.filter((p): p is NonNullable<typeof p> => p !== null);
        setCards(
          valid.map((p) => ({
            productId: p._id,
            name: p.name,
            category: p.category,
            image: p.colors[0].image,
            colorName: p.colors[0].name,
            basePrice: p.basePrice,
            discountedPrice: p.discountedPrice,
          }))
        );
      })
      .catch(() => setCards([]));
  }, [productIds, excludeProductId]);

  if (cards.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {cards.map((card) => (
          <ProductCard key={card.productId} card={card} />
        ))}
      </div>
    </section>
  );
}
