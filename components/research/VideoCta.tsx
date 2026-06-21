import Image from "next/image";
import Link from "next/link";

export interface VideoCtaContent {
  image: string;
  label: string;
  href: string;
}

/**
 * Full-bleed video banner — identical pattern to <VirtualTourBanner /> from
 * Life@DAU. Cover image fills the section, dark scrim on top, centred play
 * button with the label beneath it.
 *
 * Reuse: the Campus Life page already ships this exact treatment for the
 * Virtual Tour. We mirror it here so the two video CTAs read the same.
 */
export function VideoCta({ data }: { data: VideoCtaContent }) {
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