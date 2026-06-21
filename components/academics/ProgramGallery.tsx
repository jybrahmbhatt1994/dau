"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

/**
 * Full-bleed image gallery slider — same Swiper treatment as the homepage
 * PlacementsSection gallery (centered slides, loop, partial images peeking at
 * both edges).
 *
 * Used by:
 *  - Co-curricular Activities gallery (default aspect-[4/5])
 *  - Campus Life "Student Life" gallery (passes aspect-[15/16])
 *  - Faculty Recruitment image strip (passes aspect-[4/3] + autoplay)
 *
 * Props:
 *  - images: array of image URLs
 *  - aspect: tailwind class for the slide aspect ratio
 *  - autoplay: when true (or an object), enables Swiper's Autoplay module.
 *    Pass `true` for sensible defaults, or an object to customise the
 *    `delay` (default 3000ms) and other Swiper Autoplay options.
 */
export function ProgramGallery({
  images,
  aspect = "aspect-[4/5]",
  autoplay = false,
}: {
  images: string[];
  aspect?: string;
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
}) {
  const autoplayConfig =
    autoplay === false
      ? false
      : {
          delay: typeof autoplay === "object" ? autoplay.delay ?? 3000 : 3000,
          disableOnInteraction:
            typeof autoplay === "object"
              ? autoplay.disableOnInteraction ?? false
              : false,
          pauseOnMouseEnter: true,
        };

  return (
    <div className="mt-10 lg:mt-12">
      <Swiper
        modules={autoplayConfig ? [Autoplay] : []}
        slidesPerView={1.3}
        spaceBetween={10}
        centeredSlides
        loop
        grabCursor
        autoplay={autoplayConfig}
        breakpoints={{
          640: { slidesPerView: 2.5, spaceBetween: 10 },
          1024: { slidesPerView: 4.3, spaceBetween: 12 },
        }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className={`relative ${aspect} w-full overflow-hidden`}>
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