import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AreaCard } from "@/lib/types";

/**
 * Individual area card — landscape thumbnail (≈148×148 square) on the left,
 * title in Namdhinggo on the right. Matches the Figma card exactly:
 *  - thin `line` border all around
 *  - white background
 *  - square image panel (110px mobile → 148px sm+)
 *  - title left-aligned in the content column, wraps naturally (2 lines ok)
 *  - hover: subtle card shadow + brand colour on title
 */
function AreaCardItem({ card }: { card: AreaCard }) {
  return (
    <Link
      href={card.href}
      className="group flex items-stretch border border-line bg-white transition-shadow hover:shadow-card"
    >
      {/* Square thumbnail */}
      <div className="relative aspect-square w-[110px] shrink-0 overflow-hidden sm:w-[148px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="148px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title column */}
      <div className="flex flex-1 items-center px-5 sm:px-7">
        <h3 className="font-display text-lg font-semibold leading-snug text-navy transition-colors group-hover:text-brand sm:text-xl">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

/**
 * "Areas" grid section for the Research Areas page.
 *
 * Layout:
 *  - BleedTitle "Areas" (left-bleeding gold underline)
 *  - Description paragraph in `text-ash`
 *  - 2-column card grid on mobile-first (1 col → 2 col at sm)
 *
 * Background: white (same band as the ProseIntro above, but a new section so
 * the scroll-mt anchor lands correctly beneath the sticky header + subnav).
 */
export function ResearchAreasGrid({
  data,
}: {
  data: {
    title: string;
    description: string;
    cards: AreaCard[];
  };
}) {
  return (
    <section
      id="areas"
      className="scroll-mt-[150px] bg-white py-16 lg:py-20"
    >
      <Container>
        <BleedTitle title={data.title} />

        {data.description && (
          <p className="mt-8 max-w-4xl text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.description}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {data.cards.map((card) => (
            <AreaCardItem key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}