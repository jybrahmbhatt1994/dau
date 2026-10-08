"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ActionButton } from "@/components/ui/ActionButton";
import { CloseIcon } from "@/components/ui/icons";
import type { GrievanceAccordionItem } from "@/lib/types";

const PROSE_CLASSES =
  `max-w-none space-y-4 text-[15px] leading-7 text-black/80
   [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-navy
   [&_h4]:mt-6 [&_h4]:font-display [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-navy
   [&_strong]:font-semibold [&_strong]:text-navy
   [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-ash
   [&_ol]:mt-2 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:marker:text-ash
   [&_a]:font-medium [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2
   hover:[&_a]:text-brand
   lg:text-base lg:leading-8`;

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * Same interaction pattern as SupportAccordion (one item open at a time,
 * floating × toggle in the top-right of the open card) but the body is rich
 * WYSIWYG HTML rather than fixed paragraph/image/button props, since each of
 * the 5 sections here has its own freeform mix of sub-headings and bullet
 * lists. Two sections also carry optional structured extras — a committee
 * card grid and a row of gold buttons — rendered after the HTML body.
 */
export function GrievanceAccordion({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: GrievanceAccordionItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={title} />
        {intro && (
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {intro}
          </p>
        )}

        <div className="mt-10 space-y-6">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className="relative border border-line bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                >
                  <h3 className="font-display text-lg font-bold text-navy sm:text-xl">
                    {item.title}
                  </h3>
                  {!open && <PlusIcon className="h-6 w-6 shrink-0 text-brand" />}
                </button>

                {open && (
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    aria-label="Collapse"
                    className="absolute -top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-line sm:-right-4"
                  >
                    <CloseIcon className="h-5 w-5 text-brand" />
                  </button>
                )}

                {open && (
                  <div className="px-6 pb-8 sm:px-8">
                    <div
                      className={PROSE_CLASSES}
                      dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
                    />

                    {item.committeeMembers.length > 0 && (
                      <div className="mt-8">
                        <h4 className="font-display text-base font-bold text-navy">
                          Grievance Redressal Handling Committee (GRHC) of the Institute
                        </h4>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {item.committeeMembers.map((m, i) => (
                            <div key={i} className="bg-surface px-4 py-4">
                              <p className="font-display text-sm font-bold text-navy">{m.name}</p>
                              <p className="mt-1 text-xs text-black/60">{m.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.bodyHtmlAfterCommittee && (
                      <div
                        className={`mt-6 ${PROSE_CLASSES}`}
                        dangerouslySetInnerHTML={{ __html: item.bodyHtmlAfterCommittee }}
                      />
                    )}

                    {item.buttons.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-4">
                        {item.buttons.map((b, i) => (
                          <ActionButton key={i} href={b.href} variant="filledGold" fixedWidth={false}>
                            {b.label}
                          </ActionButton>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
