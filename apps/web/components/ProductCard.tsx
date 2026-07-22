"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductImage } from "./ProductImage";
import { formatNaira, type ProductCardData } from "@/lib/api";
import { useWishlistStore } from "@/lib/store/wishlistStore";

export function ProductCard({ card }: { card: ProductCardData }) {
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(card.productId, card.colorName));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const discountPct = Math.round(
    ((card.basePrice - card.discountedPrice) / card.basePrice) * 100
  );

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/product/${card.productId}?color=${encodeURIComponent(card.colorName)}`}
        className="block rounded-xl2 overflow-hidden bg-white shadow-card hover:shadow-premium transition-shadow"
      >
        <div className="relative aspect-square bg-neutral-100">
          <ProductImage src={card.image} alt={`${card.name} — ${card.colorName}`} />
          {discountPct > 0 && (
            <span className="absolute top-3 left-3 bg-ink text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discountPct}%
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(card.productId, card.colorName);
            }}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center shadow-card hover:scale-110 transition-transform"
          >
            <span className={isWishlisted ? "text-red-500" : "text-neutral-400"}>
              {isWishlisted ? "♥" : "♡"}
            </span>
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-neutral-500 mb-1">{card.colorName}</p>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2">{card.name}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-bold text-ink">{formatNaira(card.discountedPrice)}</span>
            <span className="text-xs text-neutral-400 line-through">
              {formatNaira(card.basePrice)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
