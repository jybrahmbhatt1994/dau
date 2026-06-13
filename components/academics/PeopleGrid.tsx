import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { PeopleCategory } from "@/lib/types";

export function PeopleGrid({
  data,
}: {
  data: { title: string; categories: PeopleCategory[] };
}) {
  return (
    <section id="people" className="scroll-mt-24 bg-ink py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} light />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {data.categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex items-stretch border border-white/15 transition-colors hover:border-gold/60"
            >
              <div className="relative aspect-square w-[120px] shrink-0 overflow-hidden sm:w-[150px]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 items-center px-5 sm:px-6">
                <h3 className="text-base font-medium text-white sm:text-lg">
                  {cat.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}