const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/projetos -> lista a partir do banco; se falhar, cai no fallback
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, titulo, imagem, link FROM projetos WHERE ativo=1 ORDER BY ordem ASC"
    );
    if (rows && rows.length) return res.json(rows);
  } catch (e) {
    console.warn("DB indisponível, usando fallback em memória:", e.message);
  }

  // Fallback (funciona mesmo sem DB)
  return res.json([
    { id: 1, titulo: "Projeto Crê.Ser",      imagem: "/projetos/creSer.png",          link: "#" },
    { id: 2, titulo: "Assistência à mães",   imagem: "/projetos/assistenciaMaes.png", link: "#" },
    { id: 3, titulo: "Projeto Alimentar",    imagem: "/projetos/sopa.png",            link: "#" },
    { id: 4, titulo: "Natal de Amor",        imagem: "/projetos/natalAmor.png",       link: "#" }
  ]);
});

module.exports = router;
