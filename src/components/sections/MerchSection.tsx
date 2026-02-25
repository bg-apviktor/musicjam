"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

const MERCH_ITEMS = [
  { name: "MusicJam T-Shirt", price: "€20", emoji: "👕", bg: "#FFFFFF" },
  { name: "MusicJam Hoodie", price: "€40", emoji: "🧥", bg: "#FFFFFF" },
  { name: "MusicJam Cap", price: "€15", emoji: "🧢", bg: "#FFFFFF" },
  { name: "Sticker Pack", price: "€5", emoji: "✨", bg: "#FFFFFF" },
];

export default function MerchSection({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const heading = getCopy("merch", "merch_heading", locale);

  return (
    <section id="merch" className="py-20 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "#9CA3AF" }}>
            {heading.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "#1D1D1F" }}>
            {heading.title}
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 gap-4">
          {MERCH_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="text-center rounded-2xl overflow-hidden p-8 cursor-pointer hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center border border-black/5"
              style={{ background: item.bg }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-6xl mb-4">{item.emoji}</div>
              <h3 className="font-bold text-sm mb-1" style={{ color: "#1D1D1F" }}>{item.name}</h3>
              <p className="text-lg font-bold" style={{ color: "#6B7280" }}>{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
