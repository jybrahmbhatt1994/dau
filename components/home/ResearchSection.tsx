"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import type { HomeData } from "@/lib/types";

export function ResearchSection({ data }: { data: HomeData["research"] }) {
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
                <Link
                  href={card.href}
                  className="group flex h-full flex-col border border-line bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[422/230] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-navy">
                      {card.title}
                    </h3>
                    <p className="mt-auto text-xs font-medium text-ash">{card.date}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <Container className="mt-10">
        <div className="flex justify-center">
          <ActionButton href="/research">Know More</ActionButton>
        </div>
      </Container>
    </section>
  );
}