import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { SubNavLink } from "@/lib/types";

/**
 * Lavender in-page anchor bar shown directly under the hero. Page label on the
 * left, section jump-links on the right. Reusable across inner pages.
 *
 * Responsive: on mobile the links sit below the label and scroll horizontally
 * (no wrap, no overflow on the page itself).
 */
export function PageSubNav({
  label,
  links,
}: {
  label: string;
  links: SubNavLink[];
}) {
  return (
    <nav aria-label={`${label} sections`} className="sticky top-[72px] z-40 bg-[#ECEDFF] lg:top-[90px]">
      <Container className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0 sm:h-[56px]">
        <span className="shrink-0 font-display text-lg font-semibold text-navy">
          {label}
        </span>

        <ul className="-mx-1 flex items-center gap-5 overflow-x-auto whitespace-nowrap px-1 sm:mx-0 sm:flex-wrap sm:justify-end sm:gap-x-7 sm:overflow-visible sm:whitespace-normal sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-navy/90 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
