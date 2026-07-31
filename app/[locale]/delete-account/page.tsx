import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/metadata";
import { getDictionary } from "../dictionaries";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/delete-account">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata(locale, "/delete-account", dict.deleteAccount.title, dict.deleteAccount.intro);
}

export default async function DeleteAccountPage({
  params,
}: PageProps<"/[locale]/delete-account">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <LegalPage locale={locale} t={dict.deleteAccount} />;
}
