/** @format */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://admin.artdevata.net/api";

/**
 * Custom Axios instance configured for the ArtDevata API
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptor for consistent response data handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan saat memproses permintaan.";
    console.error(`[API Error] ${error.config?.url}:`, message);
    return Promise.reject(error);
  }
);

/**
 * Generic API helper function using Axios
 */
export async function apiClient<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await axiosInstance.get<T>(endpoint, config);
  return response.data;
}

export default axiosInstance;
