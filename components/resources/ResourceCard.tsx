import Link from "next/link";
import type { ResourceLinkCard } from "@/lib/types";

/**
 * DESTINATION: components/resources/ResourceCard.tsx
 *
 * Icon uses a plain <img> tag (not next/image) since it's typically an
 * uploaded SVG from WordPress — avoids Next.js Image optimization
 * complications with SVG files.
 *
 * Border is plain by default; on hover it picks up the brand color —
 * matching the "Policies" card shown as the hover-state example in Figma.
 */
export function ResourceCard({ card }: { card: ResourceLinkCard }) {
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