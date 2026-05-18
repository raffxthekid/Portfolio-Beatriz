import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import trainer1 from "@/assets/trainer-new-1.png";
import trainer2 from "@/assets/trainer-new-2.png";
import trainer3 from "@/assets/trainer-new-3.png";
import trainer4 from "@/assets/trainer-new-4.png";
import conecta1 from "@/assets/conecta-new-1.png";
import conecta2 from "@/assets/conecta-new-2.png";
import conecta3 from "@/assets/conecta-new-3.png";
import conecta4 from "@/assets/conecta-new-4.png";

type Project = {
  name: string;
  tag: string;
  images: string[];
  description: string;
  highlights: string[];
  longDescription: string;
  stack: string[];
  gallery: string[];
};

const projects: Project[] = [
  {
    name: "TrainerOS",
    tag: "Plataforma SaaS para personal trainers",
    images: [trainer1, trainer2, trainer3, trainer4],
    description:
      "Projeto autoral desenvolvido para centralizar a gestão operacional de personal trainers, reunindo alunos, treinos, avaliações físicas, financeiro, relatórios e recursos com inteligência artificial em uma única plataforma.",
    highlights: [
      "Gestão de alunos",
      "Avaliações físicas",
      "Prescrição de treinos",
      "Financeiro integrado",
      "App PWA",
      "IA Coach",
    ],
    longDescription:
      "O TrainerOS nasceu da observação de um problema real: personal trainers gerenciando alunos em planilhas, blocos de notas e múltiplos aplicativos desconectados. A plataforma reúne, em um único ambiente, gestão de alunos, prescrição de treinos, avaliações físicas, controle financeiro, relatórios de evolução e um assistente de IA que apoia o profissional na tomada de decisão. O produto foi concebido como um SaaS escalável, com PWA para uso fluido em qualquer dispositivo e arquitetura preparada para crescer junto com a base de usuários.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "OpenAI API",
      "PWA",
    ],
    gallery: [trainer1, trainer2, trainer3, trainer4],
  },
  {
    name: "Conecta+",
    tag: "Plataforma de networking e inteligência comercial",
    images: [conecta1, conecta2, conecta3, conecta4],
    description:
      "Projeto autoral criado para conectar empreendedores a fornecedores confiáveis, tendências de mercado, comunidade e ferramentas estratégicas para estruturar e lançar marcas com mais segurança e direção.",
    highlights: [
      "Ranking de fornecedores",
      "Comunidade colaborativa",
      "Mensagens e interações",
      "Tendências e insights",
      "Painel administrativo",
      "Links e anotações",
    ],
    longDescription:
      "O Conecta+ foi idealizado para resolver uma das maiores dores de quem empreende: encontrar fornecedores confiáveis e ter clareza sobre o mercado antes de lançar uma marca. A plataforma combina um ranking curado de fornecedores, comunidade colaborativa, mensagens diretas, tendências, painel administrativo e ferramentas pessoais como links e anotações. Tudo pensado para reduzir o tempo entre a ideia e a execução, oferecendo inteligência comercial e networking qualificado em um só lugar.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Edge Functions",
      "Realtime",
      "Storage",
    ],
    gallery: [conecta1, conecta2, conecta3, conecta4],
  },
];

function ProjectGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="w-full max-w-full min-w-0">
      <div
        className="relative w-full max-w-full overflow-hidden p-4 sm:p-6"
        style={{
          backgroundColor: "#F8F6F2",
          borderRadius: "24px",
        }}
      >
        <div
          className="relative w-full max-w-full overflow-hidden mx-auto"
          style={{
            aspectRatio: "16 / 10",
            borderRadius: "16px",
            boxShadow: "0 20px 50px -20px rgba(58,46,37,0.25)",
            backgroundColor: "#FFFFFF",
          }}
        >
          {images.map((src, i) => {
            const isActive = i === index;
            const offset = i === index ? 0 : i < index ? -16 : 16;
            return (
              <img
                key={src + i}
                src={src}
                alt={`Mockup do projeto ${name} — slide ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center will-change-[opacity,transform]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translate3d(${offset}px, 0, 0) scale(${isActive ? 1 : 1.02})`,
                  transition:
                    "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            );
          })}
        </div>
        {images.length > 1 && (
          <div className="mt-5 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 18 : 6,
                  backgroundColor: i === index ? "#5A4637" : "rgba(90,70,55,0.30)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onChange,
  name,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
  name: string;
}) {
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useRef(`lightbox-title-${Math.random().toString(36).slice(2, 9)}`).current;
  const descId = useRef(`lightbox-desc-${Math.random().toString(36).slice(2, 9)}`).current;

  const prev = () => onChange((index - 1 + images.length) % images.length);
  const next = () => onChange((index + 1) % images.length);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    // Initial focus on the close button for predictable SR/keyboard entry
    closeBtnRef.current?.focus();

    const getFocusable = (): HTMLElement[] => {
      if (!containerRef.current) return [];
      return Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true",
      );
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        onChange(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        onChange(images.length - 1);
        return;
      }
      if (e.key === "Tab") {
        const focusables = getFocusable();
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const withinContainer = containerRef.current?.contains(active ?? null);
        if (!withinContainer) {
          e.preventDefault();
          first.focus();
          return;
        }
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Restore focus to the element that opened the lightbox
      previouslyFocused?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(15,10,8,0.96)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <h2 id={titleId} className="sr-only">
        {`Visualização ampliada — ${name}`}
      </h2>
      <p id={descId} className="sr-only">
        Use as setas esquerda e direita para navegar entre as imagens, Home e End para ir à
        primeira ou última, e Esc para fechar. Use Tab para circular entre os controles.
      </p>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Imagem ${index + 1} de ${images.length} — ${name}`}
      </div>

      <button
        ref={closeBtnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fechar visualização ampliada"
        className="absolute top-5 right-5 z-10 grid place-items-center h-11 w-11 rounded-full transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#FFFFFF",
        }}
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Imagem anterior"
            aria-controls={titleId}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-12 w-12 rounded-full transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#FFFFFF",
            }}
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Próxima imagem"
            aria-controls={titleId}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 grid place-items-center h-12 w-12 rounded-full transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#FFFFFF",
            }}
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </>
      )}

      <div
        className="relative w-[92vw] h-[82vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={`${name} — screenshot ${index + 1} de ${images.length}`}
          className="max-w-full max-h-full object-contain rounded-[12px] select-none"
          draggable={false}
          style={{ animation: "hero-fade-up 220ms ease-out both" }}
        />
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs"
        style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em" }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  if (!project) return null;
  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 border-0 sm:rounded-[28px]"
        style={{ backgroundColor: "#2B211B", color: "#FFFFFF" }}
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Fechar"
          className="absolute top-5 right-5 z-10 grid place-items-center h-10 w-10 rounded-full transition-all hover:scale-105"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "#FFFFFF",
          }}
        >
          <X className="size-4" />
        </button>

        <div className="p-8 md:p-12">
          <p
            className="font-semibold uppercase"
            style={{
              color: "#D6C1B0",
              fontSize: "12px",
              letterSpacing: "0.18em",
              fontWeight: 700,
            }}
          >
            {project.tag}
          </p>
          <DialogTitle
            className="mt-3 font-display text-3xl md:text-5xl text-white"
            style={{ fontWeight: 800 }}
          >
            {project.name}
          </DialogTitle>
          <DialogDescription
            className="mt-5"
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {project.longDescription}
          </DialogDescription>

          <div className="mt-10">
            <p
              className="font-semibold uppercase mb-4"
              style={{
                color: "#D6C1B0",
                fontSize: "11px",
                letterSpacing: "0.22em",
              }}
            >
              Principais recursos
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  <span
                    className="mt-0.5 grid place-items-center h-4 w-4 rounded-full shrink-0"
                    style={{ backgroundColor: "#E8DCCF" }}
                  >
                    <Check className="size-3" style={{ color: "#2B211B" }} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p
              className="font-semibold uppercase mb-4"
              style={{
                color: "#D6C1B0",
                fontSize: "11px",
                letterSpacing: "0.22em",
              }}
            >
              Galeria
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.gallery.map((src, i) => (
                <button
                  type="button"
                  key={src + i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Ampliar screenshot ${i + 1}`}
                  className="group relative overflow-hidden rounded-[16px] cursor-zoom-in"
                  style={{ aspectRatio: "4 / 5", backgroundColor: "#1F1814" }}
                >
                  <img
                    src={src}
                    alt={`${project.name} — screenshot ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span
                    className="absolute top-2.5 right-2.5 grid place-items-center h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.55)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#FFFFFF",
                    }}
                  >
                    <ZoomIn className="size-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contato"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#2B211B",
                boxShadow: "0 18px 40px -20px rgba(0,0,0,0.45)",
              }}
            >
              Conversar sobre um projeto <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    {lightboxIndex !== null && (
      <Lightbox
        images={project.gallery}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
        name={project.name}
      />
    )}
    </>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openProject = (p: Project) => {
    setActiveProject(p);
    setModalOpen(true);
  };

  return (
    <section
      id="projetos"
      className="pt-10 pb-16 md:pt-16 md:pb-32 w-full max-w-full overflow-x-hidden"
      style={{ backgroundColor: "#3A2E25" }}
    >
      <div className="container-px mx-auto max-w-7xl w-full max-w-full overflow-x-hidden">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <p
            className="text-xs font-bold uppercase"
            style={{ color: "#E7DDD1", letterSpacing: "0.3em" }}
          >
            Projetos autorais
          </p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-balance text-white" style={{ lineHeight: 1.15 }}>
            <span style={{ fontWeight: 800 }}>Produtos digitais</span>{" "}
            <span style={{ fontWeight: 400 }}>idealizados e desenvolvidos</span>{" "}
            <span style={{ fontWeight: 800 }}>para resolver</span>{" "}
            <span style={{ fontWeight: 400, color: "#8B6F5A" }}>problemas reais.</span>
          </h2>
          <p className="mt-5 text-lg" style={{ color: "#E7DDD1" }}>
            Da estratégia ao desenvolvimento, cada projeto foi concebido para validar oportunidades, estruturar operações e criar ativos digitais escaláveis.
          </p>
        </div>

        <div className="space-y-6 md:space-y-10">
          {projects.map((p, idx) => (
            <article
              key={p.name}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-stretch transition-all duration-300 hover:-translate-y-1 p-5 sm:p-6 md:p-12 lg:p-[48px] w-full max-w-full overflow-hidden"
              style={{
                backgroundColor: "var(--brand-nude-soft)",
                border: "1px solid #E8E3DA",
                borderRadius: "28px",
                boxShadow: "0 30px 80px rgba(58,46,37,0.12)",
              }}
            >
              <div className={`order-1 lg:col-span-7 flex items-center min-w-0 w-full max-w-full ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <ProjectGallery images={p.images} name={p.name} />
              </div>
              <div className="order-2 lg:col-span-5 flex flex-col min-w-0 w-full max-w-full break-words">
                <p
                  className="font-semibold uppercase"
                  style={{
                    color: "var(--brand-nude)",
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    fontWeight: 700,
                  }}
                >
                  {p.tag}
                </p>
                <h3
                  className="mt-3 font-display text-3xl md:text-4xl lg:min-h-[48px]"
                  style={{ fontWeight: 800, color: "#1A1A1A" }}
                >
                  {p.name}
                </h3>
                <p
                  className="mt-4 lg:min-h-[200px]"
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.8,
                    color: "rgba(26,26,26,0.85)",
                  }}
                >
                  {p.description}
                </p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 lg:min-h-[120px]">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "#1A1A1A" }}
                    >
                      <span
                        className="mt-0.5 grid place-items-center h-4 w-4 rounded-full shrink-0"
                        style={{ backgroundColor: "var(--brand-nude)" }}
                      >
                        <Check className="size-3" style={{ color: "#FFFFFF" }} strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openProject(p)}
                  className="mt-8 lg:mt-auto lg:pt-8 self-start inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid var(--brand-nude)",
                    color: "var(--brand-nude-strong)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--brand-nude)";
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.boxShadow = "0 18px 40px -20px rgba(58,46,37,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--brand-nude-strong)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Ver Projeto <ArrowUpRight className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  );
}
