"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductImage } from "./ProductImage";

export function ProductGallery({
  image,
  alt,
  thumbnails,
}: {
  image: string;
  alt: string;
  thumbnails: { image: string; label: string }[];
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      <div
        className="relative aspect-square rounded-xl2 overflow-hidden bg-neutral-100 cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <AnimatePresence>
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoomed ? 1.08 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ProductImage src={image} alt={alt} priority sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
        </AnimatePresence>
      </div>

      {thumbnails.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {thumbnails.map((t) => (
            <div
              key={t.label}
              className={`relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 ${
                t.image === image ? "border-ink" : "border-transparent"
              }`}
            >
              <ProductImage src={t.image} alt={t.label} sizes="64px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
