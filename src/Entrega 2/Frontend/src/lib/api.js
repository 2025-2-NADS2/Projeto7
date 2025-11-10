// Arquivo para a camada de acesso à API no front (Vite/React)

import axios from 'axios';

/**
 * Base URL:
 * 1) VITE_API_URL no .env da UI (recomendado)
 * 2) window.__API_URL__ (se quiser injetar via script)
 * 3) fallback para mesmo host + /api (quando front e API estão juntos)
 */
const envUrl =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  (typeof window !== 'undefined' && window.__API_URL__) ||
  `${window.location.origin}/api`;

export const api = axios.create({
  baseURL: envUrl.replace(/\/+$/, ''), // tira barra final
  timeout: 30000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --------- Endpoints de conveniência ---------

export const AuthAPI = {
  login: async (email, senha) => {
    const { data } = await api.post('/auth/login', { email, senha });
    return data;
  },
};

export const ProjetosAPI = {
  listar: async () => {
    const { data } = await api.get('/projetos');
    return data;
  },
  criar: async (payload) => {
    const { data } = await api.post('/projetos', payload);
    return data;
  },
  atualizar: async (id, payload) => {
    const { data } = await api.put(`/projetos/${id}`, payload);
    return data;
  },
  remover: async (id) => {
    const { data } = await api.delete(`/projetos/${id}`);
    return data;
  },
};

// Uploads (se usar multipart no admin)
export const UploadsAPI = {
  uploadImagem: async (file) => {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post('/uploads', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return data;
  },
};
