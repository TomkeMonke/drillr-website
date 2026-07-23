import { MagneticButton } from "./animations/MagneticButton";

type Size = "sm" | "md" | "lg";

/** Structural subset of Dictionary["common"] - pass `dict.common` directly. */
interface Labels {
  downloadAppStore: string;
  downloadGooglePlay: string;
  appStoreKicker: string;
  googlePlayKicker: string;
}

interface Props {
  labels: Labels;
  size?: Size;
  className?: string;
}

const sizeMap: Record<Size, { h: string; pad: string; small: string; big: string; gap: string; icon: string }> = {
  sm: { h: "h-10", pad: "px-3", small: "text-[8px]", big: "text-[12px]", gap: "gap-1.5", icon: "h-5 w-5" },
  md: { h: "h-12", pad: "px-4", small: "text-[9px]", big: "text-[14px]", gap: "gap-2", icon: "h-6 w-6" },
  lg: { h: "h-14", pad: "px-5", small: "text-[10px]", big: "text-[16px]", gap: "gap-2.5", icon: "h-6 w-6" },
};

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.23-1.18 3.04-.83.92-2.18 1.63-3.31 1.55-.13-1.11.43-2.27 1.16-3.05.83-.91 2.27-1.6 3.33-1.54zM20.5 17.18c-.55 1.27-.81 1.83-1.51 2.95-.98 1.55-2.36 3.49-4.07 3.51-1.52.02-1.91-.99-3.97-.98-2.06.01-2.49 1-4.01.98-1.71-.02-3.02-1.77-4-3.32-2.74-4.33-3.03-9.4-1.34-12.1 1.2-1.92 3.1-3.04 4.88-3.04 1.81 0 2.95.99 4.45.99 1.45 0 2.34-.99 4.43-.99 1.58 0 3.26.86 4.46 2.35-3.92 2.15-3.28 7.76.68 9.65z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3.6 1.5c-.32.34-.5.86-.5 1.54v17.92c0 .68.18 1.2.5 1.54l.06.06 10.04-10.04v-.04L3.66 1.44 3.6 1.5z" fill="#00C0FF" />
      <path d="M17.2 15.86l-3.5-3.5v-.04L17.2 8.82l.08.05 4.13 2.35c1.18.67 1.18 1.77 0 2.44l-4.13 2.35-.08.05z" fill="#FFBC00" />
      <path d="M17.28 15.91L13.7 12.32 3.6 22.5c.39.41 1.03.46 1.75.05l11.93-6.64" fill="#FF3A44" />
      <path d="M17.28 8.71L5.35 2.07c-.72-.41-1.36-.36-1.75.05l10.1 10.18 3.58-3.59z" fill="#00D158" />
    </svg>
  );
}

export function DownloadBadges({ labels, size = "md", className = "" }: Props) {
  const s = sizeMap[size];
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <MagneticButton strength={0.25}>
        <a
          href="https://apps.apple.com/us/app/drillr-dominate-your-position/id6761615321"
          target="_blank"
          rel="noopener"
          aria-label={labels.downloadAppStore}
          className={`${s.h} ${s.pad} ${s.gap} btn-shine group flex items-center rounded-xl bg-black border border-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-[border-color,transform,box-shadow] duration-300 hover:shadow-[0_18px_36px_-18px_rgba(var(--primary-rgb),0.55)]`}
        >
          <AppleIcon className={`${s.icon} text-white`} />
          <div className="flex flex-col leading-tight text-white">
            <span className={`${s.small} opacity-80`}>{labels.appStoreKicker}</span>
            <span className={`${s.big} font-semibold tracking-tight`}>App Store</span>
          </div>
        </a>
      </MagneticButton>
      <MagneticButton strength={0.25}>
        <a
          href="https://play.google.com/store/apps/details?id=com.anonymous.FootballApp"
          target="_blank"
          rel="noopener"
          aria-label={labels.downloadGooglePlay}
          className={`${s.h} ${s.pad} ${s.gap} btn-shine group flex items-center rounded-xl bg-black border border-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-[border-color,transform,box-shadow] duration-300 hover:shadow-[0_18px_36px_-18px_rgba(var(--primary-rgb),0.55)]`}
        >
          <GooglePlayIcon className={s.icon} />
          <div className="flex flex-col leading-tight text-white">
            <span className={`${s.small} opacity-80`}>{labels.googlePlayKicker}</span>
            <span className={`${s.big} font-semibold tracking-tight`}>Google Play</span>
          </div>
        </a>
      </MagneticButton>
    </div>
  );
}
