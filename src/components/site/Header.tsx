import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    // Track ratios so the most-visible section wins, even with varying heights.
    const ratios = new Map<string, number>();
    let rafId: number | null = null;
    let lastApplied = "#inicio";

    const flush = () => {
      rafId = null;
      let bestHref = lastApplied;
      let bestRatio = 0;
      ratios.forEach((ratio, href) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestHref = href;
        }
      });
      if (bestRatio > 0 && bestHref !== lastApplied) {
        lastApplied = bestHref;
        // Functional update bails out internally if value is unchanged.
        setActive((prev) => (prev === bestHref ? prev : bestHref));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set("#" + entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        // Coalesce bursts of entries into a single update per frame.
        if (rafId === null) rafId = window.requestAnimationFrame(flush);
      },
      {
        rootMargin: "-80px 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85, 1],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // Debounce + lock to prevent stacked smooth-scrolls during rapid clicks.
  const navTimerRef = useRef<number | null>(null);
  const navLockRef = useRef(false);
  const lastHrefRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (navTimerRef.current !== null) window.clearTimeout(navTimerRef.current);
    };
  }, []);

  // Mobile menu refs for focus management.
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Focus trap + Escape close + restore focus when the mobile menu opens.
  useEffect(() => {
    if (!open) return;

    const panel = mobileNavRef.current;
    if (!panel) return;

    lastFocusedRef.current = (document.activeElement as HTMLElement) || null;

    const getFocusable = (): HTMLElement[] => {
      const selector =
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(panel.querySelectorAll<HTMLElement>(selector)).filter(
        (el) =>
          !el.hasAttribute("inert") &&
          !el.closest("[inert]") &&
          !el.closest('[aria-hidden="true"]'),
      );
    };

    // Move focus into the panel on open.
    const focusables = getFocusable();
    const first = focusables[0];
    if (first) window.requestAnimationFrame(() => first.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      // If focus escaped the panel, pull it back in.
      if (!activeEl || !panel.contains(activeEl)) {
        e.preventDefault();
        (e.shiftKey ? lastEl : firstEl).focus();
        return;
      }

      if (e.shiftKey && activeEl === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus to the toggle (or the previously focused element).
      const restoreTarget = toggleBtnRef.current ?? lastFocusedRef.current;
      restoreTarget?.focus?.();
    };
  }, [open]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    setOpen(false);

    // Always remember the latest target so the trailing call wins.
    lastHrefRef.current = href;

    // If a scroll is already in flight, just update target and skip.
    if (navLockRef.current) return;

    if (navTimerRef.current !== null) window.clearTimeout(navTimerRef.current);
    navTimerRef.current = window.setTimeout(() => {
      navTimerRef.current = null;
      const target = lastHrefRef.current;
      if (!target) return;
      const node = document.querySelector(target) as HTMLElement | null;
      if (!node) return;

      navLockRef.current = true;
      const top = node.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });

      // Release the lock after the smooth scroll typically settles.
      window.setTimeout(() => {
        navLockRef.current = false;
      }, 600);
    }, 90);
  };

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "top-3 md:top-4" : "top-4 md:top-6"
      }`}
    >
      {/* Skip link for keyboard / screen reader users */}
      <a
        href="#inicio"
        onClick={(e) => handleNav(e, "#inicio")}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[color:var(--brand-purple-dark)] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)]"
      >
        Pular para o conteúdo
      </a>
      <div
        className={`mx-auto max-w-6xl flex items-center justify-between h-14 md:h-16 px-4 md:px-6 rounded-full border transition-all duration-500`}
        style={{
          marginLeft: "1rem",
          marginRight: "1rem",
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(90,70,55,0.08)",
          boxShadow: scrolled
            ? "0 18px 50px rgba(58,46,37,0.12)"
            : "0 12px 40px rgba(58,46,37,0.08)",
        }}
      >
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleNav(e, "#inicio")}
          className="flex items-center gap-3 group"
          aria-label="Ir para o início"
        >
          <span
            className="rounded-full grid place-items-center font-display font-semibold text-white transition-transform duration-300 group-hover:scale-[1.05]"
            style={{
              backgroundColor: "var(--brand-nude)",
              height: "36px",
              width: "36px",
              fontSize: "13px",
              letterSpacing: "0.02em",
            }}
          >
            BN
          </span>
          <span className="leading-tight hidden sm:block">
            <span className="block font-display font-semibold tracking-tight text-[15px]" style={{ color: "#111111" }}>
              Beatriz Natália
            </span>
            <span
              className="block text-[11px] font-semibold uppercase"
              style={{ color: "#1A1A1A", letterSpacing: "0.18em" }}
            >
              Sistemas &amp; Aplicativos
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                aria-current={isActive ? "page" : undefined}
                className="font-nav relative text-[15px] tracking-wide py-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-nude)] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md transition-[font-weight,color] duration-200 hover:font-bold"
                style={{
                  color: "#111111",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ease-out ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                  style={{ background: "var(--brand-nude)" }}
                />
              </a>
            );
          })}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#projetos"
            onClick={(e) => handleNav(e, "#projetos")}
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold font-nav text-white transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              background: "linear-gradient(135deg, #5A4637 0%, #3A2E25 100%)",
              boxShadow: "0 14px 30px -12px rgba(58,46,37,0.5)",
            }}
          >
            Ver Projetos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <button
            ref={toggleBtnRef}
            type="button"
            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-haspopup="menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden h-11 w-11 grid place-items-center rounded-full bg-white/80 backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-nude)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            style={{ border: "1px solid rgba(90,70,55,0.12)", color: "#3A2E25" }}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (floating panel) */}
      <div
        ref={mobileNavRef}
        id="mobile-nav"
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as undefined } : {})}
        className={`lg:hidden mx-4 mt-2 overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl transition-[max-height,opacity,transform] duration-400 ease-out ${
          open ? "max-h-[560px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
        style={{
          border: "1px solid rgba(90,70,55,0.10)",
          boxShadow: "0 24px 60px -30px rgba(58,46,37,0.35)",
        }}
      >
        <nav className="px-4 py-5 flex flex-col gap-1" aria-label="Navegação mobile">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                aria-current={isActive ? "page" : undefined}
                className="font-nav group flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-nude)]"
                style={{
                  color: isActive ? "#8B6F5A" : "#3A2E25",
                  backgroundColor: isActive ? "#EFE8DF" : "transparent",
                }}
              >
                <span>{l.label}</span>
                <span
                  aria-hidden="true"
                  className={`h-[2px] w-6 rounded-full transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ background: "#8B6F5A" }}
                />
              </a>
            );
          })}
          <a
            href="#projetos"
            onClick={(e) => handleNav(e, "#projetos")}
            className="font-nav mt-3 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #5A4637 0%, #3A2E25 100%)",
            }}
          >
            Ver Projetos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
