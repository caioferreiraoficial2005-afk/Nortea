import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  faturamento: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  whatsapp?: string;
  empresa?: string;
  mensagem?: string;
}

const FORM_EMPTY: FormData = {
  nome: "",
  email: "",
  whatsapp: "",
  empresa: "",
  faturamento: "",
  mensagem: "",
};

const BASE =
  "w-full rounded-2xl border px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400";
const VALID =
  "border-slate-200 bg-white hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-300/30 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.06)]";
const ERROR =
  "border-red-400 bg-red-50/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/20";

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}{" "}
        {required ? (
          <span className="text-slate-500">*</span>
        ) : (
          <span className="font-normal text-slate-400">(opcional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs font-medium text-red-500">
          <span className="inline-block h-1 w-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function LeadFormSection() {
  const [form, setForm] = useState<FormData>(FORM_EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.nome.trim()) e.nome = "Nome obrigatório";
    if (!form.email.trim()) {
      e.email = "Email obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Email inválido";
    }
    if (!form.whatsapp.trim()) e.whatsapp = "WhatsApp obrigatório";
    if (!form.empresa.trim()) e.empresa = "Nome da empresa obrigatório";
    if (!form.mensagem.trim()) e.mensagem = "Mensagem obrigatória";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const sanitized = name === "faturamento" ? value.replace(/\D/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: sanitized }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (success) setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const mensagemFormatada = `Olá, meu nome é ${form.nome}.

Gostaria de conversar sobre a estruturação da minha empresa.

📊 *Dados da empresa:*

👤 *Nome:* ${form.nome}

📧 *Email:* ${form.email}

📱 *WhatsApp:* ${form.whatsapp}

🏢 *Empresa:* ${form.empresa}

💰 *Faturamento:* ${form.faturamento.trim() ? `R$ ${form.faturamento}` : "Não informado"}

📝 *Mensagem:*

${form.mensagem}`;

    window.open(
      `https://wa.me/558288224653?text=${encodeURIComponent(mensagemFormatada)}`,
      "_blank"
    );

    setForm(FORM_EMPTY);
    setErrors({});
    setSuccess(true);
  };

  return (
    <section id="diagnostico" className="relative overflow-hidden bg-[#0d0d0f] py-24">
      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      {/* Subtle neutral glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-white/3 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2.5">
            <span className="h-px w-7 bg-white/30" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/40">
              Primeiro passo
            </p>
            <span className="h-px w-7 bg-white/30" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Fale com a{" "}
            <span className="text-white/60">Nortea</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-white/50 sm:text-lg">
            Preencha abaixo e entenda como estruturar sua empresa com clareza, controle e consistência.
          </p>
        </div>

        {/* Card — branco sobre escuro: máximo contraste para leitura do formulário */}
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_2px_8px_rgba(34,222,126,0.08)] sm:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-white/3 blur-3xl" />

          <form onSubmit={handleSubmit} noValidate className="relative">
            <div className="grid gap-5 sm:grid-cols-2">

              <Field label="Nome completo" required error={errors.nome}>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className={`${BASE} ${errors.nome ? ERROR : VALID}`}
                />
              </Field>

              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`${BASE} ${errors.email ? ERROR : VALID}`}
                />
              </Field>

              <Field label="WhatsApp" required error={errors.whatsapp}>
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className={`${BASE} ${errors.whatsapp ? ERROR : VALID}`}
                />
              </Field>

              <Field label="Nome da empresa" required error={errors.empresa}>
                <input
                  type="text"
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className={`${BASE} ${errors.empresa ? ERROR : VALID}`}
                />
              </Field>

              {/* Faturamento — somente números */}
              <div className="sm:col-span-2">
                <Field label="Faturamento mensal">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                      R$
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      name="faturamento"
                      value={form.faturamento}
                      onChange={handleChange}
                      placeholder="0"
                      className={`${BASE} pl-10 ${VALID}`}
                    />
                  </div>
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Mensagem" required error={errors.mensagem}>
                  <textarea
                    name="mensagem"
                    value={form.mensagem}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Conte brevemente sobre sua empresa: como funciona hoje, principais desafios e o que você está buscando..."
                    className={`${BASE} resize-none ${errors.mensagem ? ERROR : VALID}`}
                  />
                </Field>
              </div>
            </div>

            <div className="my-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Submit + feedback */}
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#09090b] px-8 py-4 text-sm font-bold text-white shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,0,0,0.45)] active:translate-y-0"
              >
                Quero estruturar minha empresa
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {success ? (
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16C36B]" />
                  Mensagem enviada com sucesso!
                </div>
              ) : (
                <p className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MessageCircle className="h-3.5 w-3.5 text-slate-400" />
                  Você será direcionado ao WhatsApp.
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
