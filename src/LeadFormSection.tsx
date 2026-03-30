import { useState } from "react";
import { ArrowRight } from "lucide-react";

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

const FIELD_CLASS_BASE =
  "w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2";
const FIELD_VALID =
  "border-slate-200 bg-slate-50 hover:border-slate-300 focus:border-[#9FA47C] focus:ring-[#9FA47C]/20";
const FIELD_ERROR =
  "border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/20";

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
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}{" "}
        {required && <span className="text-[#9FA47C]">*</span>}
        {!required && (
          <span className="font-normal text-slate-400">(opcional)</span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function LeadFormSection() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    faturamento: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

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
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const faturamentoLine = form.faturamento.trim()
      ? `Faturamento: ${form.faturamento}.`
      : "Faturamento: não informado.";

    const text = [
      `Olá, meu nome é ${form.nome}.`,
      `Meu email é ${form.email}.`,
      `Meu WhatsApp é ${form.whatsapp}.`,
      `Minha empresa: ${form.empresa}.`,
      faturamentoLine,
      `Mensagem: ${form.mensagem}.`,
      `Gostaria de solicitar um diagnóstico estratégico.`,
    ].join("\n");

    window.open(
      `https://wa.me/5582999999999?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section id="diagnostico" className="bg-[#F9FAFB] py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2.5">
            <span className="h-px w-7 bg-[#9FA47C]" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9FA47C]">
              Diagnóstico estratégico
            </p>
            <span className="h-px w-7 bg-[#9FA47C]" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0D3F8A] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Solicite um diagnóstico{" "}
            <span className="text-green">estratégico</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-500 sm:text-lg">
            Descubra onde sua empresa está perdendo dinheiro e como crescer com{" "}
            <span className="text-green">controle</span>.
          </p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-[0_8px_40px_rgba(15,23,42,0.08)] sm:p-10">
          {/* Subtle accent glows */}
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#9FA47C]/8 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#0D3F8A]/5 blur-3xl" />

          <form onSubmit={handleSubmit} noValidate className="relative">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Nome */}
              <Field label="Nome completo" required error={errors.nome}>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className={`${FIELD_CLASS_BASE} ${errors.nome ? FIELD_ERROR : FIELD_VALID}`}
                />
              </Field>

              {/* Email */}
              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`${FIELD_CLASS_BASE} ${errors.email ? FIELD_ERROR : FIELD_VALID}`}
                />
              </Field>

              {/* WhatsApp */}
              <Field label="WhatsApp" required error={errors.whatsapp}>
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className={`${FIELD_CLASS_BASE} ${errors.whatsapp ? FIELD_ERROR : FIELD_VALID}`}
                />
              </Field>

              {/* Empresa */}
              <Field label="Nome da empresa" required error={errors.empresa}>
                <input
                  type="text"
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className={`${FIELD_CLASS_BASE} ${errors.empresa ? FIELD_ERROR : FIELD_VALID}`}
                />
              </Field>

              {/* Faturamento (optional, full width) */}
              <div className="sm:col-span-2">
                <Field label="Faturamento mensal">
                  <input
                    type="text"
                    name="faturamento"
                    value={form.faturamento}
                    onChange={handleChange}
                    placeholder="Ex: R$ 50.000"
                    className={`${FIELD_CLASS_BASE} ${FIELD_VALID}`}
                  />
                </Field>
              </div>

              {/* Mensagem (full width) */}
              <div className="sm:col-span-2">
                <Field label="Mensagem" required error={errors.mensagem}>
                  <textarea
                    name="mensagem"
                    value={form.mensagem}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Conte brevemente sobre sua empresa e o que você está buscando..."
                    className={`${FIELD_CLASS_BASE} resize-none ${errors.mensagem ? FIELD_ERROR : FIELD_VALID}`}
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#9FA47C] px-8 py-4 font-semibold text-white shadow-[0_4px_20px_rgba(159,164,124,0.30)] transition-all hover:bg-[#8a8f6a] hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(159,164,124,0.44)]"
              >
                Quero meu diagnóstico
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="text-xs text-slate-400">
                Você será direcionado ao WhatsApp.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
