import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MessageCircle, BarChart3 } from "lucide-react";
import mockupLoja from "./assets/mockup_loja.png";

// ── Demo 1: Real store mockup image ──
function StoreDemoVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-neutral-200">
      <img
        src={mockupLoja}
        alt="Exemplo de loja virtual"
        className="w-full h-auto block"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

// ── Demo 2: WhatsApp chat simulation ──
const CHAT_MESSAGES = [
  { from: "client", text: "Oi, tudo bem? Queria saber o preço do corte" },
  { from: "bot", text: "Olá! Tudo ótimo 😊 Nosso corte está R$ 45. Quer agendar?" },
  { from: "client", text: "Sim! Tem vaga amanhã?" },
  { from: "bot", text: "Tenho sim! Manhã ou tarde?" },
  { from: "client", text: "Tarde" },
  { from: "bot", text: "✅ Agendado para amanhã às 15h. Te esperamos!" },
];

function WhatsAppDemoVisual() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const next = () => {
            if (i >= CHAT_MESSAGES.length) return;
            const msg = CHAT_MESSAGES[i];
            if (msg.from === "bot") {
              setShowTyping(true);
              setTimeout(() => {
                setShowTyping(false);
                setVisibleCount((c) => c + 1);
                i++;
                setTimeout(next, 900);
              }, 1200);
            } else {
              setVisibleCount((c) => c + 1);
              i++;
              setTimeout(next, 900);
            }
          };
          setTimeout(next, 600);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
    >
      {/* WA Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 bg-[#075E54] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white border border-white/20">
          N
        </div>
        <div>
          <p className="text-sm font-semibold text-white">MeuNegócio</p>
          <div className="flex items-center gap-1.5 text-[11px] text-green-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
            🤖 Agente IA ativo, respondendo agora
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex min-h-[260px] flex-col gap-2 px-4 py-4 bg-[#ECE5DD]">
        {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.from === "client" ? "justify-end" : "justify-start items-start gap-2"}`}
          >
            {msg.from === "bot" && (
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#075E54]/20 text-[10px]">
                🤖
              </div>
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-sm ${
                msg.from === "client"
                  ? "rounded-tr-sm bg-[#DCF8C6] text-neutral-800"
                  : "rounded-tl-sm bg-white text-neutral-800"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {showTyping && (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#075E54]/20 text-[10px]">
              🤖
            </div>
            <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-neutral-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 bg-white px-4 py-3">
        <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-2.5 text-center">
          <p className="text-sm font-bold text-[#057a41]">&lt;30s</p>
          <p className="text-[9px] uppercase tracking-wider text-neutral-500">Resposta</p>
        </div>
        <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-2.5 text-center">
          <p className="text-sm font-bold text-neutral-800">24h/7d</p>
          <p className="text-[9px] uppercase tracking-wider text-neutral-500">Disponível</p>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Demo ──
function DashboardMiniDemo() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-500">Dashboard financeiro</p>
          <p className="text-lg font-semibold text-neutral-900">Visão do mês</p>
        </div>
        <div className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-500">
          Ao vivo
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Faturamento", value: "R$ 128k", green: true },
          { label: "Despesas", value: "R$ 48k", green: false },
          { label: "Margem", value: "62%", green: true },
          { label: "Leads", value: "187", green: false },
        ].map((m) => (
          <div
            key={m.label}
            className={`rounded-[20px] border p-4 ${m.green ? "border-[#057a41]/25 bg-[#057a41]/8" : "border-neutral-100 bg-neutral-50"}`}
          >
            <p className="text-xs text-neutral-500">{m.label}</p>
            <p className="mt-1.5 text-xl font-bold text-neutral-900">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {[
          { label: "Fluxo de caixa", status: "Saudável", pct: "86%", color: "bg-[#057a41]/70" },
          { label: "Processos críticos", status: "Controlados", pct: "72%", color: "bg-neutral-300" },
        ].map((row) => (
          <div key={row.label} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-3">
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">{row.label}</span>
              <span className="font-semibold text-neutral-700">{row.status}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: row.pct }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Shared block structure ──
const SLIDE_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const slideVariants = {
  hiddenLeft: { opacity: 0, x: -40 },
  hiddenRight: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: SLIDE_EASE } },
};

interface DemoBlockProps {
  badge: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  BadgeIcon: React.ElementType;
}

function DemoBlock({ badge, title, paragraphs, bullets, visual, reverse = false, BadgeIcon }: DemoBlockProps) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>
      {/* Text */}
      <motion.div
        variants={reverse ? slideVariants : slideVariants}
        initial={reverse ? "hiddenRight" : "hiddenLeft"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#057a41]/40 bg-[#057a41]/8 px-3 py-1.5">
          <BadgeIcon className="h-3.5 w-3.5 text-[#057a41]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#057a41]">{badge}</span>
        </div>
        <h3 className="text-2xl font-bold leading-snug text-neutral-900 sm:text-3xl">{title}</h3>
        {paragraphs.map((p, i) => (
          <p key={i} className={`${i === 0 ? "mt-5" : "mt-4"} leading-7 text-neutral-600`}>{p}</p>
        ))}
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#057a41]" />
              <span className="text-sm leading-snug text-neutral-600">{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Visual */}
      <motion.div
        variants={slideVariants}
        initial={reverse ? "hiddenLeft" : "hiddenRight"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {visual}
      </motion.div>
    </div>
  );
}

// ── Main export ──
export default function ServiceDemosSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2.5">
            <span className="h-px w-7 bg-[#057a41]/50" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057a41]/70">Como funciona na prática</p>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Veja cada solução funcionando
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Não vendemos promessa. Veja exatamente o que sua empresa vai ter.
          </p>
        </motion.div>

        {/* Block 1 — Loja Virtual */}
        <div className="mt-20">
          <DemoBlock
            badge="Presença digital"
            BadgeIcon={Globe}
            title="Um site que trabalha por você enquanto você atende"
            paragraphs={[
              "Sua loja virtual fica no ar 24h por dia, recebendo visitas, apresentando seus serviços e convertendo em contatos e vendas, mesmo quando você está ocupado.",
              "A Nortea configura tudo: página de conversão, catálogo de produtos ou serviços, integração com WhatsApp e identidade visual profissional.",
            ]}
            bullets={[
              "Design profissional adaptado ao seu negócio",
              "Integrado ao WhatsApp e redes sociais",
              "Otimizado para aparecer no Google",
            ]}
            visual={<StoreDemoVisual />}
          />
        </div>

        <div className="my-16 h-px w-full bg-neutral-100" />

        {/* Block 2 — WhatsApp */}
        <DemoBlock
          badge="Atendimento automatizado"
          BadgeIcon={MessageCircle}
          title="Seu WhatsApp respondendo clientes enquanto você dorme"
          paragraphs={[
            "O agente de IA da Nortea assume o primeiro contato: apresenta seus serviços, responde dúvidas frequentes, coleta o contato do lead e encaminha para agendamento, tudo automaticamente.",
            "Você acorda com clientes qualificados esperando por você, sem ter feito nada.",
          ]}
          bullets={[
            "Resposta em menos de 30 segundos, 24h por dia",
            "Qualifica o lead antes de chegar até você",
            "Nunca perde um cliente por demora no atendimento",
          ]}
          visual={<WhatsAppDemoVisual />}
          reverse
        />

        <div className="my-16 h-px w-full bg-neutral-100" />

        {/* Block 3 — Financeiro */}
        <DemoBlock
          badge="Controle financeiro"
          BadgeIcon={BarChart3}
          title="Saiba exatamente quanto sobra, todo mês"
          paragraphs={[
            "A Nortea monta seu dashboard financeiro personalizado e o Bernardo acompanha os números com você todo mês, para você parar de decidir no achismo.",
            "Fluxo de caixa, margem de lucro, despesas e receitas em uma tela simples que qualquer dono de negócio entende.",
          ]}
          bullets={[
            "Dashboard atualizado em tempo real",
            "Assessoria mensal com contador especializado",
            "Alertas quando algo sai do planejado",
          ]}
          visual={<DashboardMiniDemo />}
        />
      </div>
    </section>
  );
}
