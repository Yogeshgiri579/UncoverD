import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Omit<Document, "collection"> {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  collection?: string;
  sku: string;
  stock: number;
  status: "active" | "low" | "out";
  badge?: string;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, default: "" },
    category: { type: String, required: true },
    collection: { type: String },
    sku: { type: String, unique: true },
    stock: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "low", "out"],
      default: "active",
    },
    badge: { type: String },
    specifications: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-update status based on stock
productSchema.pre("save", function (next) {
  if (this.stock === 0) {
    this.status = "out";
    this.inStock = false;
  } else if (this.stock <= 10) {
    this.status = "low";
    this.inStock = true;
  } else {
    this.status = "active";
    this.inStock = true;
  }
  next();
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
