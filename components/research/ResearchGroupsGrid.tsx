import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ActionButton } from "@/components/ui/ActionButton";
import type { AreaCard } from "@/lib/types";

/**
 * Individual lab/group card.
 * Same structure as AreaCardItem (image left, title right) matching the Figma:
 *  - thin `line` border
 *  - white bg
 *  - rectangular image panel (110→148px wide, square aspect)
 *  - Namdhinggo semibold title, wraps to 2 lines
 */
function LabCard({ card }: { card: AreaCard }) {
  return (
    <Link
      href={card.href}
      className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-square w-[110px] shrink-0 overflow-hidden sm:w-[148px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="148px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 items-center px-5 sm:px-7">
        <h3 className="font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand sm:text-lg">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

/**
 * "Research Groups and Labs" section on the Research Area Detail page.
 *
 * Layout:
 *  - BleedTitle
 *  - 2-column grid of lab cards (same card shape as Academic Areas)
 *  - Centered gold "Research Projects →" CTA button below the grid
 *
 * Background: surface (#F7F7F8), standard py-16 lg:py-20.
 */
export function ResearchGroupsGrid({
  data,
}: {
  data: {
    title: string;
    cards: AreaCard[];
    projectsHref: string;
    projectsCta: string;
  };
}) {
  return (
    <section
      id="groups"
      className="scroll-mt-[150px] bg-surface py-16 lg:py-20"
    >
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {data.cards.map((card) => (
            <LabCard key={card.id} card={card} />
          ))}
        </div>

        {/* Centered gold CTA */}
        <div className="mt-10 flex justify-center">
          <ActionButton href={data.projectsHref} variant="filledGold">
            {data.projectsCta}
          </ActionButton>
        </div>
      </Container>
    </section>
  );
}