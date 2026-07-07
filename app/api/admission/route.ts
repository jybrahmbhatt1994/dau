import { NextResponse } from "next/server";
import { getAdmissionDataset } from "@/lib/wordpress";

/**
 * GET /api/admission?course=<course-slug>&category=<category-slug?>
 *
 * The AdmissionExplorer client component fetches resolved datasets from
 * here. It proxies lib/wordpress.getAdmissionDataset(), so when the mock is
 * swapped for real WordPress fetches nothing on the client changes, and the
 * WP origin/credentials stay server-side.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const course = searchParams.get("course");
  const category = searchParams.get("category") ?? undefined;

  if (!course) {
    return NextResponse.json(
      { error: "`course` query param is required" },
      { status: 400 }
    );
  }

  const dataset = await getAdmissionDataset(course, category);

  if (!dataset) {
    return NextResponse.json(
      { error: "No admission data found for this selection" },
      { status: 404 }
    );
  }

  return NextResponse.json(dataset, {
    headers: {
      // Mock data is static; keep a short CDN cache once WP is live too.
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}