import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "low" | "out";
  image: string;
  description: string;
}

function StatusBadge({ s }: { s: string }) {
  if (s === "out") return <Badge variant="outline" className="border-destructive/40 text-destructive">Out of stock</Badge>;
  if (s === "low") return <Badge variant="outline" className="border-amber-500/40 text-amber-600">Low</Badge>;
  return <Badge variant="secondary">Active</Badge>;
}

function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.sku.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase()),
  );

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  const handleSaveProduct = async (product: Omit<Product, "_id">) => {
    try {
      if (editingId) {
        const updated = await updateProduct(editingId, product);
        setItems((prev) =>
          prev.map((p) => (p._id === editingId ? updated : p))
        );
        setEditingId(null);
      } else {
        const created = await createProduct(product);
        setItems((prev) => [created, ...prev]);
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Manage inventory items, prices and stock levels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" /> Import
          </Button>
          <Dialog open={open} onOpenChange={(open) => {
            setOpen(open);
            if (!open) setEditingId(null);
          }}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" /> New product
              </Button>
            </DialogTrigger>
            <ProductDialog
              onSave={handleSaveProduct}
              editingProduct={items.find((p) => p._id === editingId)}
            />
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, SKU, category"
              className="pl-9 h-9"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                      Loading products...
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-sm text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="h-10 w-10 rounded-md object-cover" />
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{p.sku}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell className="text-right tabular-nums">{fmt(p.price)}</TableCell>
                      <TableCell className="text-right tabular-nums">{p.stock}</TableCell>
                      <TableCell><StatusBadge s={p.status} /></TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setEditingId(p._id);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteProduct(p._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductDialog({ onSave, editingProduct }: { onSave: (p: Omit<Product, "_id">) => void; editingProduct?: Product }) {
  const [form, setForm] = useState({
    name: editingProduct?.name || "",
    category: editingProduct?.category || "covers",
    collection: editingProduct?.collection || "plastic-covers",
    price: editingProduct?.price?.toString() || "",
    originalPrice: editingProduct?.originalPrice?.toString() || "",
    badge: editingProduct?.badge || "",
    description: editingProduct?.description || "",
    image: editingProduct?.image || "",
  });

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = () => {
    if (!form.name || !form.category || !form.price) {
      alert("Please fill in Name, Category, and Price");
      return;
    }
    
    const product: Omit<Product, "_id"> = {
      name: form.name,
      sku: "", // sku is auto generated by backend
      category: form.category,
      collection: form.collection,
      price: Number(form.price) || 0,
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      badge: form.badge,
      stock: 0, // removed stock tracking
      description: form.description,
      image: form.image,
      status: "active",
    };
    onSave(product);
  };

  return (
    <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{editingProduct ? "Edit Product" : "New Product"}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="col-span-2 space-y-2">
          <Label>Image (Optional)</Label>
          <div className="flex items-center gap-4">
            {form.image && (
              <img src={form.image} alt="Preview" className="w-16 h-16 rounded-md object-cover border" />
            )}
            <Input type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Name *</Label>
          <Input value={form.name} onChange={handle("name")} placeholder="Product name" />
        </div>
        <div className="space-y-2">
          <Label>Category *</Label>
          <select 
            value={form.category} 
            onChange={handle("category")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="covers">Covers</option>
            <option value="skin">Skin</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Collection</Label>
          <select 
            value={form.collection} 
            onChange={handle("collection")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="plastic-covers">Plastic Covers</option>
            <option value="leather-covers">Leather Covers</option>
            <option value="silicone-covers">Silicone Covers</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Price (USD) *</Label>
          <Input type="number" value={form.price} onChange={handle("price")} placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <Label>Original Price</Label>
          <Input type="number" value={form.originalPrice} onChange={handle("originalPrice")} placeholder="Optional" />
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Badge</Label>
          <Input value={form.badge} onChange={handle("badge")} placeholder="e.g. Hot, New" />
        </div>
        <div className="col-span-2 space-y-2">
          <Label>Description</Label>
          <Textarea rows={3} value={form.description} onChange={handle("description")} placeholder="Product description" />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={submit}>Save product</Button>
      </DialogFooter>
    </DialogContent>
  );
}
