"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import type { FacultyTenureTab } from "@/lib/types";

/**
 * DESTINATION: components/work/FacultyTenureTabsSection.tsx
 *
 * CORRECTED: tab bar is now centered horizontally (wrapped in a
 * flex justify-center container) — matches the reference exactly.
 * Active tab: solid brand-red filled box. Inactive tab: plain text,
 * no background. Both sit on a light gray strip.
 */
export function FacultyTenureTabsSection({
  tabs,
}: {
  tabs: FacultyTenureTab[];
}) {
  const [active, setActive] = useState(0);

  if (tabs.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 bg-[#EDEDED] p-1">
            {tabs.map((tab, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`px-6 py-2.5 text-sm font-semibold transition-colors ${
                  active === i
                    ? "bg-brand text-white"
                    : "bg-transparent text-navy hover:text-brand"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mx-auto mt-10 max-w-4xl space-y-4 text-[15px] leading-7 text-black/80
            [&_a]:font-medium [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2
            hover:[&_a]:text-brand
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_h4]:mt-6 [&_h4]:font-display [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-navy
            lg:text-base lg:leading-8"
          dangerouslySetInnerHTML={{ __html: tabs[active].contentHtml }}
        />
      </Container>
    </section>
  );
}