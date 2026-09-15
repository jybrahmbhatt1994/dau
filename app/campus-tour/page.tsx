// DESTINATION: app/campus-tour/page.tsx
import { PageHero } from "@/components/layout/PageHero";
import { CampusTourIntro } from "@/components/campus-tour/CampusTourIntro";
import { CampusTourGalleriesGrid } from "@/components/campus-tour/CampusTourGalleriesGrid";
import { getCampusTourFormOptions, getCampusTourContent } from "@/lib/wordpress";

export const metadata = { title: "Campus Tour | Ashoka University" };

export default async function CampusTourPage() {
  const [{ hero }, content] = await Promise.all([
    getCampusTourFormOptions(),
    getCampusTourContent(),
  ]);

  return (
    <>
      <PageHero title={hero.title} subline={hero.subline} image={hero.image} />

      <CampusTourIntro text={content.intro} cta={content.cta} />

      <CampusTourGalleriesGrid galleries={content.galleries} />
    </>
  );
}