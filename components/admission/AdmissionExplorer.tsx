"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  AdmissionFilter,
  type AdmissionSelection,
} from "@/components/admission/AdmissionFilter";
import type { AdmissionDataset, AdmissionFilterConfig } from "@/lib/types";

/**
 * /admission core: Stream → Course → Category cascading filter + resolved
 * content stack (same section components as the old UgAdmissionsExplorer).
 *
 * Behaviour (per spec):
 *  - Nothing is shown until the selection is complete — an empty-state
 *    prompt renders instead.
 *  - A selection is complete when a course is chosen AND, for courses with
 *    `hasCategories` (the B.Tech courses), a category is also chosen.
 *  - Changing Stream resets Course + Category; changing Course resets
 *    Category. Category stays disabled for courses without categories.
 *
 * Data flow (WordPress-ready):
 *  - Datasets are fetched from /api/admission (→ lib/wordpress accessor),
 *    never directly from WP, and memoised per (course, category) key.
 *  - `initialSelection` / `initialDataset` come from the server page so
 *    deep-links (?stream=…&course=…&category=…) render with content in the
 *    initial HTML (SEO + no flash).
 *  - Every selection change is mirrored to the URL via router.replace so
 *    filter states are shareable/bookmarkable.
 */

type Status = "idle" | "loading" | "ready" | "error";

const keyOf = (course: string, category: string) => `${course}|${category}`;

export function AdmissionExplorer({
  filter,
  initialSelection,
  initialDataset,
}: {
  filter: AdmissionFilterConfig;
  initialSelection?: Partial<AdmissionSelection>;
  initialDataset?: AdmissionDataset | null;
}) {
  const router = useRouter();

  /* ── Sanitise the initial (URL-provided) selection against the config ── */
  const sanitised = useMemo<AdmissionSelection>(() => {
    const courseSlug = initialSelection?.course ?? "";
    const stream =
      filter.streams.find((s) =>
        courseSlug
          ? s.courses.some((c) => c.slug === courseSlug)
          : s.slug === initialSelection?.stream
      ) ??
      filter.streams.find((s) => s.slug === initialSelection?.stream);

    const course = stream?.courses.find((c) => c.slug === courseSlug);
    const category =
      course?.hasCategories &&
      filter.categories.some((c) => c.slug === initialSelection?.category)
        ? initialSelection?.category ?? ""
        : "";

    return {
      stream: stream?.slug ?? "",
      course: course?.slug ?? "",
      category,
    };
  }, [filter, initialSelection]);

  const [selection, setSelection] = useState<AdmissionSelection>(sanitised);
  const [dataset, setDataset] = useState<AdmissionDataset | null>(
    initialDataset ?? null
  );
  const [status, setStatus] = useState<Status>(
    initialDataset ? "ready" : "idle"
  );
  /** Bumped by the error-state Retry button to re-run the fetch effect. */
  const [retryTick, setRetryTick] = useState(0);

  /* ── Cascade helpers ──────────────────────────────────────────────────── */
  const activeStream = filter.streams.find((s) => s.slug === selection.stream);
  const activeCourse = activeStream?.courses.find(
    (c) => c.slug === selection.course
  );
  const isComplete =
    !!activeCourse && (!activeCourse.hasCategories || !!selection.category);

  /* ── Dataset cache + fetch (latest-request-wins) ──────────────────────── */
  const cache = useRef(new Map<string, AdmissionDataset>());
  const requestId = useRef(0);

  useEffect(() => {
    if (initialDataset && sanitised.course) {
      cache.current.set(
        keyOf(sanitised.course, sanitised.category),
        initialDataset
      );
    }
    // Seed once from the server-rendered payload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isComplete || !activeCourse) {
      setDataset(null);
      setStatus("idle");
      return;
    }

    const key = keyOf(activeCourse.slug, selection.category);
    const cached = cache.current.get(key);
    if (cached) {
      setDataset(cached);
      setStatus("ready");
      return;
    }

    const id = ++requestId.current;
    setStatus("loading");

    const params = new URLSearchParams({ course: activeCourse.slug });
    if (selection.category) params.set("category", selection.category);

    fetch(`/api/admission?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json() as Promise<AdmissionDataset>;
      })
      .then((data) => {
        cache.current.set(key, data);
        if (requestId.current !== id) return; // stale response — ignore
        setDataset(data);
        setStatus("ready");
      })
      .catch(() => {
        if (requestId.current !== id) return;
        setDataset(null);
        setStatus("error");
      });
  }, [isComplete, activeCourse, selection.category, retryTick]);

  /* ── URL sync (shareable filter states) ───────────────────────────────── */
  useEffect(() => {
    const params = new URLSearchParams();
    if (selection.stream) params.set("stream", selection.stream);
    if (selection.course) params.set("course", selection.course);
    if (selection.category) params.set("category", selection.category);
    const qs = params.toString();
    router.replace(`/admission${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [selection, router]);

  /* ── Cascading change handlers ────────────────────────────────────────── */
  const handleStream = (stream: string) =>
    setSelection({ stream, course: "", category: "" });

  const handleCourse = (courseSlug: string) => {
    setSelection((prev) => ({ ...prev, course: courseSlug, category: "" }));
  };

  const handleCategory = (category: string) =>
    setSelection((prev) => ({ ...prev, category }));

  return (
    <>
      {/* Filter (replaces the old category tab bar) */}
      <section className="bg-white pt-8 lg:pt-10">
        <Container>
          <div className="mx-auto max-w-4xl">
            <AdmissionFilter
              streams={filter.streams}
              categories={filter.categories}
              selection={selection}
              onStreamChange={handleStream}
              onCourseChange={handleCourse}
              onCategoryChange={handleCategory}
              placeholders={filter.placeholders}
            />
          </div>
        </Container>
      </section>

      {/* Resolved content / empty / loading / error states */}
      {status === "ready" && dataset ? (
        <>
          <ProseIntro paragraphs={dataset.intro} className="bg-white" />
          <ImportantDates data={dataset.importantDates} />
          <IntakeGrid data={dataset.intake} />
          <ProgramStructuresAccordion data={dataset.programStructures} />
          <AdmissionPlacementStats data={dataset.placementStats} />
          <EligibilityCriteria data={dataset.eligibility} />
          <SelectionCriteria data={dataset.selectionCriteria} />
          <FeeStructure data={dataset.feeStructure} />
          <ScholarshipsSection data={dataset.scholarships} />
          <HowToApplySection data={dataset.howToApply} />
          <FaqSection data={dataset.faqs} />
        </>
      ) : (
        <section className="bg-white py-14 lg:py-16">
          <Container>
            <div className="mx-auto max-w-4xl">
              {status === "loading" && <LoadingSkeleton />}

              {status === "idle" && (
                <div className="border border-dashed border-line px-6 py-14 text-center sm:px-10">
                  <p className="font-display text-lg font-semibold text-navy sm:text-xl">
                    Find your program
                  </p>
                  <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-ash sm:text-base">
                    {filter.emptyPrompt}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="border border-dashed border-line px-6 py-14 text-center sm:px-10"
                >
                  <p className="font-display text-lg font-semibold text-navy sm:text-xl">
                    Something went wrong
                  </p>
                  <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-ash sm:text-base">
                    We couldn&apos;t load the admission details for this
                    selection. Please try again.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRetryTick((t) => t + 1)}
                    className="mt-6 inline-flex h-11 items-center justify-center bg-brand px-8 font-display text-sm font-bold text-white transition-colors hover:bg-brand-alt"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

/* ── Content-shaped loading skeleton ─────────────────────────────────────── */

function LoadingSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-4">
      <div className="h-4 w-2/3 bg-[#ECECEC]" />
      <div className="h-4 w-full bg-[#ECECEC]" />
      <div className="h-4 w-11/12 bg-[#ECECEC]" />
      <div className="h-4 w-5/6 bg-[#ECECEC]" />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-28 bg-[#ECECEC]" />
        <div className="h-28 bg-[#ECECEC]" />
        <div className="h-28 bg-[#ECECEC]" />
        <div className="h-28 bg-[#ECECEC]" />
      </div>
    </div>
  );
}
