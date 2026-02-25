"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCookieText, getCookieActions } from "@/lib/copy";

const COOKIE_KEY = "musicjam_cookie_consent";

type Props = {
  locale: string;
};

export default function CookieBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);
  const text = getCookieText(locale);
  const actions = getCookieActions(locale);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
        >
          <div
            className="mx-auto rounded-xl border border-border-subtle p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
            style={{
              maxWidth: "1120px",
              boxShadow: "0 -4px 30px rgba(45,26,34,0.12)",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <p className="text-sm text-brand-text flex-1 leading-relaxed">{text}</p>
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                onClick={decline}
                className="text-sm font-semibold text-muted hover:text-brand-text transition-colors px-4 py-2 rounded-lg hover:bg-surface-alt"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {actions.decline}
              </motion.button>
              <motion.button
                onClick={accept}
                className="text-sm font-semibold bg-primary text-on-primary px-5 py-2.5 rounded-lg"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {actions.accept}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
