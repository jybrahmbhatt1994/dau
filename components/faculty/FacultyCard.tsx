import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import type { FacultyMember } from "@/lib/types";

/**
 * Faculty card with portrait + name/position below.
 *
 * Hover/focus behaviour (mirrors OfficialCard):
 *  - Default state: portrait on top, name + position in plain text below
 *  - On hover/focus: a navy panel rises from the bottom of the portrait,
 *    covering its lower portion, revealing the name (gold), position (white),
 *    and a "View Profile →" link to the faculty's detail page
 *
 * Keyboard-accessible via `tabIndex={0}`, with `group-focus-within` so the
 * panel stays open while the link inside is focused.
 */
export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <div
      tabIndex={0}
      className="group relative w-full outline-none"
    >
      {/* Portrait — squarer 4:5 ratio to match Figma faculty grid */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-line">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="object-cover object-top"
        />
      </div>

      {/* Default caption — fades out on hover/focus */}
      <div className="mt-4 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
        <h3 className="font-display text-lg font-bold text-navy">
          {member.name}
        </h3>
        <p className="mt-1 text-sm text-ash">{member.position}</p>
      </div>

      {/* Hover / focus detail panel — rises from the bottom of the portrait */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-ink px-5 py-5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <h3 className="font-display text-xl font-semibold text-gold">
          {member.name}
        </h3>
        <p className="mt-2 text-sm text-white">{member.position}</p>
        <Link
          href={member.href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-gold"
        >
          View Profile
          <ArrowRight className="h-3.5 w-4" />
        </Link>
      </div>
    </div>
  );
}