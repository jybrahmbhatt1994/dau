import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AlumniMemoriesSectionData } from "@/lib/types";

/**
 * DESTINATION: components/alumni/AlumniMemoriesSection.tsx
 *
 * "Campus Memories" — 2-column cards, each with image + caption + gold
 * button below. White background.
 */
export function AlumniMemoriesSection({
  data,
}: {
  data: AlumniMemoriesSectionData;
}) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {data.cards.map((card) => (
            <div key={card.id} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-5 text-center text-sm leading-relaxed text-black/70">
                {card.caption}
              </p>

              <div className="mt-5 flex justify-center">
                <Link
                  href={card.button.href}
                  className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-navy transition-opacity hover:opacity-90"
                >
                  {card.button.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}