// ESM: este arquivo funciona com "type": "module"
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Se seus routers estiverem em src/ ao lado deste arquivo, mantenha assim.
// Se estiverem em src/routes, ajuste os paths para './routes/auth.js', etc.
import authRouter from './auth.js';
import projetosRouter from './projetos.js';
import uploadsRouter from './uploads.js';

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * CORS dinâmico com whitelist por ENV:
 * - Defina CORS_ORIGINS como lista separada por vírgula
 *   (ex.: "http://localhost:5173,https://seuapp.vercel.app,https://*.azurewebsites.net")
 */
const envOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Patterns úteis (mantém flexível para vercel e azure)
const defaultPatterns = [
  /^http:\/\/localhost:(3000|5173)$/,
  /^https:\/\/.*\.vercel\.app$/,
  /^https:\/\/.*\.azurewebsites\.net$/,
];

function originAllowed(origin) {
  if (!origin) return true; // allow same-origin/health checks
  // match exact env origins
  if (envOrigins.includes(origin)) return true;
  // match patterns (vercel/azure)
  return defaultPatterns.some(rx => rx.test(origin));
}

app.use(
  cors({
    origin: (origin, cb) => {
      const ok = originAllowed(origin);
      if (!ok) {
        console.error('[CORS] Bloqueado:', origin);
        return cb(new Error('Not allowed by CORS'));
      }
      // console.log('[CORS] Liberado:', origin);
      cb(null, true);
    },
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limit básico (ajuste se quiser)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});
app.use(limiter);

// Healthcheck
app.get('/healthz', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Prefixo /api para todas as rotas
app.use('/api/auth', authRouter);
app.use('/api/projetos', projetosRouter);
app.use('/api/uploads', uploadsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error('[ERROR]', err?.message);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API ouvindo em http://0.0.0.0:${PORT}`);
  console.log('[API] Rotas montadas.');
});
