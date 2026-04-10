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
import TrustSection from "./TrustSection";

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


function SectionTitle({ eyebrow, title, description, light = false }: { eyebrow: string; title: React.ReactNode; description?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2.5">
        <span className={`h-px w-7 ${light ? "bg-neutral-400" : "bg-white/30"}`} />
        <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${light ? "text-neutral-500" : "text-white/40"}`}>{eyebrow}</p>
      </div>
      <h2 className={`text-3xl font-bold tracking-tight ${light ? "text-neutral-900" : "text-white"} sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]`}>{title}</h2>
      {description ? <p className={`mt-5 text-base leading-8 ${light ? "text-neutral-600" : "text-white/50"} sm:text-lg`}>{description}</p> : null}
    </div>
  );
}

function LogoMark() {
  return (
    <img
      src="/images/logo/logo nova nortea.png"
      alt="Nortea"
      decoding="async"
      className="h-11 w-auto"
    />
  );
}

function MetricCard({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "green" | "blue" }) {
  return (
    <div
      className={`rounded-[28px] border p-5 transition-all duration-300 hover:-translate-y-1 ${
        tone === "green"
          ? "border-white/12 bg-white/8 hover:shadow-[0_12px_36px_rgba(0,0,0,0.30)]"
          : tone === "blue"
          ? "border-white/8 bg-[#1a1a1d] shadow-[0_8px_28px_rgba(0,0,0,0.30)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.40)]"
          : "border-white/8 bg-[#1a1a1d] shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
      }`}
    >
      <p className="text-sm text-white/40">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function ExecutivePreview() {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 900);
    return () => clearTimeout(t);
  }, []);
  const faturamento = useCountUp(128450, 1400, started, "R$ ");
  const meta = useCountUp(74, 1400, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-auto w-full max-w-[580px]"
    >
      {/* Glow halos */}

      {/* Outer premium frame */}
      <div className="relative rounded-[40px] border border-white/12 bg-[#141416] p-[1.5px] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_130px_rgba(0,0,0,0.70)]">
        <div className="rounded-[39px] bg-[#141416] p-4">
          <div className="rounded-[33px] bg-[#1a1a1d] p-5">

            {/* Header row */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Visão estratégica</p>
                <h3 className="mt-1.5 text-[1.4rem] font-bold text-white">Controle com clareza</h3>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/70" />
                </span>
                Nortea Dashboard
              </div>
            </div>

            {/* Top metrics */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/8 bg-[#111113] p-5">
                <p className="text-sm text-white/40">Faturamento projetado</p>
                <p className="mt-2 text-3xl font-bold text-white">{faturamento}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "74%" }}
                    transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
                    className="h-full rounded-full bg-white/50"
                  />
                </div>
                <p className="mt-2.5 text-xs text-white/30">{meta}% da meta mensal atingida</p>
              </div>

              <div className="rounded-3xl border border-white/8 bg-[#111113] p-5">
                <p className="text-sm text-white/40">Fluxo operacional</p>
                <p className="mt-1.5 text-2xl font-bold text-white">Organizado</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { v: 72, label: "Efic." },
                    { v: 88, label: "Ctrl." },
                    { v: 64, label: "Cresc." },
                  ].map((item, i) => (
                    <div key={i} className="rounded-2xl bg-white/6 p-2.5 text-center ring-1 ring-white/8">
                      <p className="text-base font-bold text-white">{item.v}%</p>
                      <p className="text-[10px] uppercase tracking-wide text-white/40">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom area */}
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-white/8 bg-[#111113] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/30">Acompanhamento mensal</p>
                    <p className="text-base font-semibold text-white">Indicadores centrais</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-xs font-semibold text-white/50">Ao vivo</div>
                </div>
                <div className="mt-5 flex h-28 items-end gap-2">
                  {[34, 56, 49, 63, 58, 82, 74].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0.3 }}
                      animate={{ height: `${h}%`, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 + i * 0.07, ease: "easeOut" }}
                      className={`w-full rounded-t-xl ${i >= 5 ? "bg-white/60" : "bg-white/12"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-3xl border border-white/8 bg-[#111113] p-4">
                  <p className="text-xs text-white/30">Pontos de atenção</p>
                  <p className="mt-1.5 text-xl font-bold text-white">03 pontos</p>
                  <p className="mt-1 text-xs leading-5 text-white/30">Atenção imediata necessária.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/40">Decisão com dados</p>
                  <p className="mt-1.5 text-xl font-bold text-white">Mais controle</p>
                  <p className="mt-1 text-xs leading-5 text-white/40">Menos achismo, mais resultado.</p>
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
      className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#111113] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-white/4 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-40 w-40 rounded-full bg-white/3 blur-3xl" />
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard label="Faturamento do mês" value={faturamento} tone="green" />
          <MetricCard label="Despesas operacionais" value={despesas} tone="blue" />
          <MetricCard label="Margem estimada" value={margem} tone="green" />
          <MetricCard label="Leads acompanhados" value={leads} tone="blue" />
        </div>

        <div className="rounded-[28px] border border-white/8 bg-[#1a1a1d] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/40">Resumo executivo</p>
              <p className="text-lg font-semibold text-white">Visão da operação</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/50">Demonstrativo</div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              ["Fluxo de caixa", "Saudável", "86%", "text-white", "from-white/60 to-white/30"],
              ["Processos críticos", "Controlados", "72%", "text-white/70", "from-white/40 to-white/20"],
              ["Oportunidades", "Mapeadas", "64%", "text-white/60", "from-white/30 to-white/10"],
            ].map(([label, text, width, textColor, barColor]) => (
              <div key={label} className="rounded-2xl border border-white/6 bg-white/4 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className={`font-semibold ${textColor}`}>{text}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
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
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setHeaderVisible(true);
      } else if (currentY > lastY) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappNumber = "558288224653";
  const whatsappMessage = encodeURIComponent("Olá, vim pelo site da Nortea e gostaria de conversar sobre a estruturação da minha empresa.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const pilares = [
    {
      icon: Target,
      title: "Estrutura Digital",
      text: "Criação ou melhoria de site, páginas de conversão e presença digital profissional que transmite autoridade e gera resultado.",
    },
    {
      icon: Workflow,
      title: "Automação e Operação",
      text: "Organização do WhatsApp, fluxo de atendimento e automações operacionais e comerciais para eliminar o improviso.",
    },
    {
      icon: CircleDollarSign,
      title: "Financeiro e Gestão",
      text: "Dashboard financeiro, organização dos números, leitura de indicadores e acompanhamento mensal com visão de BPO financeiro.",
    },
  ];

  const beneficios = [
    "Saber exatamente o que entra, o que sai e o que sobra",
    "Tomar decisões com dados, não com achismo",
    "Visualizar o fluxo de caixa em tempo real",
    "Acompanhamento mensal com visão estratégica",
  ];

  const etapas = [
    {
      step: "01",
      title: "Conversa inicial",
      text: "Entendemos como a empresa opera hoje: atendimento, estrutura digital e financeiro. Identificamos os pontos que travam o crescimento.",
    },
    {
      step: "02",
      title: "Diagnóstico e plano",
      text: "Transformamos o que identificamos em um plano concreto, com prioridades e estrutura de ação nos 3 pilares: digital, operação e financeiro.",
    },
    {
      step: "03",
      title: "Estruturação",
      text: "Colocamos em prática: organizamos atendimento, site, automações e financeiro para a empresa sair do improviso e operar com clareza.",
    },
    {
      step: "04",
      title: "Acompanhamento",
      text: "Monitoramos os resultados, ajustamos o que for necessário e garantimos que a evolução seja contínua e mensurável.",
    },
  ];

  const entregas = [
    { title: "Dashboard financeiro personalizado", icon: BarChart3 },
    { title: "Organização do fluxo de caixa", icon: LineChart },
    { title: "Página de conversão profissional", icon: TrendingUp },
    { title: "Fluxo de atendimento no WhatsApp", icon: Settings2 },
    { title: "Automações operacionais e comerciais", icon: BriefcaseBusiness },
    { title: "Acompanhamento mensal (BPO financeiro)", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-40 bg-[#09090b] transition-transform duration-300 ease-in-out will-change-transform ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="border-b border-white/8">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
            <LogoMark />
            <nav className="hidden items-center gap-8 text-sm font-medium text-white/55 lg:flex">
              <a href="#servicos" className="transition-colors hover:text-white">Serviços</a>
              <a href="#processo" className="transition-colors hover:text-white">Processo</a>
              <a href="#fundadores" className="transition-colors hover:text-white">Fundadores</a>
            </nav>
            <a
              href={whatsappLink}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-[10px] text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/14 hover:border-white/30"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com a Nortea
            </a>
          </div>
        </div>
      </header>

      <main>

        {/* ══ DARK ZONE: fundo único compartilhado ══ */}
        <div className="relative overflow-hidden bg-[#09090b]">
          {/* Subtle dot grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          {/* Subtle neutral glow */}
          <div className="pointer-events-none absolute right-0 top-[30%] h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-white/4 blur-3xl" />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden">

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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white/70" />
                </span>
                <span className="font-medium">Estruturação empresarial com tecnologia e gestão</span>
              </div>

              {/* H1 */}
              <h1 className="max-w-[580px] text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Empresas que vendem,{" "}
                <span className="text-white/55">mas operam no improviso,</span>{" "}
                <br className="hidden sm:block" />
                <span className="text-white">não crescem</span>{" "}
                <span className="text-white/55">com consistência.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-7 max-w-[500px] text-lg leading-8 text-white/60">
                A Nortea organiza seu{" "}
                <span className="font-semibold text-white/90">atendimento</span>,{" "}
                sua{" "}
                <span className="font-semibold text-white/90">estrutura digital</span>{" "}
                e seu{" "}
                <span className="font-semibold text-white/90">financeiro</span>{" "}
                para transformar sua empresa em uma operação profissional.
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={whatsappLink}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 font-semibold text-[#09090b] shadow-[0_8px_36px_rgba(255,255,255,0.15)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_48px_rgba(255,255,255,0.22)]"
                >
                  Falar com a Nortea
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-4 font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/45 hover:bg-white/12 hover:text-white"
                >
                  Ver como atuamos
                </a>
              </div>

              {/* Trust row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/40">
                {["Atendimento organizado", "Estrutura digital", "Controle financeiro"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — dashboard */}
            <div className="relative z-10">
              {/* Floating micro-stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                className="absolute -left-10 top-10 z-20 hidden xl:block"
              >
                <div className="rounded-2xl border border-white/12 bg-[#141416]/95 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Empresas atendidas</p>
                  <p className="mt-0.5 text-xl font-bold text-white">60+</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="absolute -right-6 bottom-24 z-20 hidden xl:block"
              >
                <div className="rounded-2xl border border-white/12 bg-[#141416]/95 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/35">Satisfação</p>
                  <p className="mt-0.5 text-xl font-bold text-white">94%</p>
                </div>
              </motion.div>
              <ExecutivePreview />
            </div>
          </div>
        </section>

        {/* ── TRUST / SEGMENTOS ── */}
        <TrustSection />

        </div>{/* fim dark zone */}

        {/* ── PROBLEMA ── */}
        <section className="bg-[#f5f5f5]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionTitle
              light
              eyebrow="Reconhece isso?"
              title={<>O problema não é falta de esforço. É falta de estrutura.</>}
              description="Muitas empresas vendem e trabalham duro — mas continuam perdendo clientes no WhatsApp, sem controle financeiro, crescendo no improviso."
            />
            <motion.div
              className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { text: "Clientes perdidos no WhatsApp por falta de processo" },
                { text: "Sem controle financeiro: não sabe o que sobra no mês" },
                { text: "Presença digital fraca que não converte" },
                { text: "Crescimento no improviso, sem operação estruturada" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="group rounded-[28px] border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-neutral-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)]"
                >
                  <div className="inline-flex rounded-2xl bg-neutral-100 p-2.5">
                    <CheckCircle2 className="h-5 w-5 text-neutral-400" />
                  </div>
                  <p className="mt-4 font-semibold text-neutral-800">{item.text}</p>
                </div>
              ))}
            </motion.div>

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

        {/* ── SERVIÇOS ── */}
        <section id="servicos" className="relative bg-[#0d0d0f]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Como atuamos"
              title={<>3 pilares para estruturar<br className="hidden sm:block" /> sua empresa de vez</>}
              description="A Nortea não age de forma isolada. Integramos estrutura digital, automação operacional e gestão financeira para transformar empresas que operam no improviso em negócios organizados."
            />

            <motion.div className="mt-14 grid gap-6 lg:grid-cols-3" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
              {pilares.map((item, idx) => {
                const Icon = item.icon;
                const isFirst = idx === 0;
                return (
                  <div
                    key={item.title}
                    className={`group relative rounded-[32px] border p-8 transition-all duration-300 hover:-translate-y-2 ${
                      isFirst
                        ? "border-white/15 bg-white/6 shadow-[0_6px_32px_rgba(0,0,0,0.30)] hover:border-white/25 hover:shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
                        : "border-white/8 bg-[#111113] shadow-[0_6px_32px_rgba(0,0,0,0.25)] hover:border-white/16 hover:shadow-[0_24px_64px_rgba(0,0,0,0.40)]"
                    }`}
                  >
                    <div className="relative">
                      <div className="inline-flex rounded-2xl bg-white/10 p-3.5 text-white transition-all duration-300 group-hover:bg-white/15">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                      <p className="mt-3 leading-7 text-white/55">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/14 hover:border-white/30"
              >
                Conversar com um especialista
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── FINANCEIRO ── */}
        <section className="bg-[#f5f5f5]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              light
              eyebrow="Gestão financeira"
              title="Seus números organizados, suas decisões mais claras."
              description="A Nortea estrutura o financeiro da sua empresa: organização do fluxo de caixa, leitura de indicadores e acompanhamento mensal próximo."
            />

            <div className="mt-14">
              <DashboardDemo />
            </div>

            <motion.div
              className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {beneficios.map((item) => (
                <div
                  key={item}
                  className="group rounded-[28px] border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
                >
                  <div className="mb-3 h-1 w-8 rounded-full bg-neutral-300 transition-all duration-300 group-hover:w-14 group-hover:bg-neutral-500" />
                  <p className="font-medium text-neutral-800">{item}</p>
                </div>
              ))}
            </motion.div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Quero organizar meu financeiro
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── PROCESSO ── */}
        <section id="processo" className="relative overflow-hidden bg-[#0d0d0f]">
          {/* Dot grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Processo"
              title="Como a Nortea estrutura sua empresa"
              description="Trabalhamos com etapas claras, do diagnóstico à execução. Nada genérico — tudo adaptado à realidade do seu negócio."
            />

            <motion.div
              className="mt-14 grid gap-6 lg:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              {etapas.map((etapa, idx) => {
                const isBlue = idx % 2 === 1;
                return (
                <div
                  key={etapa.step}
                  className={`group rounded-[32px] border p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                    isBlue
                      ? "border-white/8 bg-[#111113] shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:border-white/16 hover:shadow-[0_20px_56px_rgba(0,0,0,0.50)]"
                      : "border-white/10 bg-white/6 backdrop-blur-sm shadow-[0_6px_32px_rgba(0,0,0,0.25)] hover:border-white/20 hover:shadow-[0_20px_56px_rgba(0,0,0,0.40)]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/8 font-bold text-lg text-white shadow-[0_2px_12px_rgba(0,0,0,0.30)] transition-all duration-300 group-hover:shadow-[0_4px_22px_rgba(255,255,255,0.10)] ring-1 ring-white/10">
                      {etapa.step}
                    </div>
                    <h3 className="text-xl font-bold text-white">{etapa.title}</h3>
                  </div>
                  <p className={`mt-5 leading-8 ${isBlue ? "text-white/70" : "text-white/60"}`}>{etapa.text}</p>
                </div>
                );
              })}
            </motion.div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/14 hover:border-white/30"
              >
                Quero estruturar minha empresa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── ENTREGAS ── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              light
              eyebrow="O que entregamos"
              title="Estruturas concretas para cada pilar do negócio"
              description="Não vendemos consultoria genérica. Cada entrega é prática e aplicada diretamente à operação da sua empresa."
            />

            <motion.div
              className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {entregas.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative rounded-[32px] border border-neutral-200 bg-[#f8f8f8] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-neutral-300 hover:bg-white hover:shadow-[0_24px_64px_rgba(0,0,0,0.07)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl bg-neutral-900 p-3.5 text-white transition-all duration-300 group-hover:bg-neutral-800">
                        <Icon className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-neutral-500" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-neutral-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-500">Estrutura prática aplicada diretamente à operação da empresa.</p>
                  </div>
                );
              })}
            </motion.div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Conversar com um especialista
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── FUNDADORES ── */}
        <section id="fundadores" className="relative overflow-hidden bg-[#0d0d0f]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <SectionTitle
              eyebrow="Fundadores"
              title="Quem está por trás da Nortea"
              description="Dois profissionais com formações complementares — tecnologia e contabilidade — unidos para estruturar empresas de forma completa: digital, operacional e financeira."
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
                  className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#111113] shadow-[0_8px_40px_rgba(0,0,0,0.40)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/45">Cofundador</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{f.name}</h3>
                    {f.bio.map((p, i) => (
                      <p key={i} className={`${i === 0 ? "mt-5" : "mt-4"} leading-8 text-white/55`}>{p}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/14 hover:border-white/30"
              >
                Falar com a Nortea
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-[#09090b] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[#111113] px-10 py-16 text-center shadow-[0_32px_100px_rgba(0,0,0,0.55)] sm:px-16">
              <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/35">Primeiro passo</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Pronto para estruturar<br className="hidden sm:block" /> sua empresa?
                </h2>
                <p className="mt-5 mx-auto max-w-xl text-lg leading-8 text-white/50">
                  Conversa inicial gratuita. Entendemos sua situação e mostramos como a Nortea pode ajudar.
                </p>
                <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <a
                    href={whatsappLink}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 font-semibold text-[#09090b] shadow-[0_8px_36px_rgba(255,255,255,0.12)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_48px_rgba(255,255,255,0.18)]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Falar com a Nortea
                  </a>
                  <a
                    href={whatsappLink}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-8 py-4 font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    Conversar com um especialista
                    <ArrowRight className="h-4 w-4" />
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
