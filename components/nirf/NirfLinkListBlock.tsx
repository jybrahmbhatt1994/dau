import { NirfDocumentList } from "@/components/nirf/NirfDocumentList";
import type { NirfDocumentLink } from "@/lib/types";

export function NirfLinkListBlock({
  heading,
  documents,
}: {
  heading: string;
  documents: NirfDocumentLink[];
}) {
  if (documents.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-brand">{heading}</h2>
      <div className="mt-4">
        <NirfDocumentList documents={documents} />
      </div>
    </div>
  );
}
