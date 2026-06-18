import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { FacultyMember } from "@/lib/types";

/**
 * Static responsive grid of people cards — portrait + name + "Position,
 * Department". 1 / 2 / 4 columns. Cards link out only when `href` is a real
 * path (a "#" placeholder renders as a non-link). Background via `className`.
 *
 * Used for the Student Body Government roster; reusable for any plain people
 * roster that isn't a slider.
 */
export function PeopleCardGrid({
  data,
  className = "bg-surface",
}: {
  data: { title: string; members: FacultyMember[] };
  className?: string;
}) {
  return (
    <section
      id="student-body"
      className={`scroll-mt-[150px] py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {data.members.map((member) => {
            const card = (
              <>
                <div className="relative aspect-[289/352] w-full overflow-hidden bg-line">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-ash">{member.position}</p>
              </>
            );

            return member.href && member.href !== "#" ? (
              <Link key={member.id} href={member.href} className="group block">
                {card}
              </Link>
            ) : (
              <div key={member.id} className="group">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}