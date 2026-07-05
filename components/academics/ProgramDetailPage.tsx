import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ProgramContentBlock } from "@/components/academics/ProgramContentBlock";
import { OutcomesSection } from "@/components/academics/OutcomesSection";
import { SemesterBreakdown } from "@/components/academics/SemesterBreakdown";
import { ElectivesTable } from "@/components/academics/ElectivesTable";
import { FaqSection } from "@/components/academics/FaqSection";
import { ContactPills } from "@/components/academics/ContactPills";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { SplitCta } from "@/components/academics/SplitCta";
import type { ProgramPageData } from "@/lib/types";

/**
 * DESTINATION: components/academics/ProgramDetailPage.tsx
 *
 * Shared template for every individual course/program detail page
 * (B.Tech ICT, B.Tech MnC, PhD in CS, M.Tech ..., etc). Every course uses
 * the exact same layout — only content differs — so this single component
 * is rendered by one dynamic [slug] route for the entire `course` CPT.
 *
 * 100% composition of existing components — no new UI here.
 * Backgrounds alternate white/surface between the two ProgramContentBlock
 * pairs to match the original B.Tech ICT design rhythm.
 */
export function ProgramDetailPage({ data }: { data: ProgramPageData }) {
  return (
    <>
      {/* ── Inner-page hero ──────────────────────────────────────────────── */}
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      {/* ── Lavender sticky sub-nav ───────────────────────────────────────── */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      {/* ── Cream "Apply Now" banner ──────────────────────────────────────── */}
      <AdmissionsBanner
        text={data.applyBanner.text}
        cta={data.applyBanner.cta}
        href={data.applyBanner.href}
      />

      {/* ── Full-width prose intro ────────────────────────────────────────── */}
      <ProseIntro paragraphs={data.intro} />

      {/* ── Honours / Honours Minor (only rendered when title present) ───── */}
      {data.honours?.title && (
        <ProgramContentBlock block={data.honours} className="bg-white" />
      )}
      {data.honoursMinor?.title && (
        <ProgramContentBlock block={data.honoursMinor} className="bg-surface" />
      )}

      {/* ── Program Outcomes + Programme Specific Outcomes ───────────────── */}
      <OutcomesSection data={data.outcomes} />

      {/* ── Core Courses / Elective Courses ──────────────────────────────── */}
      {data.coreCourses?.title && (
        <ProgramContentBlock block={data.coreCourses} className="bg-white" />
      )}
      {data.electiveCourses?.title && (
        <ProgramContentBlock block={data.electiveCourses} className="bg-surface" />
      )}

      {/* ── Electives table ────────────────────────────────────────────────── */}
      {data.electives?.items?.length > 0 && (
        <ElectivesTable data={data.electives} />
      )}

      {/* ── Co-curricular Activities ──────────────────────────────────────── */}
      {data.coCurricular?.title && (
        <ProgramContentBlock block={data.coCurricular} className="bg-white" />
      )}

      {/* ── Semester-wise breakdown (accordion) ──────────────────────────── */}
      {data.semesters?.items?.length > 0 && (
        <SemesterBreakdown data={data.semesters} />
      )}

      {/* ── Admission CTA (reused from homepage) ─────────────────────────── */}
      <AdmissionCTA data={data.admissionCta} />

      {/* ── FAQs (accordion) ──────────────────────────────────────────────── */}
      {data.faqs?.items?.length > 0 && <FaqSection data={data.faqs} />}

      {/* ── Contact pills (phone + email) ────────────────────────────────── */}
      <ContactPills phone={data.contact.phone} email={data.contact.email} />

      {/* ── Split CTA: Academic Calendar gold | Academic Areas red ───────── */}
      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.areas} />
    </>
  );
}