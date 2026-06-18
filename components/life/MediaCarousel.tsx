"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@/components/ui/icons";
import type { MediaCarouselSlide } from "@/lib/types";

/**
 * Centered single-image carousel: one image at a time, brand-orange prev/next
 * arrows sitting near the container edges and an optional caption centered
 * beneath. Used by Residence Life (with caption) and the IEEE Branch (no
 * caption). Keyboard-operable; arrows hide when there's only one slide.
 */
export function MediaCarousel({ slides }: { slides: MediaCarouselSlide[] }) {
  const [i, setI] = useState(0);
  const count = slides.length;
  const go = (d: number) => setI((p) => (p + d + count) % count);
  const slide = slides[i];

  return (
    <div className="mt-10 lg:mt-12">
      <div className="relative">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-brand transition-transform hover:-translate-x-1"
          >
            <ArrowRight className="h-7 w-10 rotate-180 sm:h-9 sm:w-14" />
          </button>
        )}

        <div className="mx-auto w-full max-w-[300px] sm:max-w-[460px] lg:max-w-[520px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-line">
            <Image
              src={slide.image}
              alt={slide.caption ?? ""}
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 460px, 80vw"
              className="object-cover"
            />
          </div>
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-brand transition-transform hover:translate-x-1"
          >
            <ArrowRight className="h-7 w-10 sm:h-9 sm:w-14" />
          </button>
        )}
      </div>

      {slide.caption && (
        <p className="mt-6 text-center font-display text-lg font-semibold tracking-wide text-navy sm:text-xl">
          {slide.caption}
        </p>
      )}
    </div>
  );
}