import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";
import type { SchoolCard, SectionIntro } from "@/lib/types";

function SchoolCardItem({ card }: { card: SchoolCard }) {
  return (
    <Link
      href={card.href}
      className="group block overflow-hidden bg-white shadow-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[64/27] w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
          {card.title}
        </h3>
        <span className="grid h-9 w-9 shrink-0 place-items-center text-navy transition-transform group-hover:translate-x-1">
          <ArrowRight className="h-5 w-6" />
        </span>
      </div>
    </Link>
  );
}

/**
 * Sticky-left intro + stacked image cards (image + title + arrow). Used by the
 * Academics "Schools" section and the Newsroom "Podcasts" section (with a
 * BleedTitle), and by the Photo Gallery page (no title — just the left
 * paragraph). Pass an empty `data.title` to omit the heading.
 */
export function SchoolsSection({
  data,
  id = "schools",
  className = "bg-surface",
}: {
  data: SectionIntro & { cards: SchoolCard[] };
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-[160px] lg:self-start">
            {data.title && <BleedTitle title={data.title} />}
            {data.description && (
              <p
                className={`max-w-md text-base font-medium leading-relaxed text-ash ${
                  data.title ? "mt-8" : ""
                }`}
              >
                {data.description}
              </p>
            )}
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {data.cards.map((card) => (
              <SchoolCardItem key={card.id} card={card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}