"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

const SOCIALS = [
  { name: "Instagram", handle: "@musicjam_", url: "https://www.instagram.com/musicjam_/", emoji: "📸" },
  { name: "YouTube", handle: "musicjamcamp", url: "https://www.youtube.com/@musicjamcamp", emoji: "▶️" },
  { name: "Facebook", handle: "musicjamcamp", url: "https://www.facebook.com/musicjamcamp", emoji: "📘" },
];

export default function SocialLinks({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const copy = getCopy("social", "social_links", locale);

  return (
    <section id="social" className="py-20 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-6 md:px-12 text-center" style={{ maxWidth: "72rem" }}>
        <div ref={ref}>
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {copy.subtitle}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-10"
            style={{ color: "#1D1D1F" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {copy.title}
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-8 py-6 rounded-2xl min-w-[220px] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-black/5"
                style={{ background: "#FFFFFF" }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl" style={{ background: "rgba(0,0,0,0.05)" }}>
                  {s.emoji}
                </span>
                <div className="text-left">
                  <div className="font-bold" style={{ color: "#1D1D1F" }}>{s.name}</div>
                  <div className="text-sm" style={{ color: "#9CA3AF" }}>{s.handle}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
