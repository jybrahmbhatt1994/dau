import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "@/components/ui/icons";
import type { PageHeroContent } from "@/lib/types";

/**
 * Shared hero for every inner page (design-system.md: "Hero section is common
 * for all pages except homepage"). Full-bleed banner: the left ~63% is the
 * image, the right ~37% is an `ink` panel holding the page title (Namdhinggo,
 * white) with a gold underline, an optional breadcrumb, and an optional
 * supporting subline.
 *
 * Reuse unchanged on Admission / Faculty / Research / … — fully prop-driven
 * (title, subline, image, breadcrumb).
 *
 * Responsive: panes stack on mobile (image, then ink panel) and sit side by
 * side from `lg`. The panel text is right-aligned on `lg` and its right edge
 * lines up with the global container (px-10) on wide screens — no overflow.
 */

// Lines the panel's right edge up with <Container>'s right padding on screens
// wider than 1440 (container is centered max-w-1440 with 40px padding). Floors
// at 40px on smaller screens so the text never touches the viewport edge.
const EDGE_PAD = "max(2.5rem, calc((100vw - 1440px) / 2 + 2.5rem))";

export function PageHero({ title, subline, image, breadcrumb }: PageHeroContent) {
  return (
    <section className="w-full bg-ink">
      <div className="grid grid-cols-1 lg:grid-cols-[63%_37%]">
        {/* Banner image */}
        <div className="relative h-[220px] sm:h-[320px] lg:h-[415px]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 63vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Ink panel */}
        <div
          className="relative bg-ink px-6 py-10 sm:px-10 lg:py-12 lg:pl-12"
          style={{ paddingRight: `var(--hero-edge, ${EDGE_PAD})` }}
        >
          <div className="flex h-full flex-col justify-between gap-8 lg:items-end lg:text-right">
            <div className="w-full">
              {/* {breadcrumb && breadcrumb.length > 0 && (
                <nav
                  aria-label="Breadcrumb"
                  className="mb-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-medium text-white/70 lg:justify-end"
                >
                  {breadcrumb.map((crumb, i) => (
                    <span key={crumb.href} className="flex items-center gap-1.5">
                      {i > 0 && <ChevronRight className="h-3 w-3 text-white/40" />}
                      {i < breadcrumb.length - 1 ? (
                        <Link href={crumb.href} className="transition-colors hover:text-gold">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-white/90">{crumb.label}</span>
                      )}
                    </span>
                  ))}
                </nav>
              )} */}

              {/* inline-block so the gold underline matches the title block width */}
              {/* relative wrapper shrinks to the title; the underline is
                  anchored at its left (under the first letter) and runs 100vw
                  to the right, clipped at the screen edge by the global
                  `overflow-x: clip` — the mirror of BleedTitle's left bleed. */}
              <div className="relative inline-block max-w-full">
                <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-none text-white">
                  {title}
                </h1>
                <span
                  aria-hidden
                  className="absolute left-0 top-[calc(100%_+_1rem)] h-[3px] w-screen bg-gold"
                />
              </div>
            </div>

            {subline && (
              <p className="max-w-md text-sm font-medium leading-relaxed text-white/80 lg:text-base">
                {subline}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}