// src/contexto/Autenticacao.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const Ctx = createContext(null);

// helper: normaliza papel em "admin" | "doador"
function normalizeRole(u, fallbackPerfil) {
  const raw =
    u?.papel ??
    u?.role ??
    u?.tipo ??
    u?.perfil ??
    fallbackPerfil ??
    "";
  const v = String(raw).toLowerCase();
  if (v.includes("adm")) return "admin";
  if (v.includes("don") || v.includes("doa") || v === "doador") return "doador";
  // último recurso: se no portal escolheu "admin", mantém; caso contrário, "doador"
  return fallbackPerfil === "admin" ? "admin" : "doador";
}

export function AutenticacaoProvider({ children }) {
  const [perfil, setPerfil] = useState("doador"); // seleção no Portal
  const [token, setToken] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const online = typeof navigator !== "undefined" ? navigator.onLine : true;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("alma_auth");
      if (raw) {
        const saved = JSON.parse(raw);
        setToken(saved.token || "");
        setUsuario(saved.usuario || null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("alma_auth", JSON.stringify({ token, usuario }));
    } catch {}
  }, [token, usuario]);

  async function login(form) {
    setErro("");
    setLoading(true);
    try {
      const fd = form instanceof HTMLFormElement ? new FormData(form) : form;
      const email = fd.get ? String(fd.get("email") || "") : form.email;
      const senha = fd.get ? String(fd.get("senha") || "") : form.senha;

      if (!email || !senha) throw new Error("E-mail e senha são obrigatórios.");

      const resp = await api.login({ perfil, email, senha });
      // espera { token, usuario }, mas pode vir só token; tratamos ambos
      const tk = resp?.token || resp?.accessToken || "";
      const u  = resp?.usuario || resp?.user || null;

      const papel = normalizeRole(u, perfil);
      const uNorm = u ? { ...u, papel } : { email, papel };

      setToken(tk);
      setUsuario(uNorm);
      return { ok: true, papel };
    } catch (e) {
      setErro(e?.response?.data?.erro || e?.message || "Falha no login.");
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }

  function sair() {
    try { localStorage.removeItem("alma_auth"); } catch {}
    setToken("");
    setUsuario(null);
    window.location.href = "/PortalAlma";
  }

  const value = useMemo(
    () => ({ perfil, setPerfil, login, erro, loading, online, token, usuario, sair }),
    [perfil, erro, loading, online, token, usuario]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AutenticacaoProvider");
  return ctx;
}
