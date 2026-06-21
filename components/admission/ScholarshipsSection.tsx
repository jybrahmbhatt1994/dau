import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface ScholarshipCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * "Scholarships" section.
 *
 * Layout (per Figma):
 *  - BleedTitle + intro paragraph
 *  - A short bullet list between the intro and the cards
 *  - 2-col grid of scholarship cards. Each card: serif navy title,
 *    description, and a gold-filled KNOW MORE button at the bottom.
 *
 * Background: white, py-16 lg:py-20.
 */
export function ScholarshipsSection({
  data,
}: {
  data: {
    title: string;
    intro: string;
    /** Bullet list shown between the intro paragraph and the cards */
    bullets?: string[];
    cards: ScholarshipCard[];
  };
}) {
  return (
    <section id="scholarships" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <p className="mt-8 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.intro}
        </p>

        {data.bullets && data.bullets.length > 0 && (
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-7 text-black/80 marker:text-ash lg:text-base lg:leading-8">
            {data.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {data.cards.map((card) => (
            <div key={card.id} className="flex flex-col">
              <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 text-[14px] leading-7 text-black/75 lg:text-[15px] lg:leading-7">
                {card.description}
              </p>
              <Link
                href={card.ctaHref}
                className="group mt-6 inline-flex h-11 w-[170px] items-center justify-between border border-gold bg-gold px-5 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
              >
                <span>{card.ctaLabel}</span>
                <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}