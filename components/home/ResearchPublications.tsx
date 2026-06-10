import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ActionButton } from "@/components/ui/ActionButton";
import type { HomeData } from "@/lib/types";

export function ResearchPublications({ data }: { data: HomeData["publications"] }) {
  return (
    <section className="bg-white pb-16 lg:pb-20">
      <Container>
        {/* Sub-section heading: h3, smaller, no underline */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h3 className="shrink-0 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-navy">
            {data.title}
          </h3>
          {data.description && (
            <p className="max-w-xl text-base font-medium leading-relaxed text-navy/80 lg:pt-2">
              {data.description}
            </p>
          )}
        </div>

        {/* 2-column list: image left, date above title */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-stretch overflow-hidden border border-line bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative w-[120px] shrink-0 overflow-hidden sm:w-[170px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="170px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-2 p-5 sm:p-6">
                <p className="text-xs font-medium text-ash">{item.date}</p>
                <h4 className="font-display text-xl font-semibold leading-snug text-navy sm:text-2xl">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ActionButton href="/research/publications">View All</ActionButton>
        </div>
      </Container>
    </section>
  );
}