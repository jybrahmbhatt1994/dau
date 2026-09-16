import { Container } from "@/components/ui/Container";
import { AccreditationsCard } from "@/components/accreditations/AccreditationsCard";
import type { AccreditationsLinkCard } from "@/lib/types";

export function AccreditationsGrid({ cards }: { cards: AccreditationsLinkCard[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <AccreditationsCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
