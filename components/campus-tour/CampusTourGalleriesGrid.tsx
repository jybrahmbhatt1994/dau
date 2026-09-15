import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SchoolCard } from "@/lib/types";

export function CampusTourGalleriesGrid({ galleries }: { galleries: SchoolCard[] }) {
  if (galleries.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {galleries.map((gallery) => (
            <Link
              key={gallery.id}
              href={gallery.href}
              className="group w-[340px] flex-none overflow-hidden rounded-lg border border-line bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-navy">
                  {gallery.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
