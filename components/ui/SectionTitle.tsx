type Size = "lg" | "md";

const sizeClass: Record<Size, string> = {
  lg: "text-[clamp(2.25rem,5vw,3.75rem)]",
  md: "text-[clamp(1.75rem,3.5vw,2.5rem)]",
};

export function BleedTitle({
  title,
  size = "lg",
  light = false,
  className = "",
}: {
  title: string;
  size?: Size;
  light?: boolean;
  className?: string;
}) {
  return (
    // inline-block => the box shrinks to the text width, so the underline's
    // right edge lands exactly under the last glyph.
    <div className={`relative inline-block ${className}`}>
      <h2
        className={`font-display font-semibold leading-none ${sizeClass[size]} ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {/* right:0 = end of title; left:-100vw = runs off-screen left and gets
          clipped at the viewport edge by <main>'s overflow clip. */}
      <span
        aria-hidden
        className="absolute right-0 top-[calc(100%_+_0.75rem)] h-[3px] bg-gold"
        style={{ left: "-100vw" }}
      />
    </div>
  );
}