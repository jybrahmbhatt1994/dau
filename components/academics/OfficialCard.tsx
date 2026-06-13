import Image from "next/image";
import type { Official } from "@/lib/types";

/**
 * Official person card. Default: portrait with name + position centered below.
 * On hover (and keyboard focus, for a11y) a navy panel rises from the bottom,
 * covering the lower portion of the portrait, and reveals full contact details
 * (name in gold, position, email, phone).
 *
 * `tabIndex={0}` makes the card focusable so the reveal works without a mouse;
 * the panel itself uses `group-focus-within` too so focusing the links keeps
 * it open.
 */
export function OfficialCard({ person }: { person: Official }) {
  return (
    <div
      tabIndex={0}
      className="group relative w-full max-w-[290px] outline-none"
    >
      {/* Portrait */}
      <div className="relative aspect-[290/338] w-full overflow-hidden bg-line">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="290px"
          className="object-cover"
        />
      </div>

      {/* Default caption (fades out on hover/focus) */}
      <div className="mt-4 text-center transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
        <h3 className="font-display text-lg font-bold text-navy">{person.name}</h3>
        <p className="mt-1 text-sm text-ash">{person.position}</p>
      </div>

      {/* Hover / focus detail panel */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-ink px-5 py-5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <h3 className="font-display text-xl font-semibold text-gold">{person.name}</h3>
        <p className="mt-3 text-sm text-white">{person.position}</p>
        <a
          href={`mailto:${person.email}`}
          className="mt-3 block break-all text-sm text-white transition-colors hover:text-gold"
        >
          {person.email}
        </a>
        <a
          href={`tel:${person.phone.replace(/[^+\d]/g, "")}`}
          className="mt-3 block text-sm text-white transition-colors hover:text-gold"
        >
          {person.phone}
        </a>
      </div>
    </div>
  );
}