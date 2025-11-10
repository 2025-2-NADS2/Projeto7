const API =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE ||
  "http://localhost:3333";

// Resolve URL de imagem/arquivo vindo do back
export function mediaUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/uploads")) return `${API}${path}`;
  return `${API}${path}`;
}
