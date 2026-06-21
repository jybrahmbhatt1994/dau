import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface BarChartBucket {
  /** Label shown below the bucket (e.g. "2025-26") */
  label: string;
  /** Highest value bar (rendered in gold) */
  highest: number;
  /** Average value bar (rendered in brand red) */
  average: number;
}

export interface BarChartSectionData {
  title: string;
  description: string;
  legend: {
    highestLabel: string;
    averageLabel: string;
  };
  buckets: BarChartBucket[];
  id?: string;
}

/** Maximum bar height in px on desktop (scales down via height media queries) */
const MAX_BAR_HEIGHT_PX = 240;
const MIN_BAR_HEIGHT_PX = 40; // floor so tiny values are still visible
const BAR_WIDTH_PX = 38;

/**
 * Compute bar height as a proportion of the largest value across both series
 * in the entire chart. Returns a Tailwind-friendly inline `height` string.
 */
function barHeight(value: number, max: number): string {
  if (max <= 0) return `${MIN_BAR_HEIGHT_PX}px`;
  const ratio = value / max;
  const px = Math.max(MIN_BAR_HEIGHT_PX, Math.round(ratio * MAX_BAR_HEIGHT_PX));
  return `${px}px`;
}

/**
 * "UG/PG Placements" bar chart section on dark ink background.
 *
 * Each bucket has two vertical bars:
 *  - Highest (gold → dark amber linear gradient)
 *  - Average (brand red → dark navy linear gradient)
 * Numeric value above each bar, year label below each bucket.
 * Legend (colored square + label) sits top-right of the section header.
 *
 * Pure CSS bars (no chart library) — auto-scaled to the largest value across
 * both series. Background: bg-ink, py-16 lg:py-20.
 */
export function BarChartSection({ data }: { data: BarChartSectionData }) {
  // Find max across both series to scale bars consistently
  const max = data.buckets.reduce(
    (m, b) => Math.max(m, b.highest, b.average),
    0
  );

  return (
    <section
      id={data.id}
      className="scroll-mt-[150px] bg-ink py-16 lg:py-20"
    >
      <Container>
        {/* Header: title (left) + description (middle) + legend (right) */}
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
        <div className="mt-14 lg:mt-16">
          <div
            className="flex items-end justify-around gap-4 sm:gap-8 lg:gap-12"
            style={{ minHeight: `${MAX_BAR_HEIGHT_PX + 60}px` }}
          >
            {data.buckets.map((bucket) => (
              <div
                key={bucket.label}
                className="flex flex-1 flex-col items-center"
              >
                {/* Bars (aligned to bottom) */}
                <div className="flex items-end gap-3 sm:gap-4">
                  {/* Highest bar */}
                  <div className="flex flex-col items-center">
                    <span className="mb-2 font-display text-sm font-semibold text-white sm:text-base">
                      {bucket.highest}
                    </span>
                    <div
                      style={{
                        height: barHeight(bucket.highest, max),
                        width: BAR_WIDTH_PX,
                        background:
                          "linear-gradient(180deg, #EDBE4B 0%, #B5862B 100%)",
                      }}
                      aria-label={`${data.legend.highestLabel}: ${bucket.highest}`}
                    />
                  </div>

                  {/* Average bar */}
                  <div className="flex flex-col items-center">
                    <span className="mb-2 font-display text-sm font-semibold text-white sm:text-base">
                      {bucket.average}
                    </span>
                    <div
                      style={{
                        height: barHeight(bucket.average, max),
                        width: BAR_WIDTH_PX,
                        background:
                          "linear-gradient(180deg, #CB4B36 0%, #161A3F 100%)",
                      }}
                      aria-label={`${data.legend.averageLabel}: ${bucket.average}`}
                    />
                  </div>
                </div>

                {/* Year label */}
                <p className="mt-5 text-sm font-medium text-white/85 sm:text-base">
                  {bucket.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}