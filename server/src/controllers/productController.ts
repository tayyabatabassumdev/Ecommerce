import { Request, Response } from "express";
import { Product } from "../models/Product";
import { asyncHandler } from "../middleware/asyncHandler";

export const getAllProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: products });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }
  res.json({ success: true, data: product });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, basePrice, category } = req.body;
  if (!name || basePrice == null || !category) {
    res.status(400).json({ success: false, message: "Missing required fields: name, price, category" });
    return;
  }

  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }
  res.json({ success: true, data: updated });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }
  res.json({ success: true, message: "Product deleted" });
});
export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const filter: any = {};

  if (name) {
    filter.name = { $regex: name as string, $options: "i" }; // case-insensitive match
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.basePrice = {};
    if (minPrice) filter.basePrice.$gte = Number(minPrice);
    if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
  }

  const products = await Product.find(filter).select("-__v").sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: products.length, data: products });
});
export const updateStock = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { variantId, stock } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  if (variantId) {
    const variant = product.variants.find((v: any) => v._id.toString() === variantId);
    if (!variant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }
    variant.stock = stock;
  } else {
    if (product.variants.length > 0) {
      product.variants.forEach((v) => (v.stock = stock));
    } else {
      return res.status(400).json({ success: false, message: "Product has no variants" });
    }
  }

  await product.save();
  res.status(200).json({ success: true, message: "Stock updated", data: product });
});

