const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

interface ApiRequestOptions {
  method?: string;
  body?: any;
  token?: string | null;
}

export async function apiRequest(path: string, options: ApiRequestOptions = {}) {
  const { method = "GET", body, token } = options;

  // Prefer explicit token, otherwise fall back to localStorage token
  const authToken = typeof token !== "undefined" ? token : localStorage.getItem("token");

  // Ensure path joins correctly regardless of leading/trailing slashes
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = API_BASE_URL.endsWith("/") ? `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}` : `${API_BASE_URL}${normalizedPath}`;

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
export async function getProducts(filter?: { category?: string; minPrice?: number; maxPrice?: number }) {
  const params = new URLSearchParams();
  if (filter?.category) params.append("category", filter.category);
  if (filter?.minPrice) params.append("minPrice", filter.minPrice.toString());
  if (filter?.maxPrice) params.append("maxPrice", filter.maxPrice.toString());
  return apiRequest(`/products${params.toString() ? "?" + params : ""}`);
}

export async function getProduct(id: string) {
  return apiRequest(`/products/${id}`);
}

// Orders API
export async function createOrder(orderData: any) {
  return apiRequest("/orders", { method: "POST", body: orderData });
}

export async function getMyOrders() {
  return apiRequest("/orders/my");
}

export async function getOrder(id: string) {
  return apiRequest(`/orders/${id}`);
}

export async function updateOrderToPaid(id: string, paymentData: any) {
  return apiRequest(`/orders/${id}/pay`, { method: "PUT", body: paymentData });
}

// Auth API
export async function registerUser(userData: any) {
  return apiRequest("/auth/register", { method: "POST", body: userData });
}

export async function loginUser(email: string, password: string) {
  return apiRequest("/auth/login", { method: "POST", body: { email, password } });
}

export async function getCurrentUser() {
  return apiRequest("/auth/me");
}

export async function getUserProfile() {
  return apiRequest("/auth/profile");
}
