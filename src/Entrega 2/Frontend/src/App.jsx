// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { RotaAdmin, RotaDoador } from "./rotas/Guards";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import LayoutDoador from "./layouts/LayoutDoador";

import Inicio from "./pages/Inicio";
import Sobre from "./pages/Sobre";
import Projetos from "./pages/Projetos";
import ProjetoDetalhe from "./pages/ProjetoDetalhe";
import ComoAjudar from "./pages/ComoAjudar"; // <-- nome/case corretos
import Contato from "./pages/Contato";
import Doacoes from "./pages/Doacoes";
import PortalAlma from "./pages/PortalAlma";
import Logout from "./pages/Logout";
import Evento from "./pages/Eventos";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAtividades from "./pages/admin/AdminAtividades";
import AdminEventos from "./pages/admin/AdminEventos";
import AdminTransparencia from "./pages/admin/AdminTransparencia";
import AdminDoacoes from "./pages/admin/AdminDoacoes";
import AdminMensagens from "./pages/admin/AdminMensagens";

import DoadorPainel from "./pages/doador/DoadorPainel";
import DoadorDoacoes from "./pages/doador/DoadorDoacoes";
import DoadorRecibos from "./pages/doador/DoadorRecibos";
import DoadorMensagens from "./pages/doador/DoadorMensagens";
import DoadorPerfil from "./pages/doador/DoadorPerfil";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
        <Route path="/como-ajudar" element={<ComoAjudar />} /> {/* <-- rota amigável */}
        <Route path="/contato" element={<Contato />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/eventos" element={<Evento />} />
        <Route path="/PortalAlma" element={<PortalAlma />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <RotaAdmin>
            <AdminLayout />
          </RotaAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="atividades" element={<AdminAtividades />} />
        <Route path="eventos" element={<AdminEventos />} />
        <Route path="transparencia" element={<AdminTransparencia />} />
        <Route path="doacoes" element={<AdminDoacoes />} />
        <Route path="mensagens" element={<AdminMensagens />} />
      </Route>

      <Route
        path="/doador/*"
        element={
          <RotaDoador>
            <LayoutDoador />
          </RotaDoador>
        }
      >
        <Route index element={<DoadorPainel />} />
        <Route path="doacoes" element={<DoadorDoacoes />} />
        <Route path="recibos" element={<DoadorRecibos />} />
        <Route path="mensagens" element={<DoadorMensagens />} />
        <Route path="perfil" element={<DoadorPerfil />} />
      </Route>
    </Routes>
  );
}
