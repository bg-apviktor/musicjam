"use client";

import { getFooter, getNav } from "@/lib/copy";

type Props = { locale: string };

const navIds = ["about", "history", "merch", "donate", "social"] as const;

export default function Footer({ locale }: Props) {
  const footer = getFooter(locale);
  const nav = getNav(locale);

  return (
    <footer style={{ background: "#FFFFFF", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
      <div
        className="mx-auto px-6 md:px-12 py-10"
        style={{ maxWidth: "72rem" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-bold tracking-tight" style={{ color: "#1D1D1F" }}>MusicJam</div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm transition-colors"
                  style={{ color: "#9CA3AF" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B7280"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; }}
                >
                  {nav[id] || id}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-sm" style={{ color: "#D1D5DB" }}>
            {footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}
