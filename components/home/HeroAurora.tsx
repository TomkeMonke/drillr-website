export function HeroAurora() {
  return (
    <>
      <div aria-hidden className="hero-aurora-wrap absolute inset-0 -z-20">
        <div className="hero-aurora hero-aurora-1" />
        <div className="hero-aurora hero-aurora-2" />
        <div className="hero-aurora hero-aurora-3" />
      </div>
      <style>{`
        .hero-aurora-wrap {
          filter: blur(80px);
          opacity: 0.45;
          mask-image: radial-gradient(ellipse 115% 92% at 50% 45%, black 45%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 115% 92% at 50% 45%, black 45%, transparent 100%);
        }
        .hero-aurora {
          position: absolute;
          border-radius: 9999px;
          mix-blend-mode: screen;
          will-change: transform;
        }
        .hero-aurora-1 {
          top: -15%; left: 5%;
          width: 55%; height: 55%;
          background: radial-gradient(closest-side, var(--primary), transparent);
          animation: hero-aurora-a 16s ease-in-out infinite;
        }
        .hero-aurora-2 {
          top: 10%; right: -10%;
          width: 50%; height: 60%;
          background: radial-gradient(closest-side, #E8A44A, transparent);
          animation: hero-aurora-b 22s ease-in-out infinite;
        }
        .hero-aurora-3 {
          bottom: -25%; left: 20%;
          width: 55%; height: 55%;
          background: radial-gradient(closest-side, #8BD17C, transparent);
          animation: hero-aurora-c 18s ease-in-out infinite;
        }
        @keyframes hero-aurora-a {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(4%,6%) scale(1.1); }
        }
        @keyframes hero-aurora-b {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-5%,4%) scale(0.9); }
        }
        @keyframes hero-aurora-c {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(3%,-5%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-aurora { animation: none; }
        }
        @media (max-width: 640px) {
          .hero-aurora-wrap {
            filter: blur(60px);
            opacity: 0.3;
            mask-image: radial-gradient(ellipse 130% 90% at 50% 45%, black 40%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 130% 90% at 50% 45%, black 40%, transparent 100%);
          }
        }
      `}</style>
    </>
  );
}
