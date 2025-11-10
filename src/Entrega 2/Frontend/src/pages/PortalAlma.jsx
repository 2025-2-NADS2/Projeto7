// src/pages/PortalAlma.jsx
import { useAuth } from "../contexto/Autenticacao.jsx";
import { useNavigate } from "react-router-dom";

export default function PortalAlma() {
  const nav = useNavigate();
  const { perfil, setPerfil, login, erro, loading, online } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    const res = await login(e.currentTarget);
    if (res.ok) {
      if (res.papel === "admin") nav("/admin", { replace: true });
      else nav("/doador", { replace: true });
    }
  }

  const isAtivo = (p) => ({
    background: perfil === p ? "#2e7d32" : "#e9eef7",
    color: perfil === p ? "#fff" : "#1a2b4a",
  });

  return (
    <main className="container">
      <h1>Portal ALMA</h1>

      <form className="portal-alma" onSubmit={onSubmit}>
        <div className="tabs">
          <button
            type="button"
            className={perfil === "doador" ? "ativo" : ""}
            style={isAtivo("doador")}
            onClick={() => setPerfil("doador")}
          >Doador</button>
          <button
            type="button"
            className={perfil === "admin" ? "ativo" : ""}
            style={isAtivo("admin")}
            onClick={() => setPerfil("admin")}
          >Admin</button>
        </div>

        {!online && <p className="erro">Você está offline.</p>}
        {erro && <p className="erro">{erro}</p>}

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" placeholder="seu@email.com" required />

        <label htmlFor="senha">Senha</label>
        <input id="senha" name="senha" type="password" required />

        <button className="submit" disabled={loading}>
          {loading ? "Entrando..." : `Entrar como ${perfil}`}
        </button>
      </form>
    </main>
  );
}
