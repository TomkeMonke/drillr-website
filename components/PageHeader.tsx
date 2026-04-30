interface Props {
  title: string;
  subtitle?: string;
  meta?: string;
}

export function PageHeader({ title, subtitle, meta }: Props) {
  return (
    <header className="text-center max-w-3xl mx-auto mb-12">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="mt-4 text-lg text-white/70 leading-relaxed">{subtitle}</p>
      )}
      {meta && (
        <p className="mt-3 text-xs uppercase tracking-widest text-white/40">{meta}</p>
      )}
    </header>
  );
}
