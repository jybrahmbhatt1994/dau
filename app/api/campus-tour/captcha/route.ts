// DESTINATION: app/api/campus-tour/captcha/route.ts
export async function GET() {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/custom/v1/campus-tour/captcha`,
    { cache: "no-store" }
  );
  return Response.json(await res.json(), { status: res.status });
}