"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { YearAccordionGroup } from "@/components/doctoral-scholars/YearAccordionGroup";
import { DoctoralScholarCard } from "@/components/doctoral-scholars/DoctoralScholarCard";
import { RecentGraduateCard } from "@/components/doctoral-scholars/RecentGraduateCard";
import type {
  DoctoralScholarCardData,
  RecentGraduateCardData,
} from "@/lib/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type TabSlug = "doctoral-scholars" | "recent-graduates";

/**
 * DESTINATION: components/doctoral-scholars/DoctoralScholarsExplorer.tsx
 *
 * Handles both tabs explicitly since their card shapes differ:
 *   - "doctoral-scholars": compact cards, grouped by Year of Joining,
 *     2-column grid inside each accordion.
 *   - "recent-graduates": full-width rich cards, grouped by Year of
 *     Graduation, single-column stack inside each accordion.
 */
export function DoctoralScholarsExplorer({
  doctoralScholars,
  recentGraduates,
}: {
  doctoralScholars: { label: string; members: DoctoralScholarCardData[] };
  recentGraduates: { label: string; members: RecentGraduateCardData[] };
}) {
  const [activeTab, setActiveTab] = useState<TabSlug>("doctoral-scholars");
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("ALL");

  const activeLabel =
    activeTab === "doctoral-scholars"
      ? doctoralScholars.label
      : recentGraduates.label;

  // ─── Doctoral Scholars: filter + group by Year of Joining ──────────────
  const filteredScholars = useMemo(() => {
    let result = doctoralScholars.members;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.advisor ?? "").toLowerCase().includes(q),
      );
    }
    if (letter !== "ALL") {
      result = result.filter((m) => m.name.trim().toUpperCase().startsWith(letter));
    }
    return result;
  }, [doctoralScholars.members, search, letter]);

  const scholarGroups = useMemo(() => {
    const map = new Map<number, DoctoralScholarCardData[]>();
    for (const m of filteredScholars) {
      const list = map.get(m.yearOfJoiningYear) ?? [];
      list.push(m);
      map.set(m.yearOfJoiningYear, list);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredScholars]);

  // ─── Recent Graduates: filter + group by Year of Graduation ────────────
  const filteredGraduates = useMemo(() => {
    let result = recentGraduates.members;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          (m.advisor ?? "").toLowerCase().includes(q),
      );
    }
    if (letter !== "ALL") {
      result = result.filter((m) => m.name.trim().toUpperCase().startsWith(letter));
    }
    return result;
  }, [recentGraduates.members, search, letter]);

  const graduateGroups = useMemo(() => {
    const map = new Map<number, RecentGraduateCardData[]>();
    for (const m of filteredGraduates) {
      const list = map.get(m.yearOfGraduationYear) ?? [];
      list.push(m);
      map.set(m.yearOfGraduationYear, list);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredGraduates]);

  function handleTabChange(slug: TabSlug) {
    setActiveTab(slug);
    setSearch("");
    setLetter("ALL");
  }

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        {/* Tabs + Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleTabChange("doctoral-scholars")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "doctoral-scholars"
                  ? "bg-brand text-white"
                  : "bg-surface text-navy hover:bg-line"
              }`}
            >
              {doctoralScholars.label}
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("recent-graduates")}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === "recent-graduates"
                  ? "bg-brand text-white"
                  : "bg-surface text-navy hover:bg-line"
              }`}
            >
              {recentGraduates.label}
            </button>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeLabel}...`}
            className="w-full border border-line px-4 py-2.5 text-sm focus:border-brand focus:outline-none sm:w-72"
          />
        </div>

        {/* Alphabet filter */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-y-2 border-b border-line pb-4 text-sm">
          <button
            type="button"
            onClick={() => setLetter("ALL")}
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
              onClick={() => setLetter(l)}
              className={`underline underline-offset-2 ${
                letter === l ? "text-brand font-semibold" : "text-ash hover:text-navy"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Doctoral Scholars — compact cards, 2-col grid per year */}
        {activeTab === "doctoral-scholars" &&
          (scholarGroups.length > 0 ? (
            <div className="mt-10 space-y-6">
              {scholarGroups.map(([year, members]) => (
                <YearAccordionGroup key={year} year={year}>
                  <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                    {members.map((scholar) => (
                      <DoctoralScholarCard key={scholar.id} scholar={scholar} />
                    ))}
                  </div>
                </YearAccordionGroup>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-ash">No results found.</p>
          ))}

        {/* Recent Graduates — full-width rich cards, single column per year */}
        {activeTab === "recent-graduates" &&
          (graduateGroups.length > 0 ? (
            <div className="mt-10 space-y-6">
              {graduateGroups.map(([year, members]) => (
                <YearAccordionGroup key={year} year={year}>
                  <div className="flex flex-col">
                    {members.map((grad) => (
                      <RecentGraduateCard key={grad.id} scholar={grad} />
                    ))}
                  </div>
                </YearAccordionGroup>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-ash">No results found.</p>
          ))}
      </Container>
    </section>
  );
}