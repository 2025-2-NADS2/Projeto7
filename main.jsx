import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AutenticacaoProvider } from "./contexto/Autenticacao.jsx";

// IMPORTANTE: importe o CSS global aqui
import "./index.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AutenticacaoProvider>
        <App />
      </AutenticacaoProvider>
    </BrowserRouter>
  </React.StrictMode>
);
