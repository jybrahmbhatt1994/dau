import { Container } from "@/components/ui/Container";
import { PeopleCard } from "@/components/people/PeopleCard";
import type { PeopleLinkCard } from "@/lib/types";

export function PeopleGrid({ cards }: { cards: PeopleLinkCard[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <PeopleCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
