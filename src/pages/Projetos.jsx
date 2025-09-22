export default function Projetos() {
  // Ajuste os nomes dos arquivos de imagem conforme estiverem na pasta /public/projetos
  const projetos = [
    { titulo: "Projeto Crê.Ser",       img: "/projetos/creSer.png",           link: "#" },
    { titulo: "Assistência à mães",    img: "/projetos/assistenciaMaes.png",  link: "#" },
    { titulo: "Projeto Alimentar",     img: "/projetos/sopa.png",             link: "#" },
    { titulo: "Natal de Amor",         img: "/projetos/natalAmor.png",        link: "#" },
  ];

  // estilos locais (evita mexer no CSS global)
  const grade = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "28px",
  };

  const card = {
    position: "relative",
    border: "1px solid var(--borda)",
    borderRadius: "14px",
    overflow: "hidden",
    background: "var(--superficie)",
    boxShadow: "0 2px 12px rgba(0,0,0,.06)",
  };

  const img = {
    width: "100%",
    height: "348px",
    objectFit: "cover",
    display: "block",
  };

  // Tarja azul translúcida no pé da foto
  const tarja = {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(122,145,183,.70)", // #7A91B7 com transparência
    color: "#fff",
    padding: "14px 18px",
    textDecoration: "none",
    display: "block",
  };

  const titulo = {
    margin: 0,
    fontSize: "clamp(18px, 2.4vw, 26px)",
    textShadow: "0 1px 2px rgba(0,0,0,.25)",
    fontWeight: 600,
  };

  // Título da página: agora inteiro na cor primária
  const cabeca = {
    margin: "0 0 18px 0",
    fontSize: "clamp(26px, 3vw, 42px)",
    fontWeight: 600,
    color: "",
  };

  return (
    <section className="page">
      <h2 style={cabeca}>Nossos Projetos</h2>

      <div style={grade}>
        {projetos.map((p) => (
          <article key={p.titulo} style={card}>
            <img src={p.img} alt={p.titulo} style={img} />
            <a href={p.link} style={tarja}>
              <h3 style={titulo}>{p.titulo}</h3>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
