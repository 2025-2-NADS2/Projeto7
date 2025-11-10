// server/src/services/security.js
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

function buildCors() {
  // Lê origens (separadas por vírgula) e normaliza
  const raw = process.env.CORS_ORIGIN || "";
  const allowList = raw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  // Suporte simples a wildcard *.vercel.app
  const hasVercelWildcard = allowList.some(o => o.includes("*.vercel.app"));

  return cors({
    origin: function (origin, cb) {
      // chamadas sem origin (ex: curl/health) liberamos
      if (!origin) return cb(null, true);

      const allowed =
        allowList.includes(origin) ||
        (hasVercelWildcard && /\.vercel\.app$/.test(origin));

      cb(allowed ? null : new Error("CORS bloqueado para esta origem"), allowed);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // cache do preflight
    optionsSuccessStatus: 204,
  });
}

function applySecurity(app) {
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });
  app.use(limiter);

  const corsMw = buildCors();
  app.use(corsMw);
  app.options("*", corsMw); // responde preflight em todas as rotas
}

module.exports = { applySecurity };
