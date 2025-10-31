import axios from 'axios';

export const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? 'http://localhost:5000/api';

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to attach auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on 401 responses
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // You might want to redirect to login or dispatch a logout action
      console.warn('Authentication required - clearing auth state');
    }
    return Promise.reject(error);
  }
);