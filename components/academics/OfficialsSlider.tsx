"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { OfficialCard } from "@/components/academics/OfficialCard";
import type { Official } from "@/lib/types";

/**
 * Slider variant of the officials grid. <OfficialsSection> renders this
 * automatically once the number of people passes its threshold. Full-bleed to
 * the right screen edge, mirroring the homepage faculty / people sliders
 * (slidesPerView 1.5 / 2.5 / 4.5). Reuses <OfficialCard> so the hover/focus
 * contact panel behaves identically to the static grid.
 */
export function OfficialsSlider({ people }: { people: Official[] }) {
  return (
    <Container className="mt-12 lg:mt-16">
      <div className="mr-[calc(50%_-_50vw)]">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={16}
          grabCursor
          breakpoints={{
            640: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 4.5, spaceBetween: 24 },
          }}
        >
          {people.map((person) => (
            <SwiperSlide key={person.id} className="h-auto">
              <div className="flex justify-center">
                <OfficialCard person={person} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}