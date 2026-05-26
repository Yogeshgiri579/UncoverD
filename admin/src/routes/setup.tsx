import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Boxes, Lock, Mail, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { createAdminUser } from "@/lib/api";

export const Route = createFileRoute("/setup")({
  component: SetupPage,
});

function SetupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    setupToken: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error("All fields are required");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!formData.setupToken) {
        throw new Error("Setup token is required");
      }

      const result = await createAdminUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        setupToken: formData.setupToken,
      });

      localStorage.setItem("adminToken", result.token);
      setSuccess("Admin account created successfully! Redirecting...");
      setTimeout(() => navigate({ to: "/admin" }), 1500);
    } catch (err: any) {
      setError(err.message || "Setup failed. Please check your details and setup token.");
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
          <h2 className="text-3xl font-semibold leading-tight">Initial Setup</h2>
          <p className="text-primary-foreground/80 max-w-md text-sm">
            Create your first admin account using the setup token provided during deployment.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/60">© 2026 Uncover D</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-none shadow-none lg:border lg:shadow-sm">
          <CardContent className="p-8">
            <h1 className="text-2xl font-semibold tracking-tight">Create Admin Account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Set up your admin credentials to get started.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-9"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-9"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="setupToken">Setup Token</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="setupToken"
                    className="pl-9 font-mono text-xs"
                    value={formData.setupToken}
                    onChange={(e) => setFormData({ ...formData, setupToken: e.target.value })}
                    placeholder="Paste your setup token here"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This token was provided in your deployment instructions or environment variables.
                </p>
              </div>

              {error && <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>}
              {success && (
                <p className="text-sm text-green-600 bg-green-50 rounded-md px-3 py-2">{success}</p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating admin account..." : "Create Admin Account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Once setup is complete, use your admin credentials to sign in.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
