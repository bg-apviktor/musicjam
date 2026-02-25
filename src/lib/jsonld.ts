/**
 * JSON-LD schema generators for MusicJam
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MusicJam",
    url: "https://musicjam.ee",
    description:
      "MusicJam is a Christian music summer camp for teenagers in Estonia. A place where music and faith unite.",
    foundingDate: "2018",
    areaServed: "EE",
    sameAs: [
      "https://www.instagram.com/musicjam_/",
      "https://www.youtube.com/@musicjamcamp",
      "https://www.facebook.com/musicjamcamp",
    ],
    nonprofit: true,
  };
}

export function websiteSchema(locale: string) {
  const names: Record<string, string> = {
    en: "MusicJam — Christian Music Camp for Teens in Estonia",
    ru: "MusicJam — христианский музыкальный лагерь для подростков в Эстонии",
    et: "MusicJam — kristlik muusikalaager teismelistele Eestis",
  };
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: names[locale] || names.en,
    url: `https://musicjam.ee/${locale !== "en" ? locale : ""}`,
    inLanguage: locale,
  };
}

export function eventSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "MusicJam Summer Camp",
    organizer: {
      "@type": "Organization",
      name: "MusicJam",
    },
    location: {
      "@type": "Country",
      name: "Estonia",
    },
    description:
      "An annual Christian music camp for teenagers across Estonia.",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };
}
