import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Search, Mail, Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel — Mensagens recebidas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);

  // filters
  const [search, setSearch] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: roleRow, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!mounted) return;
      if (error || !roleRow) {
        toast.error("Acesso negado", { description: "Sua conta não tem permissão de admin." });
        await supabase.auth.signOut();
        navigate({ to: "/login" });
        return;
      }
      setAuthorized(true);
      setChecking(false);
      void load();
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) {
      toast.error("Erro ao carregar mensagens", { description: error.message });
    } else {
      setRows((data ?? []) as Submission[]);
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (nameFilter && !r.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      if (emailFilter && !r.email.toLowerCase().includes(emailFilter.toLowerCase())) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !r.name.toLowerCase().includes(s) &&
          !r.email.toLowerCase().includes(s) &&
          !r.message.toLowerCase().includes(s)
        )
          return false;
      }
      if (dateFrom) {
        if (new Date(r.created_at) < new Date(dateFrom + "T00:00:00")) return false;
      }
      if (dateTo) {
        if (new Date(r.created_at) > new Date(dateTo + "T23:59:59")) return false;
      }
      return true;
    });
  }, [rows, search, nameFilter, emailFilter, dateFrom, dateTo]);

  const clearFilters = () => {
    setSearch("");
    setNameFilter("");
    setEmailFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F3EE" }}>
        <Loader2 className="size-6 animate-spin" style={{ color: "#5A4637" }} />
      </main>
    );
  }
  if (!authorized) return null;

  const inputStyle: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(90,70,55,0.18)",
    color: "#1A1A1A",
    borderRadius: "12px",
    padding: "10px 12px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
  };
  const labelStyle: React.CSSProperties = {
    color: "#4B3A2E",
    letterSpacing: "0.18em",
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F7F3EE" }}>
      <header
        className="border-b"
        style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(90,70,55,0.10)" }}
      >
        <div className="container-px mx-auto max-w-7xl flex items-center justify-between py-5">
          <div>
            <p className="text-xs uppercase" style={{ color: "#8B6F5A", letterSpacing: "0.3em", fontWeight: 700 }}>
              Painel
            </p>
            <h1 className="font-display text-xl md:text-2xl font-bold mt-1" style={{ color: "#1A1A1A" }}>
              Mensagens recebidas
            </h1>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#5A4637", color: "#FFFFFF" }}
          >
            <LogOut className="size-4" />
            Sair
          </button>
        </div>
      </header>

      <section className="container-px mx-auto max-w-7xl py-8">
        {/* Filters */}
        <div
          className="rounded-2xl p-5 md:p-6 mb-6"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(90,70,55,0.10)",
            boxShadow: "0 20px 60px -45px rgba(58,46,37,0.18)",
          }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold uppercase mb-2" style={labelStyle}>
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: "#8B6F5A" }} />
                <input
                  type="text"
                  placeholder="nome, e-mail ou mensagem"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36 }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase mb-2" style={labelStyle}>
                Nome
              </label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase mb-2" style={labelStyle}>
                E-mail
              </label>
              <input
                type="text"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold uppercase mb-2" style={labelStyle}>
                  De
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-2" style={labelStyle}>
                  Até
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-xs" style={{ color: "#8B6F5A" }}>
              {filtered.length} de {rows.length} mensagens
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="text-xs px-4 py-2 rounded-full transition-colors"
                style={{ color: "#5A4637", border: "1px solid rgba(90,70,55,0.25)" }}
              >
                Limpar filtros
              </button>
              <button
                onClick={load}
                className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full text-white"
                style={{ backgroundColor: "#5A4637" }}
              >
                <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} />
                Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid rgba(90,70,55,0.10)",
            boxShadow: "0 20px 60px -45px rgba(58,46,37,0.18)",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#F7F3EE" }}>
                <tr>
                  <Th>Nome</Th>
                  <Th>E-mail</Th>
                  <Th>Mensagem</Th>
                  <Th>Recebida em</Th>
                </tr>
              </thead>
              <tbody>
                {loading && rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center" style={{ color: "#8B6F5A" }}>
                      <Loader2 className="size-5 animate-spin inline mr-2" /> Carregando…
                    </td>
                  </tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center" style={{ color: "#8B6F5A" }}>
                      Nenhuma mensagem encontrada.
                    </td>
                  </tr>
                )}
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className="cursor-pointer transition-colors hover:bg-[#F7F3EE]/60"
                    style={{ borderTop: "1px solid rgba(90,70,55,0.08)" }}
                  >
                    <Td>
                      <span style={{ color: "#1A1A1A", fontWeight: 600 }}>{r.name}</span>
                    </Td>
                    <Td>
                      <span style={{ color: "#5B5B5B" }}>{r.email}</span>
                    </Td>
                    <Td>
                      <span style={{ color: "#5B5B5B" }} className="line-clamp-1 max-w-md inline-block">
                        {r.message}
                      </span>
                    </Td>
                    <Td>
                      <span style={{ color: "#5B5B5B" }}>{formatDate(r.created_at)}</span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detail drawer */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ backgroundColor: "rgba(20,15,10,0.45)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 md:p-8"
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs uppercase" style={{ color: "#8B6F5A", letterSpacing: "0.3em", fontWeight: 700 }}>
              Mensagem
            </p>
            <h2 className="mt-2 font-display text-xl font-bold" style={{ color: "#1A1A1A" }}>
              {selected.name}
            </h2>
            <div className="mt-3 flex flex-wrap gap-3 text-xs" style={{ color: "#5B5B5B" }}>
              <span className="inline-flex items-center gap-1">
                <Mail className="size-3" /> {selected.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="size-3" /> {formatDate(selected.created_at)}
              </span>
            </div>
            <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "#1A1A1A" }}>
              {selected.message}
            </p>
            <div className="mt-6 flex items-center justify-end gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: contato pelo portfólio`}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: "#5A4637" }}
              >
                Responder
              </a>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full px-5 py-2.5 text-sm"
                style={{ color: "#5A4637", border: "1px solid rgba(90,70,55,0.25)" }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="text-left px-5 py-3 text-xs uppercase font-semibold"
      style={{ color: "#4B3A2E", letterSpacing: "0.18em" }}
    >
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4 align-top">{children}</td>;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
