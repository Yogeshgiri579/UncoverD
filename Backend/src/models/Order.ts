import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
  image?: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentResult?: {
    transactionId?: string;
    status?: string;
    amount?: number;
    updatedAt?: Date;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  shiprocketOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      transactionId: String,
      status: String,
      amount: Number,
      updatedAt: Date,
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: Date,
    shiprocketOrderId: String,
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
