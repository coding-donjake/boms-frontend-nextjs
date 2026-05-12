import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export type ApiOptions<T = any> = {
  route?: string;
  params?: Record<string, any>;
  data?: T;
  config?: AxiosRequestConfig;
};

export const buildRoute = (base: string, route?: string) => {
  if (!route) return base;
  return `${base}/${route}`;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) { config.headers.Authorization = `Bearer ${token}`; }

  return config;
});

export default api;
