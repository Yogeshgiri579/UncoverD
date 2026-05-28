const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  token: string;
}

interface ApiRequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

// ─── Core request helper ───────────────────────────────────────────────────

export async function apiRequest<T = unknown>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  // If token is explicitly passed (even null), use it. Otherwise read from storage.
  const authToken =
    typeof token !== "undefined" ? token : localStorage.getItem("adminToken");

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = API_BASE_URL.replace(/\/$/, "");
  const url = `${base}${normalizedPath}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      (data as { message?: string }).message || `${res.status} ${res.statusText}`
    );
  }

  return data as T;
}

// ─── Auth API ──────────────────────────────────────────────────────────────

/**
 * Dedicated admin login — hits POST /api/auth/admin/login
 * Only succeeds when the account has role "admin".
 */
export async function adminLogin(
  email: string,
  password: string
): Promise<AdminUser> {
  return apiRequest<AdminUser>("/auth/admin/login", {
    method: "POST",
    body: { email, password },
    token: null, // no token needed for login
  });
}

// ─── Products API ──────────────────────────────────────────────────────────

export async function getProducts(filter?: {
  category?: string;
  status?: string;
}) {
  const params = new URLSearchParams();
  if (filter?.category) params.append("category", filter.category);
  if (filter?.status) params.append("status", filter.status);
  return apiRequest(`/products${params.toString() ? "?" + params : ""}`);
}

export async function getProduct(id: string) {
  return apiRequest(`/products/${id}`);
}

export async function createProduct(data: unknown) {
  return apiRequest("/products", { method: "POST", body: data });
}

export async function updateProduct(id: string, data: unknown) {
  return apiRequest(`/products/${id}`, { method: "PUT", body: data });
}

export async function deleteProduct(id: string) {
  return apiRequest(`/products/${id}`, { method: "DELETE" });
}

export async function getProductStats() {
  return apiRequest("/products/stats");
}

// ─── Orders API ────────────────────────────────────────────────────────────

export async function getAllOrders() {
  return apiRequest("/orders/admin/all");
}

export async function getOrder(id: string) {
  return apiRequest(`/orders/${id}`);
}

// ─── Users API ─────────────────────────────────────────────────────────────

export async function getAllUsers() {
  // Updated to match the new route: /auth/admin/users
  return apiRequest("/auth/admin/users");
}
