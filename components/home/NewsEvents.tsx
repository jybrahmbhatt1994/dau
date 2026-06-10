import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionButton } from "@/components/ui/ActionButton";
import type { HomeData } from "@/lib/types";

export function NewsEvents({ data }: { data: HomeData["news"] }) {
  const { featured, list } = data;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <SectionHeading title={data.title} description={data.description} />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Featured */}
          <article className="flex flex-col border border-line bg-white">
            <Link href={featured.href} className="group block">
              <div className="relative aspect-[681/411] w-full overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-medium text-ash">{featured.date}</p>
              <h3 className="mt-2 font-display text-[28px] font-semibold leading-snug text-navy">
                <Link href={featured.href} className="hover:text-brand">
                  {featured.title}
                </Link>
              </h3>
              {featured.excerpt && (
                <p className="mt-3 text-sm font-medium leading-relaxed text-ash">
                  {featured.excerpt}
                </p>
              )}
              <div className="mt-6">
                <ActionButton href={featured.href}>Read More</ActionButton>
              </div>
            </div>
          </article>

          {/* List — stretches to match the featured card height (each item grows equally) */}
          <div className="flex flex-col gap-5">
            {list.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-1 items-stretch overflow-hidden border border-line bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative w-[120px] shrink-0 overflow-hidden sm:w-[150px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="150px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-2 p-4 sm:p-5">
                  <p className="text-xs font-medium text-ash">{item.date}</p>
                  <h4 className="font-display text-xl font-semibold leading-snug text-navy">
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Centered button */}
        <div className="mt-10 flex justify-center">
          <ActionButton href="/newsroom">All News</ActionButton>
        </div>
      </Container>
    </section>
  );
}