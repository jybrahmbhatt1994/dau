"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { SemesterItem } from "@/lib/types";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      className="h-5 w-5 text-brand"
    >
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path d="M12 5v14M5 12h14" />
      )}
    </svg>
  );
}

function CourseCard({ name, ltpc }: { name: string; ltpc: string }) {
  return (
    <div className="border border-line bg-surface p-4">
      <h4 className="font-display text-base font-bold text-navy">{name}</h4>
      <p className="mt-2 text-sm text-ash">L-T-P-C</p>
      <p className="text-sm text-ash">{ltpc}</p>
    </div>
  );
}

export function SemesterBreakdown({
  data,
}: {
  data: { title: string; description: string; items: SemesterItem[] };
}) {
  const [openId, setOpenId] = useState<string | null>(
    data.items[0]?.id ?? null,
  );

  return (
    <section id="semesters" className="scroll-mt-24 bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />
        {data.description && (
          <p className="mt-8 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
            {data.description}
          </p>
        )}

        <div className="mt-10 space-y-4">
          {data.items.map((sem) => {
            const open = sem.id === openId;
            return (
              <div
                key={sem.id}
                className="border border-line bg-white shadow-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : sem.id)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold text-navy sm:text-xl">
                    {sem.title}
                  </span>
                  <ToggleIcon open={open} />
                </button>

                {open && (
                  <div className="px-6 pb-6">
                    {sem.description && (
                      <p className="text-sm leading-relaxed text-ash">
                        {sem.description}
                      </p>
                    )}
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {sem.courses.map((c, i) => (
                        <CourseCard key={i} name={c.name} ltpc={c.ltpc} />
                      ))}
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