import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DeanResearchDesk } from "@/components/research/DeanResearchDesk";
import { ResearchFunctionsBlock } from "@/components/research/ResearchFunctionsBlock";
import { OfficialsSection } from "@/components/academics/OfficialsSection";
import { SplitCta } from "@/components/academics/SplitCta";
import { getDeanResearchPage } from "@/lib/wordpress";

export const metadata = {
  title: "Dean (Research) — Dhirubhai Ambani University",
  description:
    "Office of Dean (Research) at DAU — implementing policies for sponsored projects, research funding, publications, and academic growth.",
};

export default async function DeanResearchPage() {
  const data = await getDeanResearchPage();

  return (
    <>
      {/* ── Inner-page hero ──────────────────────────────────────────────── */}
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      {/* ── Lavender sub-nav ─────────────────────────────────────────────── */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      {/* ── Message from Dean's Desk + contact pills ─────────────────────── */}
      <DeanResearchDesk data={data.desk} />

      {/* ── Functions of Office of the Dean ──────────────────────────────── */}
      <ResearchFunctionsBlock data={data.functions} />

      {/* ── Officials ────────────────────────────────────────────────────── */}
      <OfficialsSection data={data.officials} className="bg-surface" />

      {/* ── Split CTA: Dean (Faculty) | Faculty List ──────────────────────── */}
      <SplitCta
        calendar={data.cta.left}
        catalogue={data.cta.right}
      />
    </>
  );
}