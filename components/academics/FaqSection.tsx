"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import type { FaqItem } from "@/lib/types";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      className="h-5 w-5 shrink-0 text-brand"
    >
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M12 5v14M5 12h14" />}
    </svg>
  );
}

export function FaqSection({
  data,
}: {
  data: { title: string; items: FaqItem[] };
}) {
  const [openId, setOpenId] = useState<string | null>(data.items[0]?.id ?? null);

  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <h2 className="text-center font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-navy">
          {data.title}
        </h2>

        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {data.items.map((faq) => {
            const open = faq.id === openId;
            return (
              <div key={faq.id} className="bg-white shadow-card">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-bold text-navy sm:text-lg">
                    {faq.question}
                  </span>
                  <ToggleIcon open={open} />
                </button>
                {open && faq.answer && (
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ash">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}