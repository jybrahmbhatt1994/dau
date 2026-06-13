"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/academics/ProgramCard";
import type { ProgramCard as ProgramCardType, SectionIntro } from "@/lib/types";

/**
 * "Academics" programs — the standard full-bleed-right card slider
 * (PROJECT-GUIDE §7B). Left edge aligns to the container; the right edge
 * bleeds to the screen edge. Client component (Swiper).
 */
export function ProgramSlider({
  data,
}: {
  data: SectionIntro & { cards: ProgramCardType[] };
}) {
  return (
    <section className="overflow-x-clip bg-white py-16 lg:py-20">
      <Container>
        <SectionHeading title={data.title} description={data.description} />
      </Container>

      <Container className="mt-10">
        <div className="mr-[calc(50%_-_50vw)]">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            grabCursor
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 },
            }}
          >
            {data.cards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto">
                <ProgramCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}
