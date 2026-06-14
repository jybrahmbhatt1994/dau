import type { Metadata } from "next";
import { getAdministrationPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { LeaderProfile } from "@/components/about/LeaderProfile";
import { DiversityCallout } from "@/components/about/DiversityCallout";
import { ConnectContact } from "@/components/home/ConnectContact";

export const metadata: Metadata = {
  title: "Administration | Dhirubhai Ambani University",
  description:
    "Administration at Dhirubhai Ambani University — Registrar's Office, HR & Admin, Controller of Examination, Librarian and more.",
};

export default async function AdministrationPage() {
  const data = await getAdministrationPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      {/* Offices alternate: white + image-left, then surface + image-right */}
      {data.profiles.map((p, i) => (
        <LeaderProfile
          key={p.id ?? p.title}
          data={p}
          id={p.id}
          imageSide={i % 2 === 0 ? "left" : "right"}
          className={i % 2 === 0 ? "bg-white" : "bg-surface"}
        />
      ))}

      <DiversityCallout data={data.diversity} />
      <ConnectContact data={data.contact} />
    </>
  );
}