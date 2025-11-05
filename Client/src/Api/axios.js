import axios from 'axios';

// Base instance
const api = axios.create({
   baseURL: "http://localhost:7000",
  withCredentials: true // ✅ allow cookies (refresh token)
});

// Add access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
