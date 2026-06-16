"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/icons";
import type { NewsArticle } from "@/lib/types";

const PAGE_SIZE = 9;

/**
 * Paginated 3-column card grid (image + date + 2-line title). Shared template
 * for the Newsletters and Student Stories ("In Focus") pages. Pagination is
 * client-side slicing of `items`; swap for server/CMS paging when wiring up
 * WordPress (fetch page N, keep the same controls).
 */
export function PaginatedCardGrid({
  items,
  className = "bg-surface",
}: {
  items: NewsArticle[];
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const total = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const shown = items.slice(start, start + PAGE_SIZE);

  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {shown.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col border border-line bg-white transition-shadow hover:shadow-card"
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
              <div className="p-5 lg:p-6">
                <p className="text-sm text-ash">{item.date}</p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination: grey prev / page count / brand-orange next */}
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
      </Container>
    </section>
  );
}