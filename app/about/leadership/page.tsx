import type { Metadata } from "next";
import { getLeadershipPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { LeaderProfile } from "@/components/about/LeaderProfile";
import { PeopleSlider } from "@/components/about/PeopleSlider";
import { DiversityCallout } from "@/components/about/DiversityCallout";
import { ConnectContact } from "@/components/home/ConnectContact";

export const metadata: Metadata = {
  title: "Leadership | Dhirubhai Ambani University",
  description:
    "Leadership at Dhirubhai Ambani University — President, Board of Governors, Academic Council, Finance Committee, Director General and Directors.",
};

export default async function LeadershipPage() {
  const data = await getLeadershipPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      <LeaderProfile data={data.president} id="president" className="bg-white" />
      <PeopleSlider data={data.boardOfGovernors} id="board-of-governors" className="bg-surface" />
      <PeopleSlider data={data.academicCouncil} id="academic-council" className="bg-surface" />
      <PeopleSlider data={data.financeCommittee} id="finance-committee" className="bg-surface" />
      <LeaderProfile data={data.directorGeneral} id="director-general" className="bg-white" />
      <PeopleSlider data={data.directors} id="directors" className="bg-surface" />

      <DiversityCallout data={data.diversity} />
      <ConnectContact data={data.contact} />
    </>
  );
}