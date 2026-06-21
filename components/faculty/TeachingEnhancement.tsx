import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AreaCard } from "@/lib/types";

/**
 * Single enhancement card — image left + title right.
 * Same shape as the AreaCard pattern (Academic Areas / Research Areas).
 */
function EnhancementCard({ card }: { card: AreaCard }) {
  return (
    <Link
      href={card.href}
      className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-square w-[110px] shrink-0 overflow-hidden sm:w-[140px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="140px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 items-center px-5 sm:px-6">
        <h3 className="font-display text-sm font-semibold leading-snug text-navy transition-colors group-hover:text-brand sm:text-base">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

/**
 * "Teaching & Learning Enhancement" — BleedTitle + description + responsive
 * card grid (1 col mobile → 2 col sm → 3 col lg actually shown as 2 col in
 * the Figma; we use a 2-col layout to match).
 *
 * Wait — looking at the Figma carefully, this section shows 3 cards in a row
 * BUT laid out as 2 cards on the first row and 1 card on the second row,
 * suggesting a 2-col grid where cards naturally flow. We'll use 2-col.
 *
 * Background: surface (#F7F7F8), py-16 lg:py-20.
 */
export function TeachingEnhancement({
  data,
}: {
  data: {
    title: string;
    description: string;
    cards: AreaCard[];
  };
}) {
  return (
    <section id="enhancement" className="scroll-mt-[150px] bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {data.description && (
          <p className="mt-8 max-w-5xl text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.description}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {data.cards.map((card) => (
            <EnhancementCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}