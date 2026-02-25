"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getNav } from "@/lib/copy";
import LanguageSwitcher from "./LanguageSwitcher";

const LOGOS = [
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
  "/logos/logo-6.png",
  "/logos/logo-7.png",
];

function CyclingLogo({ locale }: { locale: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LOGOS.length);
    }, 110);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => stopCycling(), []);

  return (
    <Link href={`/${locale}`} onMouseEnter={startCycling} onMouseLeave={stopCycling}>
      <Image
        src={LOGOS[currentIndex]}
        alt="MusicJam"
        width={80}
        height={56}
        className="object-contain"
        style={{ height: "40px", width: "auto" }}
        priority
      />
    </Link>
  );
}

type Props = {
  locale: string;
};

const navIds = ["about", "history", "merch", "donate", "social"] as const;

export default function NavBar({ locale }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = getNav(locale);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setLogoVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <nav
        className="mx-auto px-6 md:px-12 flex items-center justify-between"
        style={{ maxWidth: "72rem", height: scrolled ? "48px" : "56px", transition: "height 0.4s ease" }}
      >
        {/* Cycling logo — hidden until scroll past 500px */}
        <div className={`transition-all duration-300 ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
          <CyclingLogo locale={locale} />
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navIds.map((id, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <a
                href={`#${id}`}
                className="text-xs font-medium px-3 py-2 rounded-md transition-colors"
                style={{ color: scrolled ? "#1D1D1F" : "rgba(255,255,255,0.85)" }}
              >
                {nav[id] || id}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <LanguageSwitcher locale={locale} />
          </motion.div>

          {/* Hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="absolute w-5 h-0.5 rounded-full"
              style={{ background: scrolled ? "#1D1D1F" : "#FFFFFF" }}
              animate={{
                rotate: mobileOpen ? 45 : 0,
                y: mobileOpen ? 0 : -4,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute w-5 h-0.5 rounded-full"
              style={{ background: scrolled ? "#1D1D1F" : "#FFFFFF" }}
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute w-5 h-0.5 rounded-full"
              style={{ background: scrolled ? "#1D1D1F" : "#FFFFFF" }}
              animate={{
                rotate: mobileOpen ? -45 : 0,
                y: mobileOpen ? 0 : 4,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <ul className="flex flex-col px-6 py-6 gap-1">
              {navIds.map((id, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <a
                    href={`#${id}`}
                    className="block text-base font-medium py-3 px-4 rounded-lg hover:bg-black/5 transition-colors"
                    style={{ color: "#1D1D1F" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {nav[id] || id}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
