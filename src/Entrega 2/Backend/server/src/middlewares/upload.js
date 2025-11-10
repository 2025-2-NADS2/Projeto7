const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dest = path.join(process.cwd(), 'server', 'uploads');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dest),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

function fileFilter(_req, file, cb) {
  const ok = /image\/(png|jpeg|jpg|gif|webp)/.test(file.mimetype);
  cb(ok ? null : new Error('Tipo de arquivo não suportado'), ok);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
});

module.exports = { upload };
