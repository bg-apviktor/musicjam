"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

const tileColors = ["#E8F5E9", "#FFF3E0", "#E3F2FD"];

export default function AboutBento({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const about = getCopy("about", "about_intro", locale);
  const stats = getCopy("home", "quick_stats", locale);
  const items = stats.items || [];
  const introCopy = getCopy("home", "intro_tagline", locale);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="py-20 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Large tile — about text */}
          <motion.div
            className="col-span-1 md:col-span-2 text-white rounded-2xl p-8 flex flex-col justify-center hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300"
            style={{ background: "#1B2B5E" }}
            {...fadeUp(0)}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-4">
              {about.subtitle}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {about.title}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {about.body}
            </p>
          </motion.div>

          {/* Stat tiles */}
          {items.slice(0, 2).map((item, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-8 flex flex-col justify-center hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
              style={{ background: tileColors[i] }}
              {...fadeUp(0.1 + i * 0.1)}
            >
              <div className="text-4xl font-bold tracking-tight mb-1" style={{ color: "#1D1D1F" }}>
                {item.value}
              </div>
              <div className="text-sm font-medium" style={{ color: "#6B7280" }}>
                {item.label}
              </div>
            </motion.div>
          ))}

          {/* "Play. Worship. Grow." tile */}
          <motion.div
            className="rounded-2xl p-8 flex flex-col justify-center hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
            style={{ background: "#FCE4EC" }}
            {...fadeUp(0.3)}
          >
            <div className="text-2xl md:text-3xl font-bold tracking-tight leading-snug" style={{ color: "#1D1D1F" }}>
              {introCopy.title}
            </div>
          </motion.div>

          {/* Third stat — wide tile */}
          {items[2] && (
            <motion.div
              className="col-span-1 md:col-span-2 rounded-2xl p-8 flex flex-col justify-center hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300"
              style={{ background: tileColors[2] }}
              {...fadeUp(0.4)}
            >
              <div className="text-4xl font-bold tracking-tight mb-1" style={{ color: "#1D1D1F" }}>
                {items[2].value}
              </div>
              <div className="text-sm font-medium" style={{ color: "#6B7280" }}>
                {items[2].label}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
