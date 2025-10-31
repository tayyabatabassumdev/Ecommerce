
import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/Product";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(" Connected to MongoDB");

    const { data } = await axios.get("https://fakestoreapi.com/products");

    const formattedProducts = data.map((item: any, index: number) => {
  
      const variants = [
        {
          _id: new mongoose.Types.ObjectId(),
          attributes: { color: "Red", size: "M" },
          price: item.price + 5,
          stock: 10 + index,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          attributes: { color: "Blue", size: "L" },
          price: item.price + 10,
          stock: 5 + index,
        },
      ];

    
      const extraCategories = ["Home", "Office", "Outdoor", "Luxury"];
      const randomExtra = extraCategories[index % extraCategories.length];
      const categories = [item.category, randomExtra];

      const imageVariants = [
        item.image,
        "https://picsum.photos/600/600?random=" + (index + 1),
        "https://picsum.photos/600/600?random=" + (index + 2),
      ];

      return {
        name: item.title,
        description: item.description,
        category: categories.join(", "),
        basePrice: item.price,
        images: imageVariants,
        variants,
        averageRating: item.rating?.rate || 0,
        numReviews: item.rating?.count || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await Product.deleteMany({});
    await Product.insertMany(formattedProducts);

    console.log("Product data with variants & multiple images seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(" Error seeding products:", err);
    process.exit(1);
  }
};

seedProducts();
