// components/convocation/ConvocationDetailPage.tsx — FULL REPLACEMENT

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ConvocationIntroSection } from "@/components/convocation/ConvocationIntroSection";
import { ConvocationActionButtons } from "@/components/convocation/ConvocationActionButtons";
import { ConvocationArticleSection } from "@/components/convocation/ConvocationArticleSection";
import { ImageCarouselSection } from "@/components/convocation/ImageCarouselSection";
import { LiveBroadcastSection } from "@/components/convocation/LiveBroadcastSection";
import { ChiefGuestSection } from "@/components/convocation/ChiefGuestSection";
import { ConnectContact } from "@/components/home/ConnectContact";
import type { ConvocationDetailPageData } from "@/lib/types";

export function ConvocationDetailPage({
  data,
}: {
  data: ConvocationDetailPageData;
}) {
  return (
    <>
      {/* Sub Nav appears BEFORE the hero — matches the reference exactly,
          same unusual pattern as the Alumni page. */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <ConvocationIntroSection text={data.introParagraph} />

      <ConvocationActionButtons buttons={data.actionButtons} />

      <ConvocationArticleSection data={data.article} />

      <ImageCarouselSection
        title={data.photoGallery.title}
        images={data.photoGallery.images}
      />

      <ImageCarouselSection
        title={data.goldMedalists.title}
        images={data.goldMedalists.images}
      />

      <LiveBroadcastSection
        title={data.liveBroadcast.title}
        youtubeUrl={data.liveBroadcast.youtubeUrl}
      />

      <ChiefGuestSection data={data.chiefGuest} />

      <ConnectContact data={data.contact} />
    </>
  );
}