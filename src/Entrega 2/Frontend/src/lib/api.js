// src/lib/api.js
import axios from "axios";

// Normaliza base: acrescenta /api caso o .env tenha vindo sem ele
function computeBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();
  if (fromEnv) {
    const url = fromEnv.replace(/\/+$/, "");         // remove barras finais
    return url.endsWith("/api") ? url : `${url}/api`;
  }
  // fallback dev/local
  return import.meta.env.DEV ? "http://localhost:3333/api" : "/api";
}

const API_BASE = computeBaseUrl();

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  timeout: 15000,
});

// Anexa token salvo (se houver)
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

  // Endpoints de auth
  async login({ perfil, email, senha }) {
    const { data } = await api.post("/auth/login", { perfil, email, senha });
    return data;
  },
  async me() {
    const { data } = await api.get("/auth/me");
    return data;
  },
};
