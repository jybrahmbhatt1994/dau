"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { FacultyCard } from "@/components/faculty/FacultyCard";
import type { FacultyMember } from "@/lib/types";

/**
 * Reusable BleedTitle + 4-col faculty grid (no pagination).
 *
 * Used by:
 *  - Placement Team page — "Placement Cell Team" (static, showContact)
 *  - any future team/people listing pages
 *
 * Student Placement Cell now uses <StudentCellAccordionGrid /> instead
 * (year-wise accordions), not this component.
 *
 * Props:
 *  - data:       { title, members[] } — data shape works cleanly with CMS
 *                accessors (one per team, fetched independently)
 *  - className:  section background utility (defaults to bg-white)
 *  - id:         optional section anchor id
 *  - showContact: when true, renders email/phone under each card (used by
 *                Placement Team; leaves the shared <FacultyCard /> untouched
 *                for other pages that reuse this grid)
 */
export function FacultyMembersGrid({
  data,
  className = "bg-white",
  id,
  showContact = false,
}: {
  data: {
    title: string;
    members: FacultyMember[];
  };
  className?: string;
  id?: string;
  showContact?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />

        {data.members.length === 0 ? (
          <p className="mt-10 text-center text-sm text-ash">
            No team members listed yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-12 lg:mt-14">
            {data.members.map((member) =>
              showContact ? (
                <TeamMemberCard key={member.id} member={member} />
              ) : (
                <FacultyCard key={member.id} member={member} />
              ),
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

// ============================================================================
//  TeamMemberCard — local-only variant of FacultyCard that additionally
//  renders email + phone. Kept inside this file (not exported, not shared)
//  so FacultyCard.tsx and its other consumers (Dean page, etc.) are
//  unaffected. Used only when `showContact` is passed to FacultyMembersGrid.
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

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-4 w-4 shrink-0"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.56V9h3.55v11.45Z" />
    </svg>
  );
}

// ============================================================================
//  StudentCellCard — variant used for the Student Placement Cell grid.
//  Same base layout as FacultyCard (image, name, position) plus an optional
//  "LinkedIn Profile" link when member.linkedinUrl is present. Local to this
//  file only — FacultyCard.tsx is untouched.
// ============================================================================

export function StudentCellCard({ member }: { member: FacultyMember }) {
  return (
    <div className="group block">
      <Link href={member.href} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <Link href={member.href}>
        <h3 className="mt-4 font-display text-base font-bold text-navy">
          {member.name}
        </h3>
      </Link>
      <p className="mt-1 text-sm text-ash">{member.position}</p>

      {member.linkedinUrl && (
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-red hover:underline"
        >
          <LinkedInIcon />
          LinkedIn Profile
        </a>
      )}
    </div>
  );
}

function TeamMemberCard({ member }: { member: FacultyMember }) {
  return (
    <div className="group block">
      <Link href={member.href} className="block">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-line">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <Link href={member.href}>
        <h3 className="mt-4 font-display text-base font-bold text-navy">
          {member.name}
        </h3>
      </Link>
      <p className="mt-1 text-sm text-ash">{member.position}</p>

      {(member.email || member.phone) && (
        <div className="mt-3 space-y-1.5 text-sm text-black/70">
          {member.email && (
            <div className="flex items-center gap-2">
              <MailIcon />
              <a
                href={`mailto:${member.email}`}
                className="min-w-0 break-words hover:text-navy"
              >
                {member.email}
              </a>
            </div>
          )}
          {member.phone && (
            <div className="flex items-center gap-2">
              <PhoneIcon />
              <a href={`tel:${member.phone}`} className="hover:text-navy">
                {member.phone}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}