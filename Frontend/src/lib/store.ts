import { useEffect, useState, useCallback } from "react";

const CART_STORAGE_KEY = "uncoverd_cart";

const getStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export interface Product {
  _id?: string;
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  collection?: string;
  badge?: string;
  description?: string;
  details?: string;
  specifications?: { label: string; value: string }[];
  inStock?: boolean;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => getStoredCart());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, variant?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.variant === variant);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.variant === variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image, variant }];
    });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return { items, addItem, updateQty, removeItem, count: items.reduce((s, i) => s + i.quantity, 0) };
}
