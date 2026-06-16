import type { Metadata } from "next";
import { getPhotoGalleryPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { SchoolsSection } from "@/components/academics/SchoolsSection";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Photo Gallery | Dhirubhai Ambani University",
  description: "Photo galleries from Dhirubhai Ambani University.",
};

export default async function PhotoGalleryPage() {
  const data = await getPhotoGalleryPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      {/* SchoolsSection with no title — the left column is just the intro text */}
      <SchoolsSection
        data={{ title: "", description: data.intro, cards: data.categories }}
        id="gallery"
        className="bg-surface"
      />

      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.areas} />
    </>
  );
}