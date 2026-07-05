export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-sage/80">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-ink">
        <Icon size={22} />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/60">{description}</p>
    </article>
  );
}
