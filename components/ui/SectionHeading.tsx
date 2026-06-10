import type { ReactNode } from "react";
import { BleedTitle } from "@/components/ui/SectionTitle";

interface SectionHeadingProps {
  title: string;
  description?: string;
  /** size of the heading; "lg" = 60px scale, "md" = 40px scale */
  size?: "lg" | "md";
  /** layout: title left + description right (default), or centered stack */
  align?: "split" | "center";
  light?: boolean;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  size = "lg",
  align = "split",
  light = false,
  children,
}: SectionHeadingProps) {
  const titleSize =
    size === "lg"
      ? "text-[clamp(2.25rem,5vw,3.75rem)]"
      : "text-[clamp(1.75rem,3.5vw,2.5rem)]";

  if (align === "center") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={`font-display font-semibold leading-tight ${titleSize} ${light ? "text-white" : "text-navy"}`}>
          {title}
        </h2>
        <span className="mx-auto mt-3 block h-[3px] w-24 bg-gold" />
        {description && (
          <p className={`mt-5 text-base font-medium leading-relaxed ${light ? "text-white/80" : "text-ash"}`}>
            {description}
          </p>
        )}
        {children}
      </div>
    );
  }

  return (
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <BleedTitle title={title} size={size} light={light} className="shrink-0" />
        {description && (
          <p
            className={`max-w-xl text-base font-medium leading-relaxed lg:pt-2 ${
              light ? "text-white/80" : "text-ash"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    );
}
