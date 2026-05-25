import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { getAllOrders } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersPage,
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

function PaymentBadge({ isPaid }: { isPaid: boolean }) {
  return isPaid ? (
    <Badge className="bg-green-500/10 text-green-700">Paid</Badge>
  ) : (
    <Badge variant="outline" className="border-amber-500/40 text-amber-600">
      Pending
    </Badge>
  );
}

function DeliveryBadge({ isDelivered }: { isDelivered: boolean }) {
  return isDelivered ? (
    <Badge className="bg-blue-500/10 text-blue-700">Delivered</Badge>
  ) : (
    <Badge variant="outline" className="border-gray-500/40 text-gray-600">
      Processing
    </Badge>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter(
    (o) =>
      o._id?.toLowerCase().includes(q.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(q.toLowerCase()) ||
      o.user?.firstName?.toLowerCase().includes(q.toLowerCase()),
  );

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all customer orders.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Order ID, Email or Customer name..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="border-0 bg-transparent"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading orders...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No orders found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Order ID</TableHead>
                    <TableHead className="w-32">Customer</TableHead>
                    <TableHead className="w-24">Email</TableHead>
                    <TableHead className="w-20">Total</TableHead>
                    <TableHead className="w-24">Payment</TableHead>
                    <TableHead className="w-24">Delivery</TableHead>
                    <TableHead className="w-32">Date</TableHead>
                    <TableHead className="w-16 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="truncate font-mono text-xs">
                        {order._id?.slice(-8) || "N/A"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.user?.firstName} {order.user?.lastName}
                      </TableCell>
                      <TableCell className="text-sm">
                        {order.user?.email}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {fmt(order.totalPrice)}
                      </TableCell>
                      <TableCell>
                        <PaymentBadge isPaid={order.isPaid} />
                      </TableCell>
                      <TableCell>
                        <DeliveryBadge isDelivered={order.isDelivered} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Order ID
                  </p>
                  <p className="mt-1 font-mono text-sm">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Order Date
                  </p>
                  <p className="mt-1 text-sm">
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">Customer Info</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {selectedOrder.user?.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    {selectedOrder.shippingAddress?.phone}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.qty}
                      </span>
                      <span className="font-semibold">
                        {fmt(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{fmt(selectedOrder.itemsPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax:</span>
                  <span>{fmt(selectedOrder.taxPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>{fmt(selectedOrder.shippingPrice)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{fmt(selectedOrder.totalPrice)}</span>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-sm">Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Payment
                    </p>
                    <PaymentBadge isPaid={selectedOrder.isPaid} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Delivery
                    </p>
                    <DeliveryBadge isDelivered={selectedOrder.isDelivered} />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-3">Shipping Address</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{selectedOrder.shippingAddress?.address}</p>
                  <p>
                    {selectedOrder.shippingAddress?.city},{" "}
                    {selectedOrder.shippingAddress?.state}{" "}
                    {selectedOrder.shippingAddress?.postalCode}
                  </p>
                  <p>{selectedOrder.shippingAddress?.country}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
