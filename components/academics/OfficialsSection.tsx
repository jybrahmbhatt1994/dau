import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { OfficialCard } from "@/components/academics/OfficialCard";
import { OfficialsSlider } from "@/components/academics/OfficialsSlider";
import type { Official } from "@/lib/types";

/**
 * Officials grid.
 *
 * - Up to `swiperThreshold` people (default 4) render as a centered, wrapping
 *   grid — so 1 person is centered, 2–4 wrap neatly.
 * - Beyond the threshold the section switches to a full-bleed <OfficialsSlider>
 *   (the same carousel pattern used by the faculty / people sliders).
 *
 * Background is set via `className` (defaults to `bg-surface`; pass `bg-white`
 * where the band is white, e.g. the Dean (Student) page).
 */
export function OfficialsSection({
  data,
  className = "bg-surface",
  swiperThreshold = 4,
}: {
  data: { title: string; people: Official[] };
  className?: string;
  swiperThreshold?: number;
}) {
  const useSlider = data.people.length > swiperThreshold;

  return (
    <section
      id="officials"
      className={`scroll-mt-[150px] overflow-x-clip py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />
      </Container>

      {useSlider ? (
        <OfficialsSlider people={data.people} />
      ) : (
        <Container>
          <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-10 lg:mt-16 lg:gap-12">
            {data.people.map((person) => (
              <OfficialCard key={person.id} person={person} />
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}