"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Container } from "@/components/ui/Container";

/**
 * DESTINATION: components/work/ImageGalleryStrip.tsx
 *
 * FIXED: now a Swiper slider (matching the gallery pattern used elsewhere
 * — e.g. Life@DAU / Placements galleries) instead of a static 4-image grid.
 * White background, sits below the About the Institute prose.
 */
export function ImageGalleryStrip({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  return (
    <section className="overflow-x-clip bg-white pb-16 lg:pb-20">
      <Container>
        <div className="mr-[calc(50%_-_50vw)]">
          <Swiper
            slidesPerView={1.6}
            spaceBetween={16}
            grabCursor
            breakpoints={{
              640: { slidesPerView: 2.5, spaceBetween: 18 },
              1024: { slidesPerView: 4.2, spaceBetween: 20 },
            }}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 24vw"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
}