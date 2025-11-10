// src/pages/ComoAjudar.jsx
import { useState } from "react";

export default function ComoAjudar() {
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    interesse: "voluntariado",
    mensagem: "",
  });
  const [enviado, setEnviado] = useState(false);

  function mudar(e) {
    const { name, value } = e.target;
    setFormulario((f) => ({ ...f, [name]: value }));
  }

  function enviar(e) {
    e.preventDefault();
    // simulação nesta etapa do projeto
    setEnviado(true);
    setFormulario({
      nome: "",
      email: "",
      interesse: "voluntariado",
      mensagem: "",
    });
  }

  return (
    <main className="container">
      <h1>Como Ajudar</h1>
      <p className="muted">
        Existem diversas formas de apoiar o Instituto Alma: doação financeira,
        doação de alimentos, voluntariado, parcerias e divulgação.
      </p>

      <section className="cards" style={{ marginTop: 16 }}>
        <article className="card">
          <h2>Doação Financeira</h2>
          <p>
            Sua contribuição mantém nossas ações de apoio nutricional,
            educacional e social.
          </p>
          <a className="btn" href="/doacoes">Doar agora</a>
        </article>

        <article className="card">
          <h2>Doação de Alimentos</h2>
          <p>
            Arroz, feijão, macarrão, leite em pó e itens de higiene são sempre
            bem-vindos. Entre em contato para combinar a entrega.
          </p>
          <a className="btn btn-ghost" href="/contato">Falar com a equipe</a>
        </article>

        <article className="card">
          <h2>Voluntariado</h2>
          <p>Apoie na logística de cestas, triagem de doações ou ações de campo.</p>
          <a className="btn btn-ghost" href="#voluntariado">Quero ser voluntário(a)</a>
        </article>

        <article className="card">
          <h2>Parcerias</h2>
          <p>
            Empresas e organizações podem contribuir com recursos, serviços e
            campanhas conjuntas para ampliar nosso impacto.
          </p>
          <a className="btn btn-ghost" href="/contato">Propor parceria</a>
        </article>

        <article className="card">
          <h2>Divulgue</h2>
          <p>Compartilhe nossos projetos nas redes sociais e convide amigos para participar.</p>
          <a
            className="btn btn-ghost"
            href="https://instagram.com/ALMAINSTITUTO_OFICIAL"
            target="_blank"
            rel="noreferrer"
          >
            Instagram do Instituto
          </a>
        </article>
      </section>

      <h2 id="voluntariado" style={{ marginTop: 20 }}>Quero ser voluntário(a)</h2>

      <form className="portal-alma" onSubmit={enviar} style={{ maxWidth: 660 }}>
        <div
          className="form-row"
          style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          <label>Nome
            <input name="nome" value={formulario.nome} onChange={mudar} required />
          </label>
          <label>E-mail
            <input type="email" name="email" value={formulario.email} onChange={mudar} required />
          </label>
          <label>Interesse
            <select name="interesse" value={formulario.interesse} onChange={mudar}>
              <option value="voluntariado">Voluntariado</option>
              <option value="parcerias">Parcerias</option>
              <option value="doacoes">Doações</option>
            </select>
          </label>
        </div>

        <label style={{ display: "block", marginTop: 12 }}>Mensagem
          <textarea
            rows={4}
            name="mensagem"
            value={formulario.mensagem}
            onChange={mudar}
            placeholder="Conte rapidamente como deseja ajudar :)"
            style={{ width: "100%" }}
          />
        </label>

        <button className="submit" type="submit" style={{ marginTop: 12 }}>
          Enviar
        </button>
      </form>

      {enviado && (
        <div className="alert warn" style={{ marginTop: 12 }}>
          Obrigado! Recebemos seus dados e entraremos em contato por e-mail.
        </div>
      )}
    </main>
  );
}
