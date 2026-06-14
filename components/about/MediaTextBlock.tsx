import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Media + prose block with no heading. Image on one side, paragraphs on the
 * other (vertically centered). `imageSide` picks the side; `className` sets the
 * background. A subtle offset frame sits behind the image on large screens.
 */
export function MediaTextBlock({
  image,
  paragraphs,
  imageSide = "left",
  className = "bg-surface",
}: {
  image: string;
  paragraphs: string[];
  imageSide?: "left" | "right";
  className?: string;
}) {
  const media = (
    <div className="relative">
      <span
        aria-hidden
        className="absolute -bottom-3 -right-3 hidden h-full w-full border border-line lg:block"
      />
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );

  const text = (
    <div className="flex flex-col justify-center space-y-5 whitespace-pre-line text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );

  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {imageSide === "left" ? (
            <>
              {media}
              {text}
            </>
          ) : (
            <>
              {text}
              {media}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}