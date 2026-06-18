import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

interface BulletGroup {
  lead?: string;
  items: string[];
}

interface ResearchFunctionsData {
  title: string;
  /** Paragraphs that appear before the first bullet group */
  introParagraphs: string[];
  /** One or more groups of bullet points, each with an optional lead sentence */
  bulletGroups: BulletGroup[];
  /** Paragraphs that appear after all bullet groups */
  outroParagraphs: string[];
}

/**
 * "Functions of Office of the Dean" section for the Dean (Research) page.
 *
 * Renders a BleedTitle, then a mix of prose paragraphs, bullet-point groups,
 * and trailing paragraphs — matching the Figma layout exactly:
 *   - White background, standard section vertical padding
 *   - Left-bleeding gold underline on the heading
 *   - Normal `disc` bullet lists with `text-ash` body text
 */
export function ResearchFunctionsBlock({ data }: { data: ResearchFunctionsData }) {
  return (
    <section id="functions" className="scroll-mt-[150px] bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={data.title} />

        <div className="mt-10 space-y-5 text-[15px] leading-7 text-black/80 lg:text-base lg:leading-8">
          {/* Intro prose */}
          {data.introParagraphs.map((p, i) => (
            <p key={`intro-${i}`}>{p}</p>
          ))}

          {/* Bullet groups */}
          {data.bulletGroups.map((group, gi) => (
            <div key={`group-${gi}`}>
              {group.lead && <p>{group.lead}</p>}
              <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-ash">
                {group.items.map((item, ii) => (
                  <li key={ii}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Outro prose */}
          {data.outroParagraphs.map((p, i) => (
            <p key={`outro-${i}`}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}