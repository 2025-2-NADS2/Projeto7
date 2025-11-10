import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/doador.css";

export default function LayoutDoador() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("doador-body");
    document.body.classList.remove("public-body", "admin-body");
    return () => document.body.classList.remove("doador-body");
  }, []);

  const titleMap = {
    "/doador": "Dashboard",
    "/doador/doacoes": "Minhas Doações",
    "/doador/recibos": "Recibos",
    "/doador/mensagens": "Mensagens",
    "/doador/perfil": "Meu Perfil",
  };
  const currentKey =
    Object.keys(titleMap).find((k) => location.pathname.startsWith(k)) || "/doador";
  const pageTitle = titleMap[currentKey] || "Dashboard";

  const linkClass = ({ isActive }) => "doador-link" + (isActive ? " active" : "");

  const shellInline = { display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" };
  const asideInline = { background: "#0c3d2a", color: "#d8f2e7", padding: "18px 14px" };
  const topbarInline = { background: "#fff", padding: "14px 16px", borderBottom: "1px solid #e2f3eb" };

  return (
    <div className="doador-shell" style={shellInline}>
      <aside className="doador-sidebar" style={asideInline}>
        <div className="doador-marca" style={{ marginBottom: 12 }}>
          <div className="doador-marca-logo" style={{ fontWeight: 700, color: "#fff" }}>Alma</div>
          <div className="doador-marca-texto" style={{ opacity: 0.85, fontWeight: 600 }}>Doador</div>
        </div>

        <nav className="doador-nav" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <NavLink end to="/doador" className={linkClass}><span className="ico">🏠</span>Dashboard</NavLink>
          <NavLink to="/doador/doacoes" className={linkClass}><span className="ico">💙</span>Minhas Doações</NavLink>
          <NavLink to="/doador/recibos" className={linkClass}><span className="ico">🧾</span>Recibos</NavLink>
          <NavLink to="/doador/mensagens" className={linkClass}><span className="ico">✉️</span>Mensagens</NavLink>
          <NavLink to="/doador/perfil" className={linkClass}><span className="ico">👤</span>Meu Perfil</NavLink>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={() => navigate("/", { replace: true })}
            style={{ width: "100%", padding: 10, border: 0, borderRadius: 10, background: "#146a49", color: "#fff" }}
          >
            Voltar
          </button>
        </div>
      </aside>

      <main className="doador-conteudo" style={{ minWidth: 0 }}>
        <header className="doador-topo" style={topbarInline}>
          <h1 className="doador-titulo" style={{ margin: 0, fontWeight: 700 }}>{pageTitle}</h1>
        </header>
        <section className="doador-pagina" style={{ padding: 18 }}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
