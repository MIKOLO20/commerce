"use client";

import type { Color } from "@/lib/api";
import { ProductImage } from "./ProductImage";

export function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: Color[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-500 mb-2">
        Color: <span className="font-medium text-neutral-900">{selected}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelect(color.name)}
            title={color.name}
            className={`relative h-14 w-14 rounded-lg overflow-hidden border-2 transition-all ${
              color.name === selected
                ? "border-ink scale-105 shadow-premium"
                : "border-neutral-200 hover:border-neutral-400"
            }`}
          >
            <ProductImage src={color.image} alt={color.name} sizes="56px" />
          </button>
        ))}
      </div>
    </div>
  );
}
