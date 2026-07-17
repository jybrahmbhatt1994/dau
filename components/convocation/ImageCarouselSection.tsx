"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

function ChevronArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-6 w-6 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

/**
 * DESTINATION: components/convocation/ImageCarouselSection.tsx
 *
 * Reusable single-image carousel with prev/next arrows either side —
 * used for both "Photo Gallery" and "Gold Medalists" sections (identical
 * structure, different data + title). Surface background.
 */
export function ImageCarouselSection({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={title} />

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="text-ash transition-colors hover:text-navy"
          >
            <ChevronArrow direction="left" />
          </button>

          <div className="relative aspect-[16/10] w-full max-w-2xl overflow-hidden bg-white shadow-sm">
            <Image
              src={images[index]}
              alt={`${title} ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 672px, 100vw"
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="text-brand transition-colors hover:text-brand/70"
          >
            <ChevronArrow direction="right" />
          </button>
        </div>
      </Container>
    </section>
  );
}