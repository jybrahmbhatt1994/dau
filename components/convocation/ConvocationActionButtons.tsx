import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { ConvocationActionButton } from "@/lib/types";

const DEFAULT_ICONS = ["/tv-03.png", "/file-04.png"];

export function ConvocationActionButtons({
  buttons,
}: {
  buttons: ConvocationActionButton[];
}) {
  if (buttons.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {buttons.map((btn, i) => {
            const iconSrc =
              btn.icon || DEFAULT_ICONS[i % DEFAULT_ICONS.length];

            return (
              <Link
                key={i}
                href={btn.href}
                target={btn.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#F6EFD9] px-6 py-3 font-display text-lg font-semibold text-navy transition-colors hover:bg-[#efe6c8]"
              >
                <img src={iconSrc} alt="" className="h-5 w-5" aria-hidden />
                {btn.label}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}