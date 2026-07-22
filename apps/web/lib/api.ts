export type Color = { name: string; image: string };
export type Size = { label: string; stock: number };
export type Product = {
  _id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  discountedPrice: number;
  colors: Color[];
  sizes: Size[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getProducts: () => request<Product[]>("/api/products"),
  getProduct: (id: string) => request<Product>(`/api/products/${id}`),
  updateStock: (id: string, size: string, delta: number) =>
    request<Product>(`/api/products/${id}/stock`, {
      method: "PATCH",
      body: JSON.stringify({ size, delta }),
    }),
};

export function stockStatus(stock: number): {
  label: string;
  tone: "out" | "low" | "ok";
} {
  if (stock <= 0) return { label: "Out of stock", tone: "out" };
  if (stock <= 3) return { label: "Low stock", tone: "low" };
  return { label: "In stock", tone: "ok" };
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString()}`;
}

export type ProductCardData = {
  productId: string;
  name: string;
  category: string;
  image: string;
  colorName: string;
  basePrice: number;
  discountedPrice: number;
};

export function flattenToCards(products: Product[]): ProductCardData[] {
  return products.flatMap((product) =>
    product.colors.map((color) => ({
      productId: product._id,
      name: product.name,
      category: product.category,
      image: color.image,
      colorName: color.name,
      basePrice: product.basePrice,
      discountedPrice: product.discountedPrice,
    }))
  );
}
