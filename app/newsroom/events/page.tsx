import type { Metadata } from "next";
import { getEventsListingPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { PaginatedCardGrid } from "@/components/news/PaginatedCardGrid";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Events | Dhirubhai Ambani University",
  description: "Upcoming and past events at Dhirubhai Ambani University.",
};

export default async function EventsListingPage() {
  const data = await getEventsListingPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      {/* <ProseIntro paragraphs={data.intro} className="bg-surface" /> */}

      <div id="events" className="scroll-mt-24">
        <PaginatedCardGrid
          items={data.items}
          className="bg-surface"
          showReadMore
        />
      </div>

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}