import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface PolicyGuidelineCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * "Policy & Guidelines" — sticky-left BleedTitle paired with a stacked
 * column of policy cards on the right. Each card shows the policy title,
 * a description, and a gold "KNOW MORE" CTA.
 *
 * Layout: 1 col mobile, 2 col desktop where the left column is sticky.
 * Background: white, py-16 lg:py-20.
 */
export function PolicyGuidelines({
  data,
}: {
  data: {
    title: string;
    cards: PolicyGuidelineCard[];
  };
}) {
  return (
    <section id="policy-guidelines" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Sticky-left heading */}
          <div className="lg:sticky lg:top-[160px] lg:self-start">
            <BleedTitle title={data.title} />
          </div>

          {/* Cards column */}
          <div className="flex flex-col gap-6">
            {data.cards.map((card) => (
              <div
                key={card.id}
                className="border border-line bg-white p-6 transition-shadow hover:shadow-card lg:p-8"
              >
                <h3 className="font-display text-lg font-bold text-navy sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-black/75 lg:text-[15px] lg:leading-7">
                  {card.description}
                </p>
                <Link
                  href={card.ctaHref}
                  className="group mt-6 inline-flex h-11 w-[160px] items-center justify-between border border-gold bg-gold px-5 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
                >
                  <span>{card.ctaLabel}</span>
                  <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}