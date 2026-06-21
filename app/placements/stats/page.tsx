import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ProgramGallery } from "@/components/academics/ProgramGallery";
import { BarChartSection } from "@/components/placements/BarChartSection";
import { SuccessStories } from "@/components/placements/SuccessStories";
import { SplitCta } from "@/components/academics/SplitCta";
import { getPlacementStatsPage } from "@/lib/wordpress";

export const metadata = {
  title: "Placement Stats — Dhirubhai Ambani University",
  description:
    "UG and PG placement statistics, salary trends, and student success stories at DAU.",
};

export default async function PlacementStatsPage() {
  const data = await getPlacementStatsPage();

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

      {/* ── Image gallery (autoplay) ──────────────────────────────────────── */}
      <section className="bg-white pb-4 lg:pb-6">
        <ProgramGallery
          images={data.gallery.images}
          aspect="aspect-[4/3]"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        />
      </section>

      {/* ── UG Placements (dark ink band) ─────────────────────────────────── */}
      <BarChartSection data={data.ugPlacements} />

      {/* ── PG Placements (dark ink band continues) ──────────────────────── */}
      <BarChartSection data={data.pgPlacements} />

      {/* ── Success Stories (surface bg, autoplay carousel) ──────────────── */}
      <SuccessStories
        title={data.successStories.title}
        items={data.successStories.items}
      />

      {/* ── Split CTA (title-less variant) ───────────────────────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}