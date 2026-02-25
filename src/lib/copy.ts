import copyData from "../../COPY_OUTPUT.json";

export type Locale = "en" | "ru" | "et";
export type CopyItem = { title?: string; body?: string; label?: string; value?: string };

// Supported locales
export const LOCALES: Locale[] = ["en", "ru", "et"];
export const DEFAULT_LOCALE: Locale = "en";

function safeLocale(locale: string): Locale {
  return LOCALES.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE;
}

type PageSection = {
  title?: string;
  subtitle?: string;
  cta?: string;
  body?: string;
  items?: CopyItem[];
};

type PageContent = {
  [sectionId: string]: {
    [locale in Locale]?: PageSection;
  };
};

type CopyPages = {
  [pageId: string]: PageContent;
};

type GlobalSection = {
  [locale in Locale]?: Record<string, string>;
};

type GlobalContent = {
  nav: { [locale in Locale]?: Record<string, string> };
  footer: { [locale in Locale]?: { tagline: string; rights: string } };
  cookie: { [locale in Locale]?: string };
};

const pages = copyData.pages as unknown as CopyPages;
const global = copyData.global as unknown as GlobalContent;

/**
 * Get copy for a specific page/section in the given locale.
 */
export function getCopy(pageId: string, sectionId: string, locale: string): PageSection {
  const l = safeLocale(locale);
  const page = pages[pageId];
  if (!page) return {};
  const section = page[sectionId];
  if (!section) return {};
  return section[l] || section[DEFAULT_LOCALE] || {};
}

/**
 * Get nav links copy in the given locale.
 */
export function getNav(locale: string): Record<string, string> {
  const l = safeLocale(locale);
  return global.nav[l] || global.nav[DEFAULT_LOCALE] || {};
}

/**
 * Get footer copy in the given locale.
 */
export function getFooter(locale: string): { tagline: string; rights: string } {
  const l = safeLocale(locale);
  return global.footer[l] || global.footer[DEFAULT_LOCALE] || { tagline: "", rights: "" };
}

/**
 * Get cookie banner text in the given locale.
 */
export function getCookieText(locale: string): string {
  const l = safeLocale(locale);
  const val = global.cookie[l];
  return typeof val === "string" ? val : (global.cookie[DEFAULT_LOCALE] as string) || "";
}

/**
 * Get cookie actions text.
 */
export function getCookieActions(locale: string): { accept: string; decline: string } {
  const complianceActions = {
    en: { accept: "Accept", decline: "Decline" },
    ru: { accept: "Принять", decline: "Отклонить" },
    et: { accept: "Nõustun", decline: "Keeldu" },
  };
  const l = safeLocale(locale);
  return complianceActions[l];
}

/**
 * Get PayPal disclosure text.
 */
export function getPaypalDisclosure(locale: string): string {
  const disclosures = {
    en: "Donations are securely processed by PayPal. MusicJam does not store your payment details.",
    ru: "Пожертвования обрабатываются безопасно через PayPal. MusicJam не хранит ваши платёжные данные.",
    et: "Annetused töödeldakse turvaliselt PayPali kaudu. MusicJam ei salvesta teie makseandmeid.",
  };
  const l = safeLocale(locale);
  return disclosures[l];
}
