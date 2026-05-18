import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-12 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[28px] md:rounded-[32px] px-6 py-14 md:px-16 md:py-28 text-center"
          style={{
            backgroundColor: "#F8F6F2",
            border: "1px solid #E8E3DA",
          }}
        >
          <div className="relative max-w-3xl mx-auto">
            <h2
              className="font-display text-3xl md:text-5xl leading-[1.15] text-balance"
              style={{ color: "#111111" }}
            >
              <span style={{ fontWeight: 700 }}>Sua operação pode ser</span>{" "}
              <span style={{ fontWeight: 400 }}>mais simples, eficiente e</span>{" "}
              <span style={{ fontWeight: 400, color: "#8B6F5A" }}>escalável.</span>
            </h2>
            <div className="mt-10">
              <a
                href="https://wa.me/5548992465553"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#111111",
                  color: "#FFFFFF",
                  boxShadow: "0 18px 40px -20px rgba(17,17,17,0.45)",
                }}
              >
                Solicitar orçamento
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
