import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const wpUrl = process.env.WORDPRESS_API_URL;

  if (!wpUrl) {
    return NextResponse.json({ ok: false, error: "WORDPRESS_API_URL is not set on this environment" });
  }

  try {
    const res = await fetch(
      `${wpUrl}/wp-json/wp/v2/research-area?slug=ai-ml-and-data-science&_fields=id,slug`,
      { cache: "no-store" },
    );

    const status = res.status;
    const body = await res.text();

    return NextResponse.json({
      ok: res.ok,
      wpUrl,
      status,
      bodyPreview: body.slice(0, 500),
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      wpUrl,
      error: err.message,
      cause: String(err.cause ?? ""),
    });
  }
}