import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  LineChart,
  MessageCircle,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";
import LeadFormSection from "./LeadFormSection";

function useCountUp(end: number, duration = 1400, startWhen = true, prefix = "", suffix = "") {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, startWhen]);

  return `${prefix}${value.toLocaleString("pt-BR")}${suffix}`;
}

/** Keyword highlight — destaque verde elegante em palavras-chave */
function Kw({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-[#16C36B]">{children}</span>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2.5">
        <span className="h-px w-7 bg-[#16C36B]" />
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#16C36B]">{eyebrow}</p>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-[#0D3F8A] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-500 sm:text-lg">{description}</p> : null}
    </div>
  );
}

function LogoMark() {
  return (
    <img
      src="/images/logoversaofinalnortea.png"
      alt="Nortea Consultoria Estratégica"
      className="h-20 w-auto"
    />
  );
}

function MetricCard({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "green" | "blue" }) {
  return (
    <div
      className={`rounded-[28px] border p-5 transition-all duration-300 hover:-translate-y-1 ${
        tone === "green"
          ? "border-[#16C36B]/25 bg-gradient-to-br from-[#16C36B]/8 to-[#16C36B]/3 hover:shadow-[0_12px_36px_rgba(22,195,107,0.12)]"
          : tone === "blue"
          ? "border-[#0D3F8A]/20 bg-gradient-to-br from-[#0D3F8A]/6 to-[#0D3F8A]/2 hover:shadow-[0_12px_36px_rgba(13,63,138,0.10)]"
          : "border-slate-200/70 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)]"
      }`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${
        tone === "green" ? "text-[#16C36B]" : tone === "blue" ? "text-[#0D3F8A]" : "text-slate-900"
      }`}>{value}</p>
    </div>
  );
}

function ExecutivePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-auto w-full max-w-[580px]"
    >
      {/* Glow halos */}
      <div className="pointer-events-none absolute -left-16 top-4 h-64 w-64 rounded-full bg-[#16C36B]/28 blur-[70px]" />
      <div className="pointer-events-none absolute -right-16 bottom-4 h-72 w-72 rounded-full bg-[#0D3F8A]/35 blur-[70px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#16C36B]/15 blur-3xl" />

      {/* Outer premium frame */}
      <div className="relative rounded-[40px] bg-gradient-to-br from-white/90 via-slate-100/70 to-[#16C36B]/10 p-[1.5px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_130px_rgba(0,0,0,0.55),0_10px_40px_rgba(22,195,107,0.14)]">
        <div className="rounded-[39px] bg-white/95 p-4 backdrop-blur-sm">
          <div className="rounded-[33px] bg-gradient-to-br from-slate-50 to-[#EEF3FF]/70 p-5">

            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#16C36B]">Visão estratégica</p>
                <h3 className="mt-1.5 text-[1.4rem] font-bold text-[#0D3F8A]">Controle com clareza</h3>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16C36B] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#16C36B]" />
                </span>
                Nortea Dashboard
              </div>
            </div>

            {/* Top metrics */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-[0_2px_20px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/50">
                <p className="text-sm text-slate-500">Faturamento projetado</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">R$ 128.450</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "74%" }}
                    transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#16C36B] to-[#0fba60]"
                  />
                </div>
                <p className="mt-2.5 text-xs text-slate-400">74% da meta mensal atingida</p>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-[#0D3F8A] to-[#092f6e] p-5 text-white shadow-[0_8px_36px_rgba(13,63,138,0.32)]">
                <p className="text-sm text-white/60">Fluxo operacional</p>
                <p className="mt-1.5 text-2xl font-bold">Organizado</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { v: 72, label: "Efic." },
                    { v: 88, label: "Ctrl." },
                    { v: 64, label: "Cresc." },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl bg-white/10 p-2.5 text-center ring-1 ring-white/10">
                      <p className="text-base font-bold">{item.v}%</p>
                      <p className="text-[10px] uppercase tracking-wide text-white/50">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom area */}
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl bg-white p-5 shadow-[0_2px_20px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Acompanhamento executivo</p>
                    <p className="text-base font-semibold text-slate-900">Indicadores centrais</p>
                  </div>
                  <div className="rounded-full bg-[#16C36B]/10 px-2.5 py-1 text-xs font-semibold text-[#16C36B]">Ao vivo</div>
                </div>
                <div className="mt-5 flex h-28 items-end gap-2">
                  {[34, 56, 49, 63, 58, 82, 74].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0.3 }}
                      animate={{ height: `${h}%`, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.07, ease: "easeOut" }}
                      className={`w-full rounded-t-xl ${i >= 5 ? "bg-gradient-to-t from-[#16C36B] to-[#22d97d]" : "bg-slate-100"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl bg-white p-4 shadow-[0_2px_20px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/50">
                  <p className="text-xs text-slate-400">Pendências críticas</p>
                  <p className="mt-1.5 text-xl font-bold text-slate-900">03 pontos</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">Atenção imediata necessária.</p>
                </div>
                <div className="rounded-3xl border border-[#16C36B]/20 bg-gradient-to-br from-[#16C36B]/8 to-[#16C36B]/3 p-4">
                  <p className="text-xs text-slate-500">Decisão orientada a dados</p>
                  <p className="mt-1.5 text-xl font-bold text-[#0D3F8A]">Mais controle</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Menos achismo, mais resultado.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardDemo() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const faturamento = useCountUp(128450, 1600, inView, "R$ ");
  const despesas = useCountUp(48200, 1500, inView, "R$ ");
  const margem = useCountUp(62, 1300, inView, "", "%");
  const leads = useCountUp(187, 1200, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-[36px] border border-slate-200/70 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#16C36B]/8 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-40 w-40 rounded-full bg-[#0D3F8A]/5 blur-3xl" />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard label="Faturamento do mês" value={faturamento} tone="green" />
          <MetricCard label="Despesas operacionais" value={despesas} tone="blue" />
          <MetricCard label="Margem estimada" value={margem} tone="green" />
          <MetricCard label="Leads acompanhados" value={leads} tone="blue" />
        </div>

        <div className="rounded-[28px] border border-slate-200/60 bg-gradient-to-br from-slate-50 to-[#EEF3FF]/50 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Resumo executivo</p>
              <p className="text-lg font-semibold text-slate-900">Visão da operação</p>
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">Demonstrativo</div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              ["Fluxo de caixa", "Saudável", "86%", "text-[#16C36B]", "from-[#16C36B] to-[#0fba60]"],
              ["Processos críticos", "Controlados", "72%", "text-[#0D3F8A]", "from-[#0D3F8A] to-[#1a56cc]"],
              ["Oportunidades", "Mapeadas", "64%", "text-[#22de7e]", "from-[#22de7e] to-[#0D3F8A]/60"],
            ].map(([label, text, width, textColor, barColor]) => (
              <div key={label} className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{label}</span>
                  <span className={`font-semibold ${textColor}`}>{text}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width } : {}}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NorteaReactSite() {
  const whatsappNumber = "5500000000000";
  const whatsappMessage = encodeURIComponent("Olá, vim pelo site da Nortea e gostaria de solicitar um diagnóstico inicial da minha empresa.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const pilares = [
    {
      icon: CircleDollarSign,
      title: "Financeiro",
      text: "Organização, clareza sobre números, análise de custos e visão mais segura para decisões importantes.",
    },
    {
      icon: Target,
      title: "Marketing",
      text: "Direcionamento estratégico, posicionamento e crescimento com mais consistência e menos improviso.",
    },
    {
      icon: Workflow,
      title: "Automação",
      text: "Processos mais organizados, rotinas mais eficientes e estrutura operacional com apoio de tecnologia.",
    },
  ];

  const beneficios = [
    "Mais clareza sobre faturamento, despesas e margem",
    "Menos decisões no improviso e mais controle",
    "Processos operacionais mais enxutos e organizados",
    "Acompanhamento estratégico com visão prática",
  ];

  const etapas = [
    {
      step: "01",
      title: "Diagnóstico inicial",
      text: "Mapeamos gargalos financeiros, falhas operacionais e pontos que hoje limitam o crescimento da empresa.",
    },
    {
      step: "02",
      title: "Planejamento estratégico",
      text: "Transformamos os problemas identificados em um plano claro, com prioridades e estrutura de ação.",
    },
    {
      step: "03",
      title: "Estruturação",
      text: "Organizamos processos, controles, indicadores e direcionamentos para a empresa operar com mais segurança.",
    },
    {
      step: "04",
      title: "Acompanhamento",
      text: "Monitoramos resultados, ajustamos rotas e fortalecemos a evolução contínua do negócio.",
    },
  ];

  const entregas = [
    { title: "Dashboard financeiro", icon: BarChart3 },
    { title: "Organização de fluxo de caixa", icon: LineChart },
    { title: "Estrutura de acompanhamento", icon: TrendingUp },
    { title: "Mapeamento operacional", icon: Settings2 },
    { title: "Direcionamento estratégico", icon: BriefcaseBusiness },
    { title: "Organização de processos", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white">
        <div className="border-b border-slate-100">
          <div className="mx-auto flex h-[96px] max-w-7xl items-center justify-between px-6 lg:px-8">
            <LogoMark />
            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
              <a href="#servicos" className="transition-colors hover:text-[#0D3F8A]">Serviços</a>
              <a href="#processo" className="transition-colors hover:text-[#0D3F8A]">Processo</a>
              <a href="#fundadores" className="transition-colors hover:text-[#0D3F8A]">Fundadores</a>
            </nav>
            <a
              href={whatsappLink}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#16C36B] to-[#12a85e] px-5 py-[10px] text-sm font-semibold text-white shadow-[0_4px_20px_rgba(22,195,107,0.32)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(22,195,107,0.44)]"
            >
              <MessageCircle className="h-4 w-4" />
              Diagnóstico inicial
            </a>
          </div>
        </div>
      </header>

      <main>

        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/hero-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[#02070e]/55" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#02070e]/50 via-transparent to-transparent" />
          <div className="pointer-events-none absolute right-0 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[#0D3F8A]/25 blur-[100px]" />
          <div className="pointer-events-none absolute right-[-80px] top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-[#16C36B]/10 blur-[80px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">

            {/* LEFT — text block */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10"
            >
              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16C36B] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16C36B]" />
                </span>
                <span className="font-medium">Consultoria estratégica para empresas</span>
              </div>

              {/* H1 */}
              <h1 className="max-w-[560px] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                Crescer sem estratégia{" "}
                <span className="text-white/80">custa caro.</span>{" "}
                <br className="hidden sm:block" />
                <span className="text-white/75">A Nortea traz </span>
                <span className="text-[#22de7e]">direção.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-7 max-w-[480px] text-lg leading-8 text-white/65">
                Estruturamos empresas com mais{" "}
                <span className="font-semibold text-white/90">controle financeiro</span>,{" "}
                <span className="font-semibold text-white/90">organização operacional</span>{" "}
                e visão estratégica para decisões mais seguras.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={whatsappLink}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#16C36B] to-[#0fba5f] px-7 py-4 font-semibold text-white shadow-[0_8px_36px_rgba(22,195,107,0.50)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_48px_rgba(22,195,107,0.65)]"
                >
                  Solicitar diagnóstico inicial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-semibold text-white/85 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 hover:text-white"
                >
                  Ver estrutura de atuação
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/45">
                {["Diagnóstico inicial", "Sem compromisso inicial", "Resultados mensuráveis"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16C36B]" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — dashboard */}
            <div className="relative z-10">
              <ExecutivePreview />
            </div>
          </div>
        </section>

        {/* ── PROBLEMA ── */}
        <section className="border-y border-slate-200/60 bg-gradient-to-b from-[#EEF3FF] via-slate-50 to-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionTitle
              eyebrow="Problema"
              title={<>O problema não é falta de esforço. É falta de <span className="text-green">controle</span>.</>}
              description="Muitas empresas faturam, vendem e se movimentam todos os dias, mas continuam decidindo sem clareza, crescendo sem estrutura e perdendo dinheiro sem perceber."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { text: "Falta de controle financeiro", cardCls: "border-[#22de7e]/20 bg-[#F8FBF4]/50 hover:border-[#22de7e]/30 hover:shadow-[0_16px_48px_rgba(34,222,126,0.10)]", iconCls: "text-[#22de7e]" },
                { text: "Decisões baseadas em achismo", cardCls: "border-[#0D3F8A]/10 bg-[#EEF3FF]/40 hover:border-[#0D3F8A]/20 hover:shadow-[0_16px_48px_rgba(13,63,138,0.10)]", iconCls: "text-[#0D3F8A]" },
                { text: "Marketing sem direção estratégica", cardCls: "border-[#0D3F8A]/10 bg-[#EEF3FF]/40 hover:border-[#0D3F8A]/20 hover:shadow-[0_16px_48px_rgba(13,63,138,0.10)]", iconCls: "text-[#0D3F8A]" },
                { text: "Operação desorganizada", cardCls: "border-[#0D3F8A]/10 bg-[#EEF3FF]/40 hover:border-[#0D3F8A]/20 hover:shadow-[0_16px_48px_rgba(13,63,138,0.10)]", iconCls: "text-[#0D3F8A]" },
              ].map((item, idx) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`group rounded-[28px] border p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 ${item.cardCls}`}
                >
                  <CheckCircle2 className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${item.iconCls}`} />
                  <p className="mt-4 font-semibold text-slate-800">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section id="servicos" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Solução"
              title={<>A Nortea conecta <span className="text-green">estratégia</span>, gestão e operação</>}
              description="Enquanto muitos atuam de forma isolada, a Nortea integra financeiro, marketing e automação para estruturar empresas com mais clareza, eficiência e direção."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {pilares.map((item, idx) => {
                const Icon = item.icon;
                const isGreen = idx === 0;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={`group relative rounded-[32px] border p-8 shadow-[0_4px_28px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-2 ${
                      isGreen
                        ? "border-[#22de7e]/20 bg-[#F8FBF4]/40 hover:border-[#22de7e]/30 hover:shadow-[0_24px_64px_rgba(34,222,126,0.14)]"
                        : "border-slate-200/70 bg-white hover:border-[#0D3F8A]/20 hover:shadow-[0_24px_64px_rgba(13,63,138,0.13)]"
                    }`}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: isGreen
                          ? "radial-gradient(ellipse at top left, rgba(34,222,126,0.06) 0%, transparent 60%)"
                          : "radial-gradient(ellipse at top left, rgba(13,63,138,0.035) 0%, transparent 60%)",
                      }}
                    />
                    <div className="relative">
                      <div className={`inline-flex rounded-2xl p-3.5 transition-all duration-300 ${
                        isGreen
                          ? "bg-gradient-to-br from-[#16C36B]/12 to-[#22de7e]/8 text-[#16C36B] shadow-[0_2px_8px_rgba(22,195,107,0.10)] group-hover:shadow-[0_4px_18px_rgba(22,195,107,0.22)]"
                          : "bg-gradient-to-br from-[#0D3F8A]/10 to-[#0D3F8A]/5 text-[#0D3F8A] shadow-[0_2px_8px_rgba(13,63,138,0.08)] group-hover:shadow-[0_4px_18px_rgba(13,63,138,0.18)]"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-[#0D3F8A]">{item.title}</h3>
                      <p className="mt-3 leading-7 text-slate-500">{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DASHBOARD ── */}
        <section className="bg-gradient-to-b from-[#F5F8FF] via-slate-50 to-[#F5F8FF]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Dashboard demonstrativo"
              title={<>Veja com <span className="text-green">clareza</span> o que hoje passa despercebido</>}
              description="Organizamos dados, indicadores e processos para transformar informações soltas em decisões mais seguras."
            />

            <div className="mt-14">
              <DashboardDemo />
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {beneficios.map((item, idx) => {
                const isGreen = idx === 0;
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className={`group rounded-[28px] border p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 ${
                      isGreen
                        ? "border-[#22de7e]/20 bg-[#F8FBF4]/40 hover:border-[#22de7e]/30 hover:shadow-[0_14px_40px_rgba(34,222,126,0.10)]"
                        : "border-[#0D3F8A]/10 bg-[#EEF3FF]/30 hover:border-[#0D3F8A]/20 hover:shadow-[0_14px_40px_rgba(13,63,138,0.10)]"
                    }`}
                  >
                    <div className={`mb-3 h-1 w-8 rounded-full bg-gradient-to-r transition-all duration-300 group-hover:w-14 ${
                      isGreen ? "from-[#16C36B] to-[#22de7e]" : "from-[#0D3F8A] to-[#0D3F8A]/40"
                    }`} />
                    <p className="font-medium text-slate-800">{item}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PROCESSO ── */}
        <section id="processo" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Processo"
              title={<>Como a Nortea atua na <span className="text-green">prática</span></>}
              description="Nosso trabalho é organizar a empresa de forma estratégica, com etapas claras e evolução acompanhada."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {etapas.map((etapa, idx) => (
                <motion.div
                  key={etapa.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  className="group rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-[0_4px_28px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#16C36B]/20 hover:shadow-[0_20px_56px_rgba(13,63,138,0.12)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16C36B]/12 to-[#16C36B]/6 font-bold text-lg text-[#16C36B] shadow-[0_2px_12px_rgba(22,195,107,0.14)] transition-all duration-300 group-hover:shadow-[0_4px_22px_rgba(22,195,107,0.28)]">
                      {etapa.step}
                    </div>
                    <h3 className="text-xl font-bold text-[#0D3F8A]">{etapa.title}</h3>
                  </div>
                  <p className="mt-5 leading-8 text-slate-500">{etapa.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENTREGAS ── */}
        <section className="bg-gradient-to-b from-[#EEF3FF] to-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Exemplos de entrega"
              title={<>Exemplos de estruturas que <span className="text-green">desenvolvemos</span></>}
              description="Apresentações visuais, controles e estruturas que ajudam a empresa a acompanhar números, operação e prioridades com mais clareza."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {entregas.map((item, idx) => {
                const Icon = item.icon;
                const isFinancial = idx < 2;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className={`group relative rounded-[32px] border p-7 shadow-[0_4px_24px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-2 ${
                      isFinancial
                        ? "border-[#22de7e]/15 bg-[#F8FBF4]/30 hover:border-[#22de7e]/25 hover:shadow-[0_24px_64px_rgba(34,222,126,0.12)]"
                        : "border-slate-200/70 bg-white hover:border-[#0D3F8A]/20 hover:shadow-[0_24px_64px_rgba(13,63,138,0.13)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`rounded-2xl p-3.5 transition-all duration-300 ${
                        isFinancial
                          ? "bg-gradient-to-br from-[#16C36B]/12 to-[#22de7e]/8 text-[#16C36B] group-hover:shadow-[0_4px_16px_rgba(22,195,107,0.18)]"
                          : "bg-gradient-to-br from-[#0D3F8A]/10 to-[#0D3F8A]/5 text-[#0D3F8A] group-hover:shadow-[0_4px_16px_rgba(13,63,138,0.16)]"
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <ChevronRight className={`h-5 w-5 text-slate-200 transition-all duration-300 group-hover:translate-x-0.5 ${
                        isFinancial ? "group-hover:text-[#22de7e]" : "group-hover:text-[#16C36B]"
                      }`} />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Modelo visual demonstrativo para acompanhamento gerencial e tomada de decisão.</p>
                    <div className={`absolute bottom-0 left-7 right-7 h-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                      isFinancial
                        ? "bg-gradient-to-r from-[#22de7e]/0 via-[#22de7e]/45 to-[#22de7e]/0"
                        : "bg-gradient-to-r from-[#16C36B]/0 via-[#16C36B]/45 to-[#16C36B]/0"
                    }`} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FUNDADORES ── */}
        <section id="fundadores" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Fundadores"
              title="Quem está por trás da Nortea"
              description="Uma estrutura complementar para unir visão financeira, direção estratégica e organização operacional com apoio de tecnologia."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {[
                {
                  src: "/images/fundadores/caio.jpeg",
                  alt: "Caio Ferreira de Freitas",
                  name: "Caio Ferreira de Freitas",
                  bio: [
                    "Programador com foco no desenvolvimento de soluções digitais, automação de processos e criação de sistemas voltados para gestão empresarial.",
                    "Atua na construção de dashboards, estruturas operacionais e automações que ajudam empresas a saírem da desorganização e passarem a operar com mais clareza, controle e eficiência.",
                    "Na Nortea, é responsável pela estrutura tecnológica e operacional, conectando gestão, automação e crescimento de forma prática e estratégica.",
                  ],
                },
                {
                  src: "/images/fundadores/bernardo.jpeg",
                  alt: "Bernardo Gabryhel",
                  name: "Bernardo Gabryhel",
                  bio: [
                    "Atua na área contábil com foco em micro e pequenos empreendedores, oferecendo suporte prático e estratégico para a gestão e regularização de negócios.",
                    "Possui experiência em rotinas contábeis e administrativas, com constante atualização nas mudanças da legislação, garantindo segurança e clareza nas decisões financeiras dos clientes.",
                    "Na Nortea, é responsável pela estrutura financeira e contábil, ajudando empresas a organizarem seus números, reduzirem riscos e tomarem decisões com mais controle e confiança.",
                  ],
                },
              ].map((f) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="group overflow-hidden rounded-[32px] border border-slate-200/70 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:shadow-[0_24px_64px_rgba(13,63,138,0.12)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={f.src}
                      alt={f.alt}
                      className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16C36B]">Cofundador</p>
                    <h3 className="mt-2 text-2xl font-bold text-[#0D3F8A]">{f.name}</h3>
                    {f.bio.map((p, i) => (
                      <p key={i} className={`${i === 0 ? "mt-5" : "mt-4"} leading-8 text-slate-500`}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEAD FORM ── */}
        <LeadFormSection />

        {/* ── CTA ── */}
        <section className="pb-24 pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#0D3F8A] via-[#0a3070] to-[#071f52] p-10 text-white shadow-[0_32px_100px_rgba(13,63,138,0.38)] sm:p-14">
              {/* Background depth */}
              <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#16C36B]/12 blur-[80px]" />
              <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#0a3070]/60 blur-[60px]" />
              {/* Subtle dot grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
              />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2.5">
                  <span className="h-px w-7 bg-[#8BE1B2]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8BE1B2]">Diagnóstico inicial</p>
                </div>
                <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
                  Pare de crescer no improviso.{" "}
                  <br className="hidden sm:block" />
                  Comece a crescer com{" "}
                  <span className="text-[#22de7e]">estratégia.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
                  Solicite um <Kw>diagnóstico inicial</Kw> e entenda com mais clareza onde sua empresa está travando, perdendo eficiência ou deixando dinheiro na mesa.
                </p>
                <div className="mt-9">
                  <a
                    href={whatsappLink}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#16C36B] to-[#0fba5f] px-7 py-4 font-semibold text-white shadow-[0_8px_36px_rgba(22,195,107,0.50)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_48px_rgba(22,195,107,0.65)]"
                  >
                    Falar com a Nortea
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
