const jwt = require('jsonwebtoken');

function ensureAuth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ erro: 'Token ausente' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // { id, email, nome, papel }
    next();
  } catch (e) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

function ensureAdmin(req, res, next) {
  if (req?.usuario?.papel !== 'admin') {
    return res.status(403).json({ erro: 'Acesso restrito a admin' });
  }
  next();
}

module.exports = { ensureAuth, ensureAdmin };
