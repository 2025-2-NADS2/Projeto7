// server/src/routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// usuários de teste (troque por SELECT no seu DB quando quiser)
const USERS = [
  { id: 1, email: "admin@alma.org",  nome: "Admin",  papel: "admin",  senha: "admin123"  },
  { id: 2, email: "doador@alma.org", nome: "Doador", papel: "doador", senha: "doador123" },
];

function sign(user) {
  const payload = { id: user.id, email: user.email, nome: user.nome, papel: user.papel };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
}

// POST /auth/login  { email, senha }
router.post("/login", (req, res) => {
  const { email, senha } = req.body || {};
  const u = USERS.find(x => x.email === String(email).trim().toLowerCase());
  if (!u || u.senha !== String(senha)) {
    return res.status(401).json({ erro: "Credenciais inválidas." });
  }
  return res.json({ token: sign(u), usuario: { id: u.id, email: u.email, nome: u.nome, papel: u.papel } });
});

// GET /auth/me   (lê o Bearer token)
router.get("/me", (req, res) => {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ erro: "Token ausente" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ usuario: payload });
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
});

module.exports = router;
