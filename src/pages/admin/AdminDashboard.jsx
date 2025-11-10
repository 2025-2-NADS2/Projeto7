import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333/api";

/**
 * Você pode integrar com:
 *  GET /admin/overview  -> { totalArrecadado, totalDoacoes, novasMensagens, proximoEvento:{titulo,data} }
 */
export default function AdminDashboard() {
  const [data, setData] = useState({
    totalArrecadado: 14580,
    totalDoacoes: 120,
    novasMensagens: 3,
    proximoEvento: { titulo: "Festa de Natal", data: "15/12/2024" },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("almaa_token");
    if (!token) return; // opcional: redirect se quiser

    setLoading(true);
    fetch(`${API_URL}/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => (r.ok ? r.json() : null))
      .then(json => {
        if (json) setData(json);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="admin-headline">
        <h2>Dashboard</h2>
        <p>Bem-vindo, Administrador!</p>
      </div>

      <div className="admin-cards">
        <div className="admin-card">
          <div className="card-ico">🪙</div>
          <div className="card-body">
            <div className="card-title">Total Arrecadado</div>
            <div className="card-big">R$ {formatMoney(data.totalArrecadado)}</div>
            <div className="card-sub">Total de {data.totalDoacoes} doações</div>
          </div>
        </div>

        <div className="admin-card">
          <div className="card-ico">✉️</div>
          <div className="card-body">
            <div className="card-title">Novas Mensagens</div>
            <div className="card-big">{data.novasMensagens}</div>
            <div className="card-sub">Da Ouvidoria</div>
          </div>
        </div>

        <div className="admin-card">
          <div className="card-ico">📅</div>
          <div className="card-body">
            <div className="card-title">Próximo Evento</div>
            <div className="card-big">{data.proximoEvento?.titulo}</div>
            <div className="card-sub">Em {data.proximoEvento?.data}</div>
          </div>
        </div>
      </div>

      {loading && <p className="admin-loading">Atualizando...</p>}
    </>
  );
}

function formatMoney(v) {
  try {
    return Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  } catch {
    return v;
  }
}
