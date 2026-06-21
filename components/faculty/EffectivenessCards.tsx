import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface EffectivenessCard {
  id: string;
  label: string;
  image: string;
}

/**
 * "Teaching Effectiveness" — 3-card row on the dark ink band.
 *
 * Each card: portrait image on the left + label on the right, on a slightly
 * lighter navy panel than the section background, with a thin border.
 *
 * Layout: 1 col mobile, 3 col desktop.
 *
 * Background: bg-ink (matches the surrounding Faculty Evaluation +
 * Continuous Improvement sections so they read as one dark band).
 */
export function EffectivenessCards({
  data,
}: {
  data: {
    title: string;
    intro?: string;
    cards: EffectivenessCard[];
  };
}) {
  return (
    <section id="teaching-effectiveness" className="scroll-mt-[150px] bg-ink py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} light />

        {data.intro && (
          <p className="mt-8 max-w-5xl text-[15px] leading-7 text-white/80 lg:text-base lg:leading-8">
            {data.intro}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
          {data.cards.map((card) => (
            <div
              key={card.id}
              className="flex items-stretch border border-white/15 bg-white/[0.04] transition-colors hover:border-gold/60"
            >
              <div className="relative aspect-square w-[110px] shrink-0 overflow-hidden sm:w-[140px]">
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 items-center px-5 sm:px-6">
                <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">
                  {card.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}