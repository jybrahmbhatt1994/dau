import type { Metadata } from "next";
import { getNewslettersPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { PaginatedCardGrid } from "@/components/news/PaginatedCardGrid";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Newsletters | Dhirubhai Ambani University",
  description: "Newsletters from Dhirubhai Ambani University.",
};

export default async function NewslettersPage() {
  const data = await getNewslettersPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      <div id="newsletters" className="scroll-mt-24">
        <PaginatedCardGrid items={data.items} className="bg-surface" />
      </div>

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}