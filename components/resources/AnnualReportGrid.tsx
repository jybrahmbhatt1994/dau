import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { AnnualReportItem } from "@/lib/types";

/**
 * DESTINATION: components/resources/AnnualReportGrid.tsx
 *
 * Same structure as PoliciesListSection (centered heading + subtitle,
 * no sub-nav) but cards are cover-image thumbnails instead of text rows.
 * Each card opens its PDF in a new tab — same interaction as Policies.
 * flex-wrap + justify-center handles any card count (9 here — 5 then 4)
 * without hardcoding row breaks.
 */
export function AnnualReportGrid({
  sectionTitle,
  sectionSubtitle,
  items,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  items: AnnualReportItem[];
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
            {sectionTitle}
          </h2>
          <p className="mt-3 text-base text-black/70">{sectionSubtitle}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-[200px] flex-none"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white shadow-sm transition-shadow group-hover:shadow-lg">
                <Image
                  src={item.coverImage}
                  alt={`Annual Report ${item.year}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center font-display text-lg font-bold text-navy">
                {item.year}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}