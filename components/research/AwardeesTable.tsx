"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface Awardee {
  id: string;
  studentName: string;
  publicationMonth: string;
  publicationVenue: string;
  facultyAuthor: string;
  title: string;
}

/**
 * One year's worth of awardees. Keyed by `year` so CMS can fetch each year's
 * list independently later without changing the component contract.
 */
export interface AwardeesYearGroup {
  year: string;        // e.g. "2025-26"
  awardees: Awardee[]; // rows shown when this year is active
}

const PAGE_SIZE = 4;

const COL_HEADERS = [
  { key: "student",  label: "Student Name",       cls: "w-[15%] min-w-[140px]" },
  { key: "month",    label: "Publication Month",  cls: "w-[14%] min-w-[130px]" },
  { key: "venue",    label: "Publication Venue",  cls: "w-[18%] min-w-[160px]" },
  { key: "author",   label: "Faculty Author",     cls: "w-[16%] min-w-[140px]" },
  { key: "title",    label: "Title",              cls: "w-[37%] min-w-[260px]" },
] as const;

/**
 * "List of Awardees" — segmented year tabs + full-hairline-grid table.
 *
 * - Segmented control (light grey container) with one pill per year, active
 *   pill = brand red + white text. Switching year swaps the table rows.
 * - Table sits on white with a complete hairline grid (every cell has
 *   border-line on all 4 sides). Header row is white bg + navy semibold.
 * - "SHOW MORE" gold filled button appends PAGE_SIZE more rows.
 * - Per-year pagination state — resets when you switch years.
 *
 * Background: white, py-16 lg:py-20.
 *
 * Data shape is keyed by year so each year can be loaded from CMS separately
 * (e.g. when 2024-25 has 200 rows, fetch only that year's list).
 */
export function AwardeesTable({
  title,
  years,
}: {
  title: string;
  years: AwardeesYearGroup[];
}) {
  const [activeYear, setActiveYear] = useState(0);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const current = years[activeYear];
  const rows = current?.awardees ?? [];
  const hasMore = visible < rows.length;

  const onSwitchYear = (i: number) => {
    setActiveYear(i);
    setVisible(PAGE_SIZE); // reset pagination per year
  };

  return (
    <section id="awardees" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      {/* Year tabs — centered segmented control */}
      <Container>
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Award year"
            className="inline-flex items-center gap-1 bg-[#E5E5E5] p-1"
          >
            {years.map((y, i) => {
              const isActive = activeYear === i;
              return (
                <button
                  key={y.year}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSwitchYear(i)}
                  className={`inline-flex h-11 items-center justify-center px-6 font-display text-sm font-semibold transition-colors sm:h-12 sm:px-8 sm:text-base ${
                    isActive
                      ? "bg-brand text-white"
                      : "bg-transparent text-navy hover:text-brand"
                  }`}
                >
                  {y.year}
                </button>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Section title */}
      <Container className="mt-14 lg:mt-16">
        <BleedTitle title={title} />
      </Container>

      {/* Table — full hairline grid */}
      <Container className="mt-10">
        <div className="overflow-x-auto bg-white">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr>
                {COL_HEADERS.map((col) => (
                  <th
                    key={col.key}
                    className={`border border-line bg-white px-5 py-4 text-left align-middle font-display text-sm font-semibold text-navy ${col.cls}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, visible).map((row) => (
                <tr key={row.id}>
                  <td className="border border-line px-5 py-5 align-top text-[13px] font-semibold leading-6 text-navy">
                    {row.studentName}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {row.publicationMonth}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {row.publicationVenue}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {row.facultyAuthor}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {row.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state — year exists in data but has no awardees */}
          {rows.length === 0 && (
            <div className="border border-line border-t-0 bg-white px-5 py-10 text-center text-sm text-ash">
              No awardees recorded for {current?.year}.
            </div>
          )}
        </div>

        {/* SHOW MORE — gold filled */}
        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="group inline-flex h-12 w-[217px] max-w-full items-center justify-between border border-gold bg-gold px-5 font-display text-base font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
            >
              <span>Show More</span>
              <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}