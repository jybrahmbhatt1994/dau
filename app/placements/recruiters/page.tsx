import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { StatsRow } from "@/components/placements/StatsRow";
import { RecruitersGrid } from "@/components/placements/RecruitersGrid";
import { SuccessStories } from "@/components/placements/SuccessStories";
import { SplitCta } from "@/components/academics/SplitCta";
import { getTopRecruitersPage } from "@/lib/wordpress";

export const metadata = {
  title: "Top Recruiters — Dhirubhai Ambani University",
  description:
    "Placement stats and the full list of top recruiters who hire DAU graduates.",
};

export default async function TopRecruitersPage() {
  const data = await getTopRecruitersPage();

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

      {/* ── Intro prose ──────────────────────────────────────────────────── */}
      <ProseIntro paragraphs={data.intro} className="bg-white" />

      {/* ── Stats row ────────────────────────────────────────────────────── */}
      <StatsRow items={data.stats} />

      {/* ── Recruiters logo grid (sticky-left title) ─────────────────────── */}
      <RecruitersGrid data={data.recruiters} />

      {/* ── Success Stories (reused) ─────────────────────────────────────── */}
      <SuccessStories
        title={data.successStories.title}
        items={data.successStories.items}
      />

      {/* ── Split CTA (title-less) ───────────────────────────────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}