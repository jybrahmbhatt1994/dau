import Image from "next/image";
import Link from "next/link";
import type { VirtualTourContent } from "@/lib/types";

/**
 * Full-bleed banner image with a centered play button and a label beneath it —
 * the entry point to the campus virtual tour / video. Links out to `href`
 * (swap for a lightbox/modal later if needed).
 */
export function VirtualTourBanner({ data }: { data: VirtualTourContent }) {
  return (
    <section className="relative">
      <Link
        href={data.href}
        aria-label={data.label}
        className="group relative block h-[260px] w-full overflow-hidden sm:h-[400px] lg:h-[560px]"
      >
        <Image
          src={data.image}
          alt={data.label}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute inset-0 bg-black/15" aria-hidden />

        <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/60 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="font-display text-xl font-semibold text-white drop-shadow sm:text-2xl">
            {data.label}
          </span>
        </span>
      </Link>
    </section>
  );
}