export function Footer() {
  return (
    <footer className="bg-ink text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <h2 className="font-bold text-lg mb-2">Mikolo.Tshirts.ng</h2>
          <p className="text-white/70 text-sm">Powered by excellence and quality</p>
          <p className="text-white/70 text-sm mt-4">Lagos, Nigeria</p>
          <p className="text-white/70 text-sm">Mickymouse@tshirts.ng</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/80">
            Follow Us
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Instagram</li>
            <li>Twitter / X</li>
            <li>WhatsApp</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/80">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Home</li>
            <li>Account</li>
            <li>Shop</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/50 py-5">
        Mikolo.Tshirts.ng © All rights reserved.
      </div>
    </footer>
  );
}
