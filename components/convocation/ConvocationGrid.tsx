import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { ConvocationCard } from "@/lib/types";

/**
 * DESTINATION: components/convocation/ConvocationGrid.tsx
 *
 * Simple card grid — image, date, bold title. Non-interactive (no
 * individual convocation detail page). flex-wrap + justify-center handles
 * any number of cards cleanly.
 */
export function ConvocationGrid({ cards }: { cards: ConvocationCard[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <div key={card.id} className="w-[340px] flex-none bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="340px"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-ash">{card.date}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-navy">
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}