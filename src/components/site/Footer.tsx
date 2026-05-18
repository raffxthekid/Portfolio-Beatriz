import { Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contato"
      style={{ backgroundColor: "#F8F6F2", borderTop: "1px solid #E8E3DA" }}
    >
      <div className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p
              style={{
                fontFamily: "'Allura', 'Great Vibes', cursive",
                fontSize: "38px",
                lineHeight: 1,
                color: "#111111",
                opacity: 0.9,
              }}
            >
              Beatriz Natália
            </p>
            <p
              className="mt-4 max-w-sm leading-relaxed"
              style={{ color: "#1A1A1A", fontWeight: 500 }}
            >
              Desenvolvedora de sistemas e aplicações.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p
              className="text-xs uppercase"
              style={{ color: "#111111", letterSpacing: "0.18em", fontWeight: 700 }}
            >
              Navegação
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["#inicio", "Início"],
                ["#sobre", "Sobre"],
                ["#servicos", "Serviços"],
                ["#projetos", "Projetos"],
                ["#depoimentos", "Depoimentos"],
                ["#contato", "Contato"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a
                    href={h}
                    className="inline-block transition-all duration-300 hover:-translate-y-0.5"
                    style={{ color: "#111111" }}
                    onMouseEnter={(e) => (e.currentTarget.style.fontWeight = "700")}
                    onMouseLeave={(e) => (e.currentTarget.style.fontWeight = "500")}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p
              className="text-xs uppercase"
              style={{ color: "#111111", letterSpacing: "0.18em", fontWeight: 700 }}
            >
              Contato
            </p>
            <ul className="mt-5 space-y-4 text-sm">
              {[
                {
                  href: "https://wa.me/5548992465553",
                  Icon: Phone,
                  label: "WhatsApp",
                  value: "(48) 99246-5553",
                  external: true,
                },
                {
                  href: "mailto:beatriznatalia284@gmail.com",
                  Icon: Mail,
                  label: "E-mail",
                  value: "beatriznatalia284@gmail.com",
                  external: false,
                },
                {
                  href: "https://instagram.com/eubeatriznatalia",
                  Icon: Instagram,
                  label: "Instagram",
                  value: "@eubeatriznatalia",
                  external: true,
                },
              ].map(({ href, Icon, label, value, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 group transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span
                      className="h-9 w-9 grid place-items-center rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E8E3DA",
                        color: "#111111",
                      }}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span
                        className="block text-xs"
                        style={{ color: "#8C8896" }}
                      >
                        {label}
                      </span>
                      <span
                        className="block font-medium break-all"
                        style={{ color: "#111111" }}
                      >
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-6 text-xs"
          style={{ borderTop: "1px solid #E8E3DA", color: "#5F5F5F" }}
        >
          <p>© 2026 Beatriz Natália. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
