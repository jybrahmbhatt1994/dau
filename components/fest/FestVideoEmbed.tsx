interface FestVideoEmbedProps {
  embedHtml: string;
}

function toEmbedSrc(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  if (yt) {
    return "https://www.youtube.com/embed/" + yt[1];
  }

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return "https://player.vimeo.com/video/" + vimeo[1];
  }

  return null;
}

export default function FestVideoEmbed(props: FestVideoEmbedProps) {
  const embedHtml = props.embedHtml;
  const trimmed = embedHtml.trim();
  const isRawUrl = /^https?:\/\//.test(trimmed) && trimmed.indexOf("<iframe") === -1;
  const embedSrc = isRawUrl ? toEmbedSrc(trimmed) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="aspect-video rounded-lg overflow-hidden bg-black">
        {isRawUrl && embedSrc ? (
          <iframe
            src={embedSrc}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null}

        {isRawUrl && !embedSrc ? (
          <a
            href={trimmed}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-full text-white underline"
          >
            Watch video
          </a>
        ) : null}

        {!isRawUrl ? (
          <div
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: trimmed }}
          />
        ) : null}
      </div>
    </div>
  );
}