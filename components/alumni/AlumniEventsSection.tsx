import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { AlumniEventsSectionData } from "@/lib/types";

/**
 * DESTINATION: components/alumni/AlumniEventsSection.tsx
 *
 * FIXED: all cells now sit in a single seamless 2-column grid with zero
 * gap between them (both horizontally and between "rows") — matching the
 * reference exactly. Relies on CSS Grid's natural row-major auto-flow:
 * emitting (image, text) for a left-image row or (text, image) for a
 * right-image row is enough — no explicit order classes needed.
 */
export function AlumniEventsSection({
  data,
}: {
  data: AlumniEventsSectionData;
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2">
          {data.rows.map((row) => {
            const imageCell = (
              <div
                key={`${row.id}-image`}
                className="relative aspect-[3/2] w-full overflow-hidden bg-line"
              >
                <Image
                  src={row.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            );

            const textCell = (
              <div
                key={`${row.id}-text`}
                className="flex flex-col justify-center gap-5 bg-surface p-8 lg:p-10"
              >
                <div className="space-y-4 text-center text-[15px] leading-7 text-black/80 lg:text-center lg:text-base lg:leading-8">
                  {row.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {row.button && (
                  <div className="flex justify-center lg:justify-center">
                    <Link
                      href={row.button.href}
                      className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-navy transition-opacity hover:opacity-90"
                    >
                      {row.button.label}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                )}
              </div>
            );

            // Emitting in the right DOM order is enough — CSS Grid's
            // row-major auto-placement handles the rest with zero gap.
            return row.imageSide === "left"
              ? [imageCell, textCell]
              : [textCell, imageCell];
          })}
        </div>
      </Container>
    </section>
  );
}