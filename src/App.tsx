import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  MessageCircle,
  Target,
  Workflow,
} from "lucide-react";
import TrustSection from "./TrustSection";
import HeroBg from "./HeroBg";
import NorteaCinematicHero from "./NorteaCinematicHero";
import PricingSection from "./PricingSection";
import LeadFormSection from "./LeadFormSection";
import ServiceDemosSection from "./ServiceDemosSection";

function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      className="max-w-3xl"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 inline-flex items-center gap-2.5">
        <span className={`h-px w-7 ${light ? "bg-neutral-400" : "bg-[#057a41]/50"}`} />
        <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${light ? "text-neutral-500" : "text-[#057a41]/70"}`}>{eyebrow}</p>
      </div>
      <h2 className={`text-3xl font-bold tracking-tight ${light ? "text-neutral-900" : "text-white"} sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed ${light ? "text-neutral-600" : "text-white/65"} sm:text-lg`}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

function LogoMark() {
  return (
    <img
      src="/images/logo/versao retangulo.png"
      alt="Nortea"
      decoding="async"
      fetchPriority="high"
      loading="eager"
      className="h-8 w-auto max-w-[120px] object-contain sm:h-14 sm:max-w-none"
    />
  );
}

// Stagger container + card variants
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function NorteaReactSite() {
  const [cinematicActive, setCinematicActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const whatsappNumber = "558288224653";
  const whatsappMessage = encodeURIComponent("Olá, vim pelo site da Nortea e gostaria de conversar sobre a estruturação da minha empresa.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const pilares = [
    {
      icon: Target,
      title: "Site e loja que realmente vendem",
      text: "Não é um site bonito pra ficar parado. É uma máquina de conversão que trabalha por você 24h, mesmo quando você está atendendo outro cliente.",
    },
    {
      icon: Workflow,
      title: "Nenhum cliente ignorado, nunca",
      text: "Agente de IA no WhatsApp que responde na hora, qualifica o lead e agenda. Você acorda com clientes novos sem ter feito nada.",
    },
    {
      icon: CircleDollarSign,
      title: "Saiba exatamente quanto sobra",
      text: "Dashboard + assessoria mensal do Bernardo. Você passa a tomar decisões com dados reais, não com intuição. E para de ter surpresa no final do mês.",
    },
  ];

  const etapas = [
    {
      step: "01",
      title: "Conversa inicial",
      text: "Em uma conversa direta e sem enrolação, entendemos como sua empresa opera hoje: atendimento, digital e financeiro. Apontamos exatamente o que está travando.",
    },
    {
      step: "02",
      title: "Diagnóstico e plano",
      text: "Transformamos o que identificamos em um plano concreto, com prioridades claras e ação definida nos 3 pilares: digital, operação e financeiro.",
    },
    {
      step: "03",
      title: "Estruturação",
      text: "Colocamos em prática: organizamos atendimento, site, automações e financeiro para sua empresa parar de operar no improviso.",
    },
    {
      step: "04",
      title: "Acompanhamento",
      text: "Monitoramos os resultados, ajustamos o que for necessário e garantimos que o crescimento seja contínuo, não um pico isolado.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080b09] text-white antialiased">

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-40 bg-[#080b09] transition-transform duration-300 ease-in-out will-change-transform ${cinematicActive ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="border-b border-white/8">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
            <LogoMark />
            <nav className="hidden items-center gap-8 text-sm font-medium text-white/55 lg:flex">
              <a href="#servicos" className="transition-colors hover:text-[#057a41]">Serviços</a>
              <a href="#planos" className="transition-colors hover:text-[#057a41]">Planos</a>
              <a href="#processo" className="transition-colors hover:text-[#057a41]">Processo</a>
              <a href="#fundadores" className="transition-colors hover:text-[#057a41]">Fundadores</a>
            </nav>
            <div className="flex items-center gap-3">
              <a
                href={whatsappLink}
                className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-[10px] text-sm font-semibold text-white transition-all hover:bg-[#057a41]/22 hover:border-[#057a41]/55 hover:text-[#057a41] sm:inline-flex"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com a Nortea
              </a>
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
                aria-label="Menu"
              >
                <div className="flex h-[13px] w-5 flex-col items-center justify-between">
                  <span className={`block h-px w-5 origin-center bg-white transition-all duration-200 ${mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                  <span className={`block h-px w-5 bg-white transition-all duration-200 ${mobileMenuOpen ? "scale-x-0 opacity-0" : ""}`} />
                  <span className={`block h-px w-5 origin-center bg-white transition-all duration-200 ${mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-b border-white/8 bg-[#080b09] px-4 pb-4 lg:hidden">
            <nav className="flex flex-col gap-1 pt-2">
              {[["#servicos", "Serviços"], ["#planos", "Planos"], ["#processo", "Processo"], ["#fundadores", "Fundadores"]].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {label}
                </a>
              ))}
              <a
                href={whatsappLink}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white/8 px-4 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com a Nortea
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>

        {/* ── 1 + 2. HERO + TRUST — único fundo de gráfico contínuo ── */}
        <div className="relative bg-[#080b09]">
          {/* Um único HeroBg cobre hero + TrustSection, formando um plano de fundo só */}
          <div className="absolute inset-0 pointer-events-none">
            <HeroBg prefix="shared" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080b09]/92 via-[#080b09]/50 to-[#080b09]/15" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080b09]/65 via-transparent to-[#080b09]/18" />
          </div>
          <NorteaCinematicHero
            whatsappLink={whatsappLink}
            onCinematicStateChange={setCinematicActive}
          />
          <div className="relative overflow-hidden">
            <TrustSection />
          </div>
        </div>

        {/* Separador dark → claro */}
        <div className="h-16 bg-gradient-to-b from-[#080b09] to-[#f4f6f3]" />

        {/* ── 3. PROBLEMA ── bg: #f4f6f3 */}
        <section className="bg-[#f4f6f3]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <SectionTitle
              light
              eyebrow="Reconhece isso?"
              title={<>Você trabalha duro. O problema nunca foi esforço: é estrutura.</>}
              description="Você trabalha o dia todo, responde WhatsApp, paga as contas, mas no final do mês não sabe quanto realmente sobrou."
            />
            <motion.div
              className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {[
                { text: "Você demora pra responder no WhatsApp e o cliente some, vai pro concorrente." },
                { text: "No final do mês você não sabe se teve lucro ou prejuízo. Só sente que trabalhou muito." },
                { text: "Seu Instagram e site existem, mas não trazem nenhum cliente novo." },
                { text: "Quanto mais cresce, mais caótico fica. Você virou escravo do próprio negócio." },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  variants={cardVariant}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group rounded-[28px] border border-neutral-200 bg-white p-6"
                >
                  <div className="inline-flex rounded-2xl bg-neutral-100 p-2.5">
                    <CheckCircle2 className="h-5 w-5 text-[#057a41]" />
                  </div>
                  <p className="mt-4 font-semibold text-neutral-800">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-6 overflow-hidden rounded-[28px] bg-[#057a41] px-8 py-8 sm:px-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">A solução</p>
                  <h3 className="mt-2 max-w-lg text-xl font-bold leading-snug text-white sm:text-2xl">
                    A Nortea resolve os 3 pontos que mais travam pequenos negócios.
                  </h3>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#057a41] transition-all hover:scale-[1.03] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
                >
                  Quero uma conversa gratuita
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Separador claro → dark */}
        <div className="h-16 bg-gradient-to-b from-[#f4f6f3] to-[#080b09]" />

        {/* ── 4. SERVIÇOS — 3 PILARES ── bg: #080b09 */}
        <section id="servicos" className="relative bg-[#080b09]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <SectionTitle
              eyebrow="Como atuamos"
              title={<>3 pilares para estruturar<br className="hidden sm:block" /> sua empresa de vez</>}
              description="A Nortea atua nos 3 pontos que mais travam o crescimento das pequenas empresas: digital, atendimento e financeiro. De forma integrada, não isolada."
            />

            <motion.div
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {pilares.map((item, idx) => {
                const Icon = item.icon;
                const isFirst = idx === 0;
                return (
                  <motion.div
                    key={item.title}
                    variants={cardVariant}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`group relative rounded-[32px] border p-8 ${
                      isFirst
                        ? "border-white/15 bg-white/6 shadow-[0_6px_32px_rgba(0,0,0,0.30)]"
                        : "border-white/8 bg-[#111a13] shadow-[0_6px_32px_rgba(0,0,0,0.25)]"
                    }`}
                  >
                    <div className="relative">
                      <div className={`inline-flex rounded-2xl p-3.5 transition-all duration-300 ${
                        isFirst
                          ? "bg-[#057a41]/30 text-[#057a41] group-hover:bg-[#057a41]/45"
                          : "bg-[#057a41]/18 text-[#057a41] group-hover:bg-[#057a41]/35"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                      <p className="mt-3 leading-7 text-white/65">{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-10">
              <div className="h-px w-full bg-white/10" />
              <p className="py-6 text-sm text-center text-white/50 max-w-3xl mx-auto leading-7">
                Os 3 pilares funcionam juntos: o site e o WhatsApp trazem mais clientes → as vendas alimentam o controle financeiro → a assessoria orienta o próximo passo. Um sistema completo, não 3 serviços separados.
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#057a41]/22 hover:border-[#057a41]/55 hover:text-[#057a41]"
              >
                Quero organizar minha empresa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── 5. DEMOS DOS SERVIÇOS ── bg: #0e1410 (sem separador brusco, mesma família dark) */}
        <ServiceDemosSection />

        {/* ── 6. PROCESSO ── bg: #f4f6f3 */}
        <section id="processo" className="relative overflow-hidden bg-[#f4f6f3]">
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <SectionTitle
              light
              eyebrow="Como funciona"
              title="Como a Nortea estrutura sua empresa"
              description="Trabalhamos com etapas claras, do diagnóstico à execução. Nada genérico, tudo adaptado à realidade do seu negócio."
            />

            {/* Desktop: horizontal timeline — Mobile: vertical stack */}
            <div className="mt-14">
              {/* Desktop */}
              <div className="hidden lg:grid lg:grid-cols-4 lg:gap-0">
                {etapas.map((etapa, idx) => (
                  <motion.div
                    key={etapa.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group relative px-5 first:pl-0 last:pr-0"
                  >
                    {/* Horizontal connector line */}
                    {idx < etapas.length - 1 && (
                      <div className="absolute top-6 left-[calc(50%+24px)] right-0 h-px border-t border-[#057a41]/30" />
                    )}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#057a41]/40 bg-[#057a41]/15 font-bold text-[#057a41] shadow-[0_2px_12px_rgba(0,0,0,0.10)] transition-all duration-300 group-hover:bg-[#057a41]/25 group-hover:shadow-[0_4px_22px_rgba(5,122,65,0.20)]">
                      {etapa.step}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-neutral-900">{etapa.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">{etapa.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Mobile: vertical */}
              <div className="flex flex-col gap-0 lg:hidden">
                {etapas.map((etapa, idx) => (
                  <motion.div
                    key={etapa.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className="group flex gap-5 pb-8 last:pb-0"
                  >
                    {/* Vertical line + number */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#057a41]/40 bg-[#057a41]/15 font-bold text-[#057a41]">
                        {etapa.step}
                      </div>
                      {idx < etapas.length - 1 && (
                        <div className="mt-2 flex-1 border-l border-[#057a41]/30" />
                      )}
                    </div>
                    <div className="pb-2 pt-2">
                      <h3 className="text-lg font-bold text-neutral-900">{etapa.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">{etapa.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Quero estruturar minha empresa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Separador claro → dark */}
        <div className="h-16 bg-gradient-to-b from-[#f4f6f3] to-[#080b09]" />

        {/* ── 7. PLANOS ── bg: #080b09 (PricingSection já usa #080b09) */}
        <PricingSection />

        {/* ── 8. FUNDADORES ── bg: #0e1410 */}
        <section id="fundadores" className="relative overflow-hidden bg-[#0e1410]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <SectionTitle
              eyebrow="Fundadores"
              title="Quem está por trás da Nortea"
            />

            <p className="text-white/60 text-lg text-center mt-6 mb-10 max-w-2xl mx-auto leading-relaxed">
              Um programador e um contador. Tecnologia e finanças sob o mesmo teto, para você não precisar contratar duas empresas diferentes.
            </p>

            <motion.div
              className="grid gap-8 lg:grid-cols-2"
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {[
                {
                  src: "/images/fundadores/caio.jpeg",
                  alt: "Caio Ferreira de Freitas",
                  name: "Caio Ferreira de Freitas",
                  bio: [
                    "Programador especializado em automação e sistemas que organizam a operação, eliminando trabalho repetitivo e decisões no achismo.",
                    "Constrói dashboards, fluxos de atendimento e automações que tiram pequenas empresas do improviso e colocam tudo em ordem.",
                    "Na Nortea, cuida da estrutura tecnológica e operacional para que sua empresa funcione com clareza, mesmo quando você não está olhando.",
                  ],
                },
                {
                  src: "/images/fundadores/bernardo.jpeg",
                  alt: "Bernardo Gabryhel",
                  name: "Bernardo Gabryhel",
                  bio: [
                    "Contador com foco em micro e pequenos empreendedores, ajuda donos de negócio a entenderem seus números de verdade, não só no papel.",
                    "Atua nas rotinas contábeis com atualização constante na legislação, para você não precisar se preocupar com o que não sabe.",
                    "Na Nortea, cuida da estrutura financeira e contábil para que você saiba quanto sua empresa realmente lucra e cresça com segurança.",
                  ],
                },
              ].map((f) => (
                <motion.div
                  key={f.name}
                  variants={cardVariant}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#111a13] shadow-[0_8px_40px_rgba(0,0,0,0.40)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#057a41]/70">Cofundador</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{f.name}</h3>
                    {f.bio.map((p, i) => (
                      <p key={i} className={`${i === 0 ? "mt-5" : "mt-4"} leading-7 text-white/65`}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#057a41]/22 hover:border-[#057a41]/55 hover:text-[#057a41]"
              >
                Falar com a Nortea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── 9. FORMULÁRIO DE CONTATO ── bg: #080b09 */}
        <LeadFormSection />

        {/* ── 10. CTA FINAL ── bg: #080b09 */}
        <section className="bg-[#080b09] py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#111a13] px-10 py-16 text-center shadow-[0_32px_100px_rgba(0,0,0,0.55)] sm:px-16">
              <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 rounded-b-[40px] bg-gradient-to-t from-[#057a41]/20 to-transparent" />
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057a41]/65">Primeiro passo</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Chega de crescer<br className="hidden sm:block" /> sem saber o que sobra.
                </h2>
                <p className="mt-5 mx-auto max-w-xl text-lg leading-8 text-white/50">
                  Conversa inicial gratuita. Sem enrolação. Em 30 minutos você entende o que trava sua empresa e o que fazer.
                </p>
                <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
                  <a
                    href={whatsappLink}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-[#057a41] px-8 py-4 font-semibold text-white shadow-[0_8px_36px_rgba(5,122,65,0.30)] transition-all hover:scale-[1.03] hover:bg-[#06a355] hover:shadow-[0_12px_48px_rgba(5,122,65,0.42)]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Falar com a Nortea
                  </a>
                  <span className="flex items-center gap-2 text-sm text-white/40">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#057a41]" />
                    Conversa inicial gratuita
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

