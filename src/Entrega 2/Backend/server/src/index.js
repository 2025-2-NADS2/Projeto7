// server/src/index.js
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), "server", ".env") });

const express = require("express");
const { applySecurity } = require("./security");          // helmet, cors, rate-limit, etc.
const errorMiddleware = require("./middlewares/error");   // handler central de erros

// Rotas
const authRoutes = require("./routes/auth");
const eventosRoutes = require("./routes/eventos");
const projetosRoutes = require("./routes/projetos");
const uploadsRoutes = require("./routes/uploads");        // POST /api/uploads/imagem

// Pool só para health check
const pool = require("./services/db");

const app = express();

/**
 * Azure/Proxy
 * Mantém IP correto em logs/cookies seguros quando atrás de proxy.
 */
app.set("trust proxy", 1);

// Body parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// Segurança + CORS (usa CORS_ORIGIN do .env dentro de applySecurity)
applySecurity(app);

/**
 * Arquivos estáticos de upload (imagens)
 * - Disponíveis em /uploads/arquivo.png
 * - Alias em /api/uploads/arquivo.png para compatibilidade com o front
 */
const uploadsDir = path.join(process.cwd(), "server", "uploads");

app.use(
  "/uploads",
  express.static(uploadsDir, {
    fallthrough: true,
    maxAge: "7d",
    immutable: false,
  })
);

app.use(
  "/api/uploads",
  express.static(uploadsDir, {
    fallthrough: true,
    maxAge: "7d",
    immutable: false,
  })
);

// ====== Prefixo /api nas rotas de aplicação ======
app.use("/api/auth", authRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/projetos", projetosRoutes);
app.use("/api/uploads", uploadsRoutes); // POST /api/uploads/imagem

/**
 * Health-check com teste de DB
 * GET /api/health -> { ok:true, db:true }
 */
app.get("/api/health", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS ok");
    res.json({ ok: true, db: rows?.[0]?.ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, db: false, erro: e.message });
  }
});

// 404 para qualquer outra rota não mapeada
app.use((req, res) => res.status(404).json({ erro: "Rota não encontrada" }));

// Middleware central de erros (mantém logs/formatos)
app.use(errorMiddleware);

// Sobe o servidor
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
  if (process.env.CORS_ORIGIN) {
    console.log(`[CORS] origin permitido: ${process.env.CORS_ORIGIN}`);
  }
});
