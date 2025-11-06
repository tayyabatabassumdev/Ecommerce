// backend/seeders/reviewSeeder.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Review } from "../models/Review";
import { Product } from "../models/Product";
import { User } from "../models/User";

dotenv.config();

const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    const products = await Product.find().limit(5);
    const users = await User.find().limit(3);
    if (products.length === 0 || users.length === 0) {
      console.log("Please seed users and products first");
      process.exit(1);
    }
    const reviewsData = [
      {
        user: users[0]._id,
        product: products[0]._id,
        rating: 5,
        comment: "Excellent product! Totally worth it.",
        images: [
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        ],
        approved: true,
      },
      {
        user: users[1]._id,
        product: products[1]._id,
        rating: 4,
        comment: "Good quality, but delivery took some time.",
        images: [
          "https://images.unsplash.com/photo-1512499617640-c2f999098c01",
        ],
        approved: true,
      },
      {
        user: users[2]._id,
        product: products[2]._id,
        rating: 3,
        comment: "Average product, could be improved.",
        images: [],
        approved: false, 
      },
    ];
    await Review.deleteMany();
    const createdReviews = await Review.insertMany(reviewsData);
    console.log(`${createdReviews.length} reviews added`);
    process.exit();
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1);
  }
};
seedReviews();
