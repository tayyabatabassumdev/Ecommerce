import { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncHandler";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { IPopulatedCartItem } from "../interfaces/populated-cart.interface";

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { productId, variantId, quantity = 1, price } = req.body;
    const userId = (req as any).user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existingItemIndex = cart.items.findIndex(
      (i: any) =>
        i.productId?.toString() === productId &&
        (!variantId || i.variantId?.toString() === variantId)
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].priceAtAdd = price || product.basePrice;
    } else {
      cart.items.push({
        product: productId,
        variantId,
        quantity,
        priceAtAdd: price || product.basePrice,
      });
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate<{ items: IPopulatedCartItem[] }>({
        path: "items.product",
        select: "name basePrice category images image",
        model: "Product",
      });

    if (!populatedCart) throw new Error("Failed to fetch updated cart");

    const transformedCart = {
      ...populatedCart.toObject(),
      items: populatedCart.items.map((item) => ({
        _id: new mongoose.Types.ObjectId(),
        product: {
          _id: item.product._id,
          name: item.product.name,
          basePrice: item.product.basePrice,
          images: item.product.images || [],
          image: item.product.image,
        },
        quantity: item.quantity,
        priceAtAdd: item.priceAtAdd || item.product.basePrice,
      })),
    };

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: transformedCart,
    });
  } catch (error) {
    console.error("Add to cart error:", error instanceof Error ? error.stack : error);
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?._id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const cart = await Cart.findOne({ user: userId })
      .populate<{ items: IPopulatedCartItem[] }>({
        path: "items.product",
        select: "name basePrice category images image",
        model: "Product",
      });

    if (!cart) {
      return res.status(200).json({ success: true, data: { items: [] } });
    }

    const transformedCart = {
      ...cart.toObject(),
      items: cart.items.map((item) => ({
        _id: new mongoose.Types.ObjectId(),
        product: {
          _id: item.product._id,
          name: item.product.name,
          basePrice: item.product.basePrice,
          images: item.product.images || [],
          image: item.product.image,
        },
        quantity: item.quantity,
        priceAtAdd: item.priceAtAdd || item.product.basePrice,
      })),
    };

    res.status(200).json({ success: true, data: transformedCart });
  } catch (error) {
    console.error("Get cart error:", error instanceof Error ? error.stack : error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
export const updateQuantity = asyncHandler(async (req: Request, res: Response) => {
  const { productId, variantId, quantity } = req.body;
  const userId = (req as any).user?._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const item = cart.items.find(
    (i: any) =>
      i.product.toString() === productId &&
      (!variantId || i.variantId?.toString() === variantId)
  );

  if (!item) return res.status(404).json({ success: false, message: "Item not found in cart" });

  if (quantity < 1) {
    const filteredItems = cart.items.filter(
      (i: any) =>
        !(
          i.product.toString() === productId &&
          (!variantId || i.variantId?.toString() === variantId)
        )
    );cart.items.splice(0, cart.items.length, ...filteredItems);
  } else {
    item.quantity = quantity;
  }

  await cart.save();
  res.status(200).json({ success: true, data: cart });
});
export const removeItem = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { variantId } = req.query;
  const userId = (req as any).user?._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const originalLength = cart.items.length;

  const filteredItems = cart.items.filter(
    (i: any) =>
      !(
        i.product.toString() === productId &&
        (!variantId || i.variantId?.toString() === variantId)
      )
  );cart.items.splice(0, cart.items.length, ...filteredItems);

  if (cart.items.length === originalLength) {
    return res.status(404).json({ success: false, message: "Item not found in cart" });
  }

  await cart.save();
  res.status(200).json({ success: true, message: "Item removed", data: cart });
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?._id;
  const cart = await Cart.findOne({ user: userId });

  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  cart.items.splice(0, cart.items.length);
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
  if (!userCart) userCart = new Cart({ user: userId, items: [] });

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
