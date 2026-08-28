"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ChevronDown,
  ChevronUp,
  FacebookIcon,
  LinkedInIcon,
  YoutubeIcon,
  WebsiteIcon,
} from "@/components/ui/icons";
import type { StudentClubsData } from "@/lib/types";

// Fixed card height. Left rail slider + right detail panel both respect this,
// so the card doesn't grow/shrink depending on how much content a club has.
const PANEL_HEIGHT = "lg:h-[460px]";

export function StudentClubs({
  data,
  className = "",
}: {
  data: StudentClubsData;
  className?: string;
}) {
  const [tab, setTab] = useState(0);
  const [active, setActive] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const clubs = data.tabs[tab].clubs;
  const club = clubs[active];

  if (!club) {
    return null;
  }

  useEffect(() => {
    setActive(0);
    swiperRef.current?.slideTo(0);
  }, [tab]);

  // Keep `active` and the swiper's position in lock-step — clamped so it can
  // never point past the current tab's clubs array (which is what was
  // producing the "reading 'image' of undefined" crash).
  const goPrev = () => {
    const next = Math.max(active - 1, 0);
    setActive(next);
    swiperRef.current?.slideTo(next);
  };
  const goNext = () => {
    const next = Math.min(active + 1, clubs.length - 1);
    setActive(next);
    swiperRef.current?.slideTo(next);
  };

  return (
    <section className={`overflow-x-clip py-16 lg:py-20 ${className}`}>
      <Container>
        <SectionHeading title={data.title} />

        {/* Top tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex overflow-hidden rounded-lg bg-white p-1 shadow-card">
            {data.tabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(i)}
                aria-pressed={i === tab}
                className={`rounded-md px-6 py-2.5 text-base font-semibold transition-colors duration-200 ${
                  i === tab ? "bg-brand-alt text-white" : "text-navy hover:text-brand"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="mt-8 flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-card lg:flex-row lg:gap-8 lg:p-6">
          {/* Left rail — vertical club slider */}
          <div
            className={`relative flex shrink-0 flex-col rounded-xl bg-white py-3 shadow-card lg:w-[190px] ${PANEL_HEIGHT}`}
          >
            {/* Up arrow */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous club"
              className="relative z-10 flex justify-center bg-white pb-2 text-brand-alt hover:text-brand"
            >
              <ChevronUp className="h-5 w-5" aria-hidden />
            </button>

            {/* vertical connector line (sits behind the buttons) */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-9 z-0 h-[calc(100%-4.5rem)] w-[2px] -translate-x-1/2 bg-brand-alt/60"
            />

            <Swiper
              onSwiper={(s) => (swiperRef.current = s)}
              direction="vertical"
              modules={[Mousewheel]}
              mousewheel={{ forceToAxis: true }}
              slidesPerView={4}
              spaceBetween={0}
              grabCursor
              className="!h-full min-h-0 flex-1"
            >
              {clubs.map((c, i) => (
                <SwiperSlide key={c.id} className="!h-auto">
                  {/* wrapper keeps the button shorter than the slide, so the
                      line stays visible in the gaps above/below it */}
                  <div className="flex h-[85px] items-center justify-center px-4">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`relative z-10 w-full rounded-md px-2 py-2.5 text-center font-display text-lg font-semibold leading-tight transition-colors duration-200 ${
                        i === active
                          ? "bg-brand-alt text-white"
                          : "bg-white text-navy hover:text-brand"
                      }`}
                    >
                      {c.name}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Down arrow */}
            <button
              type="button"
              onClick={goNext}
              aria-label="Next club"
              className="relative z-10 flex justify-center bg-white pt-2 text-brand-alt hover:text-brand"
            >
              <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
            </button>
          </div>

          {/* Right — club detail */}
          <div
            key={club.id}
            className={`grid flex-1 animate-fadeUp gap-6 md:grid-cols-2 md:gap-8 ${PANEL_HEIGHT}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:aspect-auto md:min-h-[300px] lg:h-full lg:aspect-auto">
              <Image
                src={club.image}
                alt={club.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Scrollable text column — keeps the card the same height
                regardless of how long a club's description/contacts are */}
            <div className="flex min-h-0 flex-col overflow-y-auto pr-2 lg:h-full">
              <p className="text-sm font-medium leading-relaxed text-navy/80">
                {club.description}
              </p>

              <div className="mt-5 text-sm font-medium text-navy/80">
                <p className="font-semibold text-navy">Contact :</p>
                {club.contacts.map((c) => (
                  <p key={c.name}>
                    {c.name} - {c.role}
                  </p>
                ))}
                <p className="mt-1">
                  <span className="font-semibold text-navy">Email:</span> {club.email}
                </p>
              </div>

              {(club.instagram ||
                club.facebook ||
                club.linkedin ||
                club.youtube ||
                club.website) && (
                <div className="mt-5 flex shrink-0 items-center gap-3">
                  {club.instagram && (
                    <Link
                      href={club.instagram}
                      aria-label={`${club.name} on Instagram`}
                      className="inline-block transition-opacity hover:opacity-75"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/instagram.svg" alt="" aria-hidden className="h-8 w-8" />
                    </Link>
                  )}
                  {club.facebook && (
                    <Link
                      href={club.facebook}
                      aria-label={`${club.name} on Facebook`}
                      className="inline-block text-brand-alt transition-opacity hover:opacity-75"
                    >
                      <FacebookIcon className="h-8 w-8" />
                    </Link>
                  )}
                  {club.linkedin && (
                    <Link
                      href={club.linkedin}
                      aria-label={`${club.name} on LinkedIn`}
                      className="inline-block text-brand-alt transition-opacity hover:opacity-75"
                    >
                      <LinkedInIcon className="h-8 w-8" />
                    </Link>
                  )}
                  {club.youtube && (
                    <Link
                      href={club.youtube}
                      aria-label={`${club.name} on YouTube`}
                      className="inline-block text-brand-alt transition-opacity hover:opacity-75"
                    >
                      <YoutubeIcon className="h-8 w-8" />
                    </Link>
                  )}
                  {club.website && (
                    <Link
                      href={club.website}
                      aria-label={`${club.name} website`}
                      className="inline-block text-brand-alt transition-opacity hover:opacity-75"
                    >
                      <WebsiteIcon className="h-8 w-8" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}