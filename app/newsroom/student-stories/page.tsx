import type { Metadata } from "next";
import { getStudentStoriesPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { PaginatedCardGrid } from "@/components/news/PaginatedCardGrid";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Student Stories | Dhirubhai Ambani University",
  description: "Student stories and features from Dhirubhai Ambani University.",
};

export default async function StudentStoriesPage() {
  const data = await getStudentStoriesPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      <div id="stories" className="scroll-mt-24">
        <PaginatedCardGrid items={data.items} className="bg-surface" />
      </div>

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}