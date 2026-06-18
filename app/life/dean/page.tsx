import type { Metadata } from "next";
import { getDeanStudentPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DeanDeskMessage } from "@/components/academics/DeanDeskMessage";
import { ContactPills } from "@/components/academics/ContactPills";
import { OfficialsSection } from "@/components/academics/OfficialsSection";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Dean (Student) | Dhirubhai Ambani University",
};

export default async function DeanStudentPage() {
  const data = await getDeanStudentPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      {/* Grey band: message (top padding) + contact pills (bottom padding) */}
      <DeanDeskMessage data={data.desk} />
      <ContactPills phone={data.contact.phone} email={data.contact.email} />

      {/* White band */}
      <OfficialsSection data={data.officials} className="bg-white" />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}