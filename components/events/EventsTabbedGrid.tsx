"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { PaginatedCardGrid } from "@/components/news/PaginatedCardGrid";
import type { NewsArticle } from "@/lib/types";

type TabKey = "upcoming" | "past";

/**
 * Two-tab wrapper around PaginatedCardGrid for taxonomy-split listing pages
 * (Upcoming / Past). Used by both the Events listing page (event-type
 * taxonomy) and the Fest listing page (fest-type taxonomy) — labels and the
 * empty-state noun are parameterized so the same component serves both
 * without duplicating the tab UI. Kept as its own component (rather than
 * modifying PaginatedCardGrid further) so News/Alumni Write Ups/Student
 * Stories are unaffected.
 *
 * `key={activeTab}` on PaginatedCardGrid resets its internal page state when
 * switching tabs, so you never land on e.g. "page 3" of a 1-page tab.
 */
export function EventsTabbedGrid({
  tabs,
  className = "bg-surface",
  upcomingLabel = "Upcoming Events",
  pastLabel = "Past Events",
  itemNounSingular = "event",
}: {
  tabs: { upcoming: NewsArticle[]; past: NewsArticle[] };
  className?: string;
  /** Tab button text, e.g. "Upcoming Fest" / "Past Fest" for the Fest page. */
  upcomingLabel?: string;
  pastLabel?: string;
  /** Used only in the empty-state copy: "No upcoming {noun} right now." */
  itemNounSingular?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const tabConfig: { key: TabKey; label: string; items: NewsArticle[] }[] = [
    { key: "upcoming", label: upcomingLabel, items: tabs.upcoming },
    { key: "past", label: pastLabel, items: tabs.past },
  ];

  const activeItems = tabs[activeTab];

  return (
    <div className={className}>
      <Container>
        <div className="flex gap-8 border-b border-line pt-12 lg:pt-16">
          {tabConfig.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-selected={isActive}
                className={`relative pb-4 font-display text-base font-bold uppercase tracking-wide transition-colors sm:text-lg ${
                  isActive
                    ? "text-navy"
                    : "text-ash hover:text-navy"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-sm font-semibold text-ash">
                  ({tab.items.length})
                </span>
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-[3px] bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </Container>

      {activeItems.length === 0 ? (
        <Container>
          <p className="py-16 text-center text-ash">
            No {activeTab === "upcoming" ? "upcoming" : "past"}{" "}
            {itemNounSingular} right now.
          </p>
        </Container>
      ) : (
        <PaginatedCardGrid
          key={activeTab}
          items={activeItems}
          className={className}
          showReadMore
        />
      )}
    </div>
  );
}