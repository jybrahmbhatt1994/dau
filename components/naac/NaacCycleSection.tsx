import { Container } from "@/components/ui/Container";
import { NaacDocumentList } from "@/components/naac/NaacDocumentList";
import type { NaacCycle } from "@/lib/types";

export function NaacCycleSection({ cycles }: { cycles: NaacCycle[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="space-y-10">
          {cycles.map((cycle) => (
            <div key={cycle.id}>
              <h2 className="font-display text-xl font-bold text-navy">
                {cycle.heading}
              </h2>
              <div className="mt-4">
                <NaacDocumentList documents={cycle.documents} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
