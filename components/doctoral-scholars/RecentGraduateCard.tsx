"use client";

import { useState } from "react";
import Image from "next/image";
import { RecentGraduateDetailModal } from "@/components/doctoral-scholars/RecentGraduateDetailModal";
import type { RecentGraduateCardData } from "@/lib/types";

/** Renders each comma-separated advisor name underlined, matching the reference. */
function AdvisorNames({ advisor }: { advisor: string }) {
  const names = advisor.split(",").map((n) => n.trim()).filter(Boolean);
  return (
    <>
      {names.map((name, i) => (
        <span key={i}>
          {i > 0 && ", "}
          <span className="underline underline-offset-2">{name}</span>
        </span>
      ))}
    </>
  );
}

/**
 * DESTINATION: components/doctoral-scholars/RecentGraduateCard.tsx
 *
 * Compact grid card — photo on the left, name/advisor/dates + a "Know More"
 * button on the right. Same grid-cols-[photo_1fr] pattern as
 * DoctoralScholarCard/StaffCard. "Know More" opens the full detail (thesis,
 * post-PhD employment, publications, awards, personal webpage) in a modal
 * instead of showing it inline.
 */
export function RecentGraduateCard({
  scholar,
}: {
  scholar: RecentGraduateCardData;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid min-h-[260px] grid-cols-[180px_1fr] bg-surface sm:grid-cols-[220px_1fr]">
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={scholar.image}
          alt={scholar.name}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">
          {scholar.name}
        </h3>

        {scholar.advisor && (
          <p className="text-sm text-black/80">
            <span className="font-semibold">Advisor: </span>
            <AdvisorNames advisor={scholar.advisor} />
          </p>
        )}

        <p className="text-sm text-black/80">
          <span className="font-semibold">Year of Joining: </span>
          {scholar.yearOfJoiningDisplay || "---"}
        </p>

        <p className="text-sm text-black/80">
          <span className="font-semibold">Year of Graduation: </span>
          {scholar.yearOfGraduationDisplay || "---"}
        </p>

        <div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="bg-brand px-6 py-2.5 font-display text-sm font-bold text-white transition-colors hover:bg-brand/90"
          >
            Know More
          </button>
        </div>
      </div>

      {open && (
        <RecentGraduateDetailModal scholar={scholar} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
