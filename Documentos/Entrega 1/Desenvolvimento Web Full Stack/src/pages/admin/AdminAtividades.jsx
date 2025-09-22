import { useEffect, useState, useContext } from "react";
import { ContextoAutenticacao } from "../../App";
import Card from "../../components/Card";

const CHAVE = "almaa_activities";

export default function AdminAtividades() {
  const { logado } = useContext(ContextoAutenticacao);

  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : [];
  });

  const [formulario, setFormulario] = useState({ titulo: "", descricao: "", imagem: "" });

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(itens));
  }, [itens]);

  if (!logado) {
    return <p className="muted">Acesso restrito. Faça login em Administração.</p>;
  }

  function mudar(e) {
    const { name, value } = e.target;
    setFormulario((f) => ({ ...f, [name]: value }));
  }

  function enviar(e) {
    e.preventDefault();
    if (!formulario.titulo || !formulario.descricao) return;
    setItens((lista) => [{ id: Date.now(), ...formulario }, ...lista]);
    setFormulario({ titulo: "", descricao: "", imagem: "" });
  }

  function remover(id) {
    setItens((lista) => lista.filter((i) => i.id !== id));
  }

  return (
    <section className="page">
      <h2>Admin · Projetos</h2>

      <form className="form" onSubmit={enviar}>
        <div className="form-row">
          <label>Título
            <input name="titulo" value={formulario.titulo} onChange={mudar} />
          </label>
          <label>Imagem (URL)
            <input name="imagem" value={formulario.imagem} onChange={mudar} />
          </label>
        </div>
        <label>Descrição
          <textarea name="descricao" rows={3} value={formulario.descricao} onChange={mudar}></textarea>
        </label>
        <button className="btn" type="submit">Cadastrar projeto</button>
      </form>

      <div className="grid">
        {itens.map((it) => (
          <Card key={it.id} titulo={it.titulo} descricao={it.descricao} imagem={it.imagem}>
            <button className="btn btn-ghost" onClick={() => remover(it.id)}>Remover</button>
          </Card>
        ))}
      </div>
    </section>
  );
}
