import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexto/Autenticacao.jsx";

// classe "ativo" é adicionada automaticamente pelo NavLink
const ativo = ({ isActive }) => (isActive ? "ativo" : undefined);

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { usuario, token } = useAuth();

  const fecharMenu = () => setMenuAberto(false);

  // Decide rótulo/rota do botão do portal/painel
  const isLogado = Boolean(token && usuario);
  const isAdmin = isLogado && usuario?.papel === "admin";
  const painelLabel = isAdmin ? "Painel Admin" : "Painel do Doador";
  const painelPath = isAdmin ? "/admin" : "/doador";

  return (
    <header className={`header ${menuAberto ? "menu-aberto" : ""}`}>
      <div className="header-inner">
        {/* Linha superior: logo + botão do menu (mobile) */}
        <div className="topbar">
          <div className="brand">
            <NavLink
              to="/"
              className="brand-logo-link"
              aria-label="Ir para Home"
              onClick={fecharMenu}
            >
              <img src="/logo.png" className="brand-logo-img" alt="Instituto Alma" />
            </NavLink>
          </div>

          {/* Botão hambúrguer – só aparece em telas pequenas */}
          <button
            className="btn-menu"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto(v => !v)}
          >
            <span className="lin" />
            <span className="lin" />
            <span className="lin" />
          </button>
        </div>

        {/* Navegação */}
        <nav className={`navbar ${menuAberto ? "aberta" : ""}`}>
          <ul className="menu-items" onClick={fecharMenu}>
            <li><NavLink to="/" end className={ativo}>Início</NavLink></li>
            <li><NavLink to="/sobre" className={ativo}>Sobre Nós</NavLink></li>
            <li><NavLink to="/projetos" className={ativo}>Projetos</NavLink></li>
            <li><NavLink to="/como-ajudar" className={ativo}>Como Ajudar</NavLink></li>
            <li><NavLink to="/contato" className={ativo}>Contato</NavLink></li>

            {/* Destaques */}
            <li className="menu-destaque">
              <NavLink to="/doacoes" className={ativo}>Faça uma doação</NavLink>
            </li>

            {/* Login/Painel + Sair */}
            {!isLogado ? (
              <li className="menu-destaque">
                <NavLink to="/PortalAlma" className={ativo}>Portal Alma</NavLink>
              </li>
            ) : (
              <>
                <li className="menu-destaque">
                  <NavLink to={painelPath} className={ativo}>{painelLabel}</NavLink>
                </li>
                <li>
                  {/* rota que limpa sessão ao montar */}
                  <Link to="/logout" className="link-sair">Sair</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
