import type { Metadata } from "next";
import { getFestEventsPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { FeaturedCarousel } from "@/components/life/FeaturedCarousel";
import { PaginatedCardGrid } from "@/components/news/PaginatedCardGrid";
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

      {/* Upcoming Fest — featured carousel */}
      <FeaturedCarousel
        title={data.upcomingFest.title}
        items={data.upcomingFest.items}
        className="bg-surface"
      />

      {/* Upcoming Events — card grid with Show More */}
      <PaginatedCardGrid
        id="upcoming-events"
        title={data.upcomingEvents.title}
        items={data.upcomingEvents.items}
        mode="more"
        initialCount={6}
        step={6}
        moreLabel="Show More"
        className="bg-surface"
      />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}