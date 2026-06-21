"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FacultyCard } from "@/components/faculty/FacultyCard";
import { Pagination } from "@/components/ui/Pagination";
import type { FacultyMember } from "@/lib/types";

/**
 * One faculty category (= one tab). Keyed by `slug` so CMS can later fetch
 * each category's faculty list independently without component changes.
 */
export interface FacultyTabData {
  /** Stable slug for routing/data lookups (e.g. "regular-faculty") */
  slug: string;
  /** Pill label shown in the tab row (e.g. "Regular Faculty") */
  label: string;
  /** Intro paragraph shown below the tabs when this tab is active */
  intro: string;
  members: FacultyMember[];
}

interface FacultyExplorerProps {
  tabs: FacultyTabData[];
  initialSlug?: string;
  pageSize?: number;
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/**
 * Faculty page core: tabs (faculty type) + intro + search + paginated grid.
 *
 * State:
 *  - activeSlug → which tab is selected
 *  - query      → search input (filters within the active tab's members)
 *  - page       → current page index, resets when tab or query changes
 *
 * Background: white throughout (one big section).
 */
export function FacultyExplorer({
  tabs,
  initialSlug,
  pageSize = 12,
}: FacultyExplorerProps) {
  const [activeSlug, setActiveSlug] = useState<string>(
    initialSlug ?? tabs[0]?.slug ?? ""
  );
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const active = tabs.find((t) => t.slug === activeSlug) ?? tabs[0];

  const filtered = useMemo(() => {
    if (!active) return [];
    const q = query.trim().toLowerCase();
    if (!q) return active.members;
    return active.members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.position.toLowerCase().includes(q)
    );
  }, [active, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const pageMembers = filtered.slice(start, start + pageSize);

  const onSwitchTab = (slug: string) => {
    setActiveSlug(slug);
    setQuery("");
    setPage(0);
  };

  const onSearch = (value: string) => {
    setQuery(value);
    setPage(0);
  };

  return (
    <section id="faculty-explorer" className="scroll-mt-[150px] bg-white py-12 lg:py-16">
      {/* Tabs — segmented control */}
      <Container>
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Faculty categories"
            className="inline-flex flex-wrap items-center gap-1 bg-[#E5E5E5] p-1"
          >
            {tabs.map((tab) => {
              const isActive = tab.slug === active?.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSwitchTab(tab.slug)}
                  className={`inline-flex h-11 items-center justify-center px-5 font-display text-sm font-semibold transition-colors sm:h-12 sm:px-7 sm:text-base ${
                    isActive
                      ? "bg-brand text-white"
                      : "bg-transparent text-navy hover:text-brand"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Active tab intro */}
      {active?.intro && (
        <Container className="mt-10 lg:mt-12">
          <p className="mx-auto max-w-5xl text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {active.intro}
          </p>
        </Container>
      )}

      {/* Search input */}
      <Container className="mt-10">
        <div className="mx-auto flex max-w-[440px] items-center border border-line bg-white px-4 py-3 transition-colors focus-within:border-navy">
          <input
            type="text"
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search Faculty..."
            aria-label="Search faculty by name or position"
            className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-ash"
          />
          <SearchIcon className="h-5 w-5 shrink-0 text-ash" />
        </div>
      </Container>

      {/* Faculty grid */}
      <Container className="mt-12 lg:mt-14">
        {pageMembers.length === 0 ? (
          <p className="py-16 text-center text-sm text-ash">
            No faculty found{query ? ` for "${query}"` : ""}.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12">
            {pageMembers.map((member) => (
              <FacultyCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </Container>

      {/* Pagination (shared component) */}
      {filtered.length > pageSize && (
        <Container className="mt-12 lg:mt-16">
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onChange={setPage}
          />
        </Container>
      )}
    </section>
  );
}