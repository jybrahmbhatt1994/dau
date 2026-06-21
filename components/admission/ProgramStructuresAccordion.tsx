"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ArrowDown } from "@/components/ui/icons";

export interface ProgramStructureItem {
  id: string;
  /** Accordion title (e.g. "B.Tech Information and Communication Technology (ICT)") */
  title: string;
  /** Body paragraph shown when item is expanded */
  description: string;
  /** Image displayed alongside the description */
  image: string;
  /** Optional brochure download URL */
  brochureHref?: string;
  /** Optional brochure button label (default: "Download Brochure") */
  brochureLabel?: string;
}

function ToggleIcon({ open }: { open: boolean }) {
  // Closed: thin "+" in brand red. Open: thin "×" (close) in muted ash.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      aria-hidden
      className={`h-5 w-5 shrink-0 ${open ? "text-ash" : "text-brand"}`}
    >
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M12 5v14M5 12h14" />}
    </svg>
  );
}

/**
 * "Program Structures" accordion section.
 *
 * - First item opens by default
 * - Click any item header to toggle (one-at-a-time)
 * - Expanded item shows: paragraph + image (right) + Download Brochure gold button
 * - Closed items show just the title row with + icon
 *
 * Background: white, py-16 lg:py-20.
 */
export function ProgramStructuresAccordion({
  data,
}: {
  data: {
    title: string;
    items: ProgramStructureItem[];
  };
}) {
  const [openId, setOpenId] = useState<string | null>(data.items[0]?.id ?? null);

  return (
    <section
      id="program-structures"
      className="scroll-mt-[150px] bg-white py-16 lg:py-20"
    >
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 space-y-4">
          {data.items.map((item) => {
            const open = item.id === openId;
            return (
              <div key={item.id} className="border border-line bg-white">
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left lg:px-7"
                >
                  <span className="font-display text-base font-bold text-navy sm:text-lg">
                    {item.title}
                  </span>
                  <ToggleIcon open={open} />
                </button>

                {/* Expanded panel */}
                {open && (
                  <div className="px-5 pb-6 lg:px-7 lg:pb-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px] lg:gap-10">
                      <div>
                        <p className="text-[14px] leading-7 text-black/75 lg:text-[15px] lg:leading-7">
                          {item.description}
                        </p>
                        {item.brochureHref && (
                          <Link
                            href={item.brochureHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-6 inline-flex h-11 items-center justify-between gap-4 border border-gold bg-gold px-5 font-display text-sm font-bold uppercase tracking-wide text-navy transition-colors hover:bg-gold/90"
                          >
                            <span>{item.brochureLabel ?? "Download Brochure"}</span>
                            <ArrowDown className="h-4 w-5 transition-transform group-hover:translate-y-1" />
                          </Link>
                        )}
                      </div>

                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 280px, 100vw"
                          className="object-cover"
                        />
                      </div>
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