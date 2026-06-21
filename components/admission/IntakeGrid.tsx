import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface IntakeItem {
  id: string;
  /** Program label (e.g. "B.Tech Information and Communication Technology (ICT)") */
  program: string;
  /** Numeric intake count (e.g. "72") */
  count: string;
}

/**
 * "Intake" section — BleedTitle + 4-column bordered grid of program intake
 * cells.
 *
 * Each cell: program name (text-navy semibold) on top, big number
 * (font-display bold, dark navy — NOT brand red per Figma) below.
 *
 * Grid: 1 col mobile → 2 cols sm → 4 cols lg, joined by hairline borders so
 * it reads as one table-like block.
 * Background: white, py-16 lg:py-20.
 */
export function IntakeGrid({
  data,
}: {
  data: {
    title: string;
    items: IntakeItem[];
  };
}) {
  return (
    <section id="intake" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 gap-0 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex min-h-[150px] flex-col justify-between gap-6 border-b border-r border-line bg-white p-5 lg:p-6"
            >
              <p className="text-sm font-semibold leading-snug text-navy">
                {item.program}
              </p>
              <p className="font-display text-3xl font-bold leading-none text-navy sm:text-4xl">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}