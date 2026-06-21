"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ImportantDates } from "@/components/admission/ImportantDates";
import { IntakeGrid } from "@/components/admission/IntakeGrid";
import { ProgramStructuresAccordion } from "@/components/admission/ProgramStructuresAccordion";
import { AdmissionPlacementStats } from "@/components/admission/AdmissionPlacementStats";
import { EligibilityCriteria } from "@/components/faculty/EligibilityCriteria";
import { SelectionCriteria } from "@/components/admission/SelectionCriteria";
import { FeeStructure } from "@/components/admission/FeeStructure";
import { ScholarshipsSection } from "@/components/admission/ScholarshipsSection";
import { HowToApplySection } from "@/components/admission/HowToApplySection";
import { FaqSection } from "@/components/academics/FaqSection";
import type { UgAdmissionCategory } from "@/lib/types";

/**
 * "Undergraduate Admissions" core: category tabs + per-category content swap.
 *
 * State:
 *  - activeSlug → which category tab is active
 * Switching tabs swaps the entire content block below the tabs (Important
 * Dates, Intake, Program Structures, Placement Stats, Eligibility, Selection,
 * Fees, Scholarships, How to Apply, FAQs).
 *
 * The data shape is keyed by category slug so CMS can fetch each category
 * independently — useful when content per category gets large or moves to
 * separate WP posts.
 *
 * Background: white wrapper; individual sections set their own backgrounds.
 */
export function UgAdmissionsExplorer({
  categories,
  initialSlug,
}: {
  categories: UgAdmissionCategory[];
  initialSlug?: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(
    initialSlug ?? categories[0]?.slug ?? ""
  );

  const active = categories.find((c) => c.slug === activeSlug) ?? categories[0];

  if (!active) return null;

  return (
    <>
      {/* Tabs */}
      <section className="bg-white pt-8 lg:pt-10">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div
              role="tablist"
              aria-label="Admission category"
              className="flex flex-col gap-1 bg-[#ECECEC] p-1 sm:flex-row"
            >
              {categories.map((cat) => {
                const isActive = cat.slug === active.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveSlug(cat.slug)}
                    className={`inline-flex h-12 flex-1 items-center justify-center px-4 text-center font-display text-sm font-bold transition-colors sm:text-[15px] ${
                      isActive
                        ? "bg-brand text-white"
                        : "bg-transparent text-navy hover:text-brand"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Active category content */}
      <ProseIntro paragraphs={active.intro} className="bg-white" />
      <ImportantDates data={active.importantDates} />
      <IntakeGrid data={active.intake} />
      <ProgramStructuresAccordion data={active.programStructures} />
      <AdmissionPlacementStats data={active.placementStats} />
      <EligibilityCriteria data={active.eligibility} />
      <SelectionCriteria data={active.selectionCriteria} />
      <FeeStructure data={active.feeStructure} />
      <ScholarshipsSection data={active.scholarships} />
      <HowToApplySection data={active.howToApply} />
      <FaqSection data={active.faqs} />
    </>
  );
}