import Link from "next/link";
import Image from "next/image";
import logo from "@/public/footer-logo.png";

export function Logo({
  className = "",
  underline = false,
  height = 77,
}: {
  className?: string;
  underline?: boolean;
  /** rendered logo height in px (width scales automatically) */
  height?: number;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex flex-col ${className}`}
      aria-label="Dhirubhai Ambani University — Home"
    >
      <Image
        src={logo}
        alt="Dhirubhai Ambani University"
        priority
        style={{ height, width: "auto" }}
        className="object-contain"
      />
      {underline && <span className="mt-2 block h-[3px] w-full bg-gold" />}
    </Link>
  );
}