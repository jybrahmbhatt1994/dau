import type { Metadata } from "next";
import { getFestEventsPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { FestEventsGrid } from "@/components/life/FestEventsGrid";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Fest & Events | Dhirubhai Ambani University",
};

export default async function FestEventsPage() {
  const data = await getFestEventsPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      <FestEventsGrid items={data.cards} />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}