// server/src/routes/doacoes.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db");

/**
 * Lista doações
 * Ajuste os campos conforme sua tabela.
 * Usei id, nome, valor, `data`, email — com crase em `data` por ser palavra reservada.
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, nome, valor, `data`, email FROM doacoes ORDER BY id DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("GET /doacoes:", err);
    return res.status(500).json({ erro: "Falha ao listar doações" });
  }
});

/**
 * Cria doação
 * Envie no body: { nome, valor, data, email }
 * Ajuste os campos para os nomes reais da sua tabela se forem diferentes.
 */
router.post("/", async (req, res) => {
  try {
    const { nome, valor, data, email } = req.body;

    if (!valor) {
      return res.status(400).json({ erro: "Valor é obrigatório" });
    }

    await pool.query(
      "INSERT INTO doacoes (nome, valor, `data`, email) VALUES (?, ?, ?, ?)",
      [nome || null, Number(valor) || 0, data || null, email || null]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("POST /doacoes:", err);
    return res.status(500).json({ erro: "Falha ao criar doação" });
  }
});

/**
 * Atualiza doação
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, valor, data, email } = req.body;

    const [r] = await pool.query(
      "UPDATE doacoes SET nome = ?, valor = ?, `data` = ?, email = ? WHERE id = ?",
      [nome || null, valor != null ? Number(valor) : null, data || null, email || null, id]
    );

    if (r.affectedRows === 0) {
      return res.status(404).json({ erro: "Doação não encontrada" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("PUT /doacoes/:id:", err);
    return res.status(500).json({ erro: "Falha ao atualizar doação" });
  }
});

/**
 * Remove doação
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [r] = await pool.query("DELETE FROM doacoes WHERE id = ?", [id]);

    if (r.affectedRows === 0) {
      return res.status(404).json({ erro: "Doação não encontrada" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /doacoes/:id:", err);
    return res.status(500).json({ erro: "Falha ao excluir doação" });
  }
});

module.exports = router;
