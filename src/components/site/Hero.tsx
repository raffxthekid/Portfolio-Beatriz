import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative pt-28 md:pt-40 pb-16 md:pb-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #F7F4EF 0%, #EFE8DF 100%)",
      }}
    >
      <div
        aria-hidden
        // allow-mobile-overflow — decorative blur, parent <section> has overflow-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,111,90,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        // allow-mobile-overflow — decorative blur, parent <section> has overflow-hidden
        className="pointer-events-none absolute top-1/3 -right-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(90,70,55,0.14), transparent 70%)",
        }}
      />

      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative">
        <div className="lg:col-span-9">
          <span
            className="hero-fade inline-flex items-center gap-2 font-nav"
            style={{
              color: "#111111",
              backgroundColor: "#F8F6F2",
              borderRadius: "999px",
              padding: "8px 18px",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#111111" }}
            />
            Sistemas · Aplicativos · Estratégia
          </span>

          <h1 className="hero-fade hero-fade-delay-1 mt-6 font-display text-4xl sm:text-5xl lg:text-[68px] leading-[1.05] font-extrabold text-balance tracking-[-0.025em]" style={{ color: "#1A1A1A" }}>
            Transformo ideias em{" "}
            <span
              className="relative inline-block"
              style={{ color: "#5A4637" }}
            >
              sistemas
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-1 h-[6px] rounded-full opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, #8B6F5A, #3A2E25)",
                }}
              />
            </span>{" "}
            e aplicativos que otimizam e escalam o seu negócio.
          </h1>

          <div className="hero-fade hero-fade-delay-3 mt-8 md:mt-12 md:pl-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                backgroundColor: "#5A4637",
                boxShadow:
                  "0 14px 30px -12px rgba(58,46,37,0.45), 0 2px 6px -2px rgba(58,46,37,0.3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3A2E25")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5A4637")}
            >
              Ver Projetos
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#sobre"
              className="font-nav text-[14px] font-semibold tracking-wide transition-colors hover:opacity-80"
              style={{ color: "#3A2E25" }}
            >
              Sobre mim →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
