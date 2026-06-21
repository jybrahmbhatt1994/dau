"use client";

import { ArrowRight } from "@/components/ui/icons";

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

/**
 * Shared pagination row: ← prev | "current/total" | next →
 *
 * Used by FacultyExplorer, FacultyMembersGrid, and any other paginated list.
 *
 * Props:
 *  - page: zero-based current page index
 *  - totalPages: total number of pages
 *  - onChange: called with the new zero-based page index
 *
 * Design tokens from Figma:
 *  - Prev arrow: ash (grey), navy on hover, opacity-30 disabled
 *  - Next arrow: brand red, brand-alt on hover, opacity-30 disabled
 *  - Indicator: Namdhinggo semibold, navy
 */
export function Pagination({
  page,
  totalPages,
  onChange,
  className = "",
}: {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  if (totalPages <= 1) return null;

  const onPrev = () => onChange(Math.max(0, page - 1));
  const onNext = () => onChange(Math.min(totalPages - 1, page + 1));

  return (
    <div className={`flex items-center justify-between gap-6 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={page === 0}
        aria-label="Previous page"
        className="inline-flex h-10 w-10 items-center justify-center text-ash transition-colors hover:text-navy disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowLeftIcon className="h-5 w-6" />
      </button>

      <p className="font-display text-base font-semibold text-navy">
        {page + 1}/{totalPages}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages - 1}
        aria-label="Next page"
        className="inline-flex h-10 w-10 items-center justify-center text-brand transition-colors hover:text-brand-alt disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowRight className="h-5 w-6" />
      </button>
    </div>
  );
}