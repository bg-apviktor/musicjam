"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  locale: string;
};

const locales = [
  { code: "et", label: "ET" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
] as const;

export default function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split("/");
    if (segments[1] && ["en", "ru", "et"].includes(segments[1])) {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    return segments.join("/") || "/";
  };

  return (
    <div className="flex items-center rounded-lg px-1 py-1 border border-border-subtle gap-0.5" style={{ backgroundColor: "rgba(249,236,239,0.6)" }}>
      {locales.map((loc) => (
        <Link
          key={loc.code}
          href={getLocalePath(loc.code)}
          className="relative text-xs font-bold px-2 py-1 rounded-md transition-colors"
          style={{ color: locale === loc.code ? "var(--color-on-primary)" : "var(--color-muted)" }}
        >
          {locale === loc.code && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 bg-primary rounded-md"
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            />
          )}
          <span className="relative z-10">{loc.label}</span>
        </Link>
      ))}
    </div>
  );
}
