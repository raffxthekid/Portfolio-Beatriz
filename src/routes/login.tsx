import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Acesso restrito — Painel" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Conta criada", { description: "Você já pode entrar." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro inesperado";
      toast.error("Não foi possível autenticar", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) {
      toast.error("Falha no login com Google");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#F7F3EE" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 md:p-10"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(90,70,55,0.10)",
          boxShadow: "0 30px 80px -50px rgba(58,46,37,0.25)",
        }}
      >
        <p
          className="text-xs uppercase"
          style={{ color: "#8B6F5A", letterSpacing: "0.3em", fontWeight: 700 }}
        >
          Acesso restrito
        </p>
        <h1
          className="mt-3 font-display text-2xl md:text-3xl font-bold"
          style={{ color: "#1A1A1A" }}
        >
          {mode === "signin" ? "Entrar no painel" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#5B5B5B" }}>
          Área exclusiva para gerenciar as mensagens recebidas.
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#1A1A1A",
            border: "1px solid rgba(90,70,55,0.18)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
          </svg>
          Continuar com Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(90,70,55,0.15)" }} />
          <span className="text-xs uppercase" style={{ color: "#8B6F5A", letterSpacing: "0.2em" }}>
            ou
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(90,70,55,0.15)" }} />
        </div>

        <form onSubmit={handleEmailAuth} className="grid gap-4">
          <div>
            <label htmlFor="lg-email" className="block text-xs font-semibold uppercase mb-2"
              style={{ color: "#4B3A2E", letterSpacing: "0.18em" }}>
              E-mail
            </label>
            <input
              id="lg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(90,70,55,0.18)",
                color: "#1A1A1A",
              }}
            />
          </div>
          <div>
            <label htmlFor="lg-pass" className="block text-xs font-semibold uppercase mb-2"
              style={{ color: "#4B3A2E", letterSpacing: "0.18em" }}>
              Senha
            </label>
            <input
              id="lg-pass"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid rgba(90,70,55,0.18)",
                color: "#1A1A1A",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-70"
            style={{ backgroundColor: "#5A4637" }}
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-xs underline"
          style={{ color: "#8B6F5A" }}
        >
          {mode === "signin"
            ? "Primeiro acesso? Criar conta"
            : "Já tem conta? Entrar"}
        </button>
      </div>
    </main>
  );
}
