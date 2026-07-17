// components/alumni/AlumniPage.tsx
// ============================================================================

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DirectorMessageSection } from "@/components/alumni/DirectorMessageSection";
import { AlumniIntroSection } from "@/components/alumni/AlumniIntroSection";
import { AlumniEventsSection } from "@/components/alumni/AlumniEventsSection";
import { AlumniMemoriesSection } from "@/components/alumni/AlumniMemoriesSection";
import { AlumniNewsletterSection } from "@/components/alumni/AlumniNewsletterSection";
import { AlumniUsefulLinksSection } from "@/components/alumni/AlumniUsefulLinksSection";
import { ConnectContact } from "@/components/home/ConnectContact";
import type { AlumniPageData } from "@/lib/types";

export function AlumniPage({ data }: { data: AlumniPageData }) {
  return (
    <>
      {/* NOTE: Sub Nav appears BEFORE the hero per the Figma — unusual vs
          every other page in this project. If this turns out to be a
          Figma export artifact rather than intentional, just swap the
          order of these two components. */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <DirectorMessageSection data={data.directorMessage} />

      <AlumniIntroSection data={data.intro} />

      <AlumniEventsSection data={data.events} />

      <AlumniMemoriesSection data={data.memories} />

      <AlumniNewsletterSection data={data.newsletter} />

      <AlumniUsefulLinksSection data={data.usefulLinks} />

      <ConnectContact data={data.contact} />
    </>
  );
}
