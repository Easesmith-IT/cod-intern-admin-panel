import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle extension interference
axiosInstance.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(
      `API call to ${response.config.url} completed in ${duration}ms`
    );
    return response;
  },
  (error) => {
    // Check for extension-related errors
    const isExtensionError =
      error.message?.includes("runtime.lastError") ||
      error.message?.includes("message port closed") ||
      error.message?.includes("Extension context invalidated") ||
      error.message?.includes("chrome-extension://");

    if (isExtensionError) {
      console.warn("Extension interference detected:", error.message);
      return Promise.reject(
        new Error("Request interrupted by browser extension")
      );
    }

    // Log actual API errors
    const duration = error.config?.metadata
      ? Date.now() - error.config.metadata.startTime
      : "unknown";
    console.error(`API call failed after ${duration}ms:`, {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });

    return Promise.reject(error);
  }
);
