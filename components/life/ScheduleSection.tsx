import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { ScheduleCell } from "@/lib/types";

/**
 * "Medical Facility"-style block: BleedTitle, intro paragraphs, a bordered
 * grid of name + value cells (e.g. doctor + visiting hours), then trailing
 * paragraphs. Cells stack 1 / 2 / 3 columns. Background via `className`.
 */
export function ScheduleSection({
  data,
  id = "medical",
  className = "bg-white",
}: {
  data: {
    title: string;
    intro: string[];
    cells: ScheduleCell[];
    outro: string[];
  };
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}>
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Hairline grid: left/top on wrapper, right/bottom on cells */}
        <div className="mt-10 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {data.cells.map((cell, i) => (
            <div key={i} className="border-b border-r border-line px-6 py-7">
              <p className="text-base text-black/80">{cell.name}</p>
              <p className="mt-4 text-base font-bold text-navy">{cell.time}</p>
            </div>
          ))}
        </div>

        {data.outro.length > 0 && (
          <div className="mt-10 space-y-6 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.outro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}