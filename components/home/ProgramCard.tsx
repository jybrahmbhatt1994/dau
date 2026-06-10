import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import type { ProgramCard as ProgramCardType } from "@/lib/types";

export function ProgramCard({ card }: { card: ProgramCardType }) {
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col overflow-hidden bg-white shadow-card transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[366/244] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 28vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-snug text-navy">
            {card.title}
          </h3>
          <ArrowRight className="mt-1 h-5 w-7 shrink-0 text-brand-alt transition-transform group-hover:translate-x-1" />
        </div>
        <p className="mt-3 text-xs font-medium leading-relaxed text-ash">
          {card.excerpt}
        </p>
      </div>
    </Link>
  );
}