import type { Metadata } from "next";
import { getAboutPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { SchoolIntro } from "@/components/academics/SchoolIntro";
import { MediaTextBlock } from "@/components/about/MediaTextBlock";
import { DiversityCallout } from "@/components/about/DiversityCallout";
import { ConnectContact } from "@/components/home/ConnectContact";

export const metadata: Metadata = {
  title: "About DAU | Dhirubhai Ambani University",
  description:
    "About Dhirubhai Ambani University — vision, mission and what makes one of India's largest, most diverse universities.",
};

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <SchoolIntro data={data.intro} />
      <MediaTextBlock
        image={data.media.image}
        paragraphs={data.media.paragraphs}
        imageSide="left"
        className="bg-surface"
      />
      <DiversityCallout data={data.diversity} />
      <ConnectContact data={data.contact} />
    </>
  );
}