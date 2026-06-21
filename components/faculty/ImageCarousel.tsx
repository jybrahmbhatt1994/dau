"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";

export interface CarouselSlide {
  image: string;
  caption: string;
}

/**
 * Single-image carousel with prev/next arrow buttons positioned at the
 * sides, and a caption below the image. Used in the Faculty Development
 * "Industry Exposure & Collaboration" section.
 *
 * Behaviour:
 *  - Shows one slide at a time, centered, with max width
 *  - Prev (left, navy) and Next (right, brand) arrow buttons
 *  - Wraps around at the ends (last → first, first → last)
 *  - Caption renders centered below the image, uppercase, Namdhinggo
 */
export function ImageCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;

  const current = slides[index];
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <Container className="mt-10">
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* Prev */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          disabled={slides.length < 2}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-brand transition-colors hover:text-brand-alt disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12"
        >
          <ArrowRight className="h-6 w-7 rotate-180" />
        </button>

        {/* Image */}
        <div className="relative w-full max-w-[640px] flex-1">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
            <Image
              key={current.image}
              src={current.image}
              alt={current.caption}
              fill
              sizes="(min-width: 1024px) 640px, 80vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          disabled={slides.length < 2}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-brand transition-colors hover:text-brand-alt disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12"
        >
          <ArrowRight className="h-6 w-7" />
        </button>
      </div>

      {/* Caption */}
      <p className="mt-6 text-center font-display text-base font-bold uppercase tracking-wider text-navy sm:text-lg">
        {current.caption}
      </p>
    </Container>
  );
}