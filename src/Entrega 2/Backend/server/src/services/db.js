// server-deploy/src/services/db.js
const mysql = require('mysql2/promise');

function env(name, def) {
  return process.env[name] ?? def ?? '';
}

function required(name, fallbackName) {
  const v = env(name) || (fallbackName ? env(fallbackName) : '');
  if (!v) throw new Error(`[DB] Variável de ambiente ausente: ${name}${fallbackName ? ` (ou ${fallbackName})` : ''}`);
  return v;
}

const config = {
  host: required('DB_HOST'),
  user: required('DB_USER'),
  password: required('DB_PASSWORD'),
  database: required('DB_DATABASE', 'DB_NAME'), // <-- aceita ambos
  port: Number(env('DB_PORT', '3306')),
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  ssl: String(env('DB_SSL', 'false')).toLowerCase() === 'true' ? { rejectUnauthorized: false } : undefined,
};

let pool;

/** Retorna um pool único (lazy) */
function getPool() {
  if (!pool) pool = mysql.createPool(config);
  return pool;
}

/** Ping com timeout para usar no /api/health */
async function pingWithTimeout(ms = 2000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    const p = getPool();
    await p.query('SELECT 1');
    return { ok: true };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { getPool, pingWithTimeout };
