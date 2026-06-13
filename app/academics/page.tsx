import type { Metadata } from "next";
import { getAcademicsPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DeanMessage } from "@/components/academics/DeanMessage";
import { SchoolsSection } from "@/components/academics/SchoolsSection";
import { ProgramSlider } from "@/components/academics/ProgramSlider";
import { AcademicAreas } from "@/components/academics/AcademicAreas";
import { AcademicSupport } from "@/components/academics/AcademicSupport";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Academics | Dhirubhai Ambani University",
  description:
    "Schools, programs, academic areas and academic support at Dhirubhai Ambani University.",
};

export default async function AcademicsPage() {
  const data = await getAcademicsPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label="Academics" links={data.subNav} />
      <DeanMessage data={data.dean} />
      <SchoolsSection data={data.schools} />
      <ProgramSlider data={data.programs} />
      <AcademicAreas data={data.areas} />
      <AcademicSupport data={data.support} />
      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.catalogue} />
    </>
  );
}
