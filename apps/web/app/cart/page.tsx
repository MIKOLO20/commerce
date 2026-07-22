"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import { formatNaira } from "@/lib/api";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const changeQuantity = useCartStore((s) => s.changeQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const subtotal = useCartStore((s) => s.subtotal());

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  function checkout() {
    setCheckingOut(true);
    setTimeout(() => {
      setOrderTotal(subtotal);
      clear();
      setCheckingOut(false);
    }, 800);
  }

  if (orderTotal !== null) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-neutral-500 mb-1">
          You paid <span className="font-semibold text-ink">{formatNaira(orderTotal)}</span>.
        </p>
        <p className="text-neutral-500 mb-6">
          Payment gateway integration is coming soon — this is a demo confirmation.
        </p>
        <Link href="/" className="font-semibold text-ink underline underline-offset-2">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-neutral-500 mb-4 text-lg">Your cart is empty.</p>
        <Link href="/" className="font-semibold text-ink underline underline-offset-2">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Link href="/" className="text-sm text-neutral-500 hover:text-ink">
          ← Continue shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex gap-4 bg-white rounded-xl2 shadow-card p-4"
            >
              <div className="relative h-28 w-28 shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-neutral-500">
                  {item.color} · Size {item.size}
                </p>
                <p className="font-bold text-ink mt-1">{formatNaira(item.price)}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.productId, item.color, item.size, -1)}
                    className="h-8 w-8 rounded-lg bg-ink text-white font-bold"
                  >
                    −
                  </button>
                  <span className="font-semibold w-6 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.productId, item.color, item.size, 1)}
                    className="h-8 w-8 rounded-lg bg-ink text-white font-bold"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.color, item.size)}
                    className="ml-4 text-sm text-red-600 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="font-bold text-ink whitespace-nowrap">
                {formatNaira(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl2 shadow-card p-6 sticky top-24">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span>Shipping</span>
            <span className="font-semibold text-emerald-600">FREE</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <button
            type="button"
            disabled={checkingOut}
            onClick={checkout}
            className="w-full mt-6 bg-ink text-white font-semibold py-3 rounded-xl hover:bg-inkHover transition-colors disabled:opacity-50"
          >
            {checkingOut ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
