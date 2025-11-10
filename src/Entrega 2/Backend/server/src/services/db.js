// server/src/services/db.js
const mysql = require("mysql2/promise");

// Habilita SSL por padrão (Azure exige TLS >= 1.2).
// Se quiser desabilitar em desenvolvimento local, defina DB_SSL=false no .env.
const useSSL = (process.env.DB_SSL ?? "true").toLowerCase() !== "false";
const ssl = useSSL ? { minVersion: "TLSv1.2" } : undefined;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "alma",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl, // <- aqui
});

module.exports = pool;
