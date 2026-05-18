import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const items = [
  {
    name: "Carlos Mendes",
    role: "Personal Trainer",
    text: "A plataforma que a Beatriz desenvolveu transformou minha operação. Hoje gerencio o triplo de alunos com metade do esforço.",
    initials: "CM",
  },
  {
    name: "Juliana Ramos",
    role: "Empresária",
    text: "Profissionalismo do começo ao fim. O sistema ficou exatamente como eu imaginava — mas muito melhor executado.",
    initials: "JR",
  },
  {
    name: "Rafael Souza",
    role: "Corretor de Imóveis",
    text: "O CRM que ela construiu organizou minhas leads, automatizou follow-ups e aumentou minha conversão em 40%.",
    initials: "RS",
  },
];

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    const el = itemRefs.current[clamped];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveIndex(clamped);
  }, []);

  // Sync active index with scroll position (e.g. after swipe)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let nearestDist = Infinity;
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const elCenter = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(elCenter - center);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = i;
          }
        });
        setActiveIndex(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      scrollToIndex(items.length - 1);
    }
  };

  return (
    <section
      id="depoimentos"
      className="py-16 md:py-32"
      style={{ backgroundColor: "#F7F4EF" }}
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2
            className="font-display text-3xl md:text-5xl font-bold text-balance"
            style={{ color: "#111111" }}
          >
            Resultados percebidos por quem confiou no meu trabalho.
          </h2>
        </div>

        <div className="md:hidden">
          <div
            ref={trackRef}
            role="region"
            aria-label="Carrossel de depoimentos"
            aria-roledescription="carrossel"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5A4637] rounded-[24px]"
          >
            {items.map((t, i) => (
              <figure
                key={t.name}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                aria-roledescription="slide"
                aria-label={`Depoimento ${i + 1} de ${items.length}`}
                aria-current={i === activeIndex}
                className="snap-center shrink-0 w-[88%] rounded-[24px] bg-white p-7 relative"
                style={{
                  border: "1px solid #E8E3DA",
                  boxShadow: "0 12px 40px -28px rgba(17,17,17,0.18)",
                }}
              >
                <Quote className="absolute top-6 right-6 size-7" style={{ color: "#E8E3DA" }} />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4" style={{ fill: "#111111", color: "#111111" }} />
                  ))}
                </div>
                <blockquote className="leading-relaxed text-[15px]" style={{ color: "#111111" }}>
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full grid place-items-center text-sm font-bold font-display text-white"
                    style={{ backgroundColor: "#111111" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#111111" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#5F5F5F" }}>{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Controls: prev/next + dots */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Depoimento anterior"
              className="grid place-items-center h-11 w-11 rounded-full border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5A4637] hover:text-white"
              style={{ borderColor: "#5A4637", color: "#5A4637" }}
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
              {items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Ir para depoimento ${i + 1}: ${t.name}`}
                  onClick={() => scrollToIndex(i)}
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    backgroundColor: i === activeIndex ? "#5A4637" : "rgba(90,70,55,0.30)",
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === items.length - 1}
              aria-label="Próximo depoimento"
              className="grid place-items-center h-11 w-11 rounded-full border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#5A4637] hover:text-white"
              style={{ borderColor: "#5A4637", color: "#5A4637" }}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure
              key={t.name}
              className="rounded-[24px] bg-white p-8 relative transition-all duration-300"
              style={{
                border: "1px solid #E8E3DA",
                boxShadow: "0 12px 40px -28px rgba(17,17,17,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 30px 60px -20px rgba(17,17,17,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 40px -28px rgba(17,17,17,0.18)";
              }}
            >
              <Quote className="absolute top-6 right-6 size-8" style={{ color: "#E8E3DA" }} />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4" style={{ fill: "#111111", color: "#111111" }} />
                ))}
              </div>
              <blockquote className="leading-relaxed" style={{ color: "#111111" }}>
                "{t.text}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div
                  className="h-11 w-11 rounded-full grid place-items-center text-sm font-bold font-display text-white"
                  style={{ backgroundColor: "#111111" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#111111" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#5F5F5F" }}>{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
