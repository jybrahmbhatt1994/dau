import { Container } from "@/components/ui/Container";

export interface AreaDetailIntroData {
  paragraphs: string[];
  directorName: string;
  directorRole: string;
  directorMessage: string;
}

/**
 * Research Area Detail — intro section.
 *
 * From the Figma: a single full-width block of prose paragraphs on white.
 * The director message/name from the data is NOT rendered here — it belongs
 * to the hero subline. This section is purely the multi-paragraph description.
 *
 * Background: white, py-16 lg:py-20.
 */
export function AreaDetailIntro({ data }: { data: AreaDetailIntroData }) {
  return (
    <section id="intro" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <div className="space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {data.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}