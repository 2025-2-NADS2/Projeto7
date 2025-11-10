module.exports = function errorMiddleware(err, _req, res, _next) {
  console.error(err);
  const status = err.status || 500;
  const message = status === 500 ? 'Falha interna' : err.message || 'Erro';
  res.status(status).json({ erro: message });
};
