import { useEffect, useState } from "react";

/** imagens do carrossel – coloque os arquivos em /public/carousel/  */
const slides = ["/carousel/carrossel1.JPG", "/carousel/carrossel2.JPG", "/carousel/carrossel3.JPG"];

/** cards – coloque as imagens em /public/cards/  */
const cartoes = [
  {
    img: "/cards/card1.JPG",
    text: "Campanhas mensais de arrecadação e distribuição de cestas básicas.",
    link: "#",
  },
  {
    img: "/cards/card2.JPG",
    text: "Parcerias com instituições locais para ampliar o impacto social.",
    link: "#",
  },
  {
    img: "/cards/card3.JPG",
    text: "Transparência financeira e relatórios acessíveis a toda comunidade.",
    link: "#",
  },      
];

export default function Inicio() {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);

  const anterior = () => setIndice((i) => (i === 0 ? slides.length - 1 : i - 1));
  const proximo  = () => setIndice((i) => (i === slides.length - 1 ? 0 : i + 1));

  // autoplay a cada 3s; pausa no hover
  useEffect(() => {
    if (pausado) return;
    const id = setInterval(() => setIndice((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(id);
  }, [pausado]);

  return (
    <section className="home">
      {/* Inicio (antes do carrossel) – coloque a imagem em /public/hero/fila.jpg */}
      <section className="inicio">
        <img src="/inicio/inicio.png" alt="Ação do Instituto Alma" />
        <div className="heroi-texto">
          <h2>
            Transformando vidas <span>juntos!</span>
          </h2>
          <p>
            O Instituto Alma dedica-se a apoiar crianças carentes e mães em situação
            de vulnerabilidade social, oferecendo suporte nutricional, educacional e social
            para construir um futuro melhor.
          </p>
        </div>
      </section>

      {/* Carrossel */}
      <section
        className="carousel"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
      >
        {slides.map((src, i) => (
          <div key={src} className={`slide ${i === indice ? "ativo" : ""}`}>
            <img src={src} alt="" />
          </div>
        ))}

        <button className="nav prev" onClick={anterior} aria-label="Anterior">
          <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="nav next" onClick={proximo} aria-label="Próximo">
          <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </section>

      {/* Cards inferiores (mantidos) */}
      <section className="content-row">
        {cartoes.map((c, i) => (
          <article className="content" key={i}>
            <img src={c.img} alt="" />
            <p>{c.text}</p>
            <a href={c.link} className="btn">Saiba Mais</a>
          </article>
        ))}
      </section>
    </section>
  );
}
