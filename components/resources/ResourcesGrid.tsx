import { Container } from "@/components/ui/Container";
import { ResourceCard } from "@/components/resources/ResourceCard";
import type { ResourceLinkCard } from "@/lib/types";

/**
 * DESTINATION: components/resources/ResourcesGrid.tsx
 *
 * Uses flex-wrap + justify-center (not a fixed-column CSS grid) so the
 * cards wrap naturally into rows of however many fit per screen width and
 * stay centered as a group — matching the 4-then-3 centered layout in the
 * Figma without needing to hardcode row breaks.
 */
export function ResourcesGrid({ cards }: { cards: ResourceLinkCard[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => (
            <ResourceCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}