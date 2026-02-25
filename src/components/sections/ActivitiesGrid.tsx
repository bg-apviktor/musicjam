"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCopy } from "@/lib/copy";

type Props = { locale: string };

const TRACKS = [
  { key: "vocal",        emoji: "🎤", color: "#F5A623", label: "Vocal"        },
  { key: "instrumental", emoji: "🎸", color: "#4A9EFF", label: "Instrumental" },
  { key: "orchestra",    emoji: "🎻", color: "#30D158", label: "Orchestra"    },
  { key: "choir",        emoji: "🎵", color: "#BF5AF2", label: "Choir"        },
  { key: "worship_band", emoji: "🎹", color: "#B5174A", label: "Worship Band" },
  { key: "small_groups", emoji: "🤝", color: "#32ADE6", label: "Small Groups" },
];

// Waveform bar heights — pre-seeded for each track (0–100)
const WAVEFORM_SEEDS = [
  [20,55,80,40,90,30,70,45,85,25,60,75,35,95,50,65,15,80,40,70,55,30,85,45,75,20,60,90,35,50,25,70,80,45,65,30,90,55,40,20,75,85,50,35,60,25,70,45,90,30],
  [40,75,30,85,50,65,20,90,45,70,25,80,55,35,95,60,15,70,85,40,65,30,90,50,75,20,55,80,35,45,25,65,90,40,70,30,85,55,20,60,75,45,90,35,50,25,80,65,40,70],
  [60,25,85,45,70,35,90,55,20,80,40,65,30,75,50,95,25,85,45,60,30,70,55,90,35,75,20,65,80,40,50,25,90,60,35,70,45,85,20,55,80,30,65,40,75,90,25,50,60,35],
  [35,80,50,90,25,65,45,75,30,85,55,40,70,20,95,60,35,75,90,45,25,80,55,30,65,40,85,70,20,50,60,35,90,45,75,25,80,55,40,65,30,70,85,50,25,60,40,90,35,75],
  [70,30,90,55,20,80,45,65,85,25,60,40,75,50,35,95,70,25,85,40,55,30,75,90,20,65,80,45,35,60,25,70,90,50,40,85,30,65,55,20,80,45,75,35,60,25,90,70,40,55],
  [45,90,20,70,55,35,80,25,65,85,30,75,50,40,95,20,60,85,45,70,30,90,55,25,80,40,65,35,75,50,20,85,45,60,30,70,90,25,55,80,40,65,35,75,50,20,90,45,60,30],
];

function WaveformBars({ trackIndex }: { trackIndex: number }) {
  const bars = WAVEFORM_SEEDS[trackIndex];
  return (
    <div
      className="absolute inset-0 flex items-center gap-[2px] px-3 overflow-hidden"
      style={{ height: "64px" }}
    >
      {bars.map((height, i) => {
        const scaleA = 0.08 + (height / 100) * 0.92;
        return (
          <div
            key={i}
            className="flex-1 rounded-full"
            style={{
              height: `${scaleA * 52}px`,
              background: "rgba(0,0,0,0.08)",
              minWidth: "2px",
            }}
          />
        );
      })}
    </div>
  );
}

export default function ActivitiesGrid({ locale }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const copy = getCopy("about", "activities_grid", locale);
  const items = copy.items || [];

  const itemMap = new Map(
    items.map((item) => [item.title?.toLowerCase().trim() ?? "", item])
  );

  function findItem(track: typeof TRACKS[0]) {
    const byKey = itemMap.get(track.key.replace("_", " "));
    if (byKey) return byKey;
    const byLabel = itemMap.get(track.label.toLowerCase());
    if (byLabel) return byLabel;
    for (const [k, v] of itemMap.entries()) {
      if (k.includes(track.key.replace("_", " ")) || track.key.replace("_", " ").includes(k)) return v;
    }
    return null;
  }

  return (
    <section className="py-20 md:py-24" style={{ background: "#FFFFFF" }}>
      <div className="max-w-3xl mx-auto px-6 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B7280" }}>
          {copy.subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "#1D1D1F" }}>{copy.title}</h2>
      </div>

      <div ref={ref} className="max-w-3xl mx-auto px-6">
        {TRACKS.map((track, index) => {
          const item = findItem(track);
          return (
            <motion.div
              key={track.key}
              className="flex items-stretch w-full overflow-hidden cursor-pointer"
              style={{ height: "64px", marginBottom: "2px" }}
              initial={{ x: -60, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              whileHover={{ x: 8, scaleY: 1.06, zIndex: 10, boxShadow: `0 4px 24px ${track.color}55`, transition: { duration: 0.2, ease: "easeOut" } }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left label panel */}
              <div
                className="flex items-center gap-3 px-4 shrink-0"
                style={{ width: "180px", background: "#F5F5F7", borderRight: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span className="text-xl">{track.emoji}</span>
                <span className="text-sm font-semibold" style={{ color: "#1D1D1F" }}>{track.label}</span>
              </div>

              {/* Right colored track with animated waveform */}
              <div className="flex items-center px-5 flex-1 relative overflow-hidden" style={{ background: track.color }}>
                <WaveformBars trackIndex={index} />
                <span className="text-base md:text-lg font-semibold relative z-10 drop-shadow-sm truncate" style={{ color: "#FFFFFF" }}>
                  {item?.body ?? ""}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
