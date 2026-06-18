"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";
import type { EventItem } from "@/lib/types";

/**
 * "Upcoming Fest" featured carousel: a single large 16:9 image at a time with
 * brand prev/next arrows near the container edges, and a white card overlapping
 * the image's bottom-left showing the date + title. Keyboard-operable; arrows
 * hide when there's only one slide.
 */
export function FeaturedCarousel({
  title,
  items,
  id = "upcoming-fest",
  className = "bg-surface",
}: {
  title: string;
  items: EventItem[];
  id?: string;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const count = items.length;
  const go = (d: number) => setI((p) => (p + d + count) % count);
  const item = items[i];

  return (
    <section id={id} className={`scroll-mt-[150px] overflow-x-clip py-16 lg:py-20 ${className}`}>
      <Container>
        <BleedTitle title={title} />
      </Container>

      <Container className="mt-10 lg:mt-12">
        <div className="relative">
          {count > 1 && (
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-brand drop-shadow transition-transform hover:-translate-x-1"
            >
              <ArrowRight className="h-7 w-10 rotate-180 sm:h-9 sm:w-14" />
            </button>
          )}

          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[620px] lg:max-w-[990px]">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-line">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 990px, (min-width: 640px) 620px, 80vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-4 left-4 max-w-[78%] bg-white p-5 sm:bottom-8 sm:left-8 sm:max-w-[55%] sm:p-7">
              <p className="text-sm text-ash">{item.date}</p>
              <h3 className="mt-3 font-display text-base font-bold leading-snug text-navy sm:text-lg">
                {item.title}
              </h3>
            </div>
          </div>

          {count > 1 && (
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-brand drop-shadow transition-transform hover:translate-x-1"
            >
              <ArrowRight className="h-7 w-10 sm:h-9 sm:w-14" />
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}