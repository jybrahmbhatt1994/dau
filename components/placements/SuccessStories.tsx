"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { PaperMark } from "@/components/ui/icons";
import type { SuccessStory } from "@/lib/types";

// Warm orange used for the tilted frame + the active pager segment. Sampled
// from the Figma (~#E09C55); kept as a one-off since it sits between the `gold`
// and `brand` tokens.
const ACCENT = "#E0954A";

const AUTOPLAY_MS = 5000;

/**
 * Success Stories testimonial slider. A portrait in a thick white mat with a
 * tilted orange outline frame peeking out behind it (bottom-left), the quote +
 * student name + year on the right, decorative paper marks, and a segmented
 * pager beneath the text. Autoscrolls every 5s; pauses on hover/focus and when
 * the tab is hidden. Background via `className`.
 */
export function SuccessStories({
  title,
  items,
  className = "bg-surface",
}: {
  title: string;
  items: SuccessStory[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s = items[i];

  // Autoscroll
  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const id = setInterval(
      () => setI((p) => (p + 1) % items.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(id);
  }, [items.length, paused]);

  return (
    <section
      className={`relative overflow-x-clip py-16 lg:py-20 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container>
        <BleedTitle title={title} />

        <div className="relative mt-12 lg:mt-16">
          {/* Decorative marks (lg only) */}
          <PaperMark className="pointer-events-none absolute right-6 top-0 hidden lg:block" />
          <PaperMark className="pointer-events-none absolute right-16 top-1/2 hidden opacity-40 lg:block" />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[360px_1fr] lg:gap-20">
            {/* Portrait: thick white mat + tilted orange frame behind */}
            <div className="relative mx-auto w-full max-w-[340px] lg:mx-0">
              <span
                aria-hidden
                className="absolute inset-0 border"
                style={{
                  borderColor: ACCENT,
                  transform: "rotate(-8deg) translate(-12px, 10px)",
                }}
              />
              <div className="relative bg-white p-3 shadow-lg">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(min-width: 1024px) 340px, 80vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Quote + meta */}
            <div className="relative">
              <p className="max-w-xl text-lg leading-relaxed text-ink lg:text-2xl lg:leading-relaxed">
                {s.quote}
              </p>

              <p className="mt-8 text-lg font-bold text-ink">{s.name}</p>
              <p className="mt-1 text-sm text-ash">{s.year}</p>

              {/* Segmented pager */}
              {items.length > 1 && (
                <div className="mt-8 flex items-center gap-3">
                  {items.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setI(idx)}
                      aria-label={`Go to story ${idx + 1}`}
                      aria-current={idx === i}
                      className="h-1.5 w-10 rounded-full transition-colors"
                      style={{
                        backgroundColor: idx === i ? ACCENT : "#E5E5E5",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}