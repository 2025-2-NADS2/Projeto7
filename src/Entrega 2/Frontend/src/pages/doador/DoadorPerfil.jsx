export default function DoadorPerfil() {
  return (
    <div className="card-doador">
      <h2 style={{marginTop: 0}}>Meu Perfil</h2>
      <p>Atualize seus dados e preferências de comunicação.</p>

      <div style={{display: "grid", gap: 12, maxWidth: 720}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
          <input className="campo" placeholder="Nome" />
          <input className="campo" placeholder="Sobrenome" />
        </div>
        <input className="campo" placeholder="E-mail" />
        <input className="campo" placeholder="Telefone" />
        <button className="btn-verde">Salvar alterações</button>
      </div>
    </div>
  );
}
