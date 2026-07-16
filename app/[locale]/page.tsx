import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { localizedAlternates } from "@/lib/metadata";
import { FEATURES } from "@/lib/features";
import { getAppStoreRating } from "@/lib/appStoreRating";
import { getDictionary } from "./dictionaries";
import { Hero } from "@/components/home/Hero";
import { UsedBy } from "@/components/home/UsedBy";
import { StickyStory } from "@/components/home/StickyStory";
import { PositionPicker } from "@/components/home/PositionPicker";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { CoachesCta } from "@/components/home/CoachesCta";
import { ScrollScene } from "@/components/animations/ScrollScene";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: localizedAlternates(locale) };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const rating = await getAppStoreRating();

  return (
    <>
      <ScrollScene soft>
        <Hero dict={dict} locale={locale} rating={rating} />
      </ScrollScene>
      <ScrollScene>
        <UsedBy dict={dict} rating={rating} />
      </ScrollScene>
      <ScrollScene>
        <StickyStory dict={dict} locale={locale} />
      </ScrollScene>
      <ScrollScene>
        <Features dict={dict} locale={locale} />
      </ScrollScene>
      {FEATURES.positionPicker && (
        <ScrollScene>
          <PositionPicker dict={dict} locale={locale} />
        </ScrollScene>
      )}
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
      {FEATURES.coachesCta && (
        <ScrollScene>
          <CoachesCta dict={dict} />
        </ScrollScene>
      )}
    </>
  );
}
