import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { LeaderProfileContent } from "@/lib/types";

/**
 * A single leader's profile: section title, then a portrait with name + role
 * and a multi-paragraph bio. `imageSide` places the portrait left or right
 * (the portrait always stacks on top on mobile). `whitespace-pre-line` honours
 * line breaks in the bio. Used for President / Director General (Leadership)
 * and every Administration office.
 */
export function LeaderProfile({
  data,
  id,
  className = "bg-white",
  imageSide = "left",
}: {
  data: LeaderProfileContent;
  id?: string;
  className?: string;
  imageSide?: "left" | "right";
}) {
  const right = imageSide === "right";

  const media = (
    <div className={right ? "order-1 lg:order-2" : "order-1"}>
      <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-navy">{data.name}</h3>
      <p className="mt-1 text-sm text-ash">{data.role}</p>
    </div>
  );

  const bio = (
    <div
      className={`space-y-5 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8 ${
        right ? "order-2 lg:order-1" : "order-2"
      }`}
    >
      {data.bio.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );

  return (
    <section id={id} className={`scroll-mt-24 py-16 lg:py-20 ${className}`}>
      <Container>
        <BleedTitle title={data.title} />
        <div
          className={`mt-10 grid grid-cols-1 gap-10 lg:gap-14 ${
            right ? "lg:grid-cols-[1fr_360px]" : "lg:grid-cols-[360px_1fr]"
          }`}
        >
          {media}
          {bio}
        </div>
      </Container>
    </section>
  );
}