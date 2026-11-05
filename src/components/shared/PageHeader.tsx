export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 space-y-2">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
