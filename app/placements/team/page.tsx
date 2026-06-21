import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { FacultyMembersGrid } from "@/components/faculty/FacultyMembersGrid";
import { SplitCta } from "@/components/academics/SplitCta";
import { getPlacementTeamPage } from "@/lib/wordpress";

export const metadata = {
  title: "Placement Team — Dhirubhai Ambani University",
  description:
    "Meet the DAU Placement Cell Team and Student Placement Cell, supporting students through industry engagement and placement readiness.",
};

export default async function PlacementTeamPage() {
  const data = await getPlacementTeamPage();

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

      {/* ── Placement Cell Team (static grid, surface bg) ────────────────── */}
      <FacultyMembersGrid
        data={data.placementCell}
        className="bg-surface"
        id="placement-cell"
      />

      {/* ── Student Placement Cell (paginated grid, white bg) ────────────── */}
      <FacultyMembersGrid
        data={data.studentCell}
        paginated
        pageSize={12}
        className="bg-white"
        id="student-cell"
      />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty List red ────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}