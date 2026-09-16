import { Container } from "@/components/ui/Container";
import { WorkDauCard } from "@/components/work-dau/WorkDauCard";
import type { WorkDauLinkCard } from "@/lib/types";

export function WorkDauGrid({ cards }: { cards: WorkDauLinkCard[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <WorkDauCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}
