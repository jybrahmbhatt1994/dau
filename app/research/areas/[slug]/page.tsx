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

// ─────────────────────────────────────────────────────────────────────────────
// Route segment config
//
// force-dynamic: always render fresh from WordPress — never serve a stale
// ISR-cached response while CMS content is still being set up.
//
// Once all research-area posts exist on the production CMS and content is
// stable, switch to ISR for better performance:
//
//   export const revalidate = 60;
//
//   export async function generateStaticParams() {
//     try {
//       const posts = await wpFetch<Array<{ slug: string }>>(
//         "/wp/v2/research-area?_fields=slug&per_page=100",
//       );
//       return posts.map((p) => ({ slug: p.slug }));
//     } catch {
//       return [];
//     }
//   }
// ─────────────────────────────────────────────────────────────────────────────
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic metadata — title/description derived from the actual research area
// instead of a hardcoded string, so every slug gets correct SEO tags.
// NOTE: Next.js deduplicates identical fetches between generateMetadata and
// the page render, so this does NOT cause a second WordPress round-trip.
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getResearchAreaDetailPage(slug);

  return {
    title: `${data.hero.title} — Research Area — Dhirubhai Ambani University`,
    description:
      data.intro.paragraphs[0]?.slice(0, 160) ??
      `Explore research in ${data.hero.title} at DAU — faculty, research groups, sponsored projects, and publications.`,
  };
}

/**
 * Research Area Detail page — dynamic route [slug].
 * Fully WordPress-powered: fetches the research-area CPT post by slug,
 * plus related faculty (relationship field) and latest events in parallel.
 */
export default async function ResearchAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15+ requires awaiting params in dynamic routes
  const { slug } = await params;

  const data = await getResearchAreaDetailPage(slug);

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
      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}