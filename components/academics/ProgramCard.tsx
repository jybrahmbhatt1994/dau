import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import type { ProgramCard as ProgramCardType } from "@/lib/types";

/**
 * Program card used by the "Academics" slider. Mirrors the home page
 * ProgramCard contract (id, title, excerpt, image, href). If a shared card
 * already exists under components/home, swap this import for that one.
 *
 * Aspect ratio 366:244 (≈3:2) per the Figma. `h-full` lets the slide stretch
 * to equal heights inside the Swiper.
 */
export function ProgramCard({ card }: { card: ProgramCardType }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[366/244] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-navy">{card.title}</h3>
          <ArrowRight className="h-4 w-6 shrink-0 text-brand-alt transition-transform group-hover:translate-x-1" />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ash">{card.excerpt}</p>
      </div>
    </Link>
  );
}
