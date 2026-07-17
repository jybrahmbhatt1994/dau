import Image from "next/image";
import Link from "next/link";
import type { FacultyMember, FacultyCardData } from "@/lib/types";

// ============================================================================
//  SIMPLE CARD — for FacultyMember (id, name, position, image, href)
//  Used by FacultyMembersGrid.tsx (Placement Team, Dean pages, etc.)
//  4-column portrait grid — image on top, name + position below, wrapped
//  in a Link since FacultyMember always has an href.
// ============================================================================

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <Link href={member.href} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-navy">
        {member.name}
      </h3>
      <p className="mt-1 text-sm text-ash">{member.position}</p>
    </Link>
  );
}

// ============================================================================
//  RICH CARD — for FacultyCardData (department, interests, phone, address,
//  email). Used by FacultyExplorer.tsx (Faculty directory page).
//  Non-interactive — no individual faculty detail page exists.
// ============================================================================

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

function MapPinIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
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

export function FacultyDirectoryCard({ member }: { member: FacultyCardData }) {
  return (
    <div className="flex bg-surface">
      <div className="relative w-[180px] shrink-0 overflow-hidden sm:w-[220px]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5 p-6">
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-navy">
            {member.name}
          </h3>
          <p className="text-sm text-ash">
            {member.position}
            {member.department ? `, ${member.department}` : ""}
          </p>
        </div>

        {member.interests && (
          <p className="text-sm leading-relaxed text-black/70">
            {member.interests}
          </p>
        )}

        {(member.phone || member.address || member.email) && (
          <div className="space-y-2 text-sm text-black/70">
            {member.phone && (
              <div className="flex items-center gap-2">
                <PhoneIcon />
                <span>{member.phone}</span>
              </div>
            )}
            {member.address && (
              <div className="flex items-start gap-2">
                <span className="mt-0.5">
                  <MapPinIcon />
                </span>
                <span>{member.address}</span>
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