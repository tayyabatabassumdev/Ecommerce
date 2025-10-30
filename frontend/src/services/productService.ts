import axios from "axios";
import type { Product } from "../types/Product";
const base = import.meta.env.VITE_API_URL;

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${base}/products`);
  return data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`${`${base}/products`}/${id}`);
  return data;
};
