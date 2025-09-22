import { NavLink } from "react-router-dom";
import { useState } from "react";

// classe "ativo" é adicionada automaticamente pelo NavLink
const ativo = ({ isActive }) => (isActive ? "ativo" : undefined);

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className={`header ${menuAberto ? "menu-aberto" : ""}`}>
      <div className="header-inner">
        {/* Linha superior: logo + botão do menu (no mobile) */}
        <div className="topbar">
          <div className="brand">
            <NavLink
              to="/"
              className="brand-logo-link"
              aria-label="Ir para Home"
              onClick={() => setMenuAberto(false)}
            >
              {/* a imagem está em /public/logo-alma-4.jpg */}
              <img
                src="/logo.png"
                className="brand-logo-img"
                alt="Instituto Alma"
              />
            </NavLink>
          </div>

          {/* Botão hambúrguer – só aparece em telas pequenas */}
          <button
            className="btn-menu"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto((v) => !v)}
          >
            <span className="lin" />
            <span className="lin" />
            <span className="lin" />
          </button>
        </div>

        {/* Navegação */}
        <nav className={`navbar ${menuAberto ? "aberta" : ""}`}>
          <ul className="menu-items" onClick={() => setMenuAberto(false)}>
            <li><NavLink to="/" end className={ativo}>Início</NavLink></li>
            <li><NavLink to="/sobre" className={ativo}>Sobre Nós</NavLink></li>
            <li><NavLink to="/projetos" className={ativo}>Projetos</NavLink></li>
            <li><NavLink to="/como-ajudar" className={ativo}>Como Ajudar</NavLink></li>
            <li><NavLink to="/contato" className={ativo}>Contato</NavLink></li>

            {/* Destaques */}
            <li className="menu-destaque">
              <NavLink to="/doacoes" className={ativo}>Faça uma doação</NavLink>
            </li>
            <li className="menu-destaque">
              <NavLink to="/admin" className={ativo}>Admin</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
