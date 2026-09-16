import { Container } from "@/components/ui/Container";
import { NirfDocumentList } from "@/components/nirf/NirfDocumentList";
import type { NirfRankingYear } from "@/lib/types";

export function NirfRankingSection({ years }: { years: NirfRankingYear[] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year.id}>
              <h2 className="font-display text-xl font-bold text-navy">
                {year.heading}
              </h2>
              <div className="mt-4">
                <NirfDocumentList documents={year.documents} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
