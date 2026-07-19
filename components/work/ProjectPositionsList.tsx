import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { ProjectPositionCard } from "@/lib/types";

/**
 * DESTINATION: components/work/ProjectPositionsList.tsx
 *
 * "Open Project Positions" — simple full-width bordered card list, one
 * per open position. Each card links to its own detail page. Surface
 * background.
 */
export function ProjectPositionsList({
  sectionTitle,
  positions,
}: {
  sectionTitle: string;
  positions: ProjectPositionCard[];
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={sectionTitle} />

        {positions.length > 0 ? (
          <div className="mt-10 space-y-4">
            {positions.map((position) => (
              <Link
                key={position.id}
                href={position.href}
                className="group block border border-line bg-white px-6 py-6 transition-colors hover:border-brand sm:px-8"
              >
                <p className="font-display text-lg font-bold text-navy transition-colors group-hover:text-brand">
                  {position.title}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-ash">
            No open positions at the moment.
          </p>
        )}
      </Container>
    </section>
  );
}