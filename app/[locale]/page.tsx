import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { FEATURES } from "@/lib/features";
import { getDictionary } from "./dictionaries";
import { Hero } from "@/components/home/Hero";
import { UsedBy } from "@/components/home/UsedBy";
import { StickyStory } from "@/components/home/StickyStory";
import { PositionPicker } from "@/components/home/PositionPicker";
import { Features } from "@/components/home/Features";
import { DrillVideo } from "@/components/home/DrillVideo";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Spotlight } from "@/components/home/Spotlight";
import { PositionMarquee } from "@/components/home/PositionMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { Ratings } from "@/components/home/Ratings";
import { CoachesCta } from "@/components/home/CoachesCta";
import { ScrollScene } from "@/components/animations/ScrollScene";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <ScrollScene soft>
        <Hero dict={dict} />
      </ScrollScene>
      <ScrollScene>
        <UsedBy dict={dict} />
      </ScrollScene>
      <ScrollScene>
        <StickyStory dict={dict} />
      </ScrollScene>
      {FEATURES.positionPicker && (
        <ScrollScene>
          <PositionPicker dict={dict} locale={locale} />
        </ScrollScene>
      )}
      <ScrollScene>
        <Features dict={dict} />
      </ScrollScene>
      {FEATURES.drillVideo && (
        <ScrollScene>
          <DrillVideo dict={dict} />
        </ScrollScene>
      )}
      <ScrollScene>
        <WhyChoose dict={dict} />
      </ScrollScene>
      <ScrollScene>
        <Spotlight dict={dict} />
      </ScrollScene>
      <ScrollScene>
        <PositionMarquee dict={dict} />
      </ScrollScene>
      {FEATURES.testimonials && (
        <ScrollScene>
          <Testimonials dict={dict} />
        </ScrollScene>
      )}
      {FEATURES.faq && (
        <ScrollScene>
          <Faq dict={dict} />
        </ScrollScene>
      )}
      <ScrollScene>
        <Ratings dict={dict} />
      </ScrollScene>
      {FEATURES.coachesCta && (
        <ScrollScene>
          <CoachesCta dict={dict} />
        </ScrollScene>
      )}
    </>
  );
}
