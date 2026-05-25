export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "low" | "out";
  image: string;
  description: string;
  supplier: string;
  updatedAt: string;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "invited" | "disabled";
  lastSignIn: string;
  avatar: string;
};

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?w=200&h=200&fit=crop`;

export const products: Product[] = [
  { id: "p1", sku: "SKU-1001", name: "Wireless Headphones", category: "Audio", price: 129.0, stock: 42, status: "active", image: img("1505740420928-5e560c06d30e"), description: "Over-ear noise cancelling headphones.", supplier: "SoundCo", updatedAt: "2026-05-10" },
  { id: "p2", sku: "SKU-1002", name: "Mechanical Keyboard", category: "Peripherals", price: 89.5, stock: 8, status: "low", image: img("1587829741301-dc798b83add3"), description: "Hot-swappable RGB keyboard.", supplier: "KeyLab", updatedAt: "2026-05-09" },
  { id: "p3", sku: "SKU-1003", name: "USB-C Hub 7-in-1", category: "Accessories", price: 39.99, stock: 0, status: "out", image: img("1625948515291-69613efd103f"), description: "HDMI, SD, USB-A, PD passthrough.", supplier: "PortPro", updatedAt: "2026-05-08" },
  { id: "p4", sku: "SKU-1004", name: "4K Webcam", category: "Video", price: 159.0, stock: 23, status: "active", image: img("1587826080692-f439cd0b70da"), description: "Auto-focus 4K streaming webcam.", supplier: "VisionLab", updatedAt: "2026-05-07" },
  { id: "p5", sku: "SKU-1005", name: "Ergonomic Mouse", category: "Peripherals", price: 49.0, stock: 67, status: "active", image: img("1527864550417-7fd91fc51a46"), description: "Vertical wireless mouse.", supplier: "KeyLab", updatedAt: "2026-05-06" },
  { id: "p6", sku: "SKU-1006", name: "Studio Microphone", category: "Audio", price: 199.0, stock: 5, status: "low", image: img("1590602847861-f357a9332bbc"), description: "Condenser USB studio mic.", supplier: "SoundCo", updatedAt: "2026-05-05" },
  { id: "p7", sku: "SKU-1007", name: "Laptop Stand", category: "Accessories", price: 34.0, stock: 120, status: "active", image: img("1593642632559-0c6d3fc62b89"), description: "Adjustable aluminum stand.", supplier: "DeskWorks", updatedAt: "2026-05-04" },
  { id: "p8", sku: "SKU-1008", name: "27\" Monitor", category: "Displays", price: 329.0, stock: 14, status: "active", image: img("1527443224154-c4a3942d3acf"), description: "QHD IPS 165Hz monitor.", supplier: "VisionLab", updatedAt: "2026-05-03" },
];

export const users: AppUser[] = [
  { id: "u1", name: "Aarav Sharma", email: "aarav@admin.io", role: "admin", status: "active", lastSignIn: "2026-05-13 09:12", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "u2", name: "Priya Patel", email: "priya@admin.io", role: "manager", status: "active", lastSignIn: "2026-05-13 08:40", avatar: "https://i.pravatar.cc/80?img=47" },
  { id: "u3", name: "Rohan Mehta", email: "rohan@admin.io", role: "staff", status: "active", lastSignIn: "2026-05-12 18:22", avatar: "https://i.pravatar.cc/80?img=15" },
  { id: "u4", name: "Ananya Iyer", email: "ananya@admin.io", role: "staff", status: "invited", lastSignIn: "—", avatar: "https://i.pravatar.cc/80?img=32" },
  { id: "u5", name: "Vikram Rao", email: "vikram@admin.io", role: "manager", status: "disabled", lastSignIn: "2026-04-29 11:02", avatar: "https://i.pravatar.cc/80?img=68" },
];

export const stats = {
  totalProducts: products.length,
  inventoryValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  lowStock: products.filter((p) => p.status === "low").length,
  outOfStock: products.filter((p) => p.status === "out").length,
  activeUsers: users.filter((u) => u.status === "active").length,
};
