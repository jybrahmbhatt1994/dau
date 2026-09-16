import Link from "next/link";
import type { AccreditationsLinkCard } from "@/lib/types";

export function AccreditationsCard({ card }: { card: AccreditationsLinkCard }) {
  return (
    <Link
      href={card.href}
      className="group flex w-[220px] flex-none flex-col items-center gap-4 border border-line bg-white px-6 py-10 text-center transition-colors hover:border-brand"
    >
      <img
        src={card.icon}
        alt=""
        className="h-14 w-14 object-contain"
        aria-hidden
      />
      <span className="font-display text-base font-bold text-navy">
        {card.label}
      </span>
    </Link>
  );
}
