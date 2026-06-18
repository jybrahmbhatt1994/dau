"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import { CloseIcon } from "@/components/ui/icons";
import type { SupportAccordionItem } from "@/lib/types";

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
 * Rich accordion used for the Anti-Ragging block. Each item is a white card on
 * a surface band. Collapsed shows the title + a brand "+" toggle; expanded
 * reveals prose (with an optional inline link) + an image, a "Know More" button,
 * and a floating × toggle in the top-right corner. One item open at a time.
 */
export function SupportAccordion({
  items,
  id = "anti-ragging",
  className = "bg-surface",
}: {
  items: SupportAccordionItem[];
  id?: string;
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id={id} className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="space-y-4">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className="relative border border-line bg-white shadow-card"
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                >
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-navy sm:text-xl">
                    {item.title}
                  </h3>
                  {!open && (
                    <PlusIcon className="h-6 w-6 shrink-0 text-brand" />
                  )}
                </button>

                {/* Floating close toggle (open state) */}
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

                {/* Body */}
                {open && (
                  <div className="px-6 pb-8 sm:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
                      <div>
                        <div className="space-y-4 text-sm leading-7 text-black/75 lg:text-[15px]">
                          {item.paragraphs?.map((p, i) => {
                            const isLast =
                              i === (item.paragraphs?.length ?? 0) - 1;
                            return (
                              <p key={i}>
                                {p}
                                {isLast && item.link && (
                                  <>
                                    {" "}
                                    <a
                                      href={item.link.href}
                                      className="underline transition-colors hover:text-brand"
                                    >
                                      {item.link.label}
                                    </a>
                                    .
                                  </>
                                )}
                              </p>
                            );
                          })}
                        </div>

                        {item.button && (
                          <div className="mt-8">
                            <ActionButton
                              href={item.button.href}
                              variant="filledGold"
                            >
                              {item.button.label}
                            </ActionButton>
                          </div>
                        )}
                      </div>

                      {item.image && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-line lg:order-last">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1024px) 400px, 100vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
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