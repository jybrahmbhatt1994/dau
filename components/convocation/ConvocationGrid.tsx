import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { ConvocationCard } from "@/lib/types";

/**
 * DESTINATION: components/convocation/ConvocationGrid.tsx
 *
 * Every card is now clickable — `href` always resolves to either:
 *   1. The optional "Link" field override from WP (e.g. external gallery), or
 *   2. This convocation's own detail page (/resources/convocation/{slug})
 * This is enforced in the accessor mapping, not here — this component
 * simply always renders a Link since `href` is now non-optional.
 */
export function ConvocationGrid({ cards }: { cards: ConvocationCard[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group w-[340px] flex-none bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-ash">{card.date}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}