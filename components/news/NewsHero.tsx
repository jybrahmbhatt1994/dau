import { NewsImage } from "@/lib/types";

interface NewsHeroProps {
  title: string;
  date: string;
  image: NewsImage | null;
}

export default function NewsHero({ title, date, image }: NewsHeroProps) {
  return (
    <div className="relative w-full h-[45vh] min-h-[320px] max-h-[520px]">
      {image ? (
        <img
          src={image.url}
          alt={image.alt || title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-5xl mx-auto">
        <time className="text-white/80 text-sm mb-2">{date}</time>
        <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}