import { Container } from "@/components/ui/Container";
import type { ScheduleCell } from "@/lib/types";

/**
 * DESTINATION: components/academics/ScheduleGrid.tsx
 *
 * Row of bordered cells, each showing a label (e.g. "During the semester")
 * and a bold value below it (e.g. "9.30 a.m. to 12.00 midnight"). White
 * background, centered content. Wraps to a stacked column on mobile.
 */
export function ScheduleGrid({ cells }: { cells: ScheduleCell[] }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col divide-y divide-line border border-line sm:flex-row sm:divide-x sm:divide-y-0">
          {cells.map((cell) => (
            <div
              key={cell.name}
              className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-8 text-center"
            >
              <p className="text-sm text-ash">{cell.name}</p>
              <p className="font-display text-base font-semibold text-navy">
                {cell.time}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}