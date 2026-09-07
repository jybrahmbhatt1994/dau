"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import type { NewsletterItem } from "@/lib/types";

export function NewsletterGrid({
  items,
  pageSize = 8,
  className = "bg-surface",
}: {
  items: NewsletterItem[];
  pageSize?: number;
  className?: string;
}) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const start = page * pageSize;
  const shown = items.slice(start, start + pageSize);

  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {shown.map((item) => (
            <a
              key={item.id}
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden border border-line bg-white transition-shadow hover:shadow-card"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-4 text-center">
                <span className="font-display text-base font-semibold text-brand transition-colors group-hover:text-brand-alt">
                  {item.title}
                </span>
              </div>
            </a>
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          className="mt-12"
        />
      </Container>
    </section>
  );
}