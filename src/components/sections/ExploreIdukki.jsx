import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Mountain, Navigation, Route, Waves } from "lucide-react";
import { sightseeing, sightseeingRoute } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const typeIcons = {
  Viewpoint: Mountain,
  Waterfalls: Waves,
};

const routePath =
  "M 80 520 C 80 460, 140 440, 200 400 C 260 360, 280 300, 340 280 C 400 260, 460 220, 520 200 C 580 180, 620 140, 680 120 C 740 100, 780 60, 840 40";

function RouteMapSvg({ activeIndex, reduce }) {
  return (
    <svg
      viewBox="0 0 920 560"
      className="h-full w-full"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8faba3" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#b8956c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8faba3" stopOpacity="0.35" />
        </linearGradient>
        <pattern
          id="topoLines"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <path
            d="M0 20 Q10 10 20 20 T40 20"
            fill="none"
            stroke="rgba(184,149,108,0.08)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="920" height="560" fill="url(#topoLines)" />

      {[120, 200, 280, 360, 440].map((y) => (
        <line
          key={y}
          x1="40"
          y1={y}
          x2="880"
          y2={y}
          stroke="rgba(200,217,211,0.12)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      ))}

      <path
        d={routePath}
        fill="none"
        stroke="rgba(200,217,211,0.15)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <motion.path
        d={routePath}
        fill="none"
        stroke="url(#routeGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 2.2, ease: easeLuxury }}
      />

      <circle cx="80" cy="520" r="28" fill="#0b1c24" stroke="#b8956c" strokeWidth="2" />
      <text
        x="80"
        y="525"
        textAnchor="middle"
        fill="#d4c4a8"
        fontSize="11"
        fontFamily="system-ui"
        fontWeight="600"
      >
        START
      </text>
    </svg>
  );
}

function StopPin({ stop, index, isActive, onSelect }) {
  const positions = [
    { x: "22%", y: "72%" },
    { x: "36%", y: "58%" },
    { x: "52%", y: "48%" },
    { x: "68%", y: "32%" },
    { x: "84%", y: "18%" },
  ];
  const pos = positions[index];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left"
      style={{ left: pos.x, top: pos.y }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`${stop.name}, ${stop.distanceKm} km from retreat`}
      aria-pressed={isActive}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-sm transition-all duration-300 ${
          isActive
            ? "border-brass bg-brass text-ink shadow-[0_0_0_6px_rgba(184,149,108,0.25)]"
            : "border-seafoam-deep/60 bg-ink text-sand hover:border-brass hover:bg-ink-soft"
        }`}
      >
        {index + 1}
      </span>
      {isActive && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 top-12 hidden w-max -translate-x-1/2 rounded-sm bg-ink/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-sand lg:block"
        >
          {stop.distanceKm} km
        </motion.span>
      )}
    </motion.button>
  );
}

function SegmentBadge({ km, index }) {
  const positions = [
    { x: "28%", y: "66%" },
    { x: "44%", y: "52%" },
    { x: "60%", y: "40%" },
    { x: "76%", y: "24%" },
  ];
  const pos = positions[index];

  return (
    <motion.div
      className="absolute z-[5] -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: easeLuxury }}
    >
      <span className="inline-flex items-center gap-1 rounded-full border border-brass/30 bg-mist/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/70 shadow-sm backdrop-blur-sm">
        <Navigation className="size-3 text-brass" strokeWidth={2} />
        {km} km
      </span>
    </motion.div>
  );
}

export default function ExploreIdukki() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const activeStop = sightseeing[activeIndex];
  const ActiveIcon = typeIcons[activeStop.type] || Mountain;

  return (
    <section id="idukki" className="bg-foam section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Around the retreat"
            title="Sightseeing route map"
            description="Follow the highland circuit from Mount Misty Retreat to viewpoints and waterfalls across Idukki — arranged as per your requirements."
          />
        </SectionReveal>

        <SectionReveal className="mt-10" y={24}>
          <div className="flex flex-wrap gap-3">
            {[
              {
                icon: Route,
                label: "Suggested circuit",
                value: `${sightseeingRoute.totalDistanceKm} km`,
              },
              {
                icon: Clock,
                label: "Drive time",
                value: sightseeingRoute.estimatedDriveTime,
              },
              {
                icon: MapPin,
                label: "Stops",
                value: `${sightseeing.length} locations`,
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 border border-ink/10 bg-white/70 px-4 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-brass/25 text-brass">
                    <Icon className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
                      {stat.label}
                    </p>
                    <p className="font-display text-lg text-ink">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <SectionReveal className="lg:col-span-7" y={32}>
            <div className="relative overflow-hidden border border-ink/10 bg-ink">
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 80%, rgba(143,171,163,0.25), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(184,149,108,0.2), transparent 50%)",
                }}
                aria-hidden
              />

              <div className="relative aspect-[16/10] min-h-[280px] p-4 md:p-6">
                <RouteMapSvg activeIndex={activeIndex} reduce={reduce} />

                <div className="absolute left-[6%] bottom-[8%] z-10 max-w-[120px]">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-seafoam/60">
                    Origin
                  </p>
                  <p className="mt-1 font-display text-sm leading-tight text-sand">
                    {sightseeingRoute.origin.name}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-seafoam/70">
                    0 km
                  </p>
                </div>

                {sightseeing.map((stop, i) => (
                  <StopPin
                    key={stop.id}
                    stop={stop}
                    index={i}
                    isActive={activeIndex === i}
                    onSelect={setActiveIndex}
                  />
                ))}

                {sightseeing.slice(0, -1).map((stop, i) => (
                  <SegmentBadge key={`seg-${stop.id}`} km={stop.segmentKm} index={i} />
                ))}
              </div>

              <div className="border-t border-white/10 px-5 py-3">
                <p className="text-xs font-light italic text-seafoam/55">
                  {sightseeingRoute.note}
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="lg:col-span-5" delay={0.08} y={32}>
            <AnimatePresence mode="wait">
              <motion.article
                key={activeStop.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: easeLuxury }}
                className="flex h-full flex-col border border-ink/10 bg-mist"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={activeStop.image}
                    alt={activeStop.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: easeLuxury }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-sand backdrop-blur-sm">
                        <ActiveIcon className="size-3" strokeWidth={1.5} />
                        {activeStop.type}
                      </span>
                      <h3 className="mt-3 font-display text-2xl tracking-tight text-white md:text-3xl">
                        {activeStop.name}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-sm bg-brass px-3 py-2 font-display text-xl text-ink">
                      {activeStop.distanceKm} km
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="grid grid-cols-2 gap-4 border-b border-ink/10 pb-5">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
                        From retreat
                      </p>
                      <p className="mt-1 font-display text-xl text-ink">
                        {activeStop.distanceKm} km
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
                        Drive time
                      </p>
                      <p className="mt-1 font-display text-xl text-ink">
                        ~{activeStop.driveTime}
                      </p>
                    </div>
                  </div>

                  <ol className="mt-5 space-y-3">
                    {sightseeing.map((stop, i) => {
                      const Icon = typeIcons[stop.type] || Mountain;
                      const isActive = i === activeIndex;
                      return (
                        <li key={stop.id}>
                          <button
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left transition-colors ${
                              isActive
                                ? "border-brass/40 bg-white/80"
                                : "border-transparent bg-transparent hover:border-ink/10 hover:bg-white/50"
                            }`}
                          >
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                                isActive
                                  ? "bg-brass text-ink"
                                  : "bg-ink/8 text-ink/50"
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-light text-ink/75">
                              {stop.name}
                            </span>
                            <Icon
                              className="size-3.5 shrink-0 text-brass/70"
                              strokeWidth={1.5}
                            />
                            <span className="shrink-0 text-xs font-medium tabular-nums text-ink/45">
                              {stop.distanceKm} km
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </motion.article>
            </AnimatePresence>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-14" delay={0.12}>
          <div className="relative overflow-hidden border border-ink/10 bg-white/60 px-6 py-8 md:px-10">
            <div
              className="pointer-events-none absolute inset-y-0 left-8 w-px bg-gradient-to-b from-brass via-seafoam-deep to-brass md:left-12"
              aria-hidden
            />
            <p className="pl-6 text-[11px] font-medium uppercase tracking-[0.22em] text-brass md:pl-10">
              Route timeline
            </p>
            <ol className="mt-8 space-y-0 md:pl-4">
              <li className="relative flex gap-5 pb-8 md:gap-8">
                <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-ink text-[10px] font-medium uppercase tracking-wider text-sand">
                  0
                </span>
                <div className="min-w-0 flex-1 border-b border-ink/8 pb-8">
                  <p className="font-display text-lg text-ink">
                    {sightseeingRoute.origin.name}
                  </p>
                  <p className="mt-1 text-sm font-light text-ink/50">
                    {sightseeingRoute.origin.location} · Starting point
                  </p>
                </div>
                <span className="shrink-0 pt-1 font-display text-sm text-ink/35">
                  0 km
                </span>
              </li>

              {sightseeing.map((stop, i) => (
                <li key={stop.id} className="relative flex gap-5 pb-8 last:pb-0 md:gap-8">
                  <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-seafoam-deep/50 bg-mist font-display text-sm text-ink">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1 border-b border-ink/8 pb-8 last:border-b-0 last:pb-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-lg text-ink">{stop.name}</p>
                        <p className="mt-1 text-sm font-light text-ink/50">
                          {stop.type} · ~{stop.driveTime} drive
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-seafoam/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink/60">
                        +{stop.segmentKm} km
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 pt-1 font-display text-sm text-brass">
                    {stop.distanceKm} km
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.18}>
          <p className="mt-10 max-w-xl text-base font-light leading-relaxed text-ink/50">
            Stay with us. Explore Idukki. Take home the memories.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
