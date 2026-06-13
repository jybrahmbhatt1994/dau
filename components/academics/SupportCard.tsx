import Image from "next/image";
import Link from "next/link";
import type { SupportCard as SupportCardType } from "@/lib/types";

/** Card for the Academic Support slider. Aspect 844:460 (≈ 11:6) per Figma. */
export function SupportCard({ card }: { card: SupportCardType }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[844/460] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="font-display text-lg font-bold text-navy">{card.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ash">{card.excerpt}</p>
      </div>
    </Link>
  );
}
