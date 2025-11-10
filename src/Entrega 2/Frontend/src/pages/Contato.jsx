import { useState } from "react";

// Base da API: em prod use VITE_API_URL; em dev o proxy do Vite atende /api
const API = import.meta.env.VITE_API_URL || "/api";

export default function Contato() {
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [status, setStatus] = useState({ enviando: false, ok: false, erro: "" });

  function mudar(e) {
    const { name, value } = e.target;
    setFormulario((f) => ({ ...f, [name]: value }));
  }

  async function enviar(e) {
    e.preventDefault();
    setStatus({ enviando: true, ok: false, erro: "" });

    try {
      const r = await fetch(`${API}/contatos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formulario),
      });

      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        throw new Error(txt || "Falha ao enviar.");
      }

      setStatus({ enviando: false, ok: true, erro: "" });
      setFormulario({ nome: "", email: "", mensagem: "" });
    } catch (err) {
      console.error(err);
      setStatus({ enviando: false, ok: false, erro: "Não foi possível enviar agora." });
    }
  }

  return (
    <section className="page">
      <h2>Contato</h2>
      <p className="muted">Envie sua mensagem e retornaremos por e-mail.</p>

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
          <span /> {/* alinhamento */}
        </div>

        <label>Mensagem
          <textarea
            rows={4}
            name="mensagem"
            value={formulario.mensagem}
            onChange={mudar}
          />
        </label>

        <button className="btn" type="submit" disabled={status.enviando}>
          {status.enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {status.ok && <div className="notice">Recebemos sua mensagem. Obrigado!</div>}
      {status.erro && <div className="notice" style={{background:"#ffe9e9", color:"#7a1e1e", borderLeftColor:"#cc3a3a"}}>
        {status.erro}
      </div>}
    </section>
  );
}
