import Image from "next/image";
import type { StaffCardData } from "@/lib/types";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4 shrink-0 text-ash"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-4 w-4 shrink-0 text-ash"
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

/**
 * DESTINATION: components/staff/StaffCard.tsx
 *
 * Uses CSS Grid (not flex) for the outer layout — grid items stretch to
 * fill the row height by default, and `h-full` on the image wrapper makes
 * this explicit rather than relying on flex stretch behavior. Combined
 * with min-h-[240px] on the card, the photo always renders at full size
 * regardless of how little text sits beside it.
 */
export function StaffCard({ member }: { member: StaffCardData }) {
  return (
    <div className="grid min-h-[240px] grid-cols-[180px_1fr] bg-surface sm:grid-cols-[220px_1fr]">
      {/* Photo — h-full guarantees it fills the row exactly */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center gap-5 p-6">
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-navy">
            {member.name}
          </h3>
          <p className="text-sm text-ash">
            {member.position}
            {member.department ? `, ${member.department}` : ""}
          </p>
        </div>

        {(member.phone || member.email) && (
          <div className="space-y-2 text-sm text-black/70">
            {member.phone && (
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <span>{member.phone}</span>
              </div>
            )}
            {member.email && (
              <div className="flex items-center gap-2">
                <MailIcon />
                <span>{member.email}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}