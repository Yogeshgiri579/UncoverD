import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { Bell, Search, LogOut } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login", { replace: true });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          {/* ── Top navigation bar ──────────────────────────────────────── */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />

            {/* Search bar */}
            <div className="relative hidden flex-1 max-w-md md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products, orders, users…"
                className="pl-9 h-9"
              />
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" title="Notifications">
                <Bell className="h-4 w-4" />
              </Button>

              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* ── Page content ────────────────────────────────────────────── */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
