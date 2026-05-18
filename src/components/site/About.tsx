import { Lightbulb, Target, Cpu } from "lucide-react";
import workspace from "@/assets/workspace-hero.jpeg";
import { MobileAutoCarousel } from "./MobileAutoCarousel";

const cards = [
  {
    icon: Lightbulb,
    title: "Soluções Sob Medida",
    text: "Cada solução é desenvolvida de acordo com os processos, objetivos e necessidades específicas do seu negócio.",
  },
  {
    icon: Target,
    title: "Visão Orientada a Resultados",
    text: "Tecnologia aplicada com estratégia para gerar eficiência, organização e decisões mais assertivas.",
  },
  {
    icon: Cpu,
    title: "Tecnologia que Impulsiona",
    text: "Sistemas estruturados para automatizar operações e sustentar o crescimento com mais consistência.",
  },
];

export function About() {
  return (
    <section id="sobre" className="py-16 md:py-32" style={{ backgroundColor: "#F7F4EF" }}>
      <div className="container-px mx-auto max-w-[1200px]">
        <div
          className="relative overflow-hidden rounded-[32px] bg-white px-5 py-12 md:px-[70px] md:py-20"
          style={{
            boxShadow:
              "0 30px 80px -40px rgba(58,46,37,0.18), 0 8px 24px -16px rgba(17,17,17,0.04)",
            border: "1px solid rgba(90,70,55,0.10)",
          }}
        >
          <div className="relative text-center">
            <p
              className="text-[15px] font-bold uppercase"
              style={{ color: "#8B6F5A", letterSpacing: "0.25em" }}
            >
              Sobre mim
            </p>

            <h2 className="mt-6 font-display text-3xl md:text-5xl leading-[1.15] text-balance max-w-4xl mx-auto">
              <span className="font-extrabold text-[#1A1A1A]">
                Estratégia, criatividade
              </span>{" "}
              <span className="font-normal text-[#1A1A1A]">
                e tecnologia aplicadas ao
              </span>{" "}
              <span className="font-extrabold" style={{ color: "#8B6F5A" }}>
                seu negócio.
              </span>
            </h2>

            <div
              className="mt-6"
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "rgba(26,26,26,0.92)",
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: 1.9,
                letterSpacing: "-0.01em",
                textAlign: "center",
                maxWidth: "900px",
                margin: "1.5rem auto 0",
              }}
            >
              <p>
                Desenvolvo sistemas e aplicações sob medida para transformar
                necessidades de negócio em soluções estruturadas, funcionais e
                escaláveis.
              </p>
              <p style={{ marginTop: "28px" }}>
                Uno pensamento estratégico, criatividade e tecnologia para
                simplificar operações, automatizar processos e criar bases
                sólidas para o crescimento do negócio.
              </p>
            </div>

            {(() => {
              const renderCard = (c: typeof cards[number]) => (
                <div
                  key={c.title}
                  className="group transition-all duration-300 cursor-default p-5 md:p-8 rounded-[20px] md:rounded-[24px] h-full"
                  style={{
                    backgroundColor: "#F8F6F2",
                    border: "1px solid rgba(90,70,55,0.10)",
                    boxShadow: "0 10px 30px rgba(58,46,37,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow =
                      "0 30px 60px -20px rgba(58,46,37,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow =
                      "0 10px 30px rgba(58,46,37,0.06)";
                  }}
                >
                  <div
                    className="grid place-items-center transition-colors duration-300 group-hover:bg-[color:var(--brand-nude-hover)]"
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "14px",
                      backgroundColor: "#EFE8DF",
                      color: "#8B6F5A",
                    }}
                  >
                    <c.icon className="size-6" />
                  </div>
                  <h3
                    className="mt-6 transition-colors duration-300 group-hover:text-[color:var(--brand-nude-strong)]"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#1A1A1A",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.65,
                      color: "#5B5B5B",
                    }}
                  >
                    {c.text}
                  </p>
                </div>
              );

              return (
                <>
                  <div className="mt-10 sm:hidden text-left">
                    <MobileAutoCarousel perSlide={2} intervalMs={3000}>
                      {cards.map(renderCard)}
                    </MobileAutoCarousel>
                  </div>
                  <div className="hidden sm:grid mt-10 md:mt-16 grid-cols-3 gap-6 text-left">
                    {cards.map(renderCard)}
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        {/* Bloco institucional */}
        <div className="mt-12">
          <div
            className="overflow-hidden grid lg:grid-cols-12 gap-0 items-stretch"
            style={{
              borderRadius: "32px",
              backgroundImage:
                "linear-gradient(135deg, #5A4637 0%, #3A2E25 100%)",
              boxShadow:
                "0 30px 80px -30px rgba(58,46,37,0.55)",
            }}
          >
            <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8">
              <img
                src={workspace}
                alt="Workspace premium com notebook exibindo dashboard Conecta+, smartphone, planner Beatriz Natália, caneca e letreiro iluminado"
                width={1536}
                height={1024}
                loading="lazy"
                className="w-full h-auto object-cover lg:h-full"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
                  maxHeight: "420px",
                  aspectRatio: "3 / 2",
                }}
              />
            </div>
            <div className="lg:col-span-7 px-6 pb-10 pt-4 sm:px-8 sm:pb-12 lg:py-16 lg:pr-14 lg:pl-4 text-center lg:text-left flex flex-col justify-center">
              <h3
                className="font-display text-white text-3xl md:text-[34px] lg:text-[36px]"
                style={{ lineHeight: 1.2, letterSpacing: "-0.01em" }}
              >
                <span style={{ fontWeight: 800 }}>Tecnologia</span>{" "}
                <span style={{ fontWeight: 400 }}>com</span>{" "}
                <span style={{ fontWeight: 400, color: "#8B6F5A" }}>propósito.</span>
              </h3>
              <p
                className="mt-5 mx-auto lg:mx-0"
                style={{
                  color: "#FFFFFF",
                  opacity: 0.88,
                  fontSize: "17px",
                  lineHeight: 1.75,
                  fontWeight: 400,
                  maxWidth: "520px",
                }}
              >
                Projetos desenvolvidos com estratégia, clareza e foco em gerar valor real
                para o seu negócio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
