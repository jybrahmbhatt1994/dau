import type { Metadata } from "next";
import { getAcademicAreasPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { AcademicAreas } from "@/components/academics/AcademicAreas";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Academic Areas | Dhirubhai Ambani University",
  description:
    "Academic areas and areas of study at Dhirubhai Ambani University.",
};

export default async function AcademicAreasPage() {
  const data = await getAcademicAreasPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label="Academic Areas" links={data.subNav} />
      <ProseIntro paragraphs={data.intro} />
      <AcademicAreas
        data={data.areasOfStudy}
        id="areas-of-study"
        className="bg-surface"
      />
      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.catalogue} />
    </>
  );
}