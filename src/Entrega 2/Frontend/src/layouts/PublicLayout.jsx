// src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="public-app">
      <Header />
      <main className="conteudo">{/* conteúdo das páginas públicas */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
