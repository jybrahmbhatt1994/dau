"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface PublicationCard {
  id: string;
  image: string;
  date: string;
  excerpt: string;
  author: string;
  href: string;
}

/**
 * Single publication card. Bordered white card with internal padding.
 *
 *   [image (full width, top)]
 *   ┌─ p-5 padding ─────────┐
 *   │  excerpt              │
 *   │  date                 │
 *   │  author               │
 *   └───────────────────────┘
 */
function PublicationCardItem({ pub }: { pub: PublicationCard }) {
  return (
    <Link
      href={pub.href}
      className="group flex h-full flex-col border border-line bg-white transition-shadow hover:shadow-card"
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
        <Image
          src={pub.image}
          alt={pub.author}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 85vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Padded text content */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="text-[13px] leading-[1.6] text-black/70">
          {pub.excerpt}
        </p>
        <p className="mt-4 text-sm text-ash">{pub.date}</p>
        <p className="mt-4 font-display text-base font-semibold text-navy">
          {pub.author}
        </p>
      </div>
    </Link>
  );
}

/**
 * "Current Publications" — Swiper slider mirroring the AreaFacultySlider
 * pattern exactly. Full-bleed-right: left edge aligns to container, right edge
 * bleeds to viewport. Cards are bordered (border-line).
 *
 * Background: white, py-16 lg:py-20.
 */
export function CurrentPublications({
  data,
}: {
  data: { title: string; items: PublicationCard[] };
}) {
  return (
    <section
      id="publications"
      className="scroll-mt-[150px] overflow-x-clip bg-white py-16 lg:py-20"
    >
      <Container>
        <BleedTitle title={data.title} />
      </Container>

      {/* Full-bleed-right slider */}
      <Container className="mt-10">
        <div className="mr-[calc(50%_-_50vw)]">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            grabCursor
            breakpoints={{
              640:  { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
            }}
          >
            {data.items.map((pub) => (
              <SwiperSlide key={pub.id} className="h-auto">
                <PublicationCardItem pub={pub} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}