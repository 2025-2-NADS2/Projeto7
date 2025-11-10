// server/src/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ----------------------------- CORS ----------------------------- */
/**
 * Ex.: CORS_ORIGIN="http://localhost:5173,https://seu-front.vercel.app,https://*.vercel.app"
 */
const allowList = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const isVercel = o =>
  typeof o === "string" && /\.vercel\.app$/i.test(o);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // Postman/cURL
    const allowed = allowList.includes(origin) || isVercel(origin);
    return cb(allowed ? null : new Error("Not allowed by CORS"), allowed);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: false,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ----------------------- Parsers & estáticos -------------------- */
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

/* --------------------------- Health ----------------------------- */
/**
 * Tenta dar um ping no DB SEM derrubar o servidor se faltar env/DB.
 * Se o módulo de DB falhar no import, ainda assim respondemos com ok:false.
 */
app.get("/api/health", async (req, res) => {
  try {
    // Só tenta importar se existir o módulo
    const db = await import("./services/db.js").catch(() => null);

    if (db?.pingWithTimeout) {
      try {
        await db.pingWithTimeout(2000);
        return res.json({ ok: true, db: "up", ts: new Date().toISOString() });
      } catch (e) {
        return res.status(503).json({
          ok: false,
          db: "down",
          error: e?.message || "db-timeout",
          ts: new Date().toISOString(),
        });
      }
    }

    // Sem módulo de DB: responde ok do servidor em si
    return res.json({ ok: true, db: "unknown", ts: new Date().toISOString() });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "health-failed" });
  }
});

/* ----------------------- Montagem das rotas --------------------- */
/**
 * IMPORTANTE: usamos import dinâmico para evitar que um erro de env
 * em alguma rota derrube o processo ANTES do health responder.
 */
async function mountRoutes() {
  try {
    const [
      authRoutes,
      projetosRoutes,
      eventosRoutes,
      doacoesRoutes,
      contatosRoutes,
      uploadsRoutes,
    ] = await Promise.all([
      import("./routes/auth.js").catch(() => null),
      import("./routes/projetos.js").catch(() => null),
      import("./routes/eventos.js").catch(() => null),
      import("./routes/doacoes.js").catch(() => null),
      import("./routes/contatos.js").catch(() => null),
      import("./routes/uploads.js").catch(() => null),
    ]);

    if (authRoutes?.default) app.use("/api/auth", authRoutes.default);
    if (projetosRoutes?.default) app.use("/api/projetos", projetosRoutes.default);
    if (eventosRoutes?.default) app.use("/api/eventos", eventosRoutes.default);
    if (doacoesRoutes?.default) app.use("/api/doacoes", doacoesRoutes.default);
    if (contatosRoutes?.default) app.use("/api/contatos", contatosRoutes.default);
    if (uploadsRoutes?.default) app.use("/api/uploads", uploadsRoutes.default);

    console.log("[API] Rotas montadas.");
  } catch (e) {
    console.error("[API] Falha ao montar rotas:", e?.message || e);
  }
}
mountRoutes();

/* ----------------------------- 404 ------------------------------ */
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

/* --------------------------- Start ------------------------------ */
// No Azure, PORT vem do ambiente. NÃO sete PORT manualmente no App Service.
// DB_PORT = 3306 continua sendo só do MySQL.
const PORT = process.env.PORT || 3333;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API ouvindo em http://0.0.0.0:${PORT}`);
});
