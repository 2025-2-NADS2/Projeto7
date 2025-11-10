export default function DoadorPainel() {
  return (
    <div className="card-doador">
      <h2 style={{marginTop: 0}}>Bem-vindo(a)!</h2>
      <p>Obrigado por apoiar o Instituto Alma 💚</p>

      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 16}}>
        <div className="card-doador">
          <strong>Total doado</strong>
          <div style={{fontSize: 24, fontWeight: 800, marginTop: 6}}>R$ 0,00</div>
          <small>Acumulado</small>
        </div>

        <div className="card-doador">
          <strong>Doações este mês</strong>
          <div style={{fontSize: 24, fontWeight: 800, marginTop: 6}}>0</div>
          <small>Transações</small>
        </div>

        <div className="card-doador">
          <strong>Próxima contribuição</strong>
          <div style={{fontSize: 18, fontWeight: 700, marginTop: 6}}>–</div>
          <small>Recorrência</small>
        </div>
      </div>
    </div>
  );
}
