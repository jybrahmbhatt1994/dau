import { Container } from "@/components/ui/Container";
import type { PolicyLinkItem } from "@/lib/types";

/**
 * DESTINATION: components/resources/PoliciesListSection.tsx
 *
 * No sub-nav on this page — matches the reference exactly (Hero straight
 * into this section, no lavender bar). Download icon uses the static
 * asset at /public/download.png (referenced as "/download.png").
 *
 * Text color is plain by default; the first row's orange color in the
 * reference is just its :hover state, applied identically to every row —
 * not a distinct default style.
 */
export function PoliciesListSection({
  sectionTitle,
  sectionSubtitle,
  items,
}: {
  sectionTitle: string;
  sectionSubtitle: string;
  items: PolicyLinkItem[];
}) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <Container>
        <div className="text-center">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy">
            {sectionTitle}
          </h2>
          <p className="mt-3 text-base text-black/70">{sectionSubtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm transition-colors hover:text-brand sm:px-8"
            >
              <span className="text-base font-medium text-navy transition-colors group-hover:text-brand">
                {item.title}
              </span>
              <img
                src="/download.png"
                alt="Download"
                className="h-6 w-6 shrink-0"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}