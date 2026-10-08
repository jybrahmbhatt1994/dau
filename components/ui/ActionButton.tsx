import Link from "next/link";
import { ArrowRight } from "./icons";

type Variant =
  | "outline"
  | "outlineLight"
  | "outlineDark"
  | "filledRoyal"
  | "filledRed"
  | "filledGold";

const styles: Record<Variant, string> = {
  outline: "border border-royal text-royal hover:bg-royal hover:text-white",
  outlineLight: "border border-white text-white hover:bg-white hover:text-navy",
  outlineDark: "border border-navy text-navy hover:bg-navy hover:text-white",
  filledRoyal: "border border-royal bg-royal text-white hover:bg-royal/90",
  filledRed: "border border-brand-alt bg-brand-alt text-white hover:bg-brand-alt/90",
  // gold fill with navy text — "Apply Now" / "Know More" on light backgrounds
  filledGold: "border border-gold bg-gold text-navy hover:bg-gold/90",
};

export function ActionButton({
  href,
  children,
  variant = "outline",
  className = "",
  newTab = false,
  fixedWidth = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens the link in a new tab — e.g. a button linking straight to an uploaded PDF. */
  newTab?: boolean;
  /** Default `true` (217px, matches every existing button). Set `false` to size
   *  to the label instead — e.g. a longer one-off label that would otherwise wrap. */
  fixedWidth?: boolean;
}) {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`group inline-flex h-12 ${fixedWidth ? "w-[217px]" : "w-auto whitespace-nowrap"} max-w-full items-center justify-between gap-3 px-5 font-display text-base font-bold uppercase tracking-wide transition-colors ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}