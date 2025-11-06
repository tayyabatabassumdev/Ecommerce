import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/Product";
dotenv.config();
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const formattedProducts = data.map((item: any, index: number) => {
      const variants = [
        {
          _id: new mongoose.Types.ObjectId(),
          attributes: { color: "Red", size: "M" },
          price: +(item.price * 1.1).toFixed(2),
          stock: 25,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          attributes: { color: "Blue", size: "L" },
          price: +(item.price * 1.15).toFixed(2),
          stock: 20,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          attributes: { color: "Black", size: "XL" },
          price: +(item.price * 1.2).toFixed(2),
          stock: 15,
        },
      ];
      const extraCategories = ["Home", "Office", "Outdoor", "Luxury", "Fashion", "Electronics"];
      const randomExtra = extraCategories[index % extraCategories.length];
      const categories = [item.category, randomExtra];
      const imageBase = `https://picsum.photos/id/${100 + index}`;
      const imageVariants = [
        `${imageBase}/600/600`,
        `${imageBase + 1}/600/600`,
        `${imageBase + 2}/600/600`,
      ];
      return {
        name: item.title,
        description: item.description,
        category: categories.join(", "),
        basePrice: item.price,
        images: imageVariants,
        variants,
        averageRating: item.rating?.rate || 4.0,
        numReviews: item.rating?.count || 10,
        stock: variants.reduce((sum, v) => sum + v.stock, 0), // total stock
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    await Product.deleteMany({});
    await Product.insertMany(formattedProducts);
    console.log("🎉 Product data seeded successfully with variants, stock, and images!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};
seedProducts();
