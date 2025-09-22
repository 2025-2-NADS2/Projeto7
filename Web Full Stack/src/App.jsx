import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Cabecalho from "./components/Header.jsx";
import Rodape from "./components/Footer.jsx";

import Inicio from "./pages/Inicio.jsx";
import Sobre from "./pages/Sobre.jsx";
import Projetos from "./pages/Projetos.jsx";
import ComoAjudar from "./pages/Comoajudar.jsx";
import Contato from "./pages/Contato.jsx";
import Doacoes from "./pages/Doacoes.jsx";

// Admin (na pasta pages/admin)
import Admin from "./pages/Admin.jsx";
import AdminAtividades from "./pages/admin/AdminAtividades.jsx";
import AdminEventos from "./pages/admin/AdminEventos.jsx";

import "./index.css";

export const ContextoAutenticacao = createContext({
  logado: false,
  setLogado: () => {},
});

export default function App() {
  const [logado, setLogado] = useState(
    () => localStorage.getItem("almaa_logged") === "1"
  );

  return (
    <ContextoAutenticacao.Provider value={{ logado, setLogado }}>
      <BrowserRouter>
        <div className="app">
          <Cabecalho />
          <main className="container">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/como-ajudar" element={<ComoAjudar />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/doacoes" element={<Doacoes />} />

              {/* Admin */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/atividades" element={<AdminAtividades />} />
              <Route path="/admin/eventos" element={<AdminEventos />} />
            </Routes>
          </main>
          <Rodape />
        </div>
      </BrowserRouter>
    </ContextoAutenticacao.Provider>
  );
}
