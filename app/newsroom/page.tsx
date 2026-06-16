import type { Metadata } from "next";
import { getNewsroomPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { MediaPressColumns } from "@/components/news/MediaPressColumns";
import { NewsEvents } from "@/components/home/NewsEvents";
import { StoriesBlogs } from "@/components/news/StoriesBlogs";
import { SchoolsSection } from "@/components/academics/SchoolsSection";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Newsroom | Dhirubhai Ambani University",
  description:
    "News, press releases, stories, blogs and podcasts from Dhirubhai Ambani University.",
};

export default async function NewsroomPage() {
  const data = await getNewsroomPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      <div id="media" className="scroll-mt-24">
        <MediaPressColumns
          inMedia={data.media.inMedia}
          pressRelease={data.media.pressRelease}
        />
      </div>

      <div id="latest-news" className="scroll-mt-24">
        <NewsEvents data={data.latestNews} />
      </div>

      <div id="stories" className="scroll-mt-24">
        <StoriesBlogs data={data.stories} />
      </div>

      <SchoolsSection data={data.podcasts} id="podcasts" className="bg-surface" />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}