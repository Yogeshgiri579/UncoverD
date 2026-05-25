import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, DollarSign, AlertTriangle, Users as UsersIcon, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { getProductStats, getAllOrders, getAllUsers } from "@/lib/api";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, ordersData, usersData] = await Promise.all([
          getProductStats(),
          getAllOrders(),
          getAllUsers(),
        ]);
        
        setStats(statsData);
        setOrders(Array.isArray(ordersData) ? ordersData.slice(0, 5) : []);
        setUsers(Array.isArray(usersData) ? usersData.slice(0, 5) : []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      label: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Boxes,
      accent: "text-primary",
    },
    {
      label: "Inventory Value",
      value: fmt(stats?.inventoryValue || 0),
      icon: DollarSign,
      accent: "text-emerald-600",
    },
    {
      label: "Low / Out of Stock",
      value: `${stats?.lowStockProducts || 0} / ${stats?.outOfStockProducts || 0}`,
      icon: AlertTriangle,
      accent: "text-amber-600",
    },
    {
      label: "Active Users",
      value: users.length || 0,
      icon: UsersIcon,
      accent: "text-sky-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your inventory and orders.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {c.label}
                </p>
                <p className="mt-1 text-2xl font-semibold">{c.value}</p>
              </div>
              <div className={`rounded-lg bg-muted p-2.5 ${c.accent}`}>
                <c.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No orders yet
              </div>
            ) : (
              <div className="divide-y">
                {orders.map((o) => (
                  <div key={o._id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">{o.user?.firstName} {o.user?.lastName}</p>
                      <p className="text-xs text-muted-foreground">{o.user?.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{fmt(o.totalPrice)}</p>
                      <p className="text-xs text-muted-foreground">
                        {o.isPaid ? "Paid" : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No users
              </div>
            ) : (
              <div className="divide-y">
                {users.map((u) => (
                  <div key={u._id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">{u.firstName} {u.lastName}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                      {u.role}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
