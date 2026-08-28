"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";
import type { NewsArticle } from "@/lib/types";

/**
 * 3-column card grid (image + date + 2-line title).
 *
 * Two pagination modes:
 *  - `pages` (default) — client-side page slicing with grey-prev / page/total /
 *    brand-orange next controls. Used by Newsletters and Student Stories.
 *  - `more` — shows `initialCount` cards and a centered gold "Show More" button
 *    that reveals `step` more each tap. Used by Fest & Events "Upcoming Events".
 *
 * Optional `title` renders a BleedTitle above the grid; `id` anchors the
 * section. Swap the client slicing for server/CMS paging when wiring WordPress.
 *
 * Optional `showReadMore` (default false — behavior for existing consumers is
 * unchanged) renders an explicit "Read More" link in each card's footer. When
 * enabled, the card itself is no longer a single full-card <Link> (nesting a
 * link inside a link is invalid HTML) — instead the image + title area links
 * to the article, and a separate "Read More" link sits below it. Used by the
 * News listing page.
 */
export function PaginatedCardGrid({
  items,
  title,
  id,
  mode = "pages",
  pageSize = 9,
  initialCount = 6,
  step = 6,
  moreLabel = "Show More",
  className = "bg-surface",
  showReadMore = false,
  readMoreLabel = "Read More",
}: {
  items: NewsArticle[];
  title?: string;
  id?: string;
  mode?: "pages" | "more";
  pageSize?: number;
  initialCount?: number;
  step?: number;
  moreLabel?: string;
  className?: string;
  showReadMore?: boolean;
  readMoreLabel?: string;
}) {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(initialCount);

  const total = Math.max(1, Math.ceil(items.length / pageSize));
  const start = (page - 1) * pageSize;
  const shown =
    mode === "more" ? items.slice(0, visible) : items.slice(start, start + pageSize);

  return (
    <section id={id} className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}>
      <Container>
        {title && (
          <div className="mb-12 lg:mb-16">
            <BleedTitle title={title} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {shown.map((item) =>
            showReadMore ? (
              <div
                key={item.id}
                className="group flex flex-col bg-white transition-shadow hover:shadow-card"
              >
                <Link
                  href={item.href}
                  className="relative aspect-[16/9] w-full overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col border border-line p-5 lg:p-6">
                  <p className="text-sm text-ash">{item.date}</p>
                  <Link href={item.href} className="mt-2">
                    <h3 className="font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                      {item.title}
                    </h3>
                  </Link>
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-2 self-start pt-4 font-display text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:text-brand-alt"
                  >
                    {readMoreLabel}
                    <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col bg-white transition-shadow hover:shadow-card"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="border border-line p-5 lg:p-6">
                  <p className="text-sm text-ash">{item.date}</p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ),
          )}
        </div>

        {mode === "more" ? (
          visible < items.length && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + step)}
                className="group inline-flex h-12 w-[217px] max-w-full items-center justify-between border border-gold bg-gold px-5 font-display text-base font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
              >
                {moreLabel}
                <ArrowRight className="h-5 w-7 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )
        ) : (
          <div className="mt-12 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className="text-ash transition hover:text-navy disabled:opacity-40 disabled:hover:text-ash"
            >
              <ArrowRight className="h-7 w-9 rotate-180" />
            </button>

            <span className="font-display text-lg font-semibold text-navy">
              {page}/{total}
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(total, p + 1))}
              disabled={page === total}
              aria-label="Next page"
              className="text-brand-alt transition hover:opacity-80 disabled:opacity-40"
            >
              <ArrowRight className="h-7 w-9" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}