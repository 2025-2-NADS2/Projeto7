require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3333;
const ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

// Rotas
app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.use("/api/contatos", require("./routes/contatos"));
app.use("/api/projetos", require("./routes/projetos"));

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
