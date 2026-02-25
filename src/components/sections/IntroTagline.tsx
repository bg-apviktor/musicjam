"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

export default function IntroTagline({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const copy = getCopy("home", "intro_tagline", locale);

  return (
    <section className="py-20 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-6 md:px-12 text-center" style={{ maxWidth: "72rem" }}>
        <div ref={ref}>
          <motion.p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            MusicJam
          </motion.p>
          <motion.h2
            className="font-black leading-none mb-6"
            style={{ fontSize: "clamp(36px, 6vw, 72px)", color: "#1D1D1F" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {copy.title}
          </motion.h2>
          <motion.p
            className="leading-relaxed mx-auto"
            style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#6B7280" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {copy.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
