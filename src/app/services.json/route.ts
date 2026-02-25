import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const services = {
    project: {
      id: "musicjam",
      name: "MusicJam",
      description: "Christian music camp for teenagers in Estonia",
      url: "https://musicjam.ee",
    },
    capabilities: {
      i18n: {
        enabled: true,
        locales: ["en", "ru", "et"],
        defaultLocale: "en",
      },
      sections: [
        { id: "hero", route: "/#hero" },
        { id: "about", route: "/#about" },
        { id: "history", route: "/#history" },
        { id: "merch", route: "/#merch" },
        { id: "donate", route: "/#donate" },
        { id: "social", route: "/#social" },
      ],
      socials: {
        instagram: "https://www.instagram.com/musicjam_/",
        youtube: "https://www.youtube.com/@musicjamcamp",
        facebook: "https://www.facebook.com/musicjamcamp",
      },
      donate: {
        provider: "PayPal",
        url: "https://www.paypal.com/donate/?hosted_button_id=MUSICJAM",
      },
      features: {
        cookieBanner: true,
        jsonLd: true,
        gdprCompliant: true,
        analytics: false,
      },
    },
    meta: {
      version: "1.0",
      generatedAt: new Date().toISOString(),
    },
  };

  return NextResponse.json(services, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
