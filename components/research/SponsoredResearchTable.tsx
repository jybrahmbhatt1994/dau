"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface SponsoredProject {
  id: string;
  pi: string;
  title: string;
  fundingAgency: string;
  duration: string;
  amount: string;
}

const PAGE_SIZE = 4;

const COL_HEADERS = [
  { key: "pi",       label: "Pi/Co-PI",       cls: "w-[18%] min-w-[140px]" },
  { key: "title",    label: "Project Title",  cls: "w-[34%] min-w-[220px]" },
  { key: "funding",  label: "Funding Agency", cls: "w-[18%] min-w-[150px]" },
  { key: "duration", label: "Duration",       cls: "w-[15%] min-w-[130px]" },
  { key: "amount",   label: "Amount",         cls: "w-[15%] min-w-[120px]" },
] as const;

/**
 * "Sponsored Research" — exact Figma match.
 *
 * - Section background: surface (#F7F7F8)
 * - Table sits on white with a full hairline grid (border-line on every cell)
 * - Header row has the same hairline cell grid as body rows
 * - All text is body-weight Mulish text-black/80, slightly larger padding
 * - "SHOW MORE" gold filled button below the table
 */
export function SponsoredResearchTable({
  data,
}: {
  data: { title: string; projects: SponsoredProject[] };
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const hasMore = visible < data.projects.length;

  return (
    <section id="sponsored" className="scroll-mt-[150px] bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {/* Table card */}
        <div className="mt-10 overflow-x-auto bg-white">
          <table className="w-full min-w-[760px] border-collapse">
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
              {data.projects.slice(0, visible).map((project) => (
                <tr key={project.id}>
                  <td className="border border-line px-5 py-5 align-top text-[13px] font-semibold leading-6 text-navy">
                    {project.pi}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {project.title}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {project.fundingAgency}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {project.duration}
                  </td>
                  <td className="border border-line px-5 py-5 align-top text-[13px] leading-6 text-black/80">
                    {project.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show More — gold filled */}
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