import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type {
  BarChartBucket,
  RecruiterLogo,
  StatItem,
} from "@/lib/types";

const MAX_BAR_HEIGHT_PX = 220;
const MIN_BAR_HEIGHT_PX = 36;
const BAR_WIDTH_PX = 36;

function barHeight(value: number, max: number): string {
  if (max <= 0) return `${MIN_BAR_HEIGHT_PX}px`;
  const ratio = value / max;
  const px = Math.max(MIN_BAR_HEIGHT_PX, Math.round(ratio * MAX_BAR_HEIGHT_PX));
  return `${px}px`;
}

/**
 * Admission > Placement Stats composite section.
 *
 * Dark ink band combining:
 *   1. Section heading + description (right) + legend (top-right)
 *   2. 3-bucket bar chart (Highest gold gradient / Average red-to-navy gradient)
 *   3. Horizontal strip of recruiter logos (greyscale-tinted)
 *   4. White stats row (4 big brand-red numbers + ash labels)
 *
 * One self-contained section (unlike the standalone components used on
 * /placements/stats and /placements/recruiters) because the design packs
 * everything onto a single dark band on the Admissions page.
 *
 * Background: bg-ink, py-16 lg:py-20.
 */
export function AdmissionPlacementStats({
  data,
}: {
  data: {
    title: string;
    description: string;
    legend: { highestLabel: string; averageLabel: string };
    buckets: BarChartBucket[];
    logos: RecruiterLogo[];
    stats: StatItem[];
  };
}) {
  const max = data.buckets.reduce(
    (m, b) => Math.max(m, b.highest, b.average),
    0
  );

  return (
    <section id="placement-stats" className="scroll-mt-[150px] bg-ink py-16 lg:py-20">
      <Container>
        {/* Header: title left + description right + legend far right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <BleedTitle title={data.title} light className="shrink-0" />

          {data.description && (
            <p className="max-w-md text-[15px] leading-7 text-white/80 lg:flex-1 lg:pt-2">
              {data.description}
            </p>
          )}

          {/* Legend */}
          <div className="flex shrink-0 flex-col gap-3 text-sm text-white/90 lg:pt-2">
            <div className="flex items-center gap-3">
              <span className="block h-3 w-3 bg-gold" aria-hidden />
              <span>{data.legend.highestLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="block h-3 w-3 bg-brand" aria-hidden />
              <span>{data.legend.averageLabel}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-12 lg:mt-14">
          <div
            className="flex items-end justify-around gap-4 sm:gap-8 lg:gap-12"
            style={{ minHeight: `${MAX_BAR_HEIGHT_PX + 50}px` }}
          >
            {data.buckets.map((bucket) => (
              <div key={bucket.label} className="flex flex-1 flex-col items-center">
                <div className="flex items-end gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <span className="mb-2 font-display text-sm font-semibold text-white sm:text-base">
                      {bucket.highest}
                    </span>
                    <div
                      style={{
                        height: barHeight(bucket.highest, max),
                        width: BAR_WIDTH_PX,
                        background: "linear-gradient(180deg, #EDBE4B 0%, #B5862B 100%)",
                      }}
                      aria-label={`${data.legend.highestLabel}: ${bucket.highest}`}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-2 font-display text-sm font-semibold text-white sm:text-base">
                      {bucket.average}
                    </span>
                    <div
                      style={{
                        height: barHeight(bucket.average, max),
                        width: BAR_WIDTH_PX,
                        background: "linear-gradient(180deg, #CB4B36 0%, #161A3F 100%)",
                      }}
                      aria-label={`${data.legend.averageLabel}: ${bucket.average}`}
                    />
                  </div>
                </div>
                <p className="mt-5 text-sm font-medium text-white/85 sm:text-base">
                  {bucket.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Logos strip */}
        {data.logos.length > 0 && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90 lg:mt-16 lg:gap-x-14">
            {data.logos.map((r) => (
              <div key={r.id} className="relative h-8 w-24 sm:h-10 sm:w-28">
                <Image
                  src={r.logo}
                  alt={r.name}
                  fill
                  sizes="120px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8 lg:mt-16">
          {data.stats.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <p className="font-display text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl">
                {item.value}
              </p>
              <p className="mt-3 text-sm font-medium text-white/75 sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}