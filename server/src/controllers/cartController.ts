import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import mongoose from "mongoose";

/**
 * @desc Add item to cart (guest or user)
 * @route POST /api/cart
 * @access Public
 */
export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, variantId, quantity, price } = req.body;
  const userId = (req as any).user?._id || null;

  // validate product existence
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  // find existing cart (by user or sessionless guest)
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  // check if item already exists (same product + variant)
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

/**
 * @desc Get current user's or guest's cart
 * @route GET /api/cart
 * @access Public
 */
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

/**
 * @desc Update item quantity
 * @route PUT /api/cart
 * @access Public
 */
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
    // remove item if quantity set to 0
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
/**
 * @desc Remove an item from the cart
 * @route DELETE /api/cart/:productId
 * @access Public (works for both guest & logged-in users)
 */
export const removeItem = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { variantId } = req.query; // variantId optional (for multi-variant products)
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
/**
 * @desc Clear entire cart
 * @route DELETE /api/cart
 * @access Public (guest or logged-in)
 */
export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id || null;
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  cart.items = [];
  await cart.save();

  res.status(200).json({ success: true, message: "Cart cleared successfully" });
});
/**
 * @desc Merge guest cart with user cart (on login)
 * @route POST /api/cart/sync
 * @access Private
 */
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
