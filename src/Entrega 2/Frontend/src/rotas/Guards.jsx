// src/rotas/Guards.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexto/Autenticacao";

export function RotaPrivada({ children }) {
  const { token } = useAuth();
  const loc = useLocation();
  if (!token) return <Navigate to="/PortalAlma" replace state={{ from: loc }} />;
  return children;
}

export function RotaAdmin({ children }) {
  const { token, usuario } = useAuth();
  const loc = useLocation();
  if (!token) return <Navigate to="/PortalAlma" replace state={{ from: loc }} />;
  if ((usuario?.papel || "").toLowerCase() !== "admin") return <Navigate to="/" replace />;
  return children;
}

export function RotaDoador({ children }) {
  const { token, usuario } = useAuth();
  const loc = useLocation();
  if (!token) return <Navigate to="/PortalAlma" replace state={{ from: loc }} />;
  if ((usuario?.papel || "").toLowerCase() !== "doador") return <Navigate to="/" replace />;
  return children;
}
