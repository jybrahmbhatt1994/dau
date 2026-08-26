import type { NewsImage } from "@/lib/types";

interface NewsImageGridProps {
  images: NewsImage[];
}

export default function NewsImageGrid(props: NewsImageGridProps) {
  const images = props.images;

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
          <img
            src={img.url}
            alt={img.alt || "News image " + (i + 1)}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}