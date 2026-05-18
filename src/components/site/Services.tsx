import {
  Bot, Globe, Users, BarChart3, Smartphone, Plug, Layers, Wrench, ArrowUpRight,
} from "lucide-react";
import { MobileAutoCarousel } from "./MobileAutoCarousel";

const services = [
  { icon: Bot, title: "Automação com IA", text: "Agentes e fluxos com IA que reduzem trabalho repetitivo e aceleram operações." },
  { icon: Globe, title: "Sistemas Web Sob Medida", text: "Sistemas internos sob medida, do mapeamento de processos ao deploy." },
  { icon: Users, title: "CRM Personalizado", text: "Gestão de clientes, funis, automações e indicadores no seu fluxo de venda." },
  { icon: BarChart3, title: "Dashboards e BI", text: "Painéis com métricas em tempo real, BI e relatórios orientados a decisão." },
  { icon: Smartphone, title: "Aplicativos PWA", text: "Apps web progressivos rápidos, offline-first e instaláveis em qualquer dispositivo." },
  { icon: Plug, title: "Integrações e APIs", text: "Conecte sistemas, gateways e ferramentas com APIs robustas e documentadas." },
  { icon: Layers, title: "Desenvolvimento SaaS", text: "Plataformas multitenant escaláveis com billing, autenticação e painel completo." },
  { icon: Wrench, title: "Suporte Evolutivo", text: "Acompanhamento contínuo, evolução do produto e SLA dedicado." },
];

export function Services() {
  return (
    <section id="servicos" className="pt-10 pb-16 md:pt-16 md:pb-32" style={{ backgroundColor: "#F7F4EF" }}>
      <div className="container-px mx-auto max-w-7xl">
        <div
          className="rounded-[32px] p-6 md:p-14"
          style={{
            backgroundColor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(90,70,55,0.10)",
            boxShadow: "0 30px 80px -50px rgba(58,46,37,0.18)",
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <p
              className="text-xs font-bold uppercase"
              style={{ color: "#8B6F5A", letterSpacing: "0.3em" }}
            >
              Serviços
            </p>
            <h2
              className="mt-4 font-display text-3xl md:text-5xl font-bold text-balance"
              style={{ color: "#1A1A1A" }}
            >
              Transformo operações em sistemas que geram escala.
            </h2>
          </div>

          {(() => {
            const renderCard = (s: typeof services[number]) => (
              <article
                key={s.title}
                className="group relative rounded-[20px] md:rounded-[24px] p-5 md:p-8 overflow-hidden transition-all duration-300 cursor-default h-full"
                style={{
                  backgroundColor: "var(--brand-nude-light)",
                  border: "1px solid rgba(90,70,55,0.14)",
                  color: "#1A1A1A",
                  boxShadow: "0 10px 30px rgba(58,46,37,0.08)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 30px 60px -20px rgba(58,46,37,0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 10px 30px rgba(58,46,37,0.08)";
                }}
              >
                <div
                  className="h-11 w-11 rounded-xl grid place-items-center transition-colors duration-300 group-hover:bg-[color:var(--brand-nude-hover)]"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "var(--brand-nude)",
                  }}
                >
                  <s.icon className="size-5" />
                </div>
                <h3 className="mt-6 font-display font-semibold text-lg transition-colors duration-300 group-hover:text-[color:var(--brand-nude-strong)]">
                  {s.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#5B5B5B" }}
                >
                  {s.text}
                </p>
                <ArrowUpRight
                  className="absolute top-6 right-6 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "var(--brand-nude)" }}
                />
              </article>
            );

            return (
              <>
                <div className="lg:hidden">
                  <MobileAutoCarousel perSlide={2} intervalMs={3000}>
                    {services.map(renderCard)}
                  </MobileAutoCarousel>
                </div>
                <div className="hidden lg:grid grid-cols-4 gap-4">
                  {services.map(renderCard)}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
