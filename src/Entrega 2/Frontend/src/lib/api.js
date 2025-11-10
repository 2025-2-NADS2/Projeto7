// web/src/lib/api.js
import axios from "axios";

/**
 * Base URL:
 * - Em produção, configure VITE_API_BASE_URL no Vercel (ex.: https://alma-api-devmasters-xxxxx.azurewebsites.net)
 * - Em dev local, cai no fallback http://localhost:8080
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "http://localhost:8080";

// Instância principal
export const api = axios.create({
  baseURL: API_BASE_URL,
  // Se você for usar cookies/sessão HttpOnly, mude para true
  withCredentials: false,
  timeout: 20000,
});

// Anexa Bearer token (se existir) automaticamente
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("alma_token");
    if (raw) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${raw}`;
    }
  } catch (_) {}
  return config;
});

// Helpers de endpoints específicos
export const authApi = {
  login: (email, senha) => api.post("/auth/login", { email, senha }),
  me: () => api.get("/auth/me"),
};

export const projetosApi = {
  listar: () => api.get("/api/projetos"),
  obter: (id) => api.get(`/api/projetos/${id}`),
  criar: (dados) => api.post("/api/projetos", dados),
  atualizar: (id, dados) => api.put(`/api/projetos/${id}`, dados),
  remover: (id) => api.delete(`/api/projetos/${id}`),
};

export const uploadsApi = {
  /**
   * Faz upload de imagem
   * @param {File} file
   * @returns {Promise<{ok:boolean, filename:string, url:string}>}
   */
  enviarImagem: (file) => {
    const fd = new FormData();
    fd.append("arquivo", file);
    return api.post("/api/uploads/imagem", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
