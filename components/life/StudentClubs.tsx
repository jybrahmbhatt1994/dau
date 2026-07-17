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
import { ChevronDown } from "@/components/ui/icons";
import type { StudentClubsData } from "@/lib/types";

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

  useEffect(() => {
    setActive(0);
    swiperRef.current?.slideTo(0);
  }, [tab]);

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
          <div className="relative shrink-0 rounded-xl bg-white py-3 shadow-card lg:w-[190px]">
            {/* vertical connector line (sits behind the buttons) */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-[2px] -translate-x-1/2 bg-brand-alt/60"
            />

            <Swiper
              onSwiper={(s) => (swiperRef.current = s)}
              direction="vertical"
              modules={[Mousewheel]}
              mousewheel={{ forceToAxis: true }}
              slidesPerView={4}
              spaceBetween={0}
              grabCursor
              className="!h-[340px]"
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

            <div className="relative z-10 flex justify-center bg-white pt-2">
              <ChevronDown className="h-5 w-5 animate-bounce text-brand-alt" aria-hidden />
            </div>
          </div>

          {/* Right — club detail */}
          <div key={club.id} className="grid flex-1 animate-fadeUp gap-6 md:grid-cols-2 md:gap-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:aspect-auto md:min-h-[300px]">
              <Image
                src={club.image}
                alt={club.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="relative flex flex-col pr-5">
              {/* right scroll accent */}
              <span
                aria-hidden
                className="absolute right-0 top-0 hidden h-full w-[3px] rounded-full bg-line md:block"
              >
                <span className="block h-1/2 w-full rounded-full bg-brand-alt" />
              </span>

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

              {club.instagram && (
                <Link
                  href={club.instagram}
                  aria-label={`${club.name} on Instagram`}
                  className="mt-5 inline-block transition-opacity hover:opacity-75"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/instagram.svg" alt="" aria-hidden className="h-8 w-8" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}