import { Container } from "@/components/ui/Container";
import { BleedTitle } from "@/components/ui/SectionTitle";

/**
 * DESTINATION: components/convocation/LiveBroadcastSection.tsx
 * Embeds the YouTube live broadcast video. White background.
 */
function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([\w-]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function LiveBroadcastSection({
  title,
  youtubeUrl,
}: {
  title: string;
  youtubeUrl: string;
}) {
  const embedUrl = youtubeUrl ? getYouTubeEmbedUrl(youtubeUrl) : null;
  if (!embedUrl) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <BleedTitle title={title} />

        <div className="relative mt-10 aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Container>
    </section>
  );
}