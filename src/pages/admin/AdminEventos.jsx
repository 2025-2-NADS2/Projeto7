// src/pages/admin/AdminEventos.jsx
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
function resolveMediaUrl(path) {
  if (!path) return "";
  const p = String(path).trim();
  if (/^https?:\/\//i.test(p)) return p;                 // URL absoluta
  if (p.startsWith("/uploads")) return `${API_BASE}${p}`; // "/uploads/..."
  if (p.startsWith("uploads")) return `${API_BASE}/${p}`; // "uploads/..."
  if (!p.startsWith("/")) return `${API_BASE}/uploads/${p}`; // "arquivo.png"
  return `${API_BASE}${p}`;                               // "/qualquer-coisa"
}

export default function AdminEventos() {
  // Esta tela agora gerencia PROJETOS
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    descricao: "",
    status: "ativo",
    capa_url: ""
  });
  const [arquivo, setArquivo] = useState(null);
  const [msg, setMsg] = useState("");

  async function carregar() {
    const { data } = await api.get("/projetos");
    const normalizado = Array.isArray(data)
      ? data.map(p => ({ ...p, nome: p.nome ?? p.titulo ?? "" }))
      : [];
    setLista(normalizado);
  }
  useEffect(() => { carregar(); }, []);

  async function enviarUpload() {
    if (!arquivo) return null;
    const fd = new FormData();
    fd.append("arquivo", arquivo);
    const { data } = await api.post("/uploads/imagem", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // backend retorna { ok, filename, url: "/uploads/xxx.ext" }
    return data.url || null;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      let capaUrl = form.capa_url?.trim() || "";

      if (arquivo) {
        // upload tem prioridade: sempre grava o que o backend retornar
        capaUrl = await enviarUpload(); // "/uploads/xxxx.ext"
      } else if (capaUrl && !/^https?:\/\//i.test(capaUrl)) {
        // digitou "arquivo.png" ou "uploads/arquivo.png"
        if (capaUrl.startsWith("uploads")) capaUrl = `/${capaUrl}`;
        if (!capaUrl.startsWith("/uploads")) capaUrl = `/uploads/${capaUrl}`;
      }

      const payload = {
        // backend aceita 'nome' ou 'titulo'; vamos enviar 'nome'
        nome: form.nome.trim(),
        descricao: form.descricao || null,
        status: form.status === "inativo" ? "inativo" : "ativo",
        capa_url: capaUrl || null,
      };

      if (!payload.nome) {
        setMsg("O nome do projeto é obrigatório.");
        return;
      }

      if (form.id) {
        await api.put(`/projetos/${form.id}`, payload);
        setMsg("Projeto atualizado!");
      } else {
        await api.post("/projetos", payload);
        setMsg("Projeto criado!");
      }

      setForm({ id: null, nome: "", descricao: "", status: "ativo", capa_url: "" });
      setArquivo(null);
      await carregar();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setMsg(err?.response?.data?.erro || "Falha ao salvar");
    }
  }

  function editar(p) {
    setForm({
      id: p.id,
      nome: p.nome ?? p.titulo ?? "",
      descricao: p.descricao || "",
      status: p.status || "ativo",
      capa_url: p.capa_url || "",
    });
    setArquivo(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remover(id) {
    if (!window.confirm("Excluir este projeto?")) return;
    await api.delete(`/projetos/${id}`);
    await carregar();
  }

  return (
    <div className="admin-pg">
      <h2>Projetos (Admin)</h2>

      <form className="form-card" onSubmit={onSubmit}>
        <div className="grid2">
          <div>
            <label>Nome do Projeto</label>
            <input
              value={form.nome}
              onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              required
            />
          </div>
          <div>
            <label>Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        <label>Descrição</label>
        <textarea
          rows={3}
          value={form.descricao}
          onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))}
        />

        <div className="grid2">
          <div>
            <label>Imagem (upload opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setArquivo(e.target.files?.[0] || null)}
            />
          </div>
          <div>
            <label>URL da capa (opcional)</label>
            <input
              value={form.capa_url || ""}
              onChange={e => setForm(f => ({ ...f, capa_url: e.target.value }))}
              placeholder="arquivo.png, /uploads/arquivo.png ou https://..."
            />
            {!!form.capa_url && (
              <div style={{ marginTop: 6 }}>
                Prévia:&nbsp;
                <a
                  href={resolveMediaUrl(form.capa_url)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resolveMediaUrl(form.capa_url)}
                </a>
              </div>
            )}
          </div>
        </div>

        <button className="btn-primary">{form.id ? "Atualizar" : "Criar"}</button>
        {msg && <div className="msg" style={{ marginTop: 8 }}>{msg}</div>}
      </form>

      <hr />

      <table className="tbl">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Capa</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lista.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>
                {p.capa_url ? (
                  <a href={resolveMediaUrl(p.capa_url)} target="_blank" rel="noreferrer">ver</a>
                ) : "-"}
              </td>
              <td>{p.status}</td>
              <td className="acoes">
                <button onClick={() => editar(p)}>Editar</button>
                <button className="btn-danger" onClick={() => remover(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
