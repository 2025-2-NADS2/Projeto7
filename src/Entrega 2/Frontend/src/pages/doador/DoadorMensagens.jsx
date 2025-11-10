export default function DoadorMensagens() {
  return (
    <div className="card-doador">
      <h2 style={{marginTop: 0}}>Mensagens</h2>
      <p>Envie uma mensagem para a equipe do Instituto Alma.</p>

      <div style={{display: "grid", gap: 12, maxWidth: 720}}>
        <input className="campo" placeholder="Assunto" />
        <textarea className="campo-mensagem" placeholder="Escreva sua mensagem..." />
        <button className="btn-verde">Enviar</button>
      </div>
    </div>
  );
}
