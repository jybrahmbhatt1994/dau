"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { FacultyCard } from "@/components/faculty/FacultyCard";
import { Pagination } from "@/components/ui/Pagination";
import type { FacultyMember } from "@/lib/types";

/**
 * Reusable BleedTitle + 4-col faculty grid + optional pagination.
 *
 * Used by:
 *  - Placement Team page (both Placement Cell Team static + Student Placement
 *    Cell paginated)
 *  - any future team/people listing pages
 *
 * Props:
 *  - data:       { title, members[] } — data shape works cleanly with CMS
 *                accessors (one per team, fetched independently)
 *  - paginated:  when true, renders ← prev | n/total | next → below the grid
 *                and only shows `pageSize` members at a time
 *  - pageSize:   members per page when paginated (default 12 = 3 rows × 4)
 *  - className:  section background utility (defaults to bg-white)
 *  - id:         optional section anchor id
 *
 * Data shape stays clean for headless integration — each team is a single
 * `{ title, members }` object the CMS can populate independently.
 */
export function FacultyMembersGrid({
  data,
  paginated = false,
  pageSize = 12,
  className = "bg-white",
  id,
}: {
  data: {
    title: string;
    members: FacultyMember[];
  };
  paginated?: boolean;
  pageSize?: number;
  className?: string;
  id?: string;
}) {
  const [page, setPage] = useState(0);

  const totalPages = paginated
    ? Math.max(1, Math.ceil(data.members.length / pageSize))
    : 1;

  const visible = paginated
    ? data.members.slice(page * pageSize, page * pageSize + pageSize)
    : data.members;

  return (
    <section
      id={id}
      className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />

        {visible.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ash">
            No team members listed yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12 lg:mt-14">
            {visible.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        )}

        {paginated && data.members.length > pageSize && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
            className="mt-12 lg:mt-16"
          />
        )}
      </Container>
    </section>
  );
}