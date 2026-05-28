import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Pages
import Login from "./pages/Login";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Spreadsheet from "./pages/Spreadsheet";

const queryClient = new QueryClient();

// ─── Protected Route Wrapper ───────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* The index route ("") renders when the URL is exactly /admin */}
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="spreadsheet" element={<Spreadsheet />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="*" element={
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
              <div className="max-w-md text-center">
                <h1 className="text-7xl font-bold text-foreground">404</h1>
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  Page not found
                </h2>
                <div className="mt-6">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Go home
                  </a>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
