"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCopy } from "@/lib/copy";

const LOGOS = [
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
  "/logos/logo-6.png",
  "/logos/logo-7.png",
];

const VIDEO_CLIPS = [
  "/videos/clip1.mp4",
  "/videos/clip2.mp4",
  "/videos/clip3.mp4",
  "/videos/clip4.mp4",
  "/videos/clip5.mp4",
];

type Props = { locale: string };

export default function Hero({ locale }: Props) {
  const copy = getCopy("home", "hero", locale);
  const introCopy = getCopy("home", "intro_tagline", locale);
  const ref = useRef(null);
  const [clipIndex, setClipIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const logoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLogoCycling = () => {
    logoIntervalRef.current = setInterval(() => {
      setLogoIndex((i) => (i + 1) % LOGOS.length);
    }, 110);
  };
  const stopLogoCycling = () => {
    if (logoIntervalRef.current) {
      clearInterval(logoIntervalRef.current);
      logoIntervalRef.current = null;
    }
  };
  useEffect(() => () => stopLogoCycling(), []);

  const handleVideoEnd = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setClipIndex((i) => (i + 1) % VIDEO_CLIPS.length);
      setFading(false);
    }, 600);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      {/* Light gradient background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)" }} />
      <motion.div
        className="relative z-10 text-center px-6 w-full mx-auto"
        style={{ maxWidth: "72rem", y: contentY, opacity: contentOpacity }}
      >
        {/* Logo image centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            id="hero-logo"
            src={LOGOS[logoIndex]}
            alt="MusicJam"
            className="w-40 md:w-64 object-contain mx-auto mb-8 cursor-pointer"
            onMouseEnter={startLogoCycling}
            onMouseLeave={stopLogoCycling}
          />
        </motion.div>

        {/* Subtitle — system font */}
        <motion.p
          className="text-xl md:text-2xl mb-12 leading-relaxed mx-auto font-light"
          style={{ color: "#6B7280", maxWidth: "600px" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {copy.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#donate"
            className="inline-block font-semibold text-base px-10 py-4 rounded-full text-white transition-all hover:brightness-110 bento-tile"
            style={{ background: "#B5174A" }}
          >
            {copy.cta}
          </a>
          <a
            href="#about"
            className="inline-block font-semibold text-base px-10 py-4 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            style={{ color: "#1D1D1F" }}
          >
            {introCopy.cta}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5" style={{ borderColor: "#D1D5DB" }}>
            <motion.div
              className="w-1.5 h-3 rounded-full"
              style={{ background: "#9CA3AF" }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
