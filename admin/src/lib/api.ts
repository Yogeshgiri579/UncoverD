const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

interface ApiRequestOptions {
  method?: string;
  body?: any;
  token?: string | null;
}

export async function apiRequest(path: string, options: ApiRequestOptions = {}) {
  const { method = "GET", body, token } = options;

  const authToken = typeof token !== "undefined" ? token : localStorage.getItem("adminToken");

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = API_BASE_URL.endsWith("/")
    ? `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`
    : `${API_BASE_URL}${normalizedPath}`;

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
    throw new Error(data.message || `${res.status} ${res.statusText}`);
  }

  return data;
}

// Products API
export async function getProducts(filter?: { category?: string; status?: string }) {
  const params = new URLSearchParams();
  if (filter?.category) params.append("category", filter.category);
  if (filter?.status) params.append("status", filter.status);
  return apiRequest(`/products${params.toString() ? "?" + params : ""}`);
}

export async function getProduct(id: string) {
  return apiRequest(`/products/${id}`);
}

export async function createProduct(data: any) {
  return apiRequest("/products", { method: "POST", body: data });
}

export async function updateProduct(id: string, data: any) {
  return apiRequest(`/products/${id}`, { method: "PUT", body: data });
}

export async function deleteProduct(id: string) {
  return apiRequest(`/products/${id}`, { method: "DELETE" });
}

export async function getProductStats() {
  return apiRequest("/products/stats");
}

// Orders API
export async function getAllOrders() {
  return apiRequest("/orders/admin/all");
}

export async function getOrder(id: string) {
  return apiRequest(`/orders/${id}`);
}

// Users API
export async function getAllUsers() {
  return apiRequest("/auth/admin/all-users");
}

// Admin creation with setup token
export async function createAdminUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  setupToken: string;
}) {
  return apiRequest("/auth/admin/create", {
    method: "POST",
    body: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    },
    token: data.setupToken, // Pass setup token as Bearer token
  });
}
