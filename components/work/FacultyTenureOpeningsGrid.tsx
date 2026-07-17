import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { FacultyTenureOpeningCard } from "@/lib/types";

/**
 * DESTINATION: components/work/FacultyTenureOpeningsGrid.tsx
 *
 * CORRECTED: back to a static grid (NOT a slider) — matches the reference
 * exactly. Cells sit directly adjacent with shared 1px borders (no gap
 * between them, like a table), image fills the full card height on the
 * left, title vertically centered on the right.
 */
export function FacultyTenureOpeningsGrid({
  title,
  description,
  cards,
}: {
  title: string;
  description: string;
  cards: FacultyTenureOpeningCard[];
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={title} />
        {description && (
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-black/70">
            {description}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <Link key={card.id} href={card.href} className="flex items-center border border-line transition-colors hover:border-brand">
              <div className="relative h-[190px] w-[220px] shrink-0 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="220px"
                  className="object-contain"
                />
              </div>
              <h3 className="px-6 font-display text-lg font-bold text-navy">
                {card.title}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}