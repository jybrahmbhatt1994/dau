"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { StudentCellCard } from "@/components/faculty/FacultyMembersGrid";
import type { FacultyMember } from "@/lib/types";

/**
 * Year-wise accordion grid for the Student Placement Cell section.
 * Replaces the old paginated <FacultyMembersGrid /> usage for this section.
 *
 * Data comes pre-grouped from wordpress.ts (grouped by the `cell_year` ACF
 * field, not the WP published date) — this component just renders it.
 *
 * Props:
 *  - data:      { title, years: [{ year, members }] } — years sorted newest
 *               first by wordpress.ts
 *  - className: section background utility (defaults to bg-white)
 *  - id:        optional section anchor id
 */
export function StudentCellAccordionGrid({
  data,
  className = "bg-white",
  id,
}: {
  data: {
    title: string;
    years: Array<{ year: string; members: FacultyMember[] }>;
  };
  className?: string;
  id?: string;
}) {
  // Most recent year (first in the sorted list) open by default.
  const [openYear, setOpenYear] = useState<string | null>(
    data.years[0]?.year ?? null,
  );

  return (
    <section
      id={id}
      className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />

        {data.years.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ash">
            No team members listed yet.
          </p>
        ) : (
          <div className="mt-10 space-y-3 lg:mt-14">
            {data.years.map(({ year, members }) => {
              const isOpen = openYear === year;
              const label =
                year === "Unspecified"
                  ? `${data.title} — Unspecified Year`
                  : `${data.title} - ${year}`;

              return (
                <div key={year} className="border border-line">
                  <button
                    type="button"
                    onClick={() => setOpenYear(isOpen ? null : year)}
                    aria-expanded={isOpen}
                    className={`flex w-full items-center justify-between px-6 py-4 text-left font-display text-base font-semibold transition-colors ${
                      isOpen ? "bg-navy text-white" : "bg-surface text-navy"
                    }`}
                  >
                    <span>{label}</span>
                    <ChevronIcon open={isOpen} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-10 pt-8">
                      {members.length === 0 ? (
                        <p className="text-center text-sm text-ash">
                          No team members listed yet.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
                          {members.map((member) => (
                            <StudentCellCard key={member.id} member={member} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}