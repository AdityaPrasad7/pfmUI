import axios from "axios";

// Base URL from env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
});
console.log("🚀 ~ API:", API)

// Request interceptor → attach access token
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → refresh token if access token expired
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if token expired (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Call refresh endpoint
        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // Save new token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        // Optional: logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Reusable function with validation
export const callApi = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await API({
      url: endpoint,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API;
