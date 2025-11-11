# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
  <a href="https://www.fecap.br/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP" />
  </a>
</p>

# Instituto Alma — Site Institucional (Full Stack)

## DevMasters

## Integrantes: <a href="http://www.linkedin.com/in/matheusfernandes2005">Matheus Fernandes Moraes</a>, <a href="https://www.linkedin.com/in/henri-seixas">Henri Seixas Souza</a>, <a href="#">Ana Luiza Ribeiro do Vale</a>, <a href="https://www.linkedin.com/in/pedro-henrique-ara%C3%BAjo-del-picolo-aa9444276">Pedro Henrique Araújo Del Picolo</a>

##Professores Orientadores: <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco de Souza Escobar</a>, <a href="https://www.linkedin.com/in/victorbarq/">Victor Bruno Alexander Rosetti de Quiroz</a>, <a href="https://www.linkedin.com/in/eduardo-savino-gomes-77833a10/">Eduardo Savino Gomes</a>, <a href="https://www.linkedin.com/in/ronaldo-araujo-pinto-3542811a/">Ronaldo Araujo Pinto</a>, <a href="https://www.linkedin.com/in/jbuesso/">José Carlos Buesso Jr</a>

---

## 📝 Descrição

<p align="center">
<img src="Projeto7/Imagens/git.png" alt="NOME DO PROJETO" border="0">
</p>

Site responsivo para o **Instituto Alma** com foco em transparência e captação: páginas públicas (Início, Sobre, **Projetos** com detalhe, Como Ajudar, Contato), **Portal Alma** (login de doador/admin) e **painel administrativo** (CRUD de projetos com **upload de imagens**).  

**Stack:**  
- **Frontend:** React (Vite), React Router, Axios, CSS Grid/Flex  
- **Backend:** Node.js (Express), MySQL, Multer (upload), Bcrypt (hash), JWT (auth), Helmet/CORS/Rate Limit  
- **Banco:** MySQL (Azure)

---

## 🗂 Estrutura de Pastas do Repositório (como está no Git)

> **Atenção:** Mantivemos *Documentos* e *Imagens* exatamente como no repositório. O **código** da Entrega 2 está dentro de `src/Entrega 2/`.

```
Raiz/
├─ Documentos/                      # material acadêmico (entregas, banner, etc.)
├─ Imagens/                         # assets gerais para o repositório
└─ src/
   ├─ Entrega 1/                    # materiais da 1ª entrega
   └─ Entrega 2/
      ├─ Frontend/                  # (ROOT do app React para Vercel)
      │  ├─ public/
      │  ├─ src/
      │  ├─ index.html
      │  ├─ package.json
      │  ├─ vite.config.js
      │  ├─ vercel.json             # SPA rewrite
      │  ├─ .env.development        # VITE_API_URL (apenas local)
      │  └─ .env.production         # (opcional local – em produção use o painel do Vercel)
      └─ Backend/
         └─ server/                 # (ROOT do app Node/Express para Azure/Railway/Render)
            ├─ src/
            │  ├─ middlewares/      # auth, error, upload
            │  ├─ routes/           # auth, projetos, uploads...
            │  ├─ services/         # db (mysql2/pool), security (helmet/cors)
            │  └─ index.js          # bootstrap da API (/api)
            ├─ uploads/
            │  └─ .gitkeep          # não versionar arquivos de upload
            ├─ schema.sql           # DDL do banco (MySQL)
            ├─ package.json         # scripts do backend
            └─ .env.example         # variáveis de ambiente (sem segredos)
```

> ✅ **Você NÃO precisa mudar a estrutura local.** Para o deploy, informe aos provedores a **pasta raiz do projeto** (Vercel → `src/Entrega 2/Frontend`; Azure/Railway/Render → `src/Entrega 2/Backend/server`).

---

## ▶️ Como Rodar Localmente

### 1) Backend (API)
```bash
cd "src/Entrega 2/Backend/server"
cp .env.example .env   # edite com seus dados reais
npm install
npm start              # sobe em http://localhost:3333
# teste: http://localhost:3333/api/health  -> { ok: true, db: true }
```

### 2) Frontend (React)
```bash
cd "src/Entrega 2/Frontend"
cp .env.example .env.development
# edite .env.development com: VITE_API_URL=http://localhost:3333/api
npm install
npm run dev            # http://localhost:5173
```

> **Preview (build local):**
> ```bash
> VITE_API_URL=http://localhost:3333/api
> npm run build
> npm run preview      # http://localhost:4173 (libere 4173 no CORS se usar)
> ```

---

## 🔐 Variáveis de Ambiente

### Frontend (`src/Entrega 2/Frontend`)
Crie **`.env.example`** com:
```
VITE_API_URL=http://localhost:3333/api
```
- **Dev local:** `.env.development` → `VITE_API_URL=http://localhost:3333/api`
- **Produção (Vercel):** cadastre `VITE_API_URL=https://SUA-API-PUBLICA.com/api` no painel do projeto.

### Backend (`src/Entrega 2/Backend/server`)
Arquivo **`.env.example`** (não versionar `.env` real):
```
PORT=3333
CORS_ORIGIN=http://localhost:5173,https://SEU-PROJETO.vercel.app,https://*.vercel.app

DB_HOST=piservidordb.mysql.database.azure.com
DB_PORT=3306
DB_USER=SEU_USUARIO
DB_PASSWORD=SEU_SEGREDO
DB_NAME=almaa
DB_SSL=true

JWT_SECRET=um_segredo_forte
```
> Em produção, cadastre essas variáveis no painel do seu provedor (Azure/Railway/Render).

---

## 🧭 Rotas Principais da API

Base: `/api`

| Método | Rota              | Descrição                                  | Auth |
|-------:|-------------------|--------------------------------------------|:----:|
| GET    | `/health`         | Status da API e do DB                      |  -   |
| POST   | `/auth/login`     | Login (perfil, email, senha) → JWT         |  -   |
| GET    | `/auth/me`        | Retorna usuário logado                     | JWT  |
| GET    | `/projetos`       | Lista projetos (público)                   |  -   |
| POST   | `/projetos`       | Cria projeto (titulo, descricao, capa_url) | JWT  |
| PUT    | `/projetos/:id`   | Atualiza projeto                           | JWT  |
| DELETE | `/projetos/:id`   | Remove projeto                             | JWT  |
| POST   | `/uploads/imagem` | Upload de imagem (Multer) → `{ url }`      | JWT  |
| GET    | `/uploads/:file`  | Serve imagem estática                      |  -   |

> A API também aceita imagens em **`/api/uploads/...`**.

---

## ☁️ Deploy

### Front — **Vercel**
- **Project Root:** `src/Entrega 2/Frontend`
- **Framework Preset:** Vite  
- **Build Command:** `npm run build`  
- **Output Directory:** `dist`  
- **Environment (Production):**  
  `VITE_API_URL=https://SUA-API-PUBLICA.com/api`
- `vercel.json` dentro de `Frontend/`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

### Back — **Azure App Service** (ou Railway/Render)
- **Project Root:** `src/Entrega 2/Backend/server`
- **Start Command:** `npm start`
- **Env Vars:** copie de `server/.env.example` com valores reais
- **CORS_ORIGIN:** inclua `https://SEU-PROJETO.vercel.app` e, se desejar, `https://*.vercel.app` para previews
- **Health check:** `https://SUA-API-PUBLICA.com/api/health`

---

## 🔎 Testes Rápidos

```bash
# Health
curl https://SUA-API-PUBLICA.com/api/health

# Login (ajuste payload)
curl -X POST https://SUA-API-PUBLICA.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"perfil":"admin","email":"admin@alma.org","senha":"123456"}'

# Projetos
curl https://SUA-API-PUBLICA.com/api/projetos
```

---

## 🎥 Vídeo Demonstrativo
- Adicione aqui o link do vídeo (YouTube/Drive) mostrando:  
  **Projetos → Detalhe → Login Portal Alma → Painel Admin → CRUD com upload → Lista atualizada**.

---

## ✅ Requisitos Atendidos (2ª Entrega)
- SPA React (router, responsivo, mensagens de erro/loading)  
- Integração real Front ↔ Back (axios)  
- Autenticação JWT + rotas protegidas  
- CRUD completo + **upload** com Multer  
- Deploy completo (front + back)  
- README com instruções e links

---

## 📜 Licença
Escolha uma licença **Creative Commons** adequada em: <https://chooser-beta.creativecommons.org/>

---

## 🎓 Referências
1. <https://github.com/iuricode/readme-template>  
2. <https://github.com/gabrieldejesus/readme-model>  
3. <https://chooser-beta.creativecommons.org/>  
4. <https://www.toptal.com/developers/gitignore>
