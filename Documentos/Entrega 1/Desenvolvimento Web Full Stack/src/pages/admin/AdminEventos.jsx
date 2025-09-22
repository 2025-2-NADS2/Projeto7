import { useContext, useState } from "react";
import { ContextoAutenticacao } from "../../App";

export default function AdminEventos() {
  const { logado } = useContext(ContextoAutenticacao);

  const [eventos, setEventos] = useState([
    { id: 1, titulo: "Feira Solidária", data: "2025-09-30", link: "https://instagram.com" },
  ]);

  const [formulario, setFormulario] = useState({ titulo: "", data: "", link: "" });

  if (!logado) {
    return <p className="muted">Acesso restrito. Faça login em Administração.</p>;
  }

  function mudar(e) {
    const { name, value } = e.target;
    setFormulario((f) => ({ ...f, [name]: value }));
  }

  function enviar(e) {
    e.preventDefault();
    if (!formulario.titulo || !formulario.data) return;
    setEventos((lista) => [{ id: Date.now(), ...formulario }, ...lista]);
    setFormulario({ titulo: "", data: "", link: "" });
  }

  function remover(id) {
    setEventos((lista) => lista.filter((ev) => ev.id !== id));
  }

  return (
    <section className="page">
      <h2>Admin · Eventos</h2>

      <form className="form" onSubmit={enviar}>
        <div className="form-row">
          <label>Título
            <input name="titulo" value={formulario.titulo} onChange={mudar} />
          </label>
          <label>Data
            <input type="date" name="data" value={formulario.data} onChange={mudar} />
          </label>
          <label>Link (opcional)
            <input name="link" value={formulario.link} onChange={mudar} />
          </label>
        </div>
        <button className="btn" type="submit">Adicionar evento</button>
      </form>

      <ul className="list">
        {eventos.map((e) => (
          <li className="list-item" key={e.id}>
            <span><strong>{new Date(e.data).toLocaleDateString()}</strong> — {e.titulo}</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {e.link && <a className="link" href={e.link} target="_blank" rel="noreferrer">Ver mais</a>}
              <button className="btn btn-ghost" onClick={() => remover(e.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
