// server/src/routes/contatos.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db");

/**
 * POST /api/contatos
 * Público: grava mensagem do formulário de contato
 * body: { nome, email, mensagem }
 */
router.post("/", async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body || {};

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ erro: "Preencha nome, email e mensagem." });
    }

    await pool.query(
      "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)",
      [nome, email, mensagem]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("POST /contatos:", err);
    return res.status(500).json({ erro: "Falha ao salvar contato" });
  }
});

/**
 * GET /api/contatos
 * Lista mensagens (deixe público por enquanto; se quiser restringir a admin,
 * faça isso no server/src/index.js montando o router atrás dos middlewares).
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nome, email, mensagem, created_at FROM contatos ORDER BY created_at DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("GET /contatos:", err);
    return res.status(500).json({ erro: "Falha ao listar contatos" });
  }
});

module.exports = router;
