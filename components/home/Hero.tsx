"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "@/components/ui/icons";
import type { HeroContent } from "@/lib/types";

const AUTOPLAY_MS = 5000;

export function Hero({ data }: { data: HeroContent }) {
  const slides = data.images;
  const [active, setActive] = useState(0);

  const go = useCallback(
    (dir: number) => setActive((p) => (p + dir + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr]">
        {/* Left: image slider */}
        <div className="group relative aspect-[877/589] w-full overflow-hidden">
          {slides.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`DAU campus ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-700 ease-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {slides.length > 1 && (
            <>
              {/* Arrows (show on hover) */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-black/35 text-white opacity-0 transition hover:bg-black/55 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-black/35 text-white opacity-0 transition hover:bg-black/55 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === active}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-6 bg-gold" : "w-2 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: red rank panel */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-brand px-8 py-12 text-white sm:px-12 lg:py-0">
          {/* paper-bird watermark (bottom-right) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/orange-paper-bird.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute bottom-6 right-6 w-32 select-none sm:w-40 lg:w-44"
          />

          <div className="relative max-w-md">
            <p className="text-base font-semibold">{data.eyebrow}</p>

            <div className="mt-8 flex items-center gap-3">
              <span className="font-display text-[clamp(2.5rem,5vw,3.125rem)] font-semibold leading-none">
                {data.rankLabel}
              </span>
              <span className="inline-flex items-center bg-gold px-3 py-1 font-display text-[clamp(2.5rem,5vw,3.125rem)] font-semibold leading-none text-navy">
                {data.rankValue}
              </span>
            </div>

            <p className="mt-8 max-w-sm text-2xl font-semibold leading-snug">
              {data.subline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}