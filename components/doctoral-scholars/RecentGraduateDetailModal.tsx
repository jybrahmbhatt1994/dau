"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/ui/icons";
import type { RecentGraduateCardData } from "@/lib/types";

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="font-display text-base font-bold text-navy">{label}</p>
      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-black/80">
        {value || "---"}
      </p>
    </div>
  );
}

/**
 * Opened from "Know More" on a RecentGraduateCard. Scrolls internally
 * (max-h + overflow-y-auto) so a scholar with a lot of content never pushes
 * the close button off-screen or grows past the viewport.
 */
export function RecentGraduateDetailModal({
  scholar,
  onClose,
}: {
  scholar: RecentGraduateCardData;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={scholar.name}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto bg-surface p-8 sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-ash transition-colors hover:text-brand"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="relative inline-block max-w-full">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {scholar.name}
          </h2>
          <span aria-hidden className="absolute left-0 top-full h-[3px] w-full bg-gold" />
        </div>

        <div className="mt-8 space-y-6">
          <Field label="Thesis Topic:" value={scholar.thesisTopic} />
          <Field label="Post PhD employment:" value={scholar.postPhdEmployment} />
          <Field label="Journals/Conferences/books/book chapters:" value={scholar.journalsContent} />
          <Field label="Awards/honors/research visits:" value={scholar.awardsContent} />
          <Field label="Personal webpage:" value={scholar.personalWebpage} />
        </div>
      </div>
    </div>
  );
}
