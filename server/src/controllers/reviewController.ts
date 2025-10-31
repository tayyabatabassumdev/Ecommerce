import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import axios from "axios";
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("product", "title");
    res.status(200).json({ success: true, data: reviews });
  } catch (err:unknown) {
    if(axios.isAxiosError(err)){
      res.status(500).json({ success: false, message: err.message })};
  }
};
export const addReview = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { productId } = req.params;
  const { rating, comment ,images} = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
  }

  const existing = await Review.findOne({ user: userId, product: productId });
  if (existing) {
    return res.status(400).json({ success: false, message: "You already reviewed this product" });
  }

  const review = await Review.create({ user: userId, product: productId, rating, comment,images, // 🖼️ new field
    status: "pending" });
  const reviews = await Review.find({ product: productId });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    averageRating: avgRating,
    numReviews: reviews.length,
  });

  res.status(201).json({ success: true, message: "Review added", data: review });
});
export const getReviews = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const reviews = await Review.find({
    product: productId,
    status: "approved", // ✅ show only approved reviews
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});
export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const user = (req as any).user;

  const review = await Review.findById(reviewId);
  if (!review) return res.status(404).json({ success: false, message: "Review not found" });

  if (user.role !== "admin" && review.user.toString() !== user._id.toString()) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  await review.deleteOne();
  const reviews = await Review.find({ product: review.product });
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;
  await Product.findByIdAndUpdate(review.product, {
    averageRating: avgRating,
    numReviews: reviews.length,
  });

  res.status(200).json({ success: true, message: "Review deleted" });
});