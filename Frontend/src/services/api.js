// src/services/api.js
import axios from 'axios';

// This app has no login/auth. The backend recognizes each visitor via an
// anonymous "guest" cookie instead, so every request must include cookies —
// that's what withCredentials does. Without it the backend can't remember
// your cart/wishlist/orders between requests.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
