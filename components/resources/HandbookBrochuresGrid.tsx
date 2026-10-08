import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { HandbookBrochureItem } from "@/lib/types";

/**
 * DESTINATION: components/resources/HandbookBrochuresGrid.tsx
 *
 * Same structure as AnnualReportGrid (centered heading + subtitle, no
 * sub-nav, cover-image cards opening their PDF in a new tab).
 */
export function HandbookBrochuresGrid({
  sectionTitle,
  sectionSubtitle,
  items,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  items: HandbookBrochureItem[];
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
                  alt={item.title}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center font-display text-lg font-bold text-navy">
                {item.title}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
