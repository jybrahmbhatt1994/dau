"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface EligibilityTab {
  /** Stable key (e.g. "assistant", "associate") */
  slug: string;
  /** Pill label shown in the segmented control */
  label: string;
  /** Body content shown when this tab is active (paragraphs of prose) */
  paragraphs: string[];
}

interface EligibilityCriteriaData {
  title: string;
  tabs: EligibilityTab[];
}

/**
 * "Eligibility Criteria" section.
 *
 * - BleedTitle on a surface (#F7F7F8) band
 * - Centered segmented control: active pill = white bg + navy text + soft
 *   shadow, inactive = transparent + navy text on the grey container
 * - Active tab's paragraphs render below the tabs (centered max-w block)
 *
 * Switching tabs swaps the paragraph content; pure client-side toggle.
 *
 * Background: surface, py-16 lg:py-20.
 */
export function EligibilityCriteria({
  data,
}: {
  data: EligibilityCriteriaData;
}) {
  const [activeSlug, setActiveSlug] = useState(data.tabs[0]?.slug ?? "");
  const active = data.tabs.find((t) => t.slug === activeSlug) ?? data.tabs[0];

  return (
    <section id="eligibility" className="scroll-mt-[150px] bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        {/* Centered tabs */}
        <div className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Eligibility category"
            className="inline-flex items-center gap-1 bg-[#E5E5E5] p-1"
          >
            {data.tabs.map((tab) => {
              const isActive = tab.slug === active?.slug;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSlug(tab.slug)}
                  className={`inline-flex h-11 items-center justify-center px-7 font-display text-sm font-semibold transition-all sm:h-12 sm:px-9 sm:text-base ${
                    isActive
                      ? "bg-white text-navy shadow-sm"
                      : "bg-transparent text-navy hover:text-brand"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active tab body — centered prose */}
        {active && (
          <div className="mx-auto mt-10 max-w-5xl space-y-5 text-[15px] leading-7 text-black/80 lg:mt-12 lg:text-base lg:leading-8">
            {active.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}