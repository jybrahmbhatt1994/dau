import type { PublicationYearLink } from "@/lib/types";
import { Container } from "@/components/ui/Container";

export function PublicationYearGrid({
  years,
}: {
  years: PublicationYearLink[];
}) {
  const rows = Math.ceil(years.length / 4) || 1;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div
          className="grid grid-flow-col grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          style={{ gridTemplateRows: "repeat(" + rows + ", minmax(0, 1fr))" }}
        >
          {years.map((y) => (
            <a
              key={y.label}
              href={y.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded bg-brand px-6 text-base font-semibold text-white transition-colors hover:bg-navy"
            >
              {y.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
