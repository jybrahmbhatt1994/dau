"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/**
 * Full-bleed image gallery slider — same Swiper treatment as the homepage
 * PlacementsSection gallery (centered slides, loop, partial images peeking at
 * both edges). Used for the Co-curricular Activities gallery.
 */
export function ProgramGallery({ images }: { images: string[] }) {
  return (
    <div className="mt-10 lg:mt-12">
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
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}