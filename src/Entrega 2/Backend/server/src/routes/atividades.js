// server/src/routes/atividades.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db");

// Lista atividades
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, titulo, `data`, `local`, descricao FROM atividades ORDER BY id DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("GET /atividades:", err);
    return res.status(500).json({ erro: "Falha ao listar atividades" });
  }
});

// Cria atividade
router.post("/", async (req, res) => {
  try {
    const { titulo, data, local, descricao } = req.body;

    if (!titulo) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    await pool.query(
      "INSERT INTO atividades (titulo, `data`, `local`, descricao) VALUES (?, ?, ?, ?)",
      [titulo, data || null, local || null, descricao || null]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("POST /atividades:", err);
    return res.status(500).json({ erro: "Falha ao criar atividade" });
  }
});

// Atualiza atividade
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, data, local, descricao } = req.body;

    const [r] = await pool.query(
      "UPDATE atividades SET titulo = ?, `data` = ?, `local` = ?, descricao = ? WHERE id = ?",
      [titulo || null, data || null, local || null, descricao || null, id]
    );

    if (r.affectedRows === 0) {
      return res.status(404).json({ erro: "Atividade não encontrada" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("PUT /atividades/:id:", err);
    return res.status(500).json({ erro: "Falha ao atualizar atividade" });
  }
});

// Remove atividade
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [r] = await pool.query("DELETE FROM atividades WHERE id = ?", [id]);

    if (r.affectedRows === 0) {
      return res.status(404).json({ erro: "Atividade não encontrada" });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /atividades/:id:", err);
    return res.status(500).json({ erro: "Falha ao excluir atividade" });
  }
});

module.exports = router;
