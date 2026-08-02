// DESTINATION: app/campus-tour/page.tsx
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { CampusTourForm } from "@/components/campus-tour/CampusTourForm";
import { getCampusTourFormOptions } from "@/lib/wordpress";

export const dynamic = "force-dynamic"; // fresh captcha token on every load
export const metadata = { title: "Campus Tour Registration | Ashoka University" };

export default async function CampusTourPage() {
  const options = await getCampusTourFormOptions();

  return (
    <>
      <PageHero
        title={options.hero.title}
        subline={options.hero.subline}
        image={options.hero.image}
      />

      <section className="bg-navy py-14 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-white lg:text-3xl">
              Campus Tour Registration Form
            </h2>
            <div className="mt-8">
              <CampusTourForm options={options} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}