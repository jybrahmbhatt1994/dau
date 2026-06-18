import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ResearchAreasGrid } from "@/components/research/ResearchAreasGrid";
import { SplitCta } from "@/components/academics/SplitCta";
import { getResearchAreasPage } from "@/lib/wordpress";

export const metadata = {
  title: "Research Areas — Dhirubhai Ambani University",
  description:
    "Explore the academic research areas at DAU — AI & ML, Algorithms, Communications, Humanities, Physics, Software Systems, VLSI and more.",
};

export default async function ResearchAreasPage() {
  const data = await getResearchAreasPage();

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

      {/* ── Intro prose — two paragraphs, white background ───────────────── */}
      <ProseIntro paragraphs={data.intro} className="bg-white" />

      {/* ── Areas grid — BleedTitle + description + 2-col cards ──────────── */}
      <ResearchAreasGrid data={data.areas} />

      {/* ── Split CTA: Dean (Faculty) gold | Faculty List red ────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}