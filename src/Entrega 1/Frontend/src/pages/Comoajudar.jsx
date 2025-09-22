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
    // simulação para esta etapa do projeto
    setEnviado(true);
    setFormulario({ nome: "", email: "", interesse: "voluntariado", mensagem: "" });
  }

  return (
    <section className="page">
      <h2>Como Ajudar</h2>
      <p className="muted">
        Existem diversas formas de apoiar o Instituto Alma: doação financeira,
        doação de alimentos, voluntariado, parcerias e divulgação.
      </p>

      {/* opções rápidas */}
      <div className="grid" style={{ marginTop: "1rem" }}>
        <article className="card" style={{ gridColumn: "span 4" }}>
          <div className="card-body">
            <h3 className="card-title">Doação Financeira</h3>
            <p className="card-text">
              Sua contribuição mantém nossas ações de apoio nutricional, educacional e social.
            </p>
            <a className="btn" href="/doacoes">Doar agora</a>
          </div>
        </article>

        <article className="card" style={{ gridColumn: "span 4" }}>
          <div className="card-body">
            <h3 className="card-title">Doação de Alimentos</h3>
            <p className="card-text">
              Arroz, feijão, macarrão, leite em pó e itens de higiene são sempre bem-vindos.
              Entre em contato para combinar a entrega.
            </p>
            <a className="btn btn-ghost" href="/contato">Falar com a equipe</a>
          </div>
        </article>

        <article className="card" style={{ gridColumn: "span 4" }}>
          <div className="card-body">
            <h3 className="card-title">Voluntariado</h3>
            <p className="card-text">
              Apoie na logística de cestas, triagem de doações ou ações de campo.
            </p>
            <a className="btn btn-ghost" href="#voluntariado">Quero ser voluntário(a)</a>
          </div>
        </article>

        <article className="card" style={{ gridColumn: "span 6" }}>
          <div className="card-body">
            <h3 className="card-title">Parcerias</h3>
            <p className="card-text">
              Empresas e organizações podem contribuir com recursos, serviços e campanhas
              conjuntas para ampliar nosso impacto.
            </p>
            <a className="btn btn-ghost" href="/contato">Propor parceria</a>
          </div>
        </article>

        <article className="card" style={{ gridColumn: "span 6" }}>
          <div className="card-body">
            <h3 className="card-title">Divulgue</h3>
            <p className="card-text">
              Compartilhe nossos projetos nas redes sociais e convide amigos para participar.
            </p>
            <a className="btn btn-ghost" href="https://instagram.com/ALMAINSTITUTO_OFICIAL" target="_blank" rel="noreferrer">
              Instagram do Instituto
            </a>
          </div>
        </article>
      </div>

      {/* formulário de voluntariado */}
      <h3 id="voluntariado" style={{ marginTop: "1.25rem" }}>Quero ser voluntário(a)</h3>
      <form className="form" onSubmit={enviar}>
        <div className="form-row">
          <label>Nome
            <input
              name="nome"
              value={formulario.nome}
              onChange={mudar}
              required
            />
          </label>
          <label>E-mail
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={mudar}
              required
            />
          </label>
          <label>Interesse
            <select
              name="interesse"
              value={formulario.interesse}
              onChange={mudar}
            >
              <option value="voluntariado">Voluntariado</option>
              <option value="parcerias">Parcerias</option>
              <option value="doacoes">Doações</option>
            </select>
          </label>
        </div>

        <label>Mensagem
          <textarea
            rows={4}
            name="mensagem"
            value={formulario.mensagem}
            onChange={mudar}
            placeholder="Conte rapidamente como deseja ajudar :)"
          />
        </label>

        <button className="btn" type="submit">Enviar</button>
      </form>

      {enviado && (
        <div className="notice">
          Obrigado! Recebemos seus dados e entraremos em contato por e-mail.
        </div>
      )}
    </section>
  );
}
