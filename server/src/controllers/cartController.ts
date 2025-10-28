import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import mongoose from "mongoose";
export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, variantId, quantity, price } = req.body;
  const userId = (req as any).user?._id || null;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }
  const existingItem = cart.items.find(
    (i: any) =>
      i.productId.toString() === productId &&
      (!variantId || i.variantId?.toString() === variantId)
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({productId, variantId, quantity, priceAtAdd:price });
  }

  await cart.save();
  res.status(200).json({ success: true, message: "Cart updated", data: cart });
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id || null;

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name basePrice category",
  });

  if (!cart) {
    return res.status(200).json({ success: true, data: { items: [] } });
  }

  res.status(200).json({ success: true, data: cart });
});

export const updateQuantity = asyncHandler(async (req: Request, res: Response) => {
  const { productId, variantId, quantity } = req.body;
  const userId = (req as any).user?._id || null;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const item = cart.items.find(
    (i: any) =>
      i.product.toString() === productId &&
      (!variantId || i.variantId?.toString() === variantId)
  );
  if (!item) {
    return res.status(404).json({ success: false, message: "Item not found in cart" });
  }

  if (quantity < 1) {
    cart.items = cart.items.filter(
      (i: any) =>
        !(
          i.product.toString() === productId &&
          (!variantId || i.variantId?.toString() === variantId)
        )
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  res.status(200).json({ success: true, data: cart });
});
export const removeItem = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { variantId } = req.query; 
  const userId = (req as any).user?._id || null;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const originalLength = cart.items.length;

  cart.items = cart.items.filter(
    (i: any) =>
      !(
        i.product.toString() === productId &&
        (!variantId || i.variantId?.toString() === variantId)
      )
  );

  if (cart.items.length === originalLength) {
    return res.status(404).json({ success: false, message: "Item not found in cart" });
  }

  await cart.save();
  res.status(200).json({ success: true, message: "Item removed", data: cart });
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id || null;
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  cart.items = [];
  await cart.save();

  res.status(200).json({ success: true, message: "Cart cleared successfully" });
});

export const syncCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { guestCart } = req.body;

  if (!guestCart || !Array.isArray(guestCart)) {
    return res.status(400).json({ success: false, message: "Invalid guest cart" });
  }

  let userCart = await Cart.findOne({ user: userId });
  if (!userCart) {
    userCart = new Cart({ user: userId, items: [] });
  }

  for (const item of guestCart) {
    const existing = userCart.items.find(
      (i: any) =>
        i.product.toString() === item.product &&
        (!item.variantId || i.variantId?.toString() === item.variantId)
    );

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      userCart.items.push(item);
    }
  }

  await userCart.save();
  res.status(200).json({ success: true, message: "Cart synced", data: userCart });
});
