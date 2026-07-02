import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AreaDetailIntro } from "@/components/research/AreaDetailIntro";
import { AreaFacultySlider } from "@/components/research/AreaFacultySlider";
import { ResearchGroupsGrid } from "@/components/research/ResearchGroupsGrid";
import { SponsoredResearchTable } from "@/components/research/SponsoredResearchTable";
import { CurrentPublications } from "@/components/research/CurrentPublications";
import { VideoCta } from "@/components/research/VideoCta";
import { UpcomingEvents } from "@/components/research/UpcomingEvents";
import { SplitCta } from "@/components/academics/SplitCta";
import { getResearchAreaDetailPage } from "@/lib/wordpress";

// Always render fresh — never let Next.js serve a stale ISR-cached response
// while WordPress data is being set up. Switch to `export const revalidate = 60`
// once all research area posts exist on the production CMS.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "AI, ML and Data Science — Research Area — Dhirubhai Ambani University",
  description:
    "Explore research in AI, Machine Learning and Data Science at DAU — faculty, research groups, sponsored projects, and publications.",
};

/**
 * Research Area Detail page — dynamic route [slug].
 * Currently returns mock data regardless of slug; swap getResearchAreaDetailPage
 * to accept a slug param when CMS is live.
 */
export default async function ResearchAreaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getResearchAreaDetailPage(params.slug);

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

      {/* ── Full-width prose intro ────────────────────────────────────────── */}
      <AreaDetailIntro data={data.intro} />

      {/* ── Faculty portrait slider ───────────────────────────────────────── */}
      <AreaFacultySlider data={data.faculty} />

      {/* ── Research Groups and Labs grid ────────────────────────────────── */}
      <ResearchGroupsGrid data={data.groups} />

      {/* ── Sponsored Research table ──────────────────────────────────────── */}
      <SponsoredResearchTable data={data.sponsored} />

      {/* ── Current Publications slider ───────────────────────────────────── */}
      <CurrentPublications data={data.publications} />

      {/* ── Video / professor feature ─────────────────────────────────────── */}
      <VideoCta data={data.videoCta} />

      {/* ── Upcoming Events ───────────────────────────────────────────────── */}
      <UpcomingEvents data={data.events} showAllButton={true} />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty List red ────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}