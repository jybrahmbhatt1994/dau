import Link from "next/link";
import { ArrowRight } from "./icons";

type Variant = "outline" | "outlineLight" | "filledRoyal" | "filledRed";

const styles: Record<Variant, string> = {
  outline:
    "border border-royal text-royal hover:bg-royal hover:text-white",
  outlineLight:
    "border border-white text-white hover:bg-white hover:text-navy",
  filledRoyal:
    "border border-royal bg-royal text-white hover:bg-royal/90",
  filledRed:
    "border border-brand-alt bg-brand-alt text-white hover:bg-brand-alt/90",
};

export function ActionButton({
  href,
  children,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-12 w-[217px] max-w-full items-center justify-between px-5 font-display text-base font-bold uppercase tracking-wide transition-colors ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-5 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
