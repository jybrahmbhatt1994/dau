"use client";

import type {
  AdmissionCategoryOption,
  AdmissionStreamOption,
} from "@/lib/types";

export interface AdmissionSelection {
  stream: string;
  course: string;
  category: string;
}

/**
 * Cascading Stream → Course → Category filter.
 *
 * Visual language is a direct translation of the old category tab bar
 * (grey #ECECEC chrome, 1px gutters, h-12 cells, Namdhinggo bold, brand red
 * for the "active" state): a select with a chosen value fills brand-red with
 * white text — exactly like the active tab — while unchosen selects stay
 * white and disabled ones grey out.
 *
 * Purely presentational + controlled: state, cascading resets, URL sync and
 * data fetching live in AdmissionExplorer. Native <select> elements are used
 * deliberately — free keyboard support and native pickers on iOS/Android.
 *
 * Responsive: stacked (1-col) on mobile, 3 equal columns from `sm` up —
 * mirroring the tab bar's flex-col → flex-row behaviour.
 */
export function AdmissionFilter({
  streams,
  categories,
  selection,
  onStreamChange,
  onCourseChange,
  onCategoryChange,
  placeholders,
}: {
  streams: AdmissionStreamOption[];
  categories: AdmissionCategoryOption[];
  selection: AdmissionSelection;
  onStreamChange: (slug: string) => void;
  onCourseChange: (slug: string) => void;
  onCategoryChange: (slug: string) => void;
  placeholders: { stream: string; course: string; category: string };
}) {
  const activeStream = streams.find((s) => s.slug === selection.stream);
  const courses = activeStream?.courses ?? [];
  const activeCourse = courses.find((c) => c.slug === selection.course);

  const courseDisabled = !activeStream;
  const categoryDisabled = !activeCourse || !activeCourse.hasCategories;

  return (
    <div
      role="group"
      aria-label="Admission filter"
      className="grid grid-cols-1 gap-1 bg-[#ECECEC] p-1 sm:grid-cols-3"
    >
      <FilterSelect
        label="Stream"
        placeholder={placeholders.stream}
        value={selection.stream}
        onChange={onStreamChange}
        options={streams.map((s) => ({ value: s.slug, label: s.label }))}
      />

      <FilterSelect
        label="Course"
        placeholder={placeholders.course}
        value={selection.course}
        onChange={onCourseChange}
        disabled={courseDisabled}
        options={courses.map((c) => ({ value: c.slug, label: c.label }))}
      />

      <FilterSelect
        label="Category"
        placeholder={placeholders.category}
        value={selection.category}
        onChange={onCategoryChange}
        disabled={categoryDisabled}
        options={categories.map((c) => ({ value: c.slug, label: c.label }))}
      />
    </div>
  );
}

/* ── Single styled select cell ─────────────────────────────────────────── */

function FilterSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  const filled = value !== "" && !disabled;

  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "h-12 w-full cursor-pointer appearance-none truncate pl-4 pr-10",
          "font-display text-sm font-bold sm:text-[15px]",
          "outline-none transition-colors",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold",
          filled
            ? "bg-brand text-white"
            : "bg-white text-navy hover:text-brand",
          disabled
            ? "cursor-not-allowed bg-transparent text-navy/35 hover:text-navy/35"
            : "",
        ].join(" ")}
      >
        <option value="" className="bg-white font-sans text-navy">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white font-sans text-navy"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Chevron — inherits the cell's text colour */}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className={[
          "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2",
          filled ? "text-white" : disabled ? "text-navy/35" : "text-navy",
        ].join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 6l4.5 4.5L12.5 6" />
      </svg>
    </div>
  );
}
