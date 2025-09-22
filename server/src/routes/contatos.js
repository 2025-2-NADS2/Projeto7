const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /api/contatos  -> salva contato no banco
router.post("/", async (req, res) => {
  const { nome, email, mensagem } = req.body || {};
  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e e-mail são obrigatórios." });
  }
  try {
    const [r] = await pool.execute(
      "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)",
      [nome, email, mensagem || null]
    );
    return res.status(201).json({ id: r.insertId, nome, email, mensagem });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: "Falha ao salvar contato." });
  }
});

module.exports = router;
