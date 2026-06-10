import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import type { HomeData } from "@/lib/types";

export function UpcomingEvents({ data }: { data: HomeData["events"] }) {
  return (
    <section className="bg-white pb-16 lg:pb-20">
      <Container>
        <h2 className="text-center font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-navy">
          {data.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col border border-line bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[422/230] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-sm font-medium text-ash">{item.date}</p>
                <h3 className="font-display text-lg font-bold leading-snug text-navy">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ActionButton href="/events">View All</ActionButton>
        </div>
      </Container>
    </section>
  );
}
