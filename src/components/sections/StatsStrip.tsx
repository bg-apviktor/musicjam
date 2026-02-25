"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !numericMatch) return;
    const target = parseInt(numericMatch[1], 10);
    const duration = 1500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, numericMatch]);

  if (!numericMatch) return <span>{value}</span>;
  return (
    <span>
      {display}
      {numericMatch[2]}
    </span>
  );
}

export default function StatsStrip({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const copy = getCopy("home", "quick_stats", locale);
  const items = copy.items || [];

  return (
    <section className="py-16" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "56rem" }}>
        <div
          ref={ref}
          className="flex flex-col sm:flex-row items-center justify-center"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`text-center flex-1 py-6 sm:py-0 ${i < items.length - 1 ? "sm:border-r border-gray-100" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-6xl font-bold text-gray-900 leading-none mb-2">
                <AnimatedCounter value={item.value ?? ""} inView={inView} />
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
