// server/src/security.js
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

function applySecurity(app) {
  // Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // ---- CORS ----
  const raw = process.env.CORS_ORIGIN || "";
  const allowed = raw
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const isAllowed = (origin) => {
    if (!origin) return true; // Postman/curl
    if (allowed.includes(origin)) return true;
    // libera qualquer preview do Vercel se você tiver usado "*.vercel.app"
    if (allowed.some(a => a.endsWith(".vercel.app")) && origin.endsWith(".vercel.app")) return true;
    return false;
  };

  const corsOptions = {
    origin(origin, cb) {
      if (isAllowed(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
    maxAge: 86400,
    credentials: false,
  };

  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions)); // atende preflight rápido

  // Rate limit (opcional)
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });
  app.use(limiter);
}

module.exports = { applySecurity };
