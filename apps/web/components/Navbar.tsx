"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";

export function Navbar() {
  const { user, logout } = useAuth();
  const totalCount = useCartStore((s) => s.totalCount());
  const wishlistCount = useWishlistStore((s) => s.keys.length);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-ink text-white text-center text-sm font-semibold py-2 px-4">
        FREE SHIPPING ON ORDERS ABOVE ₦100,000
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="font-bold tracking-wide text-lg">
            MIKOLO<span className="text-ink">.TSHIRTS.NG</span>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/wishlist"
              className="relative text-xl hover:text-ink transition-colors"
              aria-label="Wishlist"
            >
              ♡
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ink text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative text-xl hover:text-ink transition-colors"
              aria-label="Cart"
            >
              🛍
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ink text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {totalCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="text-xl hover:text-ink transition-colors"
                aria-label="Account"
              >
                👤
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-premium border border-black/5 py-2 text-sm">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-neutral-500 truncate">{user.email}</div>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-neutral-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-neutral-50"
                    >
                      Login / Sign up
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
