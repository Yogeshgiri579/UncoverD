import axios from "axios";
import { IOrder } from "../models/Order";

const BASE_URL = "https://apiv2.shiprocket.in/v1/external";

const getAuthToken = async () => {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    throw new Error("Shiprocket credentials are not configured");
  }

  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data.token;
};

export const createShiprocketOrder = async (order: IOrder) => {
  const token = await getAuthToken();
  const shipmentPayload = {
    order_id: order._id.toString(),
    order_date: new Date(order.createdAt).toISOString().split("T")[0],
    pickup_location: "default",
    channel_id: 10000,
    comment: "Order created from Uncover-D backend",
    billing_customer_name: `${(order as any).user?.firstName || "Customer"}`,
    billing_address: order.shippingAddress.address,
    billing_city: order.shippingAddress.city,
    billing_pincode: order.shippingAddress.postalCode,
    billing_state: order.shippingAddress.state,
    billing_country: order.shippingAddress.country,
    billing_email: (order as any).user?.email || "customer@example.com",
    billing_phone: order.shippingAddress.phone,
    shipping_is_billing: true,
    shipping_customer_name: `${(order as any).user?.firstName || "Customer"}`,
    shipping_address: order.shippingAddress.address,
    shipping_city: order.shippingAddress.city,
    shipping_pincode: order.shippingAddress.postalCode,
    shipping_state: order.shippingAddress.state,
    shipping_country: order.shippingAddress.country,
    shipping_email: (order as any).user?.email || "customer@example.com",
    shipping_phone: order.shippingAddress.phone,
    order_items: order.items.map((item) => ({
      name: item.name,
      sku: item.productId,
      units: item.qty,
      selling_price: item.price,
      discount: 0,
      taxable_value: item.price * item.qty,
      hsn: "0000",
    })),
  };

  const response = await axios.post(`${BASE_URL}/orders/create/adhoc`, shipmentPayload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getShiprocketOrderStatus = async (shiprocketOrderId: string) => {
  const token = await getAuthToken();
  const response = await axios.get(`${BASE_URL}/courier/track/shipment/${shiprocketOrderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
