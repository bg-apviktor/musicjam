"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

export default function AboutIntro({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const copy = getCopy("about", "about_intro", locale);

  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "72rem" }}>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — label + heading */}
          <div>
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {copy.subtitle}
            </motion.p>
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {copy.title}
            </motion.h2>
          </div>

          {/* Right — body + CTA link */}
          <div>
            <motion.p
              className="text-base md:text-lg font-light text-gray-500 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {copy.body}
            </motion.p>
            {copy.cta && (
              <motion.a
                href="#donate"
                className="inline-flex items-center gap-1 text-primary font-semibold hover:underline transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {copy.cta} <span className="text-lg">→</span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
