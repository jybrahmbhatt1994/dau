"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const PAGE_SIZE = 12;

export function PhotoGalleryGrid({ images }: { images: string[] }) {
  const [index, setIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  if (images.length === 0) return null;

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {visibleImages.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open image ${i + 1} of ${images.length}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-line"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, images.length))}
            className="rounded-full border border-navy/20 px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            View More
          </button>
        </div>
      )}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((src) => ({ src }))}
      />
    </>
  );
}
