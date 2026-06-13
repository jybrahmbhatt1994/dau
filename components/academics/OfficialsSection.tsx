import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { OfficialCard } from "@/components/academics/OfficialCard";
import type { Official } from "@/lib/types";

export function OfficialsSection({
  data,
}: {
  data: { title: string; people: Official[] };
}) {
  return (
    <section id="officials" className="scroll-mt-24 bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-10 lg:mt-16 lg:gap-12">
          {data.people.map((person) => (
            <OfficialCard key={person.id} person={person} />
          ))}
        </div>
      </Container>
    </section>
  );
}