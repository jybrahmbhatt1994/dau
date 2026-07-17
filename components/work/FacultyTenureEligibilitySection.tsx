import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import type { FacultyTenureEligibilityRole } from "@/lib/types";

/**
 * DESTINATION: components/work/FacultyTenureEligibilitySection.tsx
 * "Eligibility Criteria" — general bullet list, then repeatable
 * role blocks (bold subheading + paragraph). Surface background.
 */
export function FacultyTenureEligibilitySection({
  title,
  generalBullets,
  roles,
}: {
  title: string;
  generalBullets: string[];
  roles: FacultyTenureEligibilityRole[];
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <BleedTitle title={title} />

        {generalBullets.length > 0 && (
          <ul className="mt-6 list-disc space-y-2 pl-5 text-[15px] leading-7 text-black/80 marker:text-ash">
            {generalBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        <div className="mt-8 space-y-6">
          {roles.map((role, i) => (
            <div key={i}>
              <h3 className="font-display text-lg font-bold text-navy">
                {role.role}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-black/80">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}