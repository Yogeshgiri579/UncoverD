import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/lib/api";
import { useCart } from "@/lib/store";
import { toast } from "@/components/ui/sonner";
import { ChevronLeft, ShoppingBag, User, ClipboardList } from "lucide-react";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
}

interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
  image?: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
}

interface ProfileProps {
  onLogout?: () => void;
}

const Profile = ({ onLogout }: ProfileProps) => {
  const navigate = useNavigate();
  const { items: cartItems } = useCart();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<"details" | "cart" | "orders">("details");
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiRequest("/auth/profile");

        if (!data?.user) {
          throw new Error("Unable to load profile data.");
        }

        setProfile(data.user);
        setOrders(data.orders || []);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Please sign in to view your profile.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const sectionClass = "rounded-3xl border border-border bg-secondary/80 p-6 shadow-sm";
  const labelClass = "text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground";

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto max-w-5xl">
          <div className="glass-card rounded-3xl border border-border bg-secondary/80 p-10 text-center text-lg font-semibold">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-2 text-sm text-foreground transition hover:bg-secondary"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <section className={sectionClass}>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <User className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm uppercase text-muted-foreground">Welcome back</p>
                <h1 className="text-2xl font-semibold text-foreground">{profile.firstName} {profile.lastName}</h1>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-border bg-background p-5">
                <p className={labelClass}>Email</p>
                <p className="mt-2 text-base font-medium text-foreground">{profile.email}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5">
                <p className={labelClass}>Phone</p>
                <p className="mt-2 text-base font-medium text-foreground">{profile.phone || "Not provided"}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5">
                <p className={labelClass}>Role</p>
                <p className="mt-2 text-base font-medium text-foreground">{profile.role}</p>
              </div>
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Profile</p>
                <h2 className="text-3xl font-semibold text-foreground">Account overview</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === "details" ? "bg-primary text-primary-foreground" : "bg-background text-foreground/80 hover:bg-secondary"}`}
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("cart")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === "cart" ? "bg-primary text-primary-foreground" : "bg-background text-foreground/80 hover:bg-secondary"}`}
                >
                  Cart
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === "orders" ? "bg-primary text-primary-foreground" : "bg-background text-foreground/80 hover:bg-secondary"}`}
                >
                  Orders
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full px-4 py-2 text-sm font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-background p-6">
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-border bg-secondary/90 p-5">
                      <p className={labelClass}>Email address</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">{profile.email}</p>
                    </div>
                    <div className="rounded-3xl border border-border bg-secondary/90 p-5">
                      <p className={labelClass}>Phone number</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">{profile.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-border bg-secondary/90 p-5">
                      <p className={labelClass}>Account role</p>
                      <p className="mt-2 text-lg font-semibold text-foreground">{profile.role}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "cart" && (
                <div className="space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="rounded-3xl border border-border bg-secondary/90 p-8 text-center text-foreground/80">
                      <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-primary" />
                      <p className="text-sm">Your cart is empty. Add items from the shop to see them here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="grid gap-4 rounded-3xl border border-border bg-secondary/90 p-4 sm:grid-cols-[80px_1fr_auto]">
                          <img src={item.image} alt={item.name} className="h-20 w-20 rounded-3xl object-cover" />
                          <div>
                            <p className="font-semibold text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-right text-lg font-semibold text-foreground">₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                      <div className="rounded-3xl border border-border bg-background p-5 text-right text-sm text-muted-foreground">
                        Total items: <span className="font-semibold text-foreground">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "orders" && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="rounded-3xl border border-border bg-secondary/90 p-8 text-center text-foreground/80">
                      <ClipboardList className="mx-auto mb-4 h-8 w-8 text-primary" />
                      <p className="text-sm">No past orders found. Your completed purchases will appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="rounded-3xl border border-border bg-secondary/90 p-5">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm uppercase text-muted-foreground">Order ID</p>
                              <p className="mt-1 font-medium text-foreground">{order._id}</p>
                            </div>
                            <div className="rounded-full bg-background px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                              {order.isPaid ? "Paid" : "Pending"}
                            </div>
                          </div>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className={labelClass}>Placed on</p>
                              <p className="mt-1 text-sm text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className={labelClass}>Total</p>
                              <p className="mt-1 text-sm text-foreground">₹{order.totalPrice.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="mt-4 rounded-3xl border border-border bg-background p-4">
                            <p className="text-sm font-medium text-foreground">Items</p>
                            <div className="mt-3 space-y-3">
                              {order.items.map((item) => (
                                <div key={item.productId} className="flex items-center gap-3">
                                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">{item.qty}</span>
                                  <div>
                                    <p className="font-medium text-foreground">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)} each</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
