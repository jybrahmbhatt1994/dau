import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

export interface RecruiterLogo {
  id: string;
  name: string;
  logo: string;
  /** Optional href — when provided the card becomes a link */
  href?: string;
}

/**
 * Single recruiter logo card. Thin border-line wrapper with the logo
 * centered inside. When `href` is provided, the whole card becomes a Link.
 */
function LogoCard({ recruiter }: { recruiter: RecruiterLogo }) {
  const inner = (
    <div className="relative flex aspect-[110/64] w-full items-center justify-center border border-line bg-white p-4 transition-shadow hover:shadow-card">
      <div className="relative h-full w-full">
        <Image
          src={recruiter.logo}
          alt={recruiter.name}
          fill
          sizes="(min-width: 1024px) 110px, (min-width: 640px) 25vw, 33vw"
          className="object-contain"
        />
      </div>
    </div>
  );

  return recruiter.href ? (
    <Link href={recruiter.href} aria-label={recruiter.name} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}

/**
 * "Recruiters" — sticky-left BleedTitle paired with a responsive logo grid.
 *
 * Layout (responsive):
 *  - mobile: 3 cols
 *  - sm:     4 cols
 *  - lg:     5 cols
 *  - Title stays sticky on lg+ at top-[160px] (clears header + sub-nav)
 *
 * Renders all logos at once — works cleanly up to ~100 entries. If the list
 * grows further, swap the render block to the shared Pagination component.
 *
 * Background: white, py-16 lg:py-20.
 */
export function RecruitersGrid({
  data,
}: {
  data: {
    title: string;
    items: RecruiterLogo[];
  };
}) {
  return (
    <section id="recruiters" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Sticky-left title */}
          <div className="lg:sticky lg:top-[160px] lg:self-start">
            <BleedTitle title={data.title} />
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
            {data.items.map((r) => (
              <LogoCard key={r.id} recruiter={r} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}