import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { ContactForm } from "@/components/site/ContactForm";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beatriz Natalia · Desenvolvedora de Sistemas e Aplicativos" },
      {
        name: "description",
        content:
          "Desenvolvimento de sistemas, SaaS, aplicativos PWA e automações com IA sob medida. Soluções digitais profissionais para escalar seu negócio.",
      },
      { property: "og:title", content: "Beatriz Natalia · Desenvolvedora de Sistemas" },
      {
        property: "og:description",
        content:
          "Transformo ideias em sistemas e aplicativos que automatizam e escalam negócios.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Allura&family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Sora:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <CTA />
      <ContactForm />
      <Footer />
    </main>
  );
}
