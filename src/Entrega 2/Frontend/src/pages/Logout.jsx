import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexto/Autenticacao.jsx";

export default function Logout() {
  const { sair } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    sair();
    nav("/PortalAlma", { replace: true }); // volta pro login
  }, [sair, nav]);

  return <div style={{padding:16}}>Saindo…</div>;
}
