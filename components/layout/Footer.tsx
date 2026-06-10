import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerLinks } from "@/data/navigation";

const linkClass =
  "text-sm font-medium text-black/80 transition-colors hover:text-brand";

// Shared grid: 2 cols (mobile) → 3 (sm) → 5 equal columns (lg) so all three
// groups line up. `grid-flow-col grid-rows-2` fills column-major (pairs stack),
// matching the Figma footer.
const pairedGrid =
  "grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-5 lg:grid-rows-2";

const rowGrid =
  "grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-5";

export function Footer() {
  return (
    <footer className="bg-white">
      <Container className="py-12 lg:py-16">
        {/* Top row: logo (left) + newsletter (right) */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo height={121} />
            <span className="mt-5 block h-[3px] w-[240px] max-w-full bg-gold" />
          </div>

          <div className="flex w-full items-center gap-5 lg:w-auto lg:max-w-xl">
            <span className="hidden shrink-0 font-display text-2xl text-neutral-400 sm:block">
              Newsletter
            </span>
            <form className="flex w-full" action="#" method="post">
              <input
                type="email"
                required
                placeholder="Your Email"
                aria-label="Your Email"
                className="h-[52px] w-full min-w-0 border border-line px-4 text-base outline-none focus:border-royal"
              />
              <button
                type="submit"
                className="h-[52px] shrink-0 bg-brand-alt px-6 text-base font-bold text-white transition-colors hover:bg-brand"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Primary links (no heading) */}
        <nav className="mt-12">
          <ul className={pairedGrid}>
            {footerLinks.primary.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Portal Links */}
        <div className="mt-12">
          <h3 className="font-display text-2xl font-semibold text-navy">Portal Links</h3>
          <ul className={`mt-5 ${pairedGrid}`}>
            {footerLinks.portal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links (single row) */}
        <div className="mt-12">
          <h3 className="font-display text-2xl font-semibold text-navy">Other Links</h3>
          <ul className={`mt-5 ${rowGrid}`}>
            {footerLinks.other.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}