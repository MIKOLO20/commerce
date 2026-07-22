"use client";

import type { Size } from "@/lib/api";
import { stockStatus } from "@/lib/api";

export function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: Size[];
  selected: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const { tone } = stockStatus(size.stock);
          const isOut = tone === "out";
          const isSelected = size.label === selected;

          return (
            <button
              key={size.label}
              type="button"
              disabled={isOut}
              onClick={() => onSelect(size.label)}
              className={`relative h-12 w-14 rounded-lg border-2 font-semibold text-sm transition-all
                ${isOut ? "opacity-40 cursor-not-allowed border-neutral-200 line-through" : "border-neutral-300 hover:border-ink"}
                ${isSelected && !isOut ? "border-ink bg-ink text-white scale-105 shadow-premium" : "bg-white text-neutral-800"}
              `}
            >
              {size.label}
              {tone === "low" && !isOut && (
                <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 border border-white" />
              )}
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="mt-2 text-xs text-neutral-500">
          {stockStatus(sizes.find((s) => s.label === selected)?.stock ?? 0).label} for size{" "}
          {selected}
        </p>
      )}
    </div>
  );
}
