import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { GrantsTabs } from "@/components/research/GrantsTabs";
import { SponsoredResearchTable } from "@/components/research/SponsoredResearchTable";
import { SplitCta } from "@/components/academics/SplitCta";
import { getGrantsPage } from "@/lib/wordpress";

export const metadata = {
  title: "Grants & Projects — Dhirubhai Ambani University",
  description:
    "Available and past research grants, sponsored projects, and funding opportunities at DAU.",
};

export default async function GrantsPage() {
  const data = await getGrantsPage();

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

      {/* ── Tabs + grants list (Available / Past) ────────────────────────── */}
      <GrantsTabs tabs={data.tabs} />

      {/* ── Sponsored Research (reused) ──────────────────────────────────── */}
      <SponsoredResearchTable data={data.sponsored} />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty List red ────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}