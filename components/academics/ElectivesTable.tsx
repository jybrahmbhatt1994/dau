import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export function ElectivesTable({
  data,
}: {
  data: { title: string; description: string; items: string[] };
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />
        {data.description && (
          <p className="mt-8 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.description}
          </p>
        )}

        {/* Bordered grid: single hairlines via left/top on wrapper, right/bottom on cells */}
        <div className="mt-10 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="border-b border-r border-line p-5 text-sm font-bold text-navy"
            >
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}