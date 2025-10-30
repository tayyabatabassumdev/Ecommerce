import axios from "axios";

const base = import.meta.env.VITE_API_URL;

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

// Register
export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  const { data } = await axios.post(`${base}/register`, { name, email, password });
  return data.data;
};

// Login
export const loginUser = async (email: string, password: string): Promise<User> => {
  const { data } = await axios.post(`${base}/login`, { email, password });
  return data.data;
};

// Get current user
export const getMe = async (token: string) => {
  const { data } = await axios.get(`${base}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

// Logout (client removes token)
export const logoutUser = async () => {
  await axios.post(`${base}/logout`);
};
