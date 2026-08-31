import type { Metadata } from "next";
import { getFestListingPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { EventsTabbedGrid } from "@/components/events/EventsTabbedGrid";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Fest | Dhirubhai Ambani University",
  description: "Upcoming and past fests at Dhirubhai Ambani University.",
};

export default async function FestListingPage() {
  const data = await getFestListingPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      {/* <ProseIntro paragraphs={data.intro} className="bg-surface" /> */}

      <div id="fest" className="scroll-mt-24">
        <EventsTabbedGrid
          tabs={data.tabs}
          className="bg-surface"
          upcomingLabel="Upcoming Fest"
          pastLabel="Past Fest"
          itemNounSingular="fest"
        />
      </div>

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}