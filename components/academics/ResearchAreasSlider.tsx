"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ResearchArea, SectionIntro } from "@/lib/types";

function ResearchAreaCard({ card }: { card: ResearchArea }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[418/230] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover"
        />
      </div>
      <div className="px-5 py-5 lg:px-6">
        <h3 className="font-display text-base font-bold text-navy lg:text-lg">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

export function ResearchAreasSlider({
  data,
}: {
  data: SectionIntro & { cards: ResearchArea[] };
}) {
  return (
    <section id="research" className="scroll-mt-24 overflow-x-clip bg-surface py-16 lg:py-20">
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
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
            }}
          >
            {data.cards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto">
                <ResearchAreaCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}