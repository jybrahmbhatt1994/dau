"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/ui/icons";
import type { ReactNode } from "react";

/**
 * DESTINATION: components/doctoral-scholars/YearAccordionGroup.tsx
 *
 * Now generic — takes `children` instead of a fixed member list, so it
 * can wrap either the 2-col grid of compact DoctoralScholarCards or a
 * stacked list of full-width RecentGraduateCards.
 */
export function YearAccordionGroup({
  year,
  children,
}: {
  year: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between bg-ink px-6 py-3 text-left text-white"
      >
        <span className="font-display text-base font-semibold">{year}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && children}
    </div>
  );
}