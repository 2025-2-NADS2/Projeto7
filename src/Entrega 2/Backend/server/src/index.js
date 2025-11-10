// server/src/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Carrega variáveis de ambiente (.env) quando rodando localmente
dotenv.config();

const app = express();

// --------- CORS (com preflight e allowlist por variável de ambiente) ---------
/**
 * CORS_ORIGIN pode estar assim:
 *   http://localhost:5173,https://seu-front.vercel.app,https://*.vercel.app
 */
const rawAllow = process.env.CORS_ORIGIN || "";
const list = rawAllow
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// Permite wildcard do Vercel (https://*.vercel.app)
const vercelWildcard = /\.vercel\.app$/;

const corsOptions = {
  origin(origin, cb) {
    // Sem origin (ex.: curl/postman) -> permite
    if (!origin) return cb(null, true);
    const allowed =
      list.includes(origin) ||
      vercelWildcard.test(origin);
    return cb(allowed ? null : new Error("Not allowed by CORS"), allowed);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: false
};

app.use(cors(corsOptions));
// Responde a todos os preflights
app.options("*", cors(corsOptions));

// --------- Parsers e estáticos ---------
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve arquivos enviados (capas etc.) em /uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// --------- Healthcheck ---------
app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
});

// --------- Rotas da API ---------
import authRoutes from "./routes/auth.js";
import projetosRoutes from "./routes/projetos.js";
import eventosRoutes from "./routes/eventos.js";
import doacoesRoutes from "./routes/doacoes.js";
import contatosRoutes from "./routes/contatos.js";
import uploadsRoutes from "./routes/uploads.js";

app.use("/api/auth", authRoutes);
app.use("/api/projetos", projetosRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/doacoes", doacoesRoutes);
app.use("/api/contatos", contatosRoutes);
app.use("/api/uploads", uploadsRoutes);

// --------- 404 (API) ---------
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// --------- Inicialização ---------
// IMPORTANTE: no Azure, a porta vem de process.env.PORT.
// Não defina PORT na App Service manualmente.
// Mantenha DB_PORT (3306) apenas para o MySQL.
const PORT = process.env.PORT || 3333;

// Ouça em 0.0.0.0 para aceitar conexões externas no Azure
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API ouvindo em http://0.0.0.0:${PORT}`);
});
