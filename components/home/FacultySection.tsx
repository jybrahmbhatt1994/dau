"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import type { HomeData } from "@/lib/types";

export function FacultySection({ data }: { data: HomeData["faculty"] }) {
  return (
    <section className="overflow-x-clip bg-surface py-16 lg:py-20">
      <Container>
        <SectionHeading title={data.title} description={data.description} />
      </Container>

      {/* Slider: left aligns with container, bleeds to the screen edge */}
      <Container className="mt-10">
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
            {data.members.map((member) => (
              <SwiperSlide key={member.id} className="h-auto">
                <Link href={member.href} className="group block">
                  <div className="relative aspect-[289/352] w-full overflow-hidden bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 60vw, (max-width: 1024px) 38vw, 22vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-navy">
                    {member.name}
                  </h3>
                  <p className="text-base font-semibold text-ash">
                    {member.position}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {/* Centered button */}
      <Container className="mt-10">
        <div className="flex justify-center">
          <ActionButton href="/faculty">Know More</ActionButton>
        </div>
      </Container>
    </section>
  );
}