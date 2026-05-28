import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { adminLogin } from "@/lib/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const validate = (): string | null => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 4) return "Password must be at least 4 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = await adminLogin(email.trim(), password);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin", { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* ── Left decorative panel ─────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary to-primary/70 p-10 text-primary-foreground">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center">
            <Boxes className="h-5 w-5" />
          </div>
          Uncover D Admin
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold leading-tight">
            Manage your inventory,
            <br />
            orders and customers.
          </h2>
          <p className="text-primary-foreground/80 max-w-md text-sm leading-relaxed">
            A clean control panel for products, prices, stock levels, orders and
            user access — all in one place.
          </p>
        </div>

        <p className="text-xs text-primary-foreground/60">© 2026 Uncover D</p>
      </div>

      {/* ── Right login form ──────────────────────────────────────────── */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-none shadow-none lg:border lg:shadow-sm">
          <CardContent className="p-8">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 font-semibold mb-6 lg:hidden">
              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                <Boxes className="h-4 w-4 text-primary" />
              </div>
              Uncover D Admin
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Admin Sign In
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your admin credentials to access the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    autoComplete="username"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-9"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              This panel is restricted to admin accounts only.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
