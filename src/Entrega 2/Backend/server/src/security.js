// server/src/security.js
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

function parseOrigins(str) {
  return String(str || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function applySecurity(app) {
  // Helmet básico
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // CORS com allowlist
  const allowlist = parseOrigins(process.env.CORS_ORIGIN);
  const corsOptions = {
    origin(origin, cb) {
      // Sem origin (curl/Postman/health) → libera
      if (!origin) return cb(null, true);
      if (allowlist.length === 0) return cb(null, true);
      if (allowlist.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS bloqueado para origem: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    maxAge: 86400, // cache do preflight
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions)); // preflight

  // Rate limit simples
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 300,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    })
  );
}

module.exports = { applySecurity };
