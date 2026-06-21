"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowRight } from "@/components/ui/icons";

export interface GrantCard {
  id: string;
  name: string;
  description: string;
  applyLabel: string;
  applyHref: string;
  /** Optional detail-page href; when set the whole card header becomes a link. */
  detailHref?: string;
}

export interface GrantsTabList {
  /** Pill label (e.g. "Available Grants") */
  tabLabel: string;
  /** Big BleedTitle shown above the cards on the left column */
  sectionTitle: string;
  description: string;
  cards: GrantCard[];
}

interface GrantsTabsProps {
  /** Two tab panels per Figma: Available Grants + Past Grants */
  tabs: [GrantsTabList, GrantsTabList];
}

/**
 * Single grant card.
 * - White bg with border-line
 * - Title row: name (Namdhinggo bold navy) + decorative arrow top-right
 * - Description paragraph beneath
 * - Gold "APPLY" button bottom (140px wide)
 *
 * If detailHref is provided, the title row links there; otherwise it is static
 * and only the APPLY button navigates.
 */
function GrantCardItem({ card }: { card: GrantCard }) {
  return (
    <div className="border border-line bg-white p-6 transition-shadow hover:shadow-card lg:p-8">
      {card.detailHref ? (
        <Link href={card.detailHref} className="group block">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-bold text-navy transition-colors group-hover:text-brand">
              {card.name}
            </h3>
            <ArrowRight className="mt-1.5 h-5 w-6 shrink-0 text-navy/60 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-navy">
            {card.name}
          </h3>
          <ArrowRight className="mt-1.5 h-5 w-6 shrink-0 text-navy/60" />
        </div>
      )}

      <p className="mt-4 text-[14px] leading-7 text-black/75 lg:text-[15px] lg:leading-7">
        {card.description}
      </p>

      <Link
        href={card.applyHref}
        className="group mt-6 inline-flex h-11 w-[140px] items-center justify-between border border-gold bg-gold px-5 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
      >
        <span>{card.applyLabel}</span>
        <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

/**
 * "Grants" — centered pill tabs + sticky-left heading + vertical card list.
 *
 * Two sections back-to-back (no double padding) on white:
 *  1. Tab pills row — centered "Available Grants" (active = brand red) and
 *     "Past Grants" (inactive = navy outline)
 *  2. Sticky-left layout: BleedTitle + description on the left (sticky on lg),
 *     grant cards stacked on the right
 *
 * Switching tabs swaps both the section heading and the card list.
 */
export function GrantsTabs({ tabs }: GrantsTabsProps) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <>
      {/* Tabs — segmented control: grey container holding two pills */}
      <section className="bg-white pt-6 lg:pt-8">
        <Container>
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label="Grants categories"
              className="inline-flex items-center gap-1 bg-[#ECECEC] p-1"
            >
              {tabs.map((tab, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={tab.tabLabel}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`inline-flex h-11 items-center justify-center px-8 font-display text-sm font-semibold transition-colors sm:h-12 sm:px-10 sm:text-base ${
                      isActive
                        ? "bg-brand text-white"
                        : "bg-transparent text-navy hover:text-brand"
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Active tab content */}
      <section
        id="grants"
        className="scroll-mt-[150px] bg-white pb-16 pt-12 lg:pb-20 lg:pt-16"
      >
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Sticky-left heading + description */}
            <div className="lg:sticky lg:top-[160px] lg:self-start">
              <BleedTitle title={current.sectionTitle} />
              {current.description && (
                <p className="mt-8 max-w-md text-base font-medium leading-relaxed text-ash">
                  {current.description}
                </p>
              )}
            </div>

            {/* Cards column */}
            <div className="flex flex-col gap-6">
              {current.cards.map((card) => (
                <GrantCardItem key={card.id} card={card} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}