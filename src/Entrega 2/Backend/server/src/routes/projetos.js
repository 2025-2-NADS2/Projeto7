// server/src/routes/projetos.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db");

// Normaliza capa_url enviada pelo admin:
// - "arquivo.png"          -> "/uploads/arquivo.png"
// - "uploads/arquivo.png"  -> "/uploads/arquivo.png"
// - "/uploads/arquivo.png" -> "/uploads/arquivo.png"
// - "https://..."          -> mantém
function normalizeCapaUrl(input) {
  if (input == null) return null;
  const raw = String(input).trim();
  if (!raw) return null;

  // URL absoluta? mantém
  if (/^https?:\/\//i.test(raw)) return raw;

  // começa com "uploads" sem barra -> prefixa "/"
  if (raw.startsWith("uploads")) return `/${raw}`;

  // já está com "/uploads"?
  if (raw.startsWith("/uploads")) return raw;

  // qualquer outro nome simples -> considere arquivo em /uploads
  if (!raw.startsWith("/")) return `/uploads/${raw}`;

  // caminho absoluto aleatório -> mantém (será resolvido no front)
  return raw;
}

/**
 * GET /api/projetos
 * Lista projetos ATIVOS
 */
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
         id,
         nome      AS titulo,
         descricao,
         capa_url,
         status,
         criado_em,
         atualizado_em
       FROM projetos
       WHERE status = 'ativo'
       ORDER BY id DESC`
    );
    return res.json(rows);
  } catch (err) {
    console.error("GET /projetos -> erro:", {
      code: err.code, errno: err.errno, message: err.message, sqlMessage: err.sqlMessage, sql: err.sql,
    });
    return res.status(500).json({ erro: "Falha ao listar projetos", code: err.code, message: err.sqlMessage || err.message });
  }
});

/**
 * GET /api/projetos/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT
         id,
         nome      AS titulo,
         descricao,
         capa_url,
         status,
         criado_em,
         atualizado_em
       FROM projetos
       WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ erro: "Projeto não encontrado" });
    return res.json(rows[0]);
  } catch (err) {
    console.error("GET /projetos/:id -> erro:", err);
    return res.status(500).json({ erro: "Falha ao obter projeto" });
  }
});

/**
 * POST /api/projetos
 * body: { nome|titulo, descricao, status, capa_url }
 */
router.post("/", async (req, res) => {
  try {
    const nome = (req.body.nome ?? req.body.titulo ?? "").trim();
    const descricao = req.body.descricao ?? null;
    const status = req.body.status === "inativo" ? "inativo" : "ativo";
    const capa_url = normalizeCapaUrl(req.body.capa_url); // <<< normaliza aqui

    if (!nome) return res.status(400).json({ erro: "Nome/título é obrigatório" });

    await pool.query(
      "INSERT INTO projetos (nome, descricao, status, capa_url) VALUES (?, ?, ?, ?)",
      [nome, descricao, status, capa_url]
    );

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("POST /projetos -> erro:", err);
    return res.status(500).json({ erro: "Falha ao criar projeto" });
  }
});

/**
 * PUT /api/projetos/:id
 * body: { nome|titulo, descricao, status, capa_url }
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const nome = (req.body.nome ?? req.body.titulo ?? "").trim();
    const descricao = req.body.descricao ?? null;
    const status = req.body.status === "inativo" ? "inativo" : "ativo";
    const capa_url = normalizeCapaUrl(req.body.capa_url); // <<< normaliza aqui

    const [r] = await pool.query(
      "UPDATE projetos SET nome = ?, descricao = ?, status = ?, capa_url = ? WHERE id = ?",
      [nome || null, descricao, status, capa_url, id]
    );

    if (r.affectedRows === 0) return res.status(404).json({ erro: "Projeto não encontrado" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("PUT /projetos/:id -> erro:", err);
    return res.status(500).json({ erro: "Falha ao atualizar projeto" });
  }
});

/**
 * DELETE /api/projetos/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [r] = await pool.query("DELETE FROM projetos WHERE id = ?", [id]);
    if (r.affectedRows === 0) return res.status(404).json({ erro: "Projeto não encontrado" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("DELETE /projetos/:id -> erro:", err);
    return res.status(500).json({ erro: "Falha ao excluir projeto" });
  }
});

module.exports = router;
