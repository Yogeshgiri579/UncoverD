import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Boxes, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
        token: null, // no token needed for login
      });

      if (data.role !== "admin") {
        setError("Access denied. Admin accounts only.");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary to-primary/70 p-10 text-primary-foreground">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-9 w-9 rounded-md bg-white/15 flex items-center justify-center">
            <Boxes className="h-5 w-5" />
          </div>
          Uncover D Admin
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold leading-tight">
            Manage your inventory,<br />team and operations.
          </h2>
          <p className="text-primary-foreground/80 max-w-md text-sm">
            A clean control panel inspired by InvenTree — products, prices, stock and user access in one place.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/60">© 2026 Uncover D</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-none shadow-none lg:border lg:shadow-sm">
          <CardContent className="p-8">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-1 text-sm text-muted-foreground">Welcome back, please enter your details.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" defaultChecked className="rounded border-input" />
                  Remember me
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Use your admin account credentials to sign in.
            </p>
            <p className="mt-3 text-center text-xs">
              First time setting up?{" "}
              <Link to="/setup" className="text-primary hover:underline font-medium">
                Create admin account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
