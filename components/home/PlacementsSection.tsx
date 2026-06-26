"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import type { HomeData } from "@/lib/types";

// Dummy "logoipsum"-style placeholder brands for the marquee.
const DUMMY_LOGOS: { label: string; mark: ReactNode }[] = [
  {
    label: "Logoipsum",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
      </svg>
    ),
  },
  {
    label: "logo ipsum",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Logoipsum",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
      </svg>
    ),
  },
  {
    label: "IPSUM",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <circle cx="8" cy="12" r="5" />
        <circle cx="16" cy="12" r="5" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "Logoipsum",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.6 5 20.4l1.4-6.8L1.3 9l6.9-.7L12 2Z" />
      </svg>
    ),
  },
  {
    label: "logo",
    mark: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
        <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
      </svg>
    ),
  },
];

export function PlacementsSection({ data }: { data: HomeData["placements"] }) {
  return (
    <section className="overflow-x-clip bg-ink py-16 text-white lg:py-20">
      <Container>
        <SectionHeading title={data.title} description={data.description} light />
      </Container>

      {/* Gallery slider — full-bleed, partial images at both edges */}
      <div className="mt-10">
        <Swiper
          slidesPerView={1.3}
          spaceBetween={10}
          centeredSlides
          loop
          grabCursor
          breakpoints={{
            640: { slidesPerView: 2.5, spaceBetween: 10 },
            1024: { slidesPerView: 4.3, spaceBetween: 12 },
          }}
        >
          {data.gallery.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={src}
                  alt="Placement moment"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Recruiter marquee — infinite scroll, no borders, dummy logos */}
      <div className="mt-12 overflow-hidden py-4">
        <div className="flex w-max animate-marquee items-center gap-16">
          {[...data.recruiters, ...data.recruiters].map((logo, i) => (
            <div key={i} className="flex shrink-0 items-center">
              <img
                src={logo.image}
                alt={logo.name}
                className="h-8 w-auto object-contain opacity-60 grayscale"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Container className="mt-12">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none">
                {stat.value}
              </div>
              <div className="mt-2 text-lg font-semibold text-white/85">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ActionButton href="/placements" variant="outlineLight">
            Know More
          </ActionButton>
        </div>
      </Container>
    </section>
  );
}