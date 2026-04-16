import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .nch-gsap-reveal { visibility: hidden; }

  .nch-film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .nch-bg-grid {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(5,122,65,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(5,122,65,0.05) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .nch-text-3d {
    color: #ffffff;
    text-shadow:
      0 10px 30px rgba(5,122,65,0.18),
      0 2px 4px rgba(255,255,255,0.08);
  }

  .nch-text-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.45) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 20px rgba(5,122,65,0.15))
      drop-shadow(0px 2px 4px rgba(255,255,255,0.06));
  }

  .nch-text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 12px 24px rgba(0,0,0,0.85))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.65));
  }

  .nch-card {
    background: linear-gradient(145deg, #0a1f14 0%, #060c09 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.95),
      0 20px 40px -20px rgba(0,0,0,0.85),
      inset 0 1px 2px rgba(5,122,65,0.14),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(5,122,65,0.10);
    position: relative;
  }

  .nch-card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(5,122,65,0.07) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .nch-iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.95),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .nch-hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow:
      -2px 0 5px rgba(0,0,0,0.8),
      inset -1px 0 1px rgba(255,255,255,0.15),
      inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .nch-screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%);
  }

  .nch-widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow:
      0 6px 16px rgba(0,0,0,0.35),
      inset 0 1px 1px rgba(255,255,255,0.06),
      inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .nch-floating-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(5,122,65,0.20),
      0 25px 50px -12px rgba(0,0,0,0.85),
      inset 0 1px 1px rgba(255,255,255,0.18),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .nch-btn-primary {
    background: linear-gradient(180deg, #057a41 0%, #046035 100%);
    color: #FFFFFF;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 0 0 1px rgba(5,122,65,0.35), 0 2px 4px rgba(0,0,0,0.3), 0 12px 24px -4px rgba(5,122,65,0.45), inset 0 1px 1px rgba(255,255,255,0.18);
  }
  .nch-btn-primary:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #068a4b 0%, #057a41 100%);
    box-shadow: 0 0 0 1px rgba(5,122,65,0.45), 0 6px 12px -2px rgba(5,122,65,0.3), 0 20px 32px -6px rgba(5,122,65,0.55), inset 0 1px 1px rgba(255,255,255,0.22);
  }
  .nch-btn-primary:active { transform: translateY(1px); }

  .nch-btn-outline {
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.18);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 8px 16px -4px rgba(0,0,0,0.5);
  }
  .nch-btn-outline:hover {
    transform: translateY(-3px);
    border-color: rgba(5,122,65,0.5);
    color: #057a41;
    background: rgba(5,122,65,0.10);
  }
  .nch-btn-outline:active { transform: translateY(1px); }

  /* ring: r=60 → circumference ≈ 377 */
  .nch-progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 377;
    stroke-dashoffset: 377;
    stroke-linecap: round;
  }
`;

interface NorteaCinematicHeroProps {
  whatsappLink?: string;
  onCinematicStateChange?: (active: boolean) => void;
}

export default function NorteaCinematicHero({
  whatsappLink = "#",
  onCinematicStateChange,
}: NorteaCinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Mouse tilt + card sheen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, {
          rotationY: xVal * 12,
          rotationX: -yVal * 12,
          ease: "power3.out",
          duration: 1.2,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cinematic scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".nch-text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".nch-text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".nch-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".nch-card-left", ".nch-card-right", ".nch-mockup-wrapper", ".nch-badge", ".nch-phone-widget"], { autoAlpha: 0 });
      gsap.set(".nch-cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Intro animation
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".nch-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".nch-text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll timeline — end reduced for faster overall pace
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onEnter: () => onCinematicStateChange?.(true),
          onLeave: () => onCinematicStateChange?.(false),
          onEnterBack: () => onCinematicStateChange?.(true),
          onLeaveBack: () => onCinematicStateChange?.(false),
        },
      });

      scrollTl
        // Phase 1: card rises while hero text blurs out
        .to([".nch-hero-text", ".nch-bg-grid"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".nch-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        // Phase 2: card expands to full screen
        .to(".nch-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        // Phase 3: phone appears with 3D flip
        .fromTo(".nch-mockup-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        // Phase 4: phone widgets, ring, counter and badges animate in together
        .fromTo(".nch-phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .to(".nch-progress-ring", { strokeDashoffset: 94, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".nch-counter-val", { innerHTML: 128, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")
        .fromTo(".nch-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .fromTo(".nch-card-left", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".nch-card-right", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        // Short settle pause — user can scroll away right after counter reaches 128
        .to({}, { duration: 0.5 })
        // Phase 5: transition to CTA
        .set(".nch-hero-text", { autoAlpha: 0 })
        .set(".nch-cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 0.6 })
        .to([".nch-mockup-wrapper", ".nch-badge", ".nch-card-left", ".nch-card-right"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".nch-main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".nch-cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        // Phase 6: card exits viewport
        .to(".nch-main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [onCinematicStateChange]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-white antialiased"
      style={{ perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="nch-film-grain" aria-hidden="true" />
      <div className="nch-bg-grid absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* Hero taglines */}
      <div className="nch-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="nch-text-track nch-gsap-reveal nch-text-3d text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          Estruture sua empresa,
        </h1>
        <h1 className="nch-text-days nch-gsap-reveal nch-text-silver text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          opere com clareza.
        </h1>
      </div>

      {/* CTA final */}
      <div className="nch-cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 nch-gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight nch-text-silver">
          Pronto para estruturar<br className="hidden sm:block" /> sua empresa?
        </h2>
        <p className="text-white/55 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Conversa inicial gratuita. Entendemos sua operação e mostramos como a Nortea pode ajudar.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="nch-btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-[#057a41] focus:ring-offset-2 focus:ring-offset-black"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-lg">Falar com a Nortea</span>
          </a>
          <a
            href="#servicos"
            className="nch-btn-outline flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black group"
          >
            <span className="font-semibold text-lg">Ver como atuamos</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Main card (foreground) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="nch-main-card nch-card nch-gsap-reveal relative overflow-hidden flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="nch-card-sheen" aria-hidden="true" />

          {/* Grid: mobile = flex col, desktop = 3 cols */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* TOP (mobile) / RIGHT (desktop): brand name */}
            <div className="nch-card-right nch-gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter nch-text-card-silver">
                Nortea
              </h2>
            </div>

            {/* CENTER: iPhone mockup */}
            <div
              className="nch-mockup-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">

                {/* iPhone bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] nch-iphone-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] nch-hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] nch-hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] nch-hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] nch-hardware-btn rounded-r-md z-0" style={{ transform: "scaleX(-1)" }} aria-hidden="true" />

                  {/* Screen */}
                  <div
                    className="absolute inset-[7px] bg-[#050d07] rounded-[2.5rem] overflow-hidden text-white z-10"
                    style={{ boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}
                  >
                    <div className="absolute inset-0 nch-screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic island */}
                    <div
                      className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3"
                      style={{ boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-[#057a41] animate-pulse"
                        style={{ boxShadow: "0 0 8px rgba(5,122,65,0.9)" }}
                      />
                    </div>

                    {/* ── App UI ── */}
                    <div className="relative w-full h-full pt-12 px-4 pb-8 flex flex-col gap-3">

                      {/* Header row */}
                      <div className="nch-phone-widget flex justify-between items-center">
                        <div>
                          <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Financeiro</span>
                          <p className="text-base font-bold tracking-tight text-white leading-tight">Dashboard</p>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full bg-[#057a41]/15 text-[#057a41] flex items-center justify-center font-bold text-xs border border-[#057a41]/30"
                          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
                        >N</div>
                      </div>

                      {/* Progress ring — faturamento do mês */}
                      <div
                        className="nch-phone-widget relative w-40 h-40 mx-auto flex-shrink-0 flex items-center justify-center"
                        style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.85))" }}
                      >
                        {/* r=60 → circumference ≈ 377 */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160" aria-hidden="true">
                          <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="11" />
                          <circle
                            className="nch-progress-ring"
                            cx="80" cy="80" r="60"
                            fill="none"
                            stroke="#057a41"
                            strokeWidth="11"
                          />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-[10px] text-[#057a41] font-bold">R$</span>
                            <span className="nch-counter-val text-[1.75rem] font-extrabold tracking-tighter text-white leading-none">0</span>
                            <span className="text-[10px] text-[#057a41] font-bold">k</span>
                          </div>
                          <span className="text-[7px] text-[#057a41]/55 uppercase tracking-[0.12em] font-bold mt-0.5">Faturamento</span>
                        </div>
                      </div>

                      {/* Entradas / Saídas */}
                      <div className="nch-phone-widget flex gap-2">
                        <div
                          className="flex-1 nch-widget-depth rounded-xl p-2.5 flex flex-col items-center"
                        >
                          <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Entradas</span>
                          <span className="text-sm font-bold text-[#057a41] leading-none">+R$ 145k</span>
                        </div>
                        <div
                          className="flex-1 nch-widget-depth rounded-xl p-2.5 flex flex-col items-center"
                        >
                          <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Saídas</span>
                          <span className="text-sm font-bold text-white/60 leading-none">-R$ 48k</span>
                        </div>
                      </div>

                      {/* Fluxo de caixa widget */}
                      <div className="nch-phone-widget nch-widget-depth rounded-2xl p-3 flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center border border-[#057a41]/25"
                          style={{ background: "linear-gradient(135deg, rgba(5,122,65,0.22) 0%, rgba(5,122,65,0.04) 100%)" }}
                        >
                          <svg className="w-4 h-4 text-[#057a41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Fluxo de caixa</p>
                          <p className="text-xs font-bold text-white leading-tight">Saudável</p>
                          <div className="mt-1.5 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                            <div className="h-full w-[86%] rounded-full bg-[#057a41]/70" />
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#057a41] flex-shrink-0">86%</span>
                      </div>

                      {/* Margem widget */}
                      <div className="nch-phone-widget nch-widget-depth rounded-2xl p-3 flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center border border-white/10"
                          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}
                        >
                          <svg className="w-4 h-4 text-white/55" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Margem estimada</p>
                          <p className="text-xs font-bold text-white leading-tight">62% este mês</p>
                          <div className="mt-1.5 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                            <div className="h-full w-[62%] rounded-full bg-white/30" />
                          </div>
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[3px] bg-white/20 rounded-full"
                        style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating badge — top left: faturamento */}
                <div className="nch-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] nch-floating-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border border-[#057a41]/35"
                    style={{ background: "linear-gradient(180deg, rgba(5,122,65,0.22) 0%, rgba(5,122,65,0.04) 100%)" }}
                  >
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">📈</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">R$ 128k / mês</p>
                    <p className="text-[#057a41]/60 text-[10px] lg:text-xs font-medium">Faturamento deste mês</p>
                  </div>
                </div>

                {/* Floating badge — bottom right: fluxo */}
                <div className="nch-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] nch-floating-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border border-white/15"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}
                  >
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">✅</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Fluxo organizado</p>
                    <p className="text-white/45 text-[10px] lg:text-xs font-medium">Controle em tempo real</p>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM (mobile) / LEFT (desktop): description */}
            <div className="nch-card-left nch-gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                Controle financeiro com clareza.
              </h3>
              <p className="hidden md:block text-white/55 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                A <span className="text-white font-semibold">Nortea</span> organiza o financeiro da sua empresa: dashboard personalizado, fluxo de caixa estruturado e acompanhamento mensal estratégico.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
