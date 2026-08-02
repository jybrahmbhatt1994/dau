// DESTINATION: app/api/campus-tour/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${process.env.WORDPRESS_API_URL}/wp-json/custom/v1/campus-tour`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return Response.json(await res.json(), { status: res.status });
}