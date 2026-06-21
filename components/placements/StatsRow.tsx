import { Container } from "@/components/ui/Container";

export interface StatItem {
  /** Large value (e.g. "500+", "50LPA") */
  value: string;
  /** Small label below the value (e.g. "Students placed") */
  label: string;
}

/**
 * 4-up stats strip with brand-red display numbers and muted labels.
 *
 * Responsive: 2 cols mobile → 4 cols desktop.
 * Prop-driven so it can be reused on any page needing a stats summary
 * (Placement Stats, Research overview, About, etc.).
 *
 * Background defaults to white; pass `className` to override.
 */
export function StatsRow({
  items,
  className = "bg-white",
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <p className="font-display text-4xl font-bold leading-none text-brand sm:text-5xl lg:text-[56px]">
                {item.value}
              </p>
              <p className="mt-3 text-sm font-medium text-ash sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}