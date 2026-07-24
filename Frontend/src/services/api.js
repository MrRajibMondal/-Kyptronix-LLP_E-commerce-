// src/services/api.js
import axios from 'axios';

<<<<<<< HEAD
// This app has no login/auth. The backend recognizes each visitor via an
// anonymous "guest" cookie instead, so every request must include cookies —
// that's what withCredentials does. Without it the backend can't remember
// your cart/wishlist/orders between requests.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
=======
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< HEAD
export default API;
=======
// Interceptor to attach JWT token if present
API.interceptors.request.use(
  (config) => {
    // Check common storage keys for user auth token
    const token =
      localStorage.getItem('token') ||
      localStorage.getItem('auth_token') ||
      JSON.parse(localStorage.getItem('user') || '{}')?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
>>>>>>> c1757f6fdd2539f341d77016d34ebd8fb39c4f58
