// src/lib/api.js
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? "http://localhost:3333/api" : "/api");

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  timeout: 15000,
});

// token (se houver)
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("alma_auth");
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  // helpers de auth (ajuste os caminhos do seu back, se necessário)
  async login({ perfil, email, senha }) {
    const { data } = await api.post("/auth/login", { perfil, email, senha });
    return data;
  },
  async me() {
    const { data } = await api.get("/auth/me");
    return data;
  },
};
