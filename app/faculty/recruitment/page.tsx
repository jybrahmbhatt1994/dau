import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { CurrentOpenings } from "@/components/faculty/CurrentOpenings";
import { EligibilityCriteria } from "@/components/faculty/EligibilityCriteria";
import { TitledProseBlock } from "@/components/faculty/TitledProseBlock";
import { ProgramGallery } from "@/components/academics/ProgramGallery";
import { SplitCta } from "@/components/academics/SplitCta";
import { getFacultyRecruitmentPage } from "@/lib/wordpress";

export const metadata = {
  title: "Faculty Recruitment — Dhirubhai Ambani University",
  description:
    "Current faculty openings, eligibility criteria, research environment, and compensation package at DAU.",
};

export default async function FacultyRecruitmentPage() {
  const data = await getFacultyRecruitmentPage();

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

      {/* ── Cream apply banner ───────────────────────────────────────────── */}
      <AdmissionsBanner
        text={data.applyBanner.text}
        cta={data.applyBanner.cta}
        href={data.applyBanner.href}
      />

      {/* ── Intro prose (white) ──────────────────────────────────────────── */}
      <ProseIntro paragraphs={data.intro} className="bg-white" />

      {/* ── Current Openings 2-col grid ──────────────────────────────────── */}
      <CurrentOpenings data={data.openings} />

      {/* ── Eligibility Criteria (surface bg, tabbed) ─────────────────────── */}
      <EligibilityCriteria data={data.eligibility} />

      {/* ── Prospective Faculty: titled sub-blocks ────────────────────────── */}
      <TitledProseBlock
        data={data.prospective}
        className="bg-white"
        id="prospective"
      />

      {/* ── Image gallery (autoplay) ──────────────────────────────────────── */}
      <section className="bg-white pb-4 lg:pb-6">
        <ProgramGallery
          images={data.gallery.images}
          aspect="aspect-[4/3]"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        />
      </section>

      {/* ── Compensation Package: titled sub-blocks ───────────────────────── */}
      <TitledProseBlock
        data={data.compensation}
        className="bg-white"
        id="compensation"
      />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty List red ────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}