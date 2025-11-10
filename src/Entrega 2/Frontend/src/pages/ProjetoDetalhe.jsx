import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
function resolveMediaUrl(path) {
  if (!path) return "";
  const p = String(path).trim();
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith("/uploads")) return `${API_BASE}${p}`;
  if (p.startsWith("uploads")) return `${API_BASE}/${p}`;
  if (!p.startsWith("/")) return `${API_BASE}/uploads/${p}`;
  return `${API_BASE}${p}`;
}

export default function ProjetoDetalhe() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        setErro("");
        setCarregando(true);

        // 1) tenta em /projetos/:id
        let data;
        try {
          const r = await api.get(`/projetos/${id}`);
          data = r.data;
        } catch {
          // 2) fallback: /eventos/:id
          const r2 = await api.get(`/eventos/${id}`);
          data = r2.data;
        }

        if (!vivo) return;

        const titulo = data.titulo ?? data.nome ?? "Projeto";
        const imagem = resolveMediaUrl(data.capa_url || data.imagem_url || "");
        const descricao = data.descricao ?? "";

        setItem({ titulo, imagem, descricao });
      } catch {
        if (vivo) setErro("Projeto não encontrado.");
      } finally {
        if (vivo) setCarregando(false);
      }
    })();
    return () => (vivo = false);
  }, [id]);

  return (
    <main className="container">
      <p><Link to="/projetos">← Voltar</Link></p>
      {carregando && <p>Carregando...</p>}
      {erro && <div className="alert warn">{erro}</div>}
      {item && (
        <article className="projeto-detalhe">
          <h1>{item.titulo}</h1>
          {item.imagem && (
            <img
              className="hero"
              src={item.imagem}
              alt={item.titulo}
              onError={(e)=>{e.currentTarget.style.display="none";}}
            />
          )}
          {item.descricao && <p className="texto">{item.descricao}</p>}
        </article>
      )}
    </main>
  );
}
