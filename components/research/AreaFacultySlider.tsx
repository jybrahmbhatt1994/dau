"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { FacultyMember, SectionIntro } from "@/lib/types";

/**
 * Individual faculty card used in the Research Area detail page.
 *
 * Portrait (3:4 aspect, ~190px wide) + name + position below.
 * Matches the Figma: square-ish portrait, name in Namdhinggo bold navy,
 * position in Mulish sm text-ash below.
 */
function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <Link href={member.href} className="group block">
      {/* Portrait */}
      <div className="relative aspect-[190/220] w-full overflow-hidden bg-line">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 50vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Meta */}
      <div className="mt-3 px-1">
        <p className="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-brand">
          {member.name}
        </p>
        <p className="mt-1 text-sm text-ash">{member.position}</p>
      </div>
    </Link>
  );
}

/**
 * "Faculty" section on the Research Area Detail page.
 *
 * Layout:
 *  - SectionHeading: BleedTitle "Faculty" left + description paragraph right
 *  - Full-bleed-right Swiper showing 4.5 portraits on desktop, fewer on mobile
 *
 * Background: white, standard py-16 lg:py-20 rhythm.
 */
export function AreaFacultySlider({
  data,
}: {
  data: SectionIntro & { members: FacultyMember[] };
}) {
  return (
    <section
      id="faculty"
      className="scroll-mt-[150px] overflow-x-clip bg-white py-16 lg:py-20"
    >
      <Container>
        {/* BleedTitle left + description right */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <BleedTitle title={data.title} className="shrink-0" />
          {data.description && (
            <p className="max-w-xl text-base font-medium leading-relaxed text-ash lg:pt-2">
              {data.description}
            </p>
          )}
        </div>
      </Container>

      {/* Full-bleed-right slider */}
      <Container className="mt-10">
        <div className="mr-[calc(50%_-_50vw)]">
          <Swiper
            slidesPerView={2.2}
            spaceBetween={16}
            grabCursor
            breakpoints={{
              480:  { slidesPerView: 3.2, spaceBetween: 20 },
              768:  { slidesPerView: 4.2, spaceBetween: 20 },
              1024: { slidesPerView: 5.2, spaceBetween: 24 },
            }}
          >
            {data.members.map((member) => (
              <SwiperSlide key={member.id} className="h-auto">
                <FacultyCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}