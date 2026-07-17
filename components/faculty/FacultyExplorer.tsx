"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FacultyDirectoryCard  } from "@/components/faculty/FacultyCard";
import { ChevronRight } from "@/components/ui/icons";
import type { FacultyTabData } from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 10; // 2 columns x 5 rows, matches Figma

/**
 * DESTINATION: components/faculty/FacultyExplorer.tsx
 *
 * Fully client-side interactive explorer:
 *   - Tab pills switch between pre-fetched faculty-type groups
 *   - Search filters by name / position / department (substring match)
 *   - Alphabet strip filters by first letter of name
 *   - Pagination slices the filtered result, 10 per page
 *
 * All data is passed in already fetched from WordPress (per tab, up to 100
 * members) — no network calls happen during interaction, so filtering is
 * instant regardless of dataset size for a university faculty directory.
 */
export function FacultyExplorer({ tabs }: { tabs: FacultyTabData[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.slug ?? "");
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  const activeMembers = tabs.find((t) => t.slug === activeTab)?.members ?? [];

  const filtered = useMemo(() => {
    let result = activeMembers;

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
  }, [activeMembers, search, letter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE,
  );

  function handleTabChange(slug: string) {
    setActiveTab(slug);
    setSearch("");
    setLetter("ALL");
    setPage(1);
  }

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        {/* Tabs + Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => handleTabChange(tab.slug)}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.slug
                    ? "bg-brand text-white"
                    : "bg-surface text-navy hover:bg-line"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search Faculty..."
            className="w-full border border-line px-4 py-2.5 text-sm focus:border-brand focus:outline-none sm:w-72"
          />
        </div>

        {/* Alphabet filter — every letter underlined; active = brand red, rest = ash */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-y-2 border-b border-line pb-4 text-sm">
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
              <FacultyDirectoryCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-ash">
            No faculty members found.
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