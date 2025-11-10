import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../styles/admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("admin-body");
    document.body.classList.remove("public-body", "doador-body");
    return () => document.body.classList.remove("admin-body");
  }, []);

  const titleMap = {
    "/admin": "Dashboard",
    "/admin/atividades": "Gerenciar Atividades",
    "/admin/eventos": "Gerenciar Eventos",
    "/admin/transparencia": "Gerenciar Transparência",
    "/admin/doacoes": "Acompanhar Doações",
    "/admin/mensagens": "Mensagens (Ouvidoria)",
  };
  const currentKey =
    Object.keys(titleMap).find((k) => location.pathname.startsWith(k)) || "/admin";
  const pageTitle = titleMap[currentKey] || "Dashboard";

  const linkClass = ({ isActive }) => "admin-navlink" + (isActive ? " active" : "");

  const shellInline = { display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" };
  const asideInline = { background: "#0f2741", color: "#e8eef6", padding: "18px 14px" };
  const topbarInline = { background: "#fff", padding: "14px 16px", borderBottom: "1px solid #e7eef7" };

  return (
    <div className="admin-shell" style={shellInline}>
      <aside className="admin-sidebar" style={asideInline}>
        <div className="admin-brand" style={{ marginBottom: 12 }}>
          <div className="admin-brand-logo" style={{ fontWeight: 700, color: "#fff" }}>Alma</div>
          <div className="admin-brand-text" style={{ opacity: 0.85, fontWeight: 600 }}>Admin</div>
        </div>

        <nav className="admin-nav" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <NavLink end to="/admin" className={linkClass}><span className="nav-ico">🏠</span>Dashboard</NavLink>
          <NavLink to="/admin/atividades" className={linkClass}><span className="nav-ico">📋</span>Gerenciar Atividades</NavLink>
          <NavLink to="/admin/eventos" className={linkClass}><span className="nav-ico">📅</span>Gerenciar Eventos</NavLink>
          <NavLink to="/admin/transparencia" className={linkClass}><span className="nav-ico">📑</span>Gerenciar Transparência</NavLink>
          <NavLink to="/admin/doacoes" className={linkClass}><span className="nav-ico">💳</span>Acompanhar Doações</NavLink>
          <NavLink to="/admin/mensagens" className={linkClass}><span className="nav-ico">✉️</span>Mensagens (Ouvidoria)</NavLink>
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={() => navigate("/", { replace: true })}
            style={{ width: "100%", padding: 10, border: 0, borderRadius: 10, background: "#1d3e6b", color: "#fff" }}
          >
            Voltar
          </button>
        </div>
      </aside>

      <main className="admin-content" style={{ minWidth: 0 }}>
        <header className="admin-topbar" style={topbarInline}>
          <h1 className="admin-page-title" style={{ margin: 0, fontWeight: 700 }}>{pageTitle}</h1>
        </header>
        <section className="admin-page" style={{ padding: 18 }}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
