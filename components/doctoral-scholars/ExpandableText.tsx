"use client";

import { useState } from "react";

/**
 * DESTINATION: components/doctoral-scholars/ExpandableText.tsx
 *
 * Truncates text to N characters with a "...View More..." link that
 * expands to show the full text inline (no separate detail page exists,
 * so this is an inline toggle, not a navigation link).
 */
export function ExpandableText({
  text,
  limit = 120,
}: {
  text: string;
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!text || text === "---") {
    return <p className="text-sm text-black/70">---</p>;
  }

  const needsTruncation = text.length > limit;
  const displayText =
    expanded || !needsTruncation ? text : text.slice(0, limit).trim();

  return (
    <p className="text-sm leading-relaxed text-black/70">
      {displayText}
      {needsTruncation && !expanded && "… "}
      {needsTruncation && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 font-medium text-royal underline underline-offset-2 hover:text-brand"
        >
          {expanded ? "View Less" : "View More…"}
        </button>
      )}
    </p>
  );
}