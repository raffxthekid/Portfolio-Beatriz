import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Informe seu nome" })
    .max(120, { message: "Máximo de 120 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido" })
    .max(254, { message: "E-mail muito longo" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Conte um pouco mais (mín. 10 caracteres)" })
    .max(5000, { message: "Máximo de 5000 caracteres" }),
});

type FormValues = z.infer<typeof schema>;

const fieldStyle: React.CSSProperties = {
  backgroundColor: "#F8F6F2",
  border: "1px solid #E8E3DA",
  color: "#111111",
  borderRadius: "16px",
  padding: "14px 16px",
  fontSize: "15px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
};

const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "var(--brand-nude)";
  e.currentTarget.style.boxShadow = "0 0 0 3px var(--brand-nude-ring)";
};
const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "#E8E3DA";
  e.currentTarget.style.boxShadow = "none";
};

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/contact-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("send_failed");
      toast.success("Mensagem enviada com sucesso", {
        description: "Retornarei o contato em até 1 dia útil.",
      });
      reset();
    } catch (err) {
      console.error("Contact submission failed", err);
      toast.error("Não foi possível enviar agora", {
        description: "Tente novamente em instantes.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const labelClass = "block text-xs font-semibold uppercase mb-2";
  const labelStyle: React.CSSProperties = {
    color: "#111111",
    letterSpacing: "0.18em",
  };

  return (
    <section
      aria-labelledby="contact-form-title"
      className="container-px mx-auto max-w-7xl pt-16 md:pt-20"
    >
      <div
        className="grid lg:grid-cols-12 gap-10 lg:gap-14 rounded-[32px] p-8 md:p-12"
        style={{
          backgroundColor: "var(--brand-nude-light)",
          border: "1px solid #E8E3DA",
          boxShadow: "0 30px 80px -50px rgba(17,17,17,0.18)",
        }}
      >
        <div className="lg:col-span-5">
          <h2
            id="contact-form-title"
            className="font-display text-3xl md:text-4xl"
            style={{ color: "#111111", lineHeight: 1.2 }}
          >
            <span style={{ fontWeight: 700 }}>Vamos conversar</span>{" "}
            <span style={{ fontWeight: 400 }}>sobre o seu</span>{" "}
            <span style={{ fontWeight: 400, color: "#8B6F5A" }}>projeto.</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="lg:col-span-7 grid gap-5"
        >
          <div>
            <label htmlFor="cf-name" className={labelClass} style={labelStyle}>
              Nome
            </label>
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              maxLength={120}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cf-name-err" : undefined}
              style={fieldStyle}
              onFocus={focusOn}
              {...register("name", { onBlur: focusOff })}
            />
            {errors.name && (
              <p id="cf-name-err" className="mt-2 text-xs" style={{ color: "#B4452B" }}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-email" className={labelClass} style={labelStyle}>
              E-mail
            </label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cf-email-err" : undefined}
              style={fieldStyle}
              onFocus={focusOn}
              {...register("email", { onBlur: focusOff })}
            />
            {errors.email && (
              <p id="cf-email-err" className="mt-2 text-xs" style={{ color: "#B4452B" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cf-message" className={labelClass} style={labelStyle}>
              Mensagem
            </label>
            <textarea
              id="cf-message"
              rows={5}
              maxLength={5000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "cf-message-err" : undefined}
              style={{ ...fieldStyle, resize: "vertical", minHeight: 140 }}
              onFocus={focusOn}
              {...register("message", { onBlur: focusOff })}
            />
            {errors.message && (
              <p id="cf-message-err" className="mt-2 text-xs" style={{ color: "#B4452B" }}>
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs" style={{ color: "#8C8896" }}>
              Seus dados são usados apenas para responder ao contato.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#111111",
                boxShadow: "0 18px 40px -20px rgba(17,17,17,0.45)",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  Enviar mensagem
                  <Send className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
