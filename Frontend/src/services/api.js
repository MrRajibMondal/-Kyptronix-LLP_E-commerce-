// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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