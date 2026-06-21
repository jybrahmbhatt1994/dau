import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { PolicySection } from "@/components/research/PolicySection";
import { TeachingEnhancement } from "@/components/faculty/TeachingEnhancement";
import { IndustryExposure } from "@/components/faculty/IndustryExposure";
import { TitledProseBlock } from "@/components/faculty/TitledProseBlock";
import { EffectivenessCards } from "@/components/faculty/EffectivenessCards";
import { PolicyGuidelines } from "@/components/faculty/PolicyGuidelines";
import { AwardsHighlights } from "@/components/faculty/AwardsHighlights";
import { DiversityCallout } from "@/components/about/DiversityCallout";
import { ConnectContact } from "@/components/home/ConnectContact";
import { getFacultyDevelopmentPage } from "@/lib/wordpress";

export const metadata = {
  title: "Faculty Development & Evaluation — Dhirubhai Ambani University",
  description:
    "Faculty development programs, teaching enhancement, industry exposure, evaluation frameworks, and policies at DAU.",
};

export default async function FacultyDevelopmentPage() {
  const data = await getFacultyDevelopmentPage();

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

      {/* ── Intro prose (white) ──────────────────────────────────────────── */}
      <ProseIntro paragraphs={data.intro} className="bg-white" />

      {/* ── Faculty Development Programs (FDPs) — reuses PolicySection ──── */}
      <PolicySection data={data.fdps} className="bg-white" />

      {/* ── Teaching & Learning Enhancement (surface bg) ─────────────────── */}
      <TeachingEnhancement data={data.enhancement} />

      {/* ── Industry Exposure & Collaboration (white + carousel) ─────────── */}
      <IndustryExposure data={data.industry} />

      {/* ── Dark ink band: Faculty Evaluation → Teaching Effectiveness →
           Continuous Improvement (3 sections render back-to-back, all bg-ink
           so they read as one continuous dark band) ─────────────────────── */}
      <TitledProseBlock
        data={data.evaluation}
        className="bg-ink"
        id="evaluation"
        columns={2}
        light
      />

      <EffectivenessCards data={data.teachingEffectiveness} />

      <TitledProseBlock
        data={data.continuousImprovement}
        className="bg-ink"
        id="continuous-improvement"
        columns={2}
        light
      />

      {/* ── Policy & Guidelines (white) ──────────────────────────────────── */}
      <PolicyGuidelines data={data.policyGuidelines} />

      {/* ── Awards & Highlights (white) ──────────────────────────────────── */}
      <AwardsHighlights data={data.highlights} />

      {/* ── Diversity callout (reused) ───────────────────────────────────── */}
      <DiversityCallout data={data.diversity} />

      {/* ── Connect / Contact split (reused) ─────────────────────────────── */}
      <ConnectContact data={data.contact} />
    </>
  );
}