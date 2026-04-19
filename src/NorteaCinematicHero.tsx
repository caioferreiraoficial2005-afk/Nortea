import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle, TrendingUp } from "lucide-react";

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
    text-shadow: 0 10px 30px rgba(5,122,65,0.18), 0 2px 4px rgba(255,255,255,0.08);
  }

  .nch-text-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.45) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 10px 20px rgba(5,122,65,0.15)) drop-shadow(0px 2px 4px rgba(255,255,255,0.06));
  }

  .nch-text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: drop-shadow(0px 12px 24px rgba(0,0,0,0.85)) drop-shadow(0px 4px 8px rgba(0,0,0,0.65));
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
    box-shadow: -2px 0 5px rgba(0,0,0,0.8), inset -1px 0 1px rgba(255,255,255,0.15), inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .nch-screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 45%);
  }

  .nch-widget {
    background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 0 6px 16px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .nch-floating-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 0 0 1px rgba(5,122,65,0.20), 0 25px 50px -12px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -1px 1px rgba(0,0,0,0.5);
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

  /* r=60 → circumference ≈ 377 */
  .nch-progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 377;
    stroke-dashoffset: 377;
    stroke-linecap: round;
  }

  /* Mobile: remove efeitos pesados */
  @media (max-width: 767px) {
    .nch-film-grain { display: none; }
    .nch-floating-badge {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: rgba(8, 20, 12, 0.92);
    }
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

  // Mouse tilt (desktop only)
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
        gsap.to(mockupRef.current, { rotationY: xVal * 10, rotationX: -yVal * 10, ease: "power3.out", duration: 1.2 });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Cinematic scroll timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const pinEnd = isMobile ? "+=5000" : "+=9500";
    const scrubSpeed = isMobile ? 0.6 : 1;
    const heroOut = isMobile
      ? { opacity: 0.15, ease: "power2.inOut", duration: 2 }
      : { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 };

    const ctx = gsap.context(() => {
      // ── Initial states ──
      gsap.set(".nch-text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".nch-text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".nch-main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".nch-mockup-wrapper", ".nch-badge", ".nch-card-right",
                ".nch-card-left-1", ".nch-card-left-2", ".nch-card-left-3"], { autoAlpha: 0 });
      gsap.set(".nch-cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });
      // Phone screens: screen 1 visible in position, 2+3 below
      gsap.set([".nch-screen-2", ".nch-screen-3"], { autoAlpha: 0, y: "30%" });
      // All screen items start invisible (animated in per-screen)
      gsap.set([".nch-sw1", ".nch-sw2", ".nch-sw3"], { autoAlpha: 0 });
      // Step dots
      gsap.set([".nch-dot-2", ".nch-dot-3"], { backgroundColor: "rgba(255,255,255,0.2)", scale: 0.7 });

      // Intro
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".nch-text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".nch-text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: pinEnd,
          pin: true,
          scrub: scrubSpeed,
          anticipatePin: 1,
          onEnter: () => { document.body.style.overscrollBehavior = "none"; onCinematicStateChange?.(true); },
          onLeave: () => { document.body.style.overscrollBehavior = ""; onCinematicStateChange?.(false); },
          onEnterBack: () => { document.body.style.overscrollBehavior = "none"; onCinematicStateChange?.(true); },
          onLeaveBack: () => { document.body.style.overscrollBehavior = ""; onCinematicStateChange?.(false); },
        },
      });

      scrollTl
        // ── Phase 1: hero fades, card rises ──
        .to([".nch-hero-text", ".nch-bg-grid"], heroOut, 0)
        .to(".nch-main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        // ── Phase 2: card expands ──
        .to(".nch-main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.2 })
        // ── Phase 3: phone + brand name appear ──
        .fromTo(".nch-mockup-wrapper",
          isMobile ? { y: 180, autoAlpha: 0, scale: 0.75 } : { y: 280, z: -400, rotationX: 45, rotationY: -25, autoAlpha: 0, scale: 0.65 },
          isMobile ? { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.8 } : { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 },
          "-=0.4"
        )
        .fromTo(".nch-card-right", { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "expo.out", duration: 1.2 }, "-=1.4")
        // ── Screen 1 (Loja Digital): content + badges + left text ──
        .fromTo(".nch-sw1", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: isMobile ? 0 : 0.08, ease: "back.out(1.1)", duration: 0.9 }, "-=1.0")
        .fromTo(".nch-badge", { y: 50, autoAlpha: 0, scale: 0.8 }, { y: 0, autoAlpha: 1, scale: 1, ease: "back.out(1.2)", duration: 1, stagger: isMobile ? 0 : 0.15 }, "-=0.8")
        .fromTo(".nch-card-left-1", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1 }, "-=0.8")
        // Dwell screen 1
        .to({}, { duration: 1.5 })

        // ── Transition 1 → 2 (WhatsApp) ──
        .to(".nch-screen-1", { y: "-35%", autoAlpha: 0, ease: "power3.inOut", duration: 0.6 }, "t12")
        .fromTo(".nch-screen-2", { y: "25%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: "expo.out", duration: 0.6 }, "t12")
        .fromTo(".nch-sw2", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: isMobile ? 0 : 0.06, ease: "power3.out", duration: 0.8 }, "t12+=0.3")
        .to(".nch-card-left-1", { x: -30, autoAlpha: 0, duration: 0.4 }, "t12")
        .fromTo(".nch-card-left-2", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 0.8 }, "t12+=0.3")
        // Step dots 1 → 2
        .to(".nch-dot-1", { backgroundColor: "rgba(255,255,255,0.2)", scale: 0.7, duration: 0.3 }, "t12")
        .to(".nch-dot-2", { backgroundColor: "#057a41", scale: 1, duration: 0.3 }, "t12")
        // Dwell screen 2
        .to({}, { duration: 1.5 })

        // ── Transition 2 → 3 (Financeiro) ──
        .to(".nch-screen-2", { y: "-35%", autoAlpha: 0, ease: "power3.inOut", duration: 0.6 }, "t23")
        .fromTo(".nch-screen-3", { y: "25%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: "expo.out", duration: 0.6 }, "t23")
        .fromTo(".nch-sw3", { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: isMobile ? 0 : 0.06, ease: "power3.out", duration: 0.8 }, "t23+=0.3")
        .to(".nch-progress-ring", { strokeDashoffset: 94, ease: "power3.inOut", duration: 1.4 }, "t23+=0.3")
        .to(".nch-counter-val", { innerHTML: 128, snap: { innerHTML: 1 }, ease: "expo.out", duration: 1.4 }, "t23+=0.3")
        .to(".nch-card-left-2", { x: -30, autoAlpha: 0, duration: 0.4 }, "t23")
        .fromTo(".nch-card-left-3", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 0.8 }, "t23+=0.3")
        // Step dots 2 → 3
        .to(".nch-dot-2", { backgroundColor: "rgba(255,255,255,0.2)", scale: 0.7, duration: 0.3 }, "t23")
        .to(".nch-dot-3", { backgroundColor: "#057a41", scale: 1, duration: 0.3 }, "t23")
        // Dwell screen 3
        .to({}, { duration: 0.5 })

        // ── Phase 5: CTA transition ──
        .set(".nch-hero-text", { autoAlpha: 0 })
        .set(".nch-cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 0.5 })
        .to([".nch-mockup-wrapper", ".nch-badge", ".nch-card-left-3", ".nch-card-right"], {
          scale: 0.9, y: -40, autoAlpha: 0, ease: "power3.in", duration: 0.8, stagger: 0.04,
        })
        .to(".nch-main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut", duration: 1.2,
        }, "pullback")
        .to(".nch-cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.2 }, "pullback")
        // ── Phase 6: card exits ──
        .to(".nch-main-card", { y: -window.innerHeight - 200, ease: "power3.in", duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, [onCinematicStateChange]);

  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-white antialiased"
      style={isMobileDevice ? undefined : { perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="nch-film-grain" aria-hidden="true" />
      <div className="nch-bg-grid absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* Hero taglines */}
      <div className="nch-hero-text absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="nch-text-track nch-gsap-reveal nch-text-3d text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          Sem estrutura,
        </h1>
        <h1 className="nch-text-days nch-gsap-reveal nch-text-silver text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          você perde clientes todo dia.
        </h1>
      </div>

      {/* CTA final */}
      <div className="nch-cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 nch-gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight nch-text-silver">
          Chega de decidir<br className="hidden sm:block" /> no achismo.
        </h2>
        <p className="text-white/55 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Conversa inicial gratuita. Sem enrolação. Você sai sabendo o que trava sua empresa e o que fazer.
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          <a href={whatsappLink} target="_blank" rel="noreferrer"
            className="nch-btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem]">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold text-lg">Quero organizar minha empresa</span>
          </a>
          <a href="#servicos"
            className="nch-btn-outline flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group">
            <span className="font-semibold text-lg">Como a Nortea funciona</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Main card */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={isMobileDevice ? undefined : { perspective: "1500px" }}
      >
        <div
          ref={mainCardRef}
          className="nch-main-card nch-card nch-gsap-reveal relative overflow-hidden flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="nch-card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* RIGHT (desktop) / TOP (mobile): brand name */}
            <div className="nch-card-right nch-gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-center z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[4.5rem] font-black uppercase tracking-tighter nch-text-card-silver flex items-center gap-3 lg:gap-4 pl-10 lg:pl-0">
                Nortea
                <TrendingUp className="text-[#057a41] shrink-0" style={{ width: "0.6em", height: "0.6em", strokeWidth: 2 }} />
              </h2>
            </div>

            {/* CENTER: iPhone mockup with 3 screens */}
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
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] nch-hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] nch-hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] nch-hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] nch-hardware-btn rounded-r-md" style={{ transform: "scaleX(-1)" }} aria-hidden="true" />

                  {/* Screen */}
                  <div
                    className="absolute inset-[7px] bg-[#050d07] rounded-[2.5rem] overflow-hidden text-white z-10"
                    style={{ boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}
                  >
                    <div className="absolute inset-0 nch-screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3" style={{ boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#057a41] animate-pulse" style={{ boxShadow: "0 0 8px rgba(5,122,65,0.9)" }} />
                    </div>

                    {/* Screens container — all 3 stacked, transitions via GSAP */}
                    <div className="absolute inset-0 pt-[38px] overflow-hidden">

                      {/* ── Screen 1: Loja Digital ── */}
                      <div className="nch-screen-1 absolute inset-0 px-4 pt-2 pb-6 flex flex-col gap-2">
                        <div className="nch-sw1 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Nortea Store</span>
                            <p className="text-sm font-bold text-white leading-tight">Loja Digital</p>
                          </div>
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-[#057a41]/15 text-[#057a41] flex items-center justify-center font-bold text-xs border border-[#057a41]/30">N</div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#057a41] flex items-center justify-center">
                              <span className="text-[7px] font-bold text-white">3</span>
                            </div>
                          </div>
                        </div>

                        <div className="nch-sw1 nch-widget rounded-2xl p-3 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border border-[#057a41]/25" style={{ background: "linear-gradient(135deg, rgba(5,122,65,0.3) 0%, rgba(5,122,65,0.08) 100%)" }}>
                            <span className="text-lg" aria-hidden="true">🛍️</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] text-neutral-500 uppercase tracking-wider">Produto em destaque</p>
                            <p className="text-xs font-bold text-white leading-tight">Pacote Profissional</p>
                            <p className="text-sm font-extrabold text-[#057a41]">R$ 497,00</p>
                          </div>
                        </div>

                        <div className="nch-sw1 grid grid-cols-3 gap-1.5">
                          {[
                            { label: "Visitantes", value: "1.2k" },
                            { label: "Conversão", value: "4.8%" },
                            { label: "Pedidos", value: "57" },
                          ].map((s) => (
                            <div key={s.label} className="nch-widget rounded-xl p-2 text-center">
                              <p className="text-xs font-bold text-white">{s.value}</p>
                              <p className="text-[8px] text-neutral-500 uppercase tracking-wider leading-tight">{s.label}</p>
                            </div>
                          ))}
                        </div>

                        <div className="nch-sw1 nch-widget rounded-2xl p-3">
                          <p className="text-[9px] text-neutral-500 uppercase tracking-wider mb-2 font-bold">Pedidos recentes</p>
                          {[
                            { name: "João S.", status: "Pago", amount: "R$ 497" },
                            { name: "Maria L.", status: "Enviado", amount: "R$ 247" },
                          ].map((o) => (
                            <div key={o.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px] font-bold text-white">{o.name[0]}</div>
                                <span className="text-[11px] text-white/65">{o.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-[#057a41] font-semibold">{o.status}</span>
                                <span className="text-[11px] font-bold text-white">{o.amount}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="nch-sw1 rounded-xl border border-[#057a41]/30 bg-[#057a41]/12 p-2 flex items-center justify-center">
                          <span className="text-[11px] font-bold text-[#057a41]">Ver loja completa →</span>
                        </div>
                      </div>

                      {/* ── Screen 2: WhatsApp Automação ── */}
                      <div className="nch-screen-2 absolute inset-0 px-4 pt-2 pb-6 flex flex-col gap-2">
                        <div className="nch-sw2 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Automação</span>
                            <p className="text-sm font-bold text-white leading-tight">WhatsApp</p>
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#057a41]/40 bg-[#057a41]/15">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#057a41] animate-pulse" />
                            <span className="text-[9px] font-bold text-[#057a41]">Bot ativo</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                          <div className="nch-sw2 flex justify-end">
                            <div className="rounded-2xl rounded-tr-sm px-3 py-2 max-w-[78%] border border-[#057a41]/20" style={{ background: "rgba(5,122,65,0.22)" }}>
                              <p className="text-[11px] text-white/85">Olá, quero saber mais sobre os serviços</p>
                              <p className="text-[8px] text-white/30 mt-0.5 text-right">14:23</p>
                            </div>
                          </div>
                          <div className="nch-sw2 flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#057a41]/20 border border-[#057a41]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[9px]" aria-hidden="true">🤖</span>
                            </div>
                            <div className="nch-widget rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                              <p className="text-[11px] text-white/85">Olá! Sou o assistente da Nortea. Como posso ajudar? ✅</p>
                              <p className="text-[8px] text-white/30 mt-0.5">14:23 ✓✓</p>
                            </div>
                          </div>
                          <div className="nch-sw2 flex justify-end">
                            <div className="rounded-2xl rounded-tr-sm px-3 py-2 max-w-[78%] border border-[#057a41]/20" style={{ background: "rgba(5,122,65,0.22)" }}>
                              <p className="text-[11px] text-white/85">Quero o diagnóstico gratuito</p>
                              <p className="text-[8px] text-white/30 mt-0.5 text-right">14:24</p>
                            </div>
                          </div>
                          <div className="nch-sw2 flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#057a41]/20 border border-[#057a41]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-[9px]" aria-hidden="true">🤖</span>
                            </div>
                            <div className="nch-widget rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                              <p className="text-[11px] text-white/85">Perfeito! Clique abaixo para agendar 👇</p>
                              <p className="text-[8px] text-white/30 mt-0.5">14:24 ✓✓</p>
                            </div>
                          </div>
                        </div>

                        <div className="nch-sw2 grid grid-cols-2 gap-1.5">
                          <div className="nch-widget rounded-xl p-2.5 text-center">
                            <p className="text-sm font-bold text-[#057a41]">187</p>
                            <p className="text-[8px] text-neutral-500 uppercase tracking-wider">Leads / mês</p>
                          </div>
                          <div className="nch-widget rounded-xl p-2.5 text-center">
                            <p className="text-sm font-bold text-white">&lt;30s</p>
                            <p className="text-[8px] text-neutral-500 uppercase tracking-wider">Resposta</p>
                          </div>
                        </div>
                      </div>

                      {/* ── Screen 3: Controle Financeiro ── */}
                      <div className="nch-screen-3 absolute inset-0 px-4 pt-2 pb-6 flex flex-col gap-2.5">
                        <div className="nch-sw3 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">Financeiro</span>
                            <p className="text-sm font-bold text-white leading-tight">Dashboard</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-[#057a41]/15 text-[#057a41] flex items-center justify-center font-bold text-xs border border-[#057a41]/30" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>N</div>
                        </div>

                        <div className="nch-sw3 relative w-40 h-40 mx-auto flex-shrink-0 flex items-center justify-center" style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.85))" }}>
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160" aria-hidden="true">
                            <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="11" />
                            <circle className="nch-progress-ring" cx="80" cy="80" r="60" fill="none" stroke="#057a41" strokeWidth="11" />
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

                        <div className="nch-sw3 flex gap-2">
                          <div className="flex-1 nch-widget rounded-xl p-2.5 flex flex-col items-center">
                            <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Entradas</span>
                            <span className="text-sm font-bold text-[#057a41] leading-none">+R$ 145k</span>
                          </div>
                          <div className="flex-1 nch-widget rounded-xl p-2.5 flex flex-col items-center">
                            <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Saídas</span>
                            <span className="text-sm font-bold text-white/60 leading-none">-R$ 48k</span>
                          </div>
                        </div>

                        <div className="nch-sw3 nch-widget rounded-2xl p-3 flex items-center gap-2.5">
                          <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center border border-[#057a41]/25" style={{ background: "linear-gradient(135deg, rgba(5,122,65,0.22) 0%, rgba(5,122,65,0.04) 100%)" }}>
                            <svg className="w-4 h-4 text-[#057a41]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Fluxo de caixa</p>
                            <p className="text-xs font-bold text-white">Saudável</p>
                            <div className="mt-1 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                              <div className="h-full w-[86%] rounded-full bg-[#057a41]/70" />
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-[#057a41] flex-shrink-0">86%</span>
                        </div>

                        <div className="nch-sw3 nch-widget rounded-2xl p-3 flex items-center gap-2.5">
                          <div className="w-9 h-9 flex-shrink-0 rounded-xl flex items-center justify-center border border-white/10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}>
                            <svg className="w-4 h-4 text-white/55" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold">Margem estimada</p>
                            <p className="text-xs font-bold text-white">62% este mês</p>
                            <div className="mt-1 h-1 w-full rounded-full bg-white/8 overflow-hidden">
                              <div className="h-full w-[62%] rounded-full bg-white/30" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>{/* /screens container */}

                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[3px] bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Step indicator dots (below phone) */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                  <div className="nch-dot-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#057a41" }} />
                  <div className="nch-dot-2 w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                  <div className="nch-dot-3 w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                </div>

                {/* Floating badge — left */}
                <div className="nch-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] nch-floating-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border border-[#057a41]/35" style={{ background: "linear-gradient(180deg, rgba(5,122,65,0.22) 0%, rgba(5,122,65,0.04) 100%)" }}>
                    <span className="text-base lg:text-xl" aria-hidden="true">🏆</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">3 soluções integradas</p>
                    <p className="text-[#057a41]/60 text-[10px] lg:text-xs font-medium">Estrutura completa</p>
                  </div>
                </div>

                {/* Floating badge — right */}
                <div className="nch-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] nch-floating-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border border-white/15" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}>
                    <span className="text-base lg:text-lg" aria-hidden="true">✅</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">60+ empresas atendidas</p>
                    <p className="text-white/45 text-[10px] lg:text-xs font-medium">Resultados comprovados</p>
                  </div>
                </div>

              </div>
            </div>

            {/* LEFT (desktop) / BOTTOM (mobile): 3 swappable text blocks */}
            <div className="order-3 lg:order-1 relative z-20 w-full px-4 lg:px-0 h-auto min-h-[7rem] lg:h-full">

              <div className="nch-card-left-1 nch-gsap-reveal absolute inset-0 flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-1 lg:mb-4 tracking-tight">
                  Site e loja virtual profissional.
                </h3>
                <p className="text-white/55 text-xs lg:text-lg font-normal leading-relaxed">
                  A <span className="text-white font-semibold">Nortea</span> cria sua presença digital: páginas de conversão, loja virtual e estrutura para vender online com autoridade.
                </p>
              </div>

              <div className="nch-card-left-2 nch-gsap-reveal absolute inset-0 flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-1 lg:mb-4 tracking-tight">
                  Atendimento automatizado no WhatsApp.
                </h3>
                <p className="text-white/55 text-xs lg:text-lg font-normal leading-relaxed">
                  Fluxo de atendimento estruturado com <span className="text-white font-semibold">automações inteligentes</span> que captam, qualificam e convertem leads 24h por dia.
                </p>
              </div>

              <div className="nch-card-left-3 nch-gsap-reveal absolute inset-0 flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-1 lg:mb-4 tracking-tight">
                  Controle financeiro com clareza.
                </h3>
                <p className="text-white/55 text-xs lg:text-lg font-normal leading-relaxed">
                  A <span className="text-white font-semibold">Nortea</span> organiza o financeiro da sua empresa: dashboard personalizado, fluxo de caixa e acompanhamento mensal estratégico.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
