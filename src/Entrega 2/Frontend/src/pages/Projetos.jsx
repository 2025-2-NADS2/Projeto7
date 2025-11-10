import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
function resolveMediaUrl(path) {
  if (!path) return "";
  const p = String(path).trim();
  if (/^https?:\/\//i.test(p)) return p;                 // URL absoluta
  if (p.startsWith("/uploads")) return `${API_BASE}${p}`; // "/uploads/..."
  if (p.startsWith("uploads")) return `${API_BASE}/${p}`; // "uploads/..."
  if (!p.startsWith("/")) return `${API_BASE}/uploads/${p}`; // "arquivo.png"
  return `${API_BASE}${p}`;                               // "/qualquer-coisa"
}

export default function Projetos() {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    (async () => {
      try {
        setCarregando(true);
        setErro("");

        // 1) tenta projetos
        const proj = await api.get("/projetos").then(r => Array.isArray(r.data) ? r.data : []);
        if (vivo && proj.length > 0) {
          setItens(
            proj.map(p => ({
              id: p.id,
              titulo: p.titulo ?? p.nome ?? "Projeto",
              imagem: resolveMediaUrl(p.capa_url || ""),
              tipo: "projeto",
            }))
          );
          return;
        }

        // 2) fallback: eventos (mostra como “projetos”)
        const evs = await api.get("/eventos").then(r => Array.isArray(r.data) ? r.data : []);
        if (vivo) {
          setItens(
            evs.map(e => ({
              id: e.id,
              titulo: e.titulo ?? "Projeto",
              imagem: resolveMediaUrl(e.imagem_url || ""),
              tipo: "evento",
            }))
          );
        }
      } catch {
        if (vivo) setErro("Não foi possível carregar os projetos.");
      } finally {
        if (vivo) setCarregando(false);
      }
    })();
    return () => (vivo = false);
  }, []);

  return (
    <main className="container">
      <h1>Nossos Projetos</h1>

      {carregando && <p>Carregando...</p>}
      {erro && <div className="alert warn">{erro}</div>}
      {!carregando && !erro && itens.length === 0 && <p>Nenhum projeto disponível no momento.</p>}

      <div className="gallery">
        {itens.map((p) => (
          <Link to={`/projetos/${p.id}`} key={`${p.tipo}-${p.id}`} className="tile">
            <figure>
              <div className="thumb">
                {p.imagem ? (
                  <img
                    src={p.imagem}
                    alt={p.titulo}
                    loading="lazy"
                    onError={(e)=>{e.currentTarget.style.display="none";}}
                  />
                ) : (
                  <div className="noimg">Sem imagem</div>
                )}
              </div>
              <figcaption>{p.titulo}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </main>
  );
}
