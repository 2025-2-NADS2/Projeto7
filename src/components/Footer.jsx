import { NavLink } from "react-router-dom";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <div className="rodape-col marca">
          <div className="marca-linha">
            <img src="/logo_rodape.png" alt="Instituto Alma" className="rodape-logo" />
          </div>
          <p>
            Transformando vidas de crianças carentes e mães em vulnerabilidade social há mais de 12 anos.
            Oferecemos apoio integral através de educação, assistência social e nutrição. <strong>Juntos,
            construímos esperança!</strong>
          </p>

          <div className="rodape-redes">
            <a href="#" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H8.08v-2.9h2.36v-2.2c0-2.34 1.4-3.63 3.54-3.63 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.87h2.59l-.41 2.9h-2.18V22c4.78-.76 8.44-4.92 8.44-9.94Z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 4.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm6.2-.9a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V22h-4V8zm7.5 0h3.8v1.9h.1c.5-1 1.8-2.1 3.7-2.1 4 0 4.7 1.9 4.7 6V22h-4v-6.1c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V22h-4V8z"/>
              </svg>
            </a>
            <a href="mailto:teste@institutoalma.com.br" aria-label="E-mail" title="E-mail">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm2 .5l8 6 8-6"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="rodape-col links">
          <h4>Links Rápidos</h4>
          <ul>
            <li><NavLink to="/">Início</NavLink></li>
            <li><NavLink to="/sobre">Sobre Nós</NavLink></li>
            <li><NavLink to="/projetos">Projetos</NavLink></li>
            <li><NavLink to="/como-ajudar">Como Ajudar</NavLink></li>
            <li><NavLink to="/contato">Contato</NavLink></li>
          </ul>
        </div>

        <div className="rodape-col contato">
          <h4>Contato</h4>
          <p>Instagram:<br />
            <a href="https://instagram.com/ALMAINSTITUTO_OFICIAL" target="_blank" rel="noreferrer">
              @ALMAINSTITUTO_OFICIAL
            </a>
          </p>
        </div>
      </div>

      <div className="rodape-base">
        <p>© {ano} Instituto Alma. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
