export default function Card({ titulo, descricao, imagem, children }) {
  return (
    <article className="card">
      {imagem && <img className="card-img" src={imagem} alt="" loading="lazy" />}
      <div className="card-body">
        <h3 className="card-title">{titulo}</h3>
        {descricao && <p className="card-text">{descricao}</p>}
        {children}
      </div>
    </article>
  );
}
