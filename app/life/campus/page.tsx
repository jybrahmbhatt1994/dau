import type { Metadata } from "next";
import { getCampusLifePage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { MediaSection } from "@/components/life/MediaSection";
import { VirtualTourBanner } from "@/components/life/VirtualTourBanner";
import { PeopleCardGrid } from "@/components/life/PeopleCardGrid";
import { SuccessStories } from "@/components/life/SuccessStories";
import { ProgramSlider } from "@/components/academics/ProgramSlider";
import { SplitCta } from "@/components/academics/SplitCta";
import { StudentClubs } from "@/components/life/StudentClubs";

export const metadata: Metadata = {
  title: "Campus Life | Dhirubhai Ambani University",
};

export default async function CampusLifePage() {
  const data = await getCampusLifePage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      {/* Student Life — gallery + trailing paragraph */}
      <MediaSection data={data.studentLife} className="bg-surface" />

      <VirtualTourBanner data={data.virtualTour} />

      {/* Residence Life — captioned single-image carousel */}
      <MediaSection data={data.residenceLife} className="bg-white" />

      {/* Sports Facilities — two-up images */}
      <MediaSection data={data.sportsFacilities} className="bg-surface" />

      {/* Student Clubs — tabbed vertical club slider */}
      <StudentClubs data={data.clubs} className="bg-surface" />

      {/* Student Body Government — people card grid */}
      <PeopleCardGrid data={data.studentBody} className="bg-surface" />

      {/* IEEE Branch — single-image carousel */}
      <MediaSection data={data.ieee} className="bg-white" />

      {/* Success Stories — testimonial slider */}
      <div id="success-stories" className="scroll-mt-[150px]">
        <SuccessStories
          title={data.successStories.title}
          items={data.successStories.items}
          className="bg-surface"
        />
      </div>

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}