import { Container } from "@/components/ui/Container";
import Image from "next/image";
import type { HomeData } from "@/lib/types";

export function DiversitySection({ data }: { data: HomeData["diversity"] }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src={data.image}
              alt="Paper mark"
              width={262}
              height={107}
            />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-tight text-navy mt-12">
            {data.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-ash">
            {data.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
