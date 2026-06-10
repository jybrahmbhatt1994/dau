import { getHomeData } from "@/lib/wordpress";

import { Hero } from "@/components/home/Hero";
import { AcademicsSection } from "@/components/home/AcademicsSection";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { FacultySection } from "@/components/home/FacultySection";
import { ResearchSection } from "@/components/home/ResearchSection";
import { ResearchPublications } from "@/components/home/ResearchPublications";
import { PlacementsSection } from "@/components/home/PlacementsSection";
import { LifeAtDAU } from "@/components/home/LifeAtDAU";
import { NewsEvents } from "@/components/home/NewsEvents";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { CentersSection } from "@/components/home/CentersSection";
import { DiversitySection } from "@/components/home/DiversitySection";
import { ConnectContact } from "@/components/home/ConnectContact";

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <>
      <Hero data={data.hero} />
      <AcademicsSection data={data.academics} />
      <AdmissionCTA data={data.admissionCta} />
      <FacultySection data={data.faculty} />
      <ResearchSection data={data.research} />
      <ResearchPublications data={data.publications} />
      <PlacementsSection data={data.placements} />
      <LifeAtDAU data={data.life} />
      <NewsEvents data={data.news} />
      <UpcomingEvents data={data.events} />
      <CentersSection data={data.centers} />
      <DiversitySection data={data.diversity} />
      <ConnectContact data={data.contact} />
    </>
  );
}
