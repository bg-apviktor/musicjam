"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

const ESTONIA_PATH =
  "M 182,18 L 198,12 L 220,10 L 248,10 L 272,12 L 296,14 L 318,16 L 338,18 L 355,20 L 372,18 L 392,16 L 415,18 L 438,22 L 458,28 L 472,36 L 482,48 L 488,62 L 490,78 L 488,96 L 484,114 L 478,132 L 468,150 L 454,166 L 436,180 L 414,192 L 390,200 L 364,206 L 336,208 L 308,206 L 282,200 L 258,192 L 236,182 L 216,170 L 198,156 L 182,140 L 170,122 L 162,104 L 158,86 L 158,68 L 162,50 L 170,34 Z";
const SAAREMAA_PATH =
  "M 100,100 L 112,88 L 124,86 L 134,90 L 140,100 L 142,114 L 138,126 L 128,134 L 116,136 L 104,132 L 96,122 L 96,110 Z";
const HIIUMAA_PATH =
  "M 118,68 L 128,62 L 138,64 L 144,72 L 140,80 L 128,82 L 118,78 Z";

const CITIES = [
  { year: 2018, name: "Tapa", x: 318, y: 58, color: "#ffffff" },
  { year: 2019, name: "Tapa", x: 318, y: 58, color: "#ffffff" },
  { year: 2020, name: "Tapa", x: 318, y: 58, color: "#ffffff" },
  { year: 2021, name: "Narva", x: 492, y: 46, color: "#F5A623" },
  { year: 2022, name: "Kohila", x: 232, y: 72, color: "#4A9EFF" },
  { year: 2023, name: "Haapsalu", x: 162, y: 88, color: "#30D158" },
  { year: 2024, name: "Tartu", x: 372, y: 164, color: "#BF5AF2" },
  { year: 2025, name: "Vasalemma", x: 194, y: 66, color: "#B5174A" },
];

const UNIQUE_CITIES = CITIES.filter(
  (c, i, arr) => arr.findIndex((x) => x.name === c.name) === i
);

export default function HistoryTimeline({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const heading = getCopy("history", "history_heading", locale);
  const timeline = getCopy("history", "camp_timeline", locale);
  const items = (timeline.items || []) as Array<{
    title?: string;
    body?: string;
    year?: number;
  }>;

  return (
    <section
      id="history"
      className="py-20 md:py-24"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-3"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              headingInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            {heading.subtitle}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "#1D1D1F" }}
            initial={{ opacity: 0, y: 40 }}
            animate={
              headingInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {heading.title}
          </motion.h2>
        </div>

        {/* Estonia SVG Map */}
        <div className="mb-12" ref={ref}>
          <svg
            viewBox="0 0 520 320"
            className="w-full max-w-2xl mx-auto"
            aria-hidden="true"
          >
            {/* Estonia outline */}
            <path
              d={ESTONIA_PATH}
              fill="none"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1.5"
            />
            <path
              d={SAAREMAA_PATH}
              fill="none"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1.5"
            />
            <path
              d={HIIUMAA_PATH}
              fill="none"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1.5"
            />

            {/* Journey line connecting unique cities */}
            <motion.polyline
              points={UNIQUE_CITIES.map((c) => `${c.x},${c.y}`).join(" ")}
              fill="none"
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                inView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* City dots */}
            {UNIQUE_CITIES.map((city, i) => (
              <motion.g
                key={city.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                style={{ originX: `${city.x}px`, originY: `${city.y}px` }}
              >
                {/* Glow circle */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={8}
                  fill={city.color}
                  opacity={0.15}
                />
                {/* Main dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={4}
                  fill={city.color}
                />
                {/* Year label */}
                <text
                  x={city.x}
                  y={city.y - 14}
                  textAnchor="middle"
                  fill="rgba(0,0,0,0.6)"
                  fontSize="9"
                  fontFamily="system-ui"
                >
                  {city.year}
                </text>
                {/* City name */}
                <text
                  x={city.x}
                  y={city.y + 18}
                  textAnchor="middle"
                  fill="rgba(0,0,0,0.45)"
                  fontSize="8"
                  fontFamily="system-ui"
                >
                  {city.name}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Horizontal scrollable timeline */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-0 min-w-max relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-black/10" />
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center w-36 px-2 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: i * 0.07 }}
              >
                {/* Year dot */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white mb-3 z-10 relative"
                  style={{
                    background: CITIES[i]?.color || "#B5174A",
                  }}
                >
                  {item.year || 2018 + i}
                </div>
                {/* City */}
                <p className="text-xs font-semibold text-center mb-1" style={{ color: "#1D1D1F" }}>
                  {item.title}
                </p>
                {/* Description */}
                <p className="text-xs text-center leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
