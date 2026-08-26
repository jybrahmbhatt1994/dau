"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { PhoneIcon } from "@/components/ui/icons";
import type { FacultyMember } from "@/lib/types";

/** Small envelope glyph — kept local since it isn't in the shared icon set. */
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4 4h16v16H4z" />
      <path d="m4 6 8 7 8-7" />
    </svg>
  );
}

/**
 * Tabbed responsive grid of people cards — portrait, name, designation, and
 * optional contact details (email / phone+extn / office / day & timing).
 * 1 / 2 / 4 columns. Cards link out only when `href` is a real path (a "#"
 * placeholder renders as a non-link). Background via `className`.
 *
 * Every contact row is optional and simply omitted when empty, so this same
 * grid covers everything from a bare name+title (SBG core team) to a full
 * contact card (Wardens, Counsellors, DAC).
 *
 * Tab bar mirrors the pill style used on the legacy DAU site (active tab:
 * navy pill with a small pointer; inactive: light pill). Scrolls
 * horizontally on mobile if there are many tabs.
 */
export function PeopleCardGrid({
  data,
  className = "bg-surface",
}: {
  data: {
    title: string;
    tabs: Array<{ id: string; label: string; members: FacultyMember[] }>;
  };
  className?: string;
}) {
  const [activeId, setActiveId] = useState(data.tabs[0]?.id);
  const activeTab = data.tabs.find((t) => t.id === activeId) ?? data.tabs[0];

  return (
    <section
      id="student-body"
      className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />

        {data.tabs.length > 1 && (
          <div
            role="tablist"
            aria-label={data.title}
            className="-mx-1 mt-10 flex items-end gap-2 overflow-x-auto whitespace-nowrap px-1 [scrollbar-width:none] lg:mt-12 [&::-webkit-scrollbar]:hidden"
          >
            {data.tabs.map((tab) => {
              const isActive = tab.id === activeTab?.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveId(tab.id)}
                  className={`relative shrink-0 px-6 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-navy text-white"
                      : "bg-line/40 text-navy hover:bg-line/70"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-navy"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {activeTab?.members.map((member) => {
            const card = (
              <>
                <div className="relative aspect-[289/352] w-full overflow-hidden bg-line">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-navy">
                  {member.name}
                </h3>

                {/* position may contain a literal "\n" for a second
                    designation line, e.g. "Dean (Students)\nConvener (ex-officio)" */}
                {member.position && (
                  <p className="mt-1 whitespace-pre-line text-sm text-ash">
                    {member.position}
                  </p>
                )}

                {member.office && (
                  <p className="mt-2 text-sm text-ash">Office: {member.office}</p>
                )}

                {(member.email || member.phone) && (
                  <div className="mt-3 space-y-1.5">
                    {member.email && (
                      <a
                        href={`mailto:${member.email.replace(/\[at\]/g, "@").replace(/\[dot\]/g, ".")}`}
                        className="flex items-center gap-2 text-sm text-brand hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MailIcon className="h-4 w-4 shrink-0" />
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <p className="flex items-center gap-2 text-sm text-ash">
                        <PhoneIcon className="h-4 w-4 shrink-0" />
                        {member.phone}
                        {member.extension && `, Extn: ${member.extension}`}
                      </p>
                    )}
                  </div>
                )}

                {member.availability && (
                  <p className="mt-1.5 text-sm text-ash">{member.availability}</p>
                )}
              </>
            );

            return member.href && member.href !== "#" ? (
              <Link key={member.id} href={member.href} className="group block">
                {card}
              </Link>
            ) : (
              <div key={member.id} className="group">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}