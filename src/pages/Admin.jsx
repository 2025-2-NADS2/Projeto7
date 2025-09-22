import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextoAutenticacao } from "../App";

export default function Admin() {
  const { logado, setLogado } = useContext(ContextoAutenticacao);
  const [formulario, setFormulario] = useState({ usuario: "", senha: "" });

  function mudar(e) {
    const { name, value } = e.target;
    setFormulario((f) => ({ ...f, [name]: value }));
  }

  function entrar(e) {
    e.preventDefault();
    // Login fake desta entrega (libera acesso ao clicar em "Entrar")
    localStorage.setItem("almaa_logged", "1");
    setLogado(true);
  }

  if (!logado) {
    return (
      <section className="page">
        <h2>Administração do Site</h2>
        <p className="muted">
          Acesso restrito para atualização de páginas e acompanhamento de doações e mensagens.
        </p>
        <form className="form" onSubmit={entrar}>
          <div className="form-row">
            <label>Usuário
              <input name="usuario" value={formulario.usuario} onChange={mudar} />
            </label>
            <label>Senha
              <input type="password" name="senha" value={formulario.senha} onChange={mudar} />
            </label>
          </div>
          <button className="btn" type="submit">Entrar</button>
        </form>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>Painel do Administrador</h2>
      <div className="admin-grid">
        <Link className="admin-card" to="/admin/atividades">Gerenciar Projetos</Link>
        <Link className="admin-card" to="/admin/eventos">Gerenciar Eventos</Link>
        {/*<Link className="admin-card" to="/admin/relatórios">Gerar Relatório</Link>*/}
      </div>
    </section>
  );
}
