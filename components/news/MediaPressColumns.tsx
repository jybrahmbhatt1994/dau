import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowRight } from "@/components/ui/icons";
import type { MediaColumn } from "@/lib/types";

function CardTitle({ title }: { title: string }) {
  return (
    <div className="inline-block">
      <h3 className="font-display text-xl font-semibold text-navy sm:text-2xl">
        {title}
      </h3>
      <span className="mt-3 block h-[3px] w-full bg-gold" />
    </div>
  );
}

function MediaCard({ col }: { col: MediaColumn }) {
  return (
    <div className="flex h-full flex-col border border-line bg-white p-7 lg:p-9">
      <CardTitle title={col.title} />

      <ul className="mt-8 flex-1 space-y-6">
        {col.items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-medium text-brand-alt">{item.date}</p>
                <h4 className="mt-1 font-display text-lg font-bold text-navy transition-colors group-hover:text-brand">
                  {item.title}
                </h4>
              </div>
              <ArrowRight className="h-5 w-6 shrink-0 text-brand-alt transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <ActionButton href={col.viewAllHref} variant="outline">
          View All
        </ActionButton>
      </div>
    </div>
  );
}

export function MediaPressColumns({
  inMedia,
  pressRelease,
}: {
  inMedia: MediaColumn;
  pressRelease: MediaColumn;
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <MediaCard col={inMedia} />
          <MediaCard col={pressRelease} />
        </div>
      </Container>
    </section>
  );
}