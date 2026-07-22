"use client";

import { useState } from "react";

type FitPreference = "snug" | "regular" | "relaxed";

function recommendSize(heightCm: number, fit: FitPreference): string {
  let base: string;
  if (heightCm < 165) base = "S";
  else if (heightCm < 175) base = "M";
  else if (heightCm < 185) base = "L";
  else base = "XL";

  const order = ["S", "M", "L", "XL"];
  const index = order.indexOf(base);

  if (fit === "relaxed") return order[Math.min(index + 1, order.length - 1)];
  if (fit === "snug") return order[Math.max(index - 1, 0)];
  return base;
}

export function SizeRecommender({ onApply }: { onApply: (size: string) => void }) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(175);
  const [fit, setFit] = useState<FitPreference>("regular");
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="border border-neutral-200 rounded-xl p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-semibold text-ink underline underline-offset-2"
      >
        {open ? "Hide" : "Not sure about your size? Find out"}
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">
              Height: {height}cm
            </label>
            <input
              type="range"
              min={150}
              max={200}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-ink"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Fit preference</label>
            <div className="flex gap-2">
              {(["snug", "regular", "relaxed"] as FitPreference[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFit(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border capitalize ${
                    fit === f
                      ? "border-ink bg-ink text-white"
                      : "border-neutral-300 text-neutral-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setResult(recommendSize(height, fit))}
            className="text-sm font-semibold bg-ink text-white px-4 py-2 rounded-lg hover:bg-inkHover"
          >
            Get my size
          </button>

          {result && (
            <div className="flex items-center gap-3 text-sm">
              <span>
                We recommend size <strong>{result}</strong>
              </span>
              <button
                type="button"
                onClick={() => onApply(result)}
                className="underline underline-offset-2 text-ink font-semibold"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
