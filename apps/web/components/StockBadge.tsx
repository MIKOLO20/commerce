import { stockStatus } from "@/lib/api";

const toneClasses = {
  out: "bg-red-50 text-red-600",
  low: "bg-amber-50 text-amber-600",
  ok: "bg-emerald-50 text-emerald-600",
};

export function StockBadge({ stock }: { stock: number }) {
  const { label, tone } = stockStatus(stock);
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}
