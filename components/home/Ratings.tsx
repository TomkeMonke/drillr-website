import type { Dictionary } from "@/app/[locale]/dictionaries";
import { DownloadBadges } from "../DownloadBadges";
import { Reveal } from "../animations/Reveal";

interface Props {
  dict: Dictionary;
}

export function Ratings({ dict }: Props) {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <Reveal>
          <div className="text-3xl text-accent mb-5">★★★★★</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {dict.ratings.title}
          </h2>
          <p className="mt-3 text-white/60 text-lg">{dict.ratings.subtitle}</p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><AppleMini /> {dict.ratings.appStore}</span>
            <span className="flex items-center gap-1.5"><PlayMini /> {dict.ratings.googlePlay}</span>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex justify-center">
            <DownloadBadges
              appStoreLabel={dict.common.downloadAppStore}
              googlePlayLabel={dict.common.downloadGooglePlay}
              size="md"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AppleMini() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.42 2.23-1.18 3.04-.83.92-2.18 1.63-3.31 1.55-.13-1.11.43-2.27 1.16-3.05.83-.91 2.27-1.6 3.33-1.54zM20.5 17.18c-.55 1.27-.81 1.83-1.51 2.95-.98 1.55-2.36 3.49-4.07 3.51-1.52.02-1.91-.99-3.97-.98-2.06.01-2.49 1-4.01.98-1.71-.02-3.02-1.77-4-3.32-2.74-4.33-3.03-9.4-1.34-12.1 1.2-1.92 3.1-3.04 4.88-3.04 1.81 0 2.95.99 4.45.99 1.45 0 2.34-.99 4.43-.99 1.58 0 3.26.86 4.46 2.35-3.92 2.15-3.28 7.76.68 9.65z" />
    </svg>
  );
}

function PlayMini() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M3 2v20l18-10z" fill="currentColor" />
    </svg>
  );
}
