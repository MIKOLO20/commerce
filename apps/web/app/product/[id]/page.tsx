"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, formatNaira, type Product } from "@/lib/api";
import { useCartStore } from "@/lib/store/cartStore";
import { useRecentlyViewedStore } from "@/lib/store/recentlyViewedStore";
import { ProductGallery } from "@/components/ProductGallery";
import { ColorSelector } from "@/components/ColorSelector";
import { SizeSelector } from "@/components/SizeSelector";
import { SizeRecommender } from "@/components/SizeRecommender";
import { StockBadge } from "@/components/StockBadge";
import { CompleteTheLook } from "@/components/CompleteTheLook";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { Toast, useToast } from "@/components/Toast";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [adding, setAdding] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const recordViewed = useRecentlyViewedStore((s) => s.record);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (!productId) return;
    api
      .getProduct(productId)
      .then((p) => {
        setProduct(p);
        recordViewed(p._id);

        const params = new URLSearchParams(window.location.search);
        const wantedColor = params.get("color");
        const initialColor =
          p.colors.find((c) => c.name === wantedColor)?.name || p.colors[0].name;
        setSelectedColor(initialColor);

        const firstInStock = p.sizes.find((s) => s.stock > 0);
        setSelectedSize(firstInStock?.label || p.sizes[0].label);
      })
      .catch((e) => setError(e.message));
  }, [productId, recordViewed]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center text-red-600">
        Couldn&apos;t load this product: {error}
      </div>
    );
  }

  if (!product || !selectedColor) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 animate-pulse">
        <div className="aspect-square rounded-xl2 bg-neutral-200" />
        <div className="space-y-4">
          <div className="h-8 bg-neutral-200 rounded w-3/4" />
          <div className="h-6 bg-neutral-200 rounded w-1/3" />
        </div>
      </div>
    );
  }

  const currentColor = product.colors.find((c) => c.name === selectedColor)!;
  const currentSize = product.sizes.find((s) => s.label === selectedSize);
  const outOfStock = !currentSize || currentSize.stock <= 0;

  async function handleAddToCart() {
    if (!product || outOfStock) return;
    setAdding(true);
    try {
      const updated = await api.updateStock(product._id, selectedSize, -1);
      setProduct(updated);
      addItem({
        productId: product._id,
        name: product.name,
        image: currentColor.image,
        color: selectedColor,
        size: selectedSize,
        price: product.discountedPrice,
      });
      showToast("Added to cart!");
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Couldn't add to cart", "error");
    } finally {
      setAdding(false);
    }
  }

  const discountPct = Math.round(
    ((product.basePrice - product.discountedPrice) / product.basePrice) * 100
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/" className="text-sm text-neutral-500 hover:text-ink">
        ← Back to shop
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-12">
        <ProductGallery
          image={currentColor.image}
          alt={`${product.name} — ${selectedColor}`}
          thumbnails={product.colors.map((c) => ({ image: c.image, label: c.name }))}
        />

        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-ink">
              {formatNaira(product.discountedPrice)}
            </span>
            <span className="text-neutral-400 line-through">
              {formatNaira(product.basePrice)}
            </span>
            {discountPct > 0 && (
              <span className="text-sm font-semibold text-emerald-600">
                Save {discountPct}%
              </span>
            )}
          </div>

          <p className="mt-4 text-neutral-600 leading-relaxed">{product.description}</p>

          <div className="mt-8">
            <ColorSelector
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-neutral-500">
                Size: <span className="font-medium text-neutral-900">{selectedSize}</span>
              </p>
              {currentSize && <StockBadge stock={currentSize.stock} />}
            </div>
            <SizeSelector
              sizes={product.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          <div className="mt-6">
            <SizeRecommender onApply={setSelectedSize} />
          </div>

          <button
            type="button"
            disabled={outOfStock || adding}
            onClick={handleAddToCart}
            className="mt-8 w-full bg-ink text-white font-semibold py-3.5 rounded-xl hover:bg-inkHover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {outOfStock ? "Out of stock" : adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>

      <CompleteTheLook excludeProductId={product._id} />
      <RecentlyViewed excludeProductId={product._id} />

      <Toast toast={toast} />
    </div>
  );
}
