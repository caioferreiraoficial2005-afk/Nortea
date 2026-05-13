import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    setup: "R$ 697",
    monthly: "R$ 197/mês",
    features: [
      "Site de conversão profissional",
      "Automação básica no WhatsApp",
      "Suporte e atualizações mensais",
    ],
    cta: "Começar com o Essencial",
    link: "https://wa.me/558288224653?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Plano%20Essencial%20da%20Nortea.",
    highlighted: false,
  },
  {
    name: "Profissional",
    badge: "Mais escolhido",
    setup: "R$ 1.297",
    monthly: "R$ 397/mês",
    features: [
      "Tudo do Plano Essencial",
      "Agente de IA no WhatsApp (atendimento 24h)",
      "Dashboard financeiro personalizado",
      "Assessoria financeira mensal",
      "Acompanhamento próximo toda semana",
    ],
    cta: "Quero o Profissional",
    link: "https://wa.me/558288224653?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Plano%20Profissional%20da%20Nortea.",
    highlighted: true,
  },
  {
    name: "Gestão Total",
    setup: "R$ 2.197",
    monthly: "R$ 697/mês",
    features: [
      "Tudo do Plano Profissional",
      "Sistema personalizado para o negócio",
      "BPO financeiro completo",
      "Relatórios mensais detalhados",
      "Prioridade total no suporte",
    ],
    cta: "Quero Gestão Total",
    link: "https://wa.me/558288224653?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Plano%20Gest%C3%A3o%20Total%20da%20Nortea.",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="planos" className="bg-[#080b09]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl mb-12">
          <div className="mb-4 inline-flex items-center gap-2.5">
            <span className="h-px w-7 bg-[#057a41]/50" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057a41]/70">Planos</p>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Escolha como a Nortea vai estruturar sua empresa
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Todos os planos incluem setup completo e acompanhamento mensal. Sem contrato longo — você fica porque funciona.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[32px] border p-8 flex flex-col ${
                plan.highlighted
                  ? "border-[#057a41] bg-[#111113] shadow-[0_0_0_1px_rgba(5,122,65,0.3),0_20px_60px_rgba(5,122,65,0.15)]"
                  : "border-white/8 bg-[#111113]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#057a41] px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">{plan.name}</p>
                <p className="mt-4 text-4xl font-bold text-white">{plan.setup}</p>
                <p className="text-xs text-white/35 mt-0.5 uppercase tracking-wider">setup único</p>
                <p className="mt-2 text-lg font-semibold text-[#057a41]">{plan.monthly}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#057a41] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/65 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.link}
                target="_blank"
                rel="noreferrer"
                className={`w-full text-center rounded-full py-3.5 text-sm font-bold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-[#057a41] text-white hover:bg-[#068a4b] hover:shadow-[0_8px_24px_rgba(5,122,65,0.35)]"
                    : "border border-white/15 bg-white/8 text-white hover:bg-[#057a41]/15 hover:border-[#057a41]/50 hover:text-[#057a41]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#057a41]" />
            Sem fidelidade obrigatória
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#057a41]" />
            Conversa inicial gratuita
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#057a41]" />
            Suporte ativo todo mês
          </span>
        </div>
      </div>
    </section>
  );
}
