import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import type { EventItem } from "@/lib/types";

/**
 * EventItem extended with optional time field for the Research Area Detail page.
 * The base EventItem.date field can include the time (e.g. "19 Apr, 12:20PM").
 */
function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={event.href}
      className="group flex h-full flex-col bg-white transition-shadow hover:shadow-card"
    >
      {/* Image */}
      <div className="relative aspect-[418/260] w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        {/* Date + time on one line */}
        <p className="text-sm text-ash">{event.date}</p>
        <h3 className="mt-2 font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand lg:text-lg">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}

/**
 * "Upcoming Events" section — pixel-matched to Figma screenshot 5.
 *
 * Design spec:
 *  - Surface (#F7F7F8) background (NOT white)
 *  - Centered Namdhinggo heading "Upcoming Events"
 *  - 3-col grid of cards — NO card border, white card bg with hover shadow
 *  - date field includes time (e.g. "19 Apr, 12:20PM")
 *  - NO "All Events" button shown in this variant (pass showAllButton to enable)
 *
 * Background: bg-surface, py-16 lg:py-20.
 */
export function UpcomingEvents({
  data,
  showAllButton = true,
}: {
  data: { title: string; items: EventItem[]; allHref: string };
  showAllButton?: boolean;
}) {
  return (
    <section
      id="events"
      className="scroll-mt-[150px] bg-surface py-16 lg:py-20"
    >
      <Container>
        {/* Centered heading */}
        <h2 className="text-center font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-navy">
          {data.title}
        </h2>

        {/* 3-col card grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Optional "All Events" button */}
        {showAllButton && (
          <div className="mt-12 flex justify-center">
            <ActionButton href={data.allHref} variant="outline">
              All Events
            </ActionButton>
          </div>
        )}
      </Container>
    </section>
  );
}