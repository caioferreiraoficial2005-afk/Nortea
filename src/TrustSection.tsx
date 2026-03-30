import {
  ShoppingBag,
  Heart,
  Building2,
  UtensilsCrossed,
  Cpu,
  Briefcase,
  GraduationCap,
  Home,
  TrendingUp,
  CheckCircle2,
  Star,
} from "lucide-react";

// Segmentos de mercado que a Nortea atende
const SEGMENTOS = [
  { name: "Varejo", icon: ShoppingBag },
  { name: "Saúde", icon: Heart },
  { name: "Construção", icon: Building2 },
  { name: "Alimentação", icon: UtensilsCrossed },
  { name: "Tecnologia", icon: Cpu },
  { name: "Serviços", icon: Briefcase },
  { name: "Educação", icon: GraduationCap },
  { name: "Imobiliário", icon: Home },
];

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
      <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
      <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="relative bg-transparent overflow-hidden">
      {/* Scoped animations */}
      <style>{`
        @keyframes nortea-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .nortea-marquee {
          animation: nortea-marquee 40s linear infinite;
        }
        .nortea-marquee-item {
          transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 pb-24 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Star className="h-3.5 w-3.5 text-[#16C36B] fill-[#16C36B]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Segmentos que ajudamos a crescer
            </span>
          </div>
          <p className="text-white/40 text-sm max-w-md">
            Atuamos em múltiplos segmentos — o problema de crescer sem estratégia não tem setor.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

          {/* ── COLUNA ESQUERDA: Stats card ── */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              {/* Glow interno */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#16C36B]/10 blur-2xl" />

              <div className="relative z-10">
                {/* Métrica principal */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16C36B]/15 ring-1 ring-[#16C36B]/30">
                    <TrendingUp className="h-6 w-6 text-[#16C36B]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white">60+</div>
                    <div className="text-sm text-white/45">Empresas estruturadas</div>
                  </div>
                </div>

                {/* Barra de satisfação */}
                <div className="space-y-3 mb-7">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Satisfação dos clientes</span>
                    <span className="text-white font-semibold">94%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#16C36B] to-[#22de7e]" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="1 ano" label="Atuação" />
                  <div className="w-px bg-white/10" />
                  <StatItem value="100%" label="Dedicação" />
                  <div className="w-px bg-white/10" />
                  <StatItem value="Ativo" label="Suporte" />
                </div>

                {/* Tags */}
                <div className="mt-7 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-white/60">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C36B] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16C36B]" />
                    </span>
                    ATIVO
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-white/60">
                    <CheckCircle2 className="w-3 h-3 text-[#16C36B]" />
                    DIAGNÓSTICO GRATUITO
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── COLUNA DIREITA: Marquee card ── */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 py-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <h3 className="mb-6 px-8 text-sm font-medium text-white/40 uppercase tracking-widest">
                Segmentos atendidos
              </h3>

              {/* Linha 1 — da esquerda para direita */}
              <div
                className="relative flex overflow-hidden mb-4"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                }}
              >
                <div className="nortea-marquee flex gap-10 whitespace-nowrap px-4">
                  {[...SEGMENTOS, ...SEGMENTOS, ...SEGMENTOS].map((seg, i) => {
                    const Icon = seg.icon;
                    return (
                      <div
                        key={i}
                        className="nortea-marquee-item flex items-center gap-2.5 opacity-40 hover:opacity-100 hover:scale-105 cursor-default"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0D3F8A]/40 ring-1 ring-[#0D3F8A]/60">
                          <Icon className="h-4 w-4 text-[#16C36B]" />
                        </div>
                        <span className="text-base font-semibold text-white tracking-tight">
                          {seg.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Linha 2 — sentido inverso */}
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  animationDirection: "reverse",
                }}
              >
                <div
                  className="flex gap-10 whitespace-nowrap px-4"
                  style={{ animation: "nortea-marquee 28s linear infinite reverse" }}
                >
                  {[...SEGMENTOS, ...SEGMENTOS, ...SEGMENTOS].reverse().map((seg, i) => {
                    const Icon = seg.icon;
                    return (
                      <div
                        key={i}
                        className="nortea-marquee-item flex items-center gap-2.5 opacity-30 hover:opacity-100 hover:scale-105 cursor-default"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#16C36B]/20 ring-1 ring-[#16C36B]/30">
                          <Icon className="h-4 w-4 text-[#16C36B]" />
                        </div>
                        <span className="text-base font-semibold text-white/70 tracking-tight">
                          {seg.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rodapé do card */}
              <div className="mt-6 px-8">
                <p className="text-xs text-white/30 leading-5">
                  Varejo · Saúde · Construção · Alimentação · Tecnologia · Serviços · Educação · Imobiliário
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
