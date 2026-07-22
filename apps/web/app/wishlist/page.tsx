"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type ProductCardData } from "@/lib/api";
import { useWishlistStore, parseWishlistKey } from "@/lib/store/wishlistStore";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeletons";

export default function WishlistPage() {
  const keys = useWishlistStore((s) => s.keys);
  const [cards, setCards] = useState<ProductCardData[] | null>(null);

  useEffect(() => {
    if (keys.length === 0) {
      setCards([]);
      return;
    }

    const wanted = keys.map(parseWishlistKey);
    const uniqueIds = [...new Set(wanted.map((w) => w.productId))];

    Promise.all(uniqueIds.map((id) => api.getProduct(id).catch(() => null))).then(
      (products) => {
        const byId = new Map(
          products.filter((p): p is NonNullable<typeof p> => p !== null).map((p) => [p._id, p])
        );

        const nextCards: ProductCardData[] = [];
        for (const { productId, colorName } of wanted) {
          const product = byId.get(productId);
          const color = product?.colors.find((c) => c.name === colorName);
          if (!product || !color) continue;
          nextCards.push({
            productId: product._id,
            name: product.name,
            category: product.category,
            image: color.image,
            colorName: color.name,
            basePrice: product.basePrice,
            discountedPrice: product.discountedPrice,
          });
        }
        setCards(nextCards);
      }
    );
  }, [keys]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      {!cards && <ProductGridSkeleton count={4} />}

      {cards && cards.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl2 shadow-card">
          <p className="text-neutral-500 mb-4">Your wishlist is empty.</p>
          <Link href="/" className="font-semibold text-ink underline underline-offset-2">
            Start browsing
          </Link>
        </div>
      )}

      {cards && cards.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <ProductCard key={`${card.productId}-${card.colorName}`} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
