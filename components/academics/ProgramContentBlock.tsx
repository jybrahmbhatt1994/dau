import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";
import { ActionButton } from "@/components/ui/ActionButton";
import { ProgramGallery } from "@/components/academics/ProgramGallery";
import type { ProgramBlock } from "@/lib/types";

function Prose({ block }: { block: ProgramBlock }) {
  return (
    <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
      {block.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {block.bullets && block.bullets.length > 0 && (
        <ul className="list-disc space-y-2 pl-6 marker:text-ash">
          {block.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * One rich content block on a program page. Renders BleedTitle, then prose
 * (with optional bullets). If `image` is set it becomes a 2-column block
 * (text left, image right). `gallery` renders a 5-up image strip; `button`
 * renders a centered gold button. Section background via `className`.
 */
export function ProgramContentBlock({
  block,
  className = "bg-white",
}: {
  block: ProgramBlock;
  className?: string;
}) {
  return (
    <section
      id={block.id}
      className={`scroll-mt-24 overflow-x-clip py-16 lg:py-20 ${className}`}
    >
      <Container>
        <BleedTitle title={block.title} />

        {block.image ? (
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
            <Prose block={block} />
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[340px]">
              <Image
                src={block.image}
                alt={block.title}
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <Prose block={block} />
          </div>
        )}
      </Container>

      {block.gallery && block.gallery.length > 0 && (
        <ProgramGallery images={block.gallery} />
      )}

      {block.button && (
        <Container>
          <div className="mt-10 flex justify-center">
            <ActionButton href={block.button.href} variant="filledGold">
              {block.button.label}
            </ActionButton>
          </div>
        </Container>
      )}
    </section>
  );
}