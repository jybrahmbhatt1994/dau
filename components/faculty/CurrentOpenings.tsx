import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AreaCard } from "@/lib/types";

/**
 * Individual opening card — image left, title right, hairline border.
 * Mirrors the AreaCard pattern used on Academic Areas / Research Areas.
 * Wider image panel (180px desktop) to match the Figma proportions.
 */
function OpeningCard({ card }: { card: AreaCard }) {
  return (
    <Link
      href={card.href}
      className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-square w-[120px] shrink-0 overflow-hidden sm:w-[180px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="180px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 items-center px-5 sm:px-8">
        <h3 className="font-display text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-brand sm:text-xl">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

/**
 * "Current Openings" section for the Faculty Recruitment page.
 *
 * Layout: BleedTitle + description + 2-col grid of position cards.
 * Same card structure as the Research Areas / Academic Areas grids but with
 * a slightly wider image panel.
 *
 * Background: white, py-16 lg:py-20.
 */
export function CurrentOpenings({
  data,
}: {
  data: {
    title: string;
    description: string;
    cards: AreaCard[];
  };
}) {
  return (
    <section id="openings" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {data.description && (
          <p className="mt-8 max-w-4xl text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.description}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {data.cards.map((card) => (
            <OpeningCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}