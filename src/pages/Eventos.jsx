// src/pages/Eventos.jsx  (pode chamar de Evento.jsx se preferir)
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/api";
import { mediaUrl } from "../lib/media";

export default function Evento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    setCarregando(true);
    setErro("");

    api.get(`/eventos/${id}`)
      .then((r) => { if (vivo) setEvento(r.data || null); })
      .catch(() => { if (vivo) setErro("Não foi possível carregar o evento."); })
      .finally(() => { if (vivo) setCarregando(false); });

    return () => { vivo = false; };
  }, [id]);

  if (carregando) return <section className="page"><p>Carregando…</p></section>;
  if (erro) return <section className="page"><p className="erro">{erro}</p></section>;
  if (!evento) return <section className="page"><p>Evento não encontrado.</p></section>;

  return (
    <section className="page">
      <Link to="/projetos">← Voltar</Link>
      <h2>{evento.titulo}</h2>
      {evento.data && <p><strong>Data:</strong> {new Date(evento.data).toISOString().slice(0,10)}</p>}

      {evento.imagem_url && (
        <img
          src={mediaUrl(evento.imagem_url)}
          alt={evento.titulo}
          style={{ maxWidth: "100%", borderRadius: 12, margin: "12px 0" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}

      {evento.descricao && <p style={{ whiteSpace: "pre-wrap" }}>{evento.descricao}</p>}
    </section>
  );
}
