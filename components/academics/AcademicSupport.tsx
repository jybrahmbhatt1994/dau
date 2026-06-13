"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { SupportCard } from "@/components/academics/SupportCard";
import type { SupportCard as SupportCardType } from "@/lib/types";

/**
 * "Academic Support" — full-bleed-right card slider (PROJECT-GUIDE §7B).
 * Title only, no right-side description. Client component (Swiper).
 */
export function AcademicSupport({
  data,
}: {
  data: { title: string; cards: SupportCardType[] };
}) {
  return (
    <section id="support" className="scroll-mt-24 overflow-x-clip bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />
      </Container>

      <Container className="mt-10">
        <div className="mr-[calc(50%_-_50vw)]">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            grabCursor
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
            }}
          >
            {data.cards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto">
                <SupportCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
