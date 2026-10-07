import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import type { FestEventsCard } from "@/lib/types";

/**
 * 4-column grid of manually curated cards (image + button) — admin-entered
 * in ACF, not fetched from any CPT. Each button's link can be internal or
 * external; an external link opens in a new tab.
 */
export function FestEventsGrid({ items }: { items: FestEventsCard[] }) {
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
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <Link
                href={item.href}
                target={item.newTab ? "_blank" : undefined}
                rel={item.newTab ? "noopener noreferrer" : undefined}
                className="group mt-4 inline-flex h-11 w-[170px] max-w-full items-center justify-between border border-gold bg-gold px-4 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
              >
                {item.buttonLabel}
                <ArrowRight className="h-4 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
