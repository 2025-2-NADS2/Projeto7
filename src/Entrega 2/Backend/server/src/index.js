// server/src/index.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const auth = require("./auth");
const projetosRouter = require("./routes/projetos");
const uploadsRouter = require("./routes/uploads");

const app = express();

// CORS: libere o seu front em produção + localhost em dev
const ALLOWED = [
  process.env.FRONTEND_URL, // opcional: defina no Azure (ex.: https://projeto7-one.vercel.app)
  "http://localhost:5173",
  "http://127.0.0.1:5173"
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // permitir tools/health-checks sem origin
    if (!origin) return cb(null, true);
    if (ALLOWED.some(a => origin.startsWith(a))) return cb(null, true);
    return cb(null, true); // se preferir travar, troque para: cb(new Error("CORS bloqueado"))
  },
  credentials: false
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Limite básico
app.use(rateLimit({ windowMs: 60 * 1000, max: 300 }));

// Arquivos estáticos enviados (caminho público /uploads)
app.use("/uploads", express.static(path.join(process.cwd(), "server", "uploads")));

// Rotas da API
app.use("/api/auth", auth);
app.use("/api/projetos", projetosRouter);
app.use("/api/uploads", uploadsRouter);

// Health-check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`API ouvindo em http://localhost:${PORT}`);
});
