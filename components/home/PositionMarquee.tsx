import type { Dictionary } from "@/app/[locale]/dictionaries";

interface Props {
  dict: Dictionary;
}

const POSITION_TINTS = ["#E8A44A", "#5B9FD6", "#8BD17C", "#B17CD1", "#5B9FD6", "#E8A44A", "#8BD17C", "#D15B5B"];
const SKILL_TINTS = ["#5B9FD6", "#E8A44A", "#D15B5B", "#8BD17C", "#B17CD1", "#5B9FD6", "#E8A44A", "#8BD17C"];

interface Item {
  label: string;
  glyph: string;
}

function Pill({ item, tint }: { item: Item; tint: string }) {
  return (
    <div className="shrink-0 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] pl-2 pr-5 py-2 backdrop-blur-sm">
      <div
        className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold"
        style={{ background: `${tint}22`, color: tint, border: `1px solid ${tint}44` }}
      >
        {item.glyph}
      </div>
      <span className="text-sm text-white/80 whitespace-nowrap">{item.label}</span>
    </div>
  );
}

function Row({
  items,
  tints,
  reverse = false,
}: {
  items: Item[];
  tints: string[];
  reverse?: boolean;
}) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="marquee-viewport">
      <div
        className="marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {tripled.map((item, i) => (
          <Pill key={`${item.label}-${i}`} item={item} tint={tints[i % tints.length]} />
        ))}
      </div>
    </div>
  );
}

export function PositionMarquee({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-3">
            {dict.marquee.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {dict.marquee.title}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <Row items={dict.marquee.positions} tints={POSITION_TINTS} />
          <Row items={dict.marquee.skills} tints={SKILL_TINTS} reverse />
        </div>
      </div>

      <style>{`
        .marquee-viewport {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        @media (hover: hover) and (pointer: fine) {
          .marquee-viewport:hover .marquee-track { animation-play-state: paused; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% / 3)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
