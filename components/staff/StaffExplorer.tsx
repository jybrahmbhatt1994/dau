"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { StaffCard } from "@/components/staff/StaffCard";
import { ChevronRight } from "@/components/ui/icons";
import type { StaffCardData } from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 10;

/**
 * DESTINATION: components/staff/StaffExplorer.tsx
 *
 * Same interaction pattern as FacultyExplorer, minus the tab pills — Staff
 * has no taxonomy grouping, just one flat searchable/filterable list.
 * Search bar is centered above the alphabet row (not beside tabs).
 */
export function StaffExplorer({ members }: { members: StaffCardData[] }) {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("ALL");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = members;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.position.toLowerCase().includes(q) ||
          m.department.toLowerCase().includes(q),
      );
    }

    if (letter !== "ALL") {
      result = result.filter((m) =>
        m.name.trim().toUpperCase().startsWith(letter),
      );
    }

    return result;
  }, [members, search, letter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE,
  );

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        {/* Search — centered, full width */}
        <div className="mx-auto max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search Staff..."
            className="w-full border border-line bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
        </div>

        {/* Alphabet filter — full width */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-y-2 border-b border-line pb-4 text-sm">
          <button
            type="button"
            onClick={() => {
              setLetter("ALL");
              setPage(1);
            }}
            className={`font-semibold underline underline-offset-2 ${
              letter === "ALL" ? "text-brand" : "text-ash hover:text-navy"
            }`}
          >
            ALL
          </button>
          {ALPHABET.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLetter(l);
                setPage(1);
              }}
              className={`underline underline-offset-2 ${
                letter === l ? "text-brand font-semibold" : "text-ash hover:text-navy"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Grid */}
        {pageItems.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pageItems.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-ash">
            No staff members found.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={clampedPage === 1}
              aria-label="Previous page"
              className="text-ash transition-colors hover:text-navy disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <span className="text-sm font-semibold text-navy">
              {clampedPage}/{totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={clampedPage === totalPages}
              aria-label="Next page"
              className="text-brand transition-colors hover:text-brand/70 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}