import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { AlumniUsefulLinksData } from "@/lib/types";

/**
 * DESTINATION: components/alumni/AlumniUsefulLinksSection.tsx
 *
 * "Other Useful Links" — bordered box with a numbered list of links.
 * White/surface background.
 */
export function AlumniUsefulLinksSection({
  data,
}: {
  data: AlumniUsefulLinksData;
}) {
  return (
    <section className="bg-surface py-12 lg:py-16">
      <Container>
        <div className="border border-line bg-white p-8 lg:p-10">
          <h3 className="font-display text-lg font-bold text-navy">
            {data.title}
          </h3>

          <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm">
            {data.links.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className="font-medium text-brand underline underline-offset-2 hover:text-brand/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}