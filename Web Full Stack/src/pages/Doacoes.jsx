export default function Doacoes() {
  return (
    <section className="page">
      <h2>Faça uma Doação</h2>
      <p className="muted">
        Sua contribuição ajuda a manter nossas ações de apoio nutricional, educacional e social.
      </p>

      <div className="grid" style={{marginTop: '1rem'}}>
        <article className="card" style={{gridColumn: 'span 6'}}>
          <div className="card-body">
            <h3 className="card-title">PIX</h3>
            <p className="card-text">
              Chave PIX: <strong>XXXXXXXXXXX</strong>
            </p>
            {/* Colar o QR Code em /public/doacao/pix.png */}
            <img className="card-img" src="/doacao/pix.png" alt="QR Code PIX" />
          </div>
        </article>

        <article className="card" style={{gridColumn: 'span 6'}}>
          <div className="card-body">
            <h3 className="card-title">Cartão</h3>
            <p className="card-text">
              Em breve...
            </p>
            <a href="mailto:teste@institutoalma.com.br" className="btn">Falar com a equipe</a>
          </div>
        </article>
      </div>
    </section>
  );
}
