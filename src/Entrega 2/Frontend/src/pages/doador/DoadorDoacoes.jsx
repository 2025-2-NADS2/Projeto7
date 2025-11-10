export default function DoadorDoacoes() {
  return (
    <div className="card-doador">
      <h2 style={{marginTop: 0}}>Minhas Doações</h2>
      <p>Quando o backend estiver conectado, esta tabela listará suas contribuições com data, valor e status.</p>

      <div style={{overflowX: "auto"}}>
        <table style={{width: "100%", borderCollapse: "collapse"}}>
          <thead>
            <tr style={{background: "#f1fbf6"}}>
              <th style={th}>Data</th>
              <th style={th}>Valor</th>
              <th style={th}>Forma</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td} colSpan={4} align="center">Nenhuma doação encontrada.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { textAlign: "left", padding: "10px 12px", borderBottom: "1px solid #e2f3eb" };
const td = { padding: "10px 12px", borderBottom: "1px solid #e2f3eb" };
