"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import { ProgramCard } from "./ProgramCard";
import type { HomeData } from "@/lib/types";

export function AcademicsSection({ data }: { data: HomeData["academics"] }) {
  return (
    // overflow-x-clip => the right-bleed (and the bleed underline) are trimmed
    // at the screen edge, so there's no horizontal scroll.
    <section className="overflow-x-clip bg-surface py-16 lg:py-20">
      <Container>
        <SectionHeading title={data.title} description={data.description} />
      </Container>

      {/* Slider: left edge stays aligned with the container; the inner wrapper's
          negative right margin pushes the right edge out to the viewport edge,
          so the trailing card is cut exactly at the screen edge. */}
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

      <Container className="mt-10">
        <div className="flex justify-center">
          <ActionButton href="/academics">Know More</ActionButton>
        </div>
      </Container>
    </section>
  );
}