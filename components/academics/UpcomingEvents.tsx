import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import type { EventItem } from "@/lib/types";

function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={event.href}
      className="group flex h-full flex-col border border-line bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative aspect-[418/230] w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="text-sm text-ash">{event.date}</p>
        <h3 className="mt-2 font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-brand lg:text-lg">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}

export function UpcomingEvents({
  data,
}: {
  data: { title: string; items: EventItem[]; allHref: string };
}) {
  return (
    <section className="bg-white pb-16 lg:pb-20">
      <Container>
        <h2 className="text-center font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-navy">
          {data.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ActionButton href={data.allHref} variant="outline">
            All Events
          </ActionButton>
        </div>
      </Container>
    </section>
  );
}