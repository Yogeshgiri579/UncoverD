import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/Product";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, originalPrice, image, category, collection, sku, stock, specifications, badge } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error("Please provide all required fields: name, description, price, category");
  }

  const generatedSku = sku || `SKU-${Date.now()}`;

  const productExists = await Product.findOne({ sku: generatedSku });
  if (productExists) {
    res.status(400);
    throw new Error("Product with this SKU already exists");
  }

  const product = await Product.create({
    name,
    description,
    price,
    originalPrice,
    image: image || "",
    category,
    collection,
    sku: generatedSku,
    stock: stock || 0,
    specifications,
    badge,
  });

  res.status(201).json(product);
});

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category, minPrice, maxPrice, search, status } = req.query;

  let filter: any = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (status) {
    filter.status = status;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });

  res.json(products);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, description, price, originalPrice, image, category, collection, sku, stock, specifications, badge } = req.body;

  if (sku && sku !== product.sku) {
    const skuExists = await Product.findOne({ sku });
    if (skuExists) {
      res.status(400);
      throw new Error("Product with this SKU already exists");
    }
    product.sku = sku;
  }

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (originalPrice !== undefined) product.originalPrice = originalPrice;
  if (image) product.image = image;
  if (category) product.category = category;
  if (collection) product.collection = collection;
  if (stock !== undefined) product.stock = stock;
  if (specifications) product.specifications = specifications;
  if (badge) product.badge = badge;

  await product.save();

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Product deleted successfully" });
});

export const getProductStats = asyncHandler(async (req: Request, res: Response) => {
  const totalProducts = await Product.countDocuments();
  const activeProducts = await Product.countDocuments({ status: "active" });
  const lowStockProducts = await Product.countDocuments({ status: "low" });
  const outOfStockProducts = await Product.countDocuments({ status: "out" });

  const inventoryValue = await Product.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$price", "$stock"] } },
      },
    },
  ]);

  res.json({
    totalProducts,
    activeProducts,
    lowStockProducts,
    outOfStockProducts,
    inventoryValue: inventoryValue[0]?.total || 0,
  });
});
