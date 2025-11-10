// server/src/routes/uploads.js
const path = require("path");
const fs = require("fs");
const express = require("express");
const multer = require("multer");

const router = express.Router();

// Garante diretório /server/uploads
const uploadsDir = path.join(process.cwd(), "server", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// storage: salva no disco com nome único
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

/**
 * POST /api/uploads/imagem
 * body: FormData { arquivo: <File> }
 * retorno: { ok:true, filename, url:"/uploads/<filename>" }
 */
router.post("/imagem", upload.single("arquivo"), (req, res) => {
  if (!req.file) return res.status(400).json({ erro: "Nenhum arquivo enviado" });
  const filename = req.file.filename;
  const url = `/uploads/${filename}`; // estático já servido em /uploads
  return res.status(201).json({ ok: true, filename, url });
});

module.exports = router;
