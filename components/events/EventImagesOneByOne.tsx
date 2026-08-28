import type { EventImage } from "@/lib/types";

interface EventImagesOneByOneProps {
  images: EventImage[];
}

export default function EventImagesOneByOne(props: EventImagesOneByOneProps) {
  const images = props.images;

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.alt || "Event image " + (i + 1)}
          className="w-full h-auto rounded-lg"
        />
      ))}
    </div>
  );
}