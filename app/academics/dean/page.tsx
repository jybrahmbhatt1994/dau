import type { Metadata } from "next";
import { getDeanPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DeansDesk } from "@/components/academics/DeansDesk";
import { OfficialsSection } from "@/components/academics/OfficialsSection";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Office of Dean | Dhirubhai Ambani University",
  description:
    "Message from the Dean's Desk, functions of the Office of the Dean, and officials.",
};

export default async function DeanPage() {
  const data = await getDeanPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label="Office of Dean" links={data.subNav} />
      <DeansDesk data={data.desk} />
      <OfficialsSection data={data.officials} />
      {/* SplitCta's second (red) half takes any CtaPanel — here "Academic Areas". */}
      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.areas} />
    </>
  );
}