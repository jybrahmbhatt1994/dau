import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import type { EventItem } from "@/lib/types";

/**
 * 4-column grid of Fest + Event cards — image, title + date, and each card's
 * own gold "Show More" button linking straight to its detail page. No section
 * titles, no "load more" pagination — every fetched card renders at once.
 */
export function FestEventsGrid({ items }: { items: EventItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="fest-events-grid" className="scroll-mt-[150px] bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden bg-line">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-3 text-sm text-ash">{item.date}</p>
              <h3 className="mt-1 font-display text-base font-bold leading-snug text-navy">
                {item.title}
              </h3>

              <Link
                href={item.href}
                className="group mt-4 inline-flex h-11 w-[170px] max-w-full items-center justify-between border border-gold bg-gold px-4 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
              >
                Show More
                <ArrowRight className="h-4 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
