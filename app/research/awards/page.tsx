import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { AwardeesTable } from "@/components/research/AwardeesTable";
import { PolicySection } from "@/components/research/PolicySection";
import { SplitCta } from "@/components/academics/SplitCta";
import { getAwardsPage } from "@/lib/wordpress";

export const metadata = {
  title: "Awards & Recognition — Dhirubhai Ambani University",
  description:
    "List of student awardees, research policies, and recognition at DAU across academic years.",
};

export default async function AwardsPage() {
  const data = await getAwardsPage();

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

      {/* ── Full-width intro prose ────────────────────────────────────────── */}
      <ProseIntro paragraphs={data.intro} className="bg-white" />

      {/* ── Year tabs + List of Awardees ──────────────────────────────────── */}
      <AwardeesTable title={data.awardees.title} years={data.awardees.years} />

      {/* ── Policy section ────────────────────────────────────────────────── */}
      <PolicySection data={data.policy} />

      {/* ── Split CTA: Dean (Faculty) | Faculty List ─────────────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}