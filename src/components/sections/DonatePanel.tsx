"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy, getPaypalDisclosure } from "@/lib/copy";

type Props = { locale: string };

const PAYPAL_URL = "https://www.paypal.com/donate/?hosted_button_id=MUSICJAM_DONATE";

export default function DonatePanel({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const panel = getCopy("donate", "donate_panel", locale);
  const trust = getCopy("donate", "donate_trust", locale);
  const disclosure = getPaypalDisclosure(locale);

  return (
    <section id="donate" className="py-20 md:py-28 relative" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-6 md:px-12 relative z-10" style={{ maxWidth: "72rem" }}>
        <motion.div
          ref={ref}
          className="mx-auto text-center"
          style={{ maxWidth: "720px" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {panel.subtitle}
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6" style={{ color: "#1D1D1F" }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {panel.title}
          </motion.h2>
          <motion.p
            className="text-base md:text-lg font-light leading-relaxed mx-auto mb-10"
            style={{ maxWidth: "520px", color: "#6B7280" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {panel.body}
          </motion.p>

          <motion.a
            href={PAYPAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 font-semibold text-lg px-10 py-5 rounded-full text-white bento-tile w-full sm:w-auto"
            style={{ background: "#B5174A" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>💳</span>
            <span>{panel.cta}</span>
          </motion.a>

          <motion.p
            className="mt-6 text-sm" style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {disclosure}
          </motion.p>

          <motion.div
            className="mt-12 pt-8 border-t border-white/10 inline-block"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm font-semibold mb-1.5" style={{ color: "#9CA3AF" }}>{trust.title}</p>
            <p className="text-sm" style={{ maxWidth: "480px", color: "#9CA3AF" }}>{trust.body}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
