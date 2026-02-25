import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";
import NavBar from "@/components/ui/NavBar";
import CookieBanner from "@/components/ui/CookieBanner";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const metaTitles: Record<string, string> = {
  en: "MusicJam — Christian Music Camp for Teens in Estonia",
  ru: "MusicJam — христианский музыкальный лагерь для подростков в Эстонии",
  et: "MusicJam — kristlik muusikalaager teismelistele Eestis",
};

const metaDescriptions: Record<string, string> = {
  en: "MusicJam is a Christian music summer camp for teenagers in Estonia. Play. Worship. Grow.",
  ru: "MusicJam — христианский музыкальный летний лагерь для подростков в Эстонии. Играй. Поклоняйся. Расти.",
  et: "MusicJam on kristlik muusika suvelaager teismelistele Eestis. Mängi. Kummarda. Kasva.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: metaTitles[locale] || metaTitles.en,
    description: metaDescriptions[locale] || metaDescriptions.en,
    openGraph: {
      title: metaTitles[locale] || metaTitles.en,
      description: metaDescriptions[locale] || metaDescriptions.en,
      type: "website",
      locale,
    },
    alternates: {
      canonical: `https://musicjam.ee/${locale !== "en" ? locale : ""}`,
      languages: {
        en: "https://musicjam.ee/en",
        ru: "https://musicjam.ee/ru",
        et: "https://musicjam.ee/et",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ru" | "et")) {
    notFound();
  }

  const messages = await getMessages();
  const orgSchema = organizationSchema();
  const webSchema = websiteSchema(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar locale={locale} />
          {children}
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
