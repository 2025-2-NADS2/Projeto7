const express = require('express');
const { pool } = require('../services/db');
const { ensureAuth, ensureAdmin } = require('../middlewares/auth');

const router = express.Router();

// Lista pública
router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, titulo, descricao, imagem_url, data FROM eventos ORDER BY data DESC, id DESC'
    );
    res.json(rows);
  } catch (e) { next(e); }
});

// Detalhe público
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT id, titulo, descricao, imagem_url, data FROM eventos WHERE id = ?',
      [id]
    );
    if (!rows.length) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

// Criar (admin)
router.post('/', ensureAuth, ensureAdmin, async (req, res, next) => {
  try {
    const { titulo, descricao, imagem_url, data } = req.body;
    if (!titulo || !data) return res.status(400).json({ erro: 'Título e data são obrigatórios' });
    const [r] = await pool.query(
      'INSERT INTO eventos (titulo, descricao, imagem_url, data) VALUES (?, ?, ?, ?)',
      [titulo, descricao || null, imagem_url || null, data]
    );
    res.status(201).json({ id: r.insertId });
  } catch (e) { next(e); }
});

// Atualizar (admin)
router.put('/:id', ensureAuth, ensureAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, imagem_url, data } = req.body;
    const [r] = await pool.query(
      'UPDATE eventos SET titulo=?, descricao=?, imagem_url=?, data=? WHERE id=?',
      [titulo, descricao || null, imagem_url || null, data, id]
    );
    if (r.affectedRows === 0) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Excluir (admin)
router.delete('/:id', ensureAuth, ensureAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const [r] = await pool.query('DELETE FROM eventos WHERE id=?', [id]);
    if (r.affectedRows === 0) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

module.exports = router;
