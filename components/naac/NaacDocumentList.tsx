import { ChevronRight } from "@/components/ui/icons";
import type { NaacDocumentLink } from "@/lib/types";

export function NaacDocumentList({ documents }: { documents: NaacDocumentLink[] }) {
  return (
    <ul className="space-y-2">
      {documents.map((doc) => (
        <li key={doc.id}>
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-1.5 text-sm font-medium text-navy transition-colors hover:text-brand"
          >
            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="underline-offset-2 group-hover:underline">{doc.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
