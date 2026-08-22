import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Mountain, Navigation, Route, Waves } from "lucide-react";
import { sightseeing, sightseeingRoute } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const typeIcons = {
  Viewpoint: Mountain,
  Waterfalls: Waves,
};

const routePath =
  "M 80 520 C 80 460, 140 440, 200 400 C 260 360, 280 300, 340 280 C 400 260, 460 220, 520 200 C 580 180, 620 140, 680 120 C 740 100, 780 60, 840 40";

function legFromLabel(index) {
  if (index === 0) return "From retreat";
  return `From stop ${index}`;
}

function RouteStats({ className = "" }) {
  const stats = [
    {
      icon: Route,
      label: "Full route",
      value: `${sightseeingRoute.totalDistanceKm} km`,
      hint: "All 5 stops combined",
    },
    {
      icon: Clock,
      label: "Drive time",
      value: sightseeingRoute.estimatedDriveTime,
      hint: sightseeingRoute.estimatedDriveTimeNote,
    },
    {
      icon: MapPin,
      label: "Stops",
      value: `${sightseeing.length}`,
      hint: "On the circuit",
    },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center border border-ink/10 bg-white/70 px-2 py-3 text-center sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3 sm:text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brass/25 text-brass sm:h-9 sm:w-9">
                <Icon className="size-3.5 sm:size-4" strokeWidth={1.5} />
              </span>
              <div className="mt-2 min-w-0 sm:mt-0">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-ink/40 sm:text-[10px] sm:tracking-[0.18em]">
                  {stat.label}
                </p>
                <p className="font-display text-base text-ink sm:text-lg">
                  {stat.value}
                </p>
                {stat.hint && (
                  <p className="mt-0.5 text-[8px] font-light leading-snug text-ink/40 sm:text-[9px]">
                    {stat.hint}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[10px] font-light leading-relaxed text-ink/45 sm:text-left">
        Each stop below shows its own leg distance and drive time — not the full
        route.
      </p>
    </div>
  );
}

function RouteMapSvg({ reduce }) {
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

function StopPin({ stop, index, isActive, onSelect, compact = false }) {
  const positions = compact
    ? [
        { x: "20%", y: "66%" },
        { x: "34%", y: "54%" },
        { x: "48%", y: "44%" },
        { x: "58%", y: "32%" },
        { x: "68%", y: "22%" },
      ]
    : [
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
      className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
      style={{ left: pos.x, top: pos.y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`${stop.name}, ${stop.distanceKm} km from retreat`}
      aria-pressed={isActive}
    >
      <span
        className={`relative z-40 shrink-0 flex items-center justify-center rounded-full border-2 font-display transition-all duration-300 ${
          compact ? "h-9 w-9 text-xs" : "h-10 w-10 text-sm"
        } ${
          isActive
            ? "border-brass bg-brass text-ink shadow-[0_0_0_6px_rgba(184,149,108,0.25)]"
            : "border-seafoam-deep/60 bg-ink text-sand hover:border-brass hover:bg-ink-soft"
        }`}
      >
        {index + 1}
      </span>

      {compact && (
        <span className="z-30 shrink-0 whitespace-nowrap rounded-sm bg-ink px-1.5 py-0.5 text-[10px] font-medium leading-none text-sand shadow-sm ring-1 ring-brass/30">
          {stop.distanceKm} km total
        </span>
      )}

      {isActive && !compact && (
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 top-full z-30 mt-1.5 hidden w-max -translate-x-1/2 rounded-sm bg-ink/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-sand lg:block"
        >
          {stop.distanceKm} km
        </motion.span>
      )}
    </motion.button>
  );
}

function SegmentBadge({ km, index, compact = false }) {
  if (compact) return null;

  const positions = [
    { x: "18%", y: "78%" },
    { x: "29%", y: "65%" },
    { x: "44%", y: "53%" },
    { x: "60%", y: "40%" },
    { x: "76%", y: "25%" },
  ];
  const pos = positions[index];

  return (
    <motion.div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: easeLuxury }}
    >
      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-brass/30 bg-mist/95 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-ink/70 shadow-sm md:px-2.5 md:py-1 md:text-[10px]">
        <Navigation className="size-2.5 text-brass md:size-3" strokeWidth={2} />
        {km} km
      </span>
    </motion.div>
  );
}

function RouteMapPanel({
  activeIndex,
  onSelect,
  reduce,
  compact = false,
  className = "",
}) {
  const activeStop = sightseeing[activeIndex];

  return (
    <div className={`relative overflow-hidden border border-ink/10 bg-ink ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(143,171,163,0.25), transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(184,149,108,0.2), transparent 50%)",
        }}
        aria-hidden
      />

      <div className={compact ? "" : "relative aspect-[16/10] min-h-[280px]"}>
        <div
          className={
            compact
              ? "relative min-h-[280px] overflow-hidden px-2 py-4 sm:px-3"
              : "absolute inset-0 p-4 md:p-6"
          }
        >
          <RouteMapSvg reduce={reduce} />

          <div
            className={`absolute z-[2] ${
              compact
                ? "bottom-[6%] left-[3%] max-w-[46%]"
                : "bottom-[8%] left-[6%] max-w-[120px]"
            }`}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-seafoam/60 sm:text-[10px]">
              Origin
            </p>
            <p className="mt-0.5 line-clamp-2 font-display text-[11px] leading-tight text-sand sm:text-sm">
              {compact ? "Mount Misty Retreat" : sightseeingRoute.origin.name}
            </p>
            <p className="mt-0.5 text-[10px] font-light text-seafoam/70">0 km</p>
          </div>

          {sightseeing.map((stop, i) => (
            <StopPin
              key={stop.id}
              stop={stop}
              index={i}
              isActive={activeIndex === i}
              onSelect={onSelect}
              compact={compact}
            />
          ))}

          {!compact &&
            sightseeing.map((stop, i) => (
              <SegmentBadge
                key={`seg-${stop.id}`}
                km={stop.segmentKm}
                index={i}
                compact={compact}
              />
            ))}
        </div>

        {compact && (
          <>
            <div className="border-t border-white/10 bg-[#0b1c24]/90 px-3 py-2.5">
              <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.14em] text-seafoam/50">
                Leg distances (stop to stop)
              </p>
              <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {sightseeing.map((stop, i) => (
                  <div key={`leg-${stop.id}`} className="flex shrink-0 items-center gap-2">
                    <span className="inline-flex flex-col gap-0.5 rounded-sm border border-brass/30 bg-ink px-2.5 py-1.5 text-[10px] text-sand">
                      <span className="font-medium whitespace-nowrap">
                        Stop {i + 1}: {stop.segmentKm} km
                      </span>
                      <span className="whitespace-nowrap text-[9px] font-light text-seafoam/55">
                        {legFromLabel(i)}
                      </span>
                    </span>
                    {i < sightseeing.length - 1 && (
                      <span className="text-[10px] text-seafoam/35">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 border-t border-white/10 bg-[#0b1c24] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
              <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-seafoam/60">
                Stop {activeIndex + 1}
              </span>
              <div className="min-w-0 text-right">
                <p className="truncate text-[11px] font-light text-sand">
                  {activeStop.name}
                </p>
                <p className="mt-0.5 text-[10px] font-light text-seafoam/65">
                  <span className="font-display text-sm text-brass">
                    {activeStop.distanceKm} km
                  </span>{" "}
                  from retreat · {activeStop.segmentKm} km leg · ~
                  {activeStop.driveTime} drive
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="border-t border-white/10 px-4 py-2.5 sm:px-5 sm:py-3">
        <p className="text-[10px] font-light italic leading-relaxed text-seafoam/55 sm:text-xs">
          {sightseeingRoute.note}
        </p>
      </div>
    </div>
  );
}

function StopDetailCard({ stop, stopIndex, className = "" }) {
  const Icon = typeIcons[stop.type] || Mountain;
  const index =
    stopIndex ?? sightseeing.findIndex((item) => item.id === stop.id);

  return (
    <article className={`overflow-hidden border border-ink/10 bg-mist ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={stop.image}
          alt={stop.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 sm:bottom-4 sm:left-4 sm:right-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-ink/50 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-sand backdrop-blur-sm sm:px-2.5 sm:text-[10px]">
              <Icon className="size-3" strokeWidth={1.5} />
              {stop.type}
            </span>
            <h3 className="mt-2 font-display text-lg leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
              {stop.name}
            </h3>
          </div>
          <span className="shrink-0 rounded-sm bg-brass px-2.5 py-1.5 font-display text-base text-ink sm:px-3 sm:py-2 sm:text-xl">
            {stop.distanceKm} km
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-ink/10 p-4 sm:p-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
            From retreat
          </p>
          <p className="mt-1 font-display text-lg text-ink sm:text-xl">
            {stop.distanceKm} km
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
            This leg
          </p>
          <p className="mt-1 font-display text-lg text-ink sm:text-xl">
            {stop.segmentKm} km
          </p>
          <p className="mt-1 text-[10px] font-light text-ink/45">
            {legFromLabel(index)} · ~{stop.driveTime}
          </p>
        </div>
      </div>
    </article>
  );
}

function MobileStopCard({ stop, index, isActive, onSelect }) {
  const Icon = typeIcons[stop.type] || Mountain;
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      className={`overflow-hidden border text-left transition-colors ${
        isActive
          ? "border-brass/50 bg-white shadow-[0_12px_30px_-20px_rgba(184,149,108,0.45)]"
          : "border-ink/10 bg-white/80"
      }`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.04 * index, duration: 0.5, ease: easeOutExpo }}
      aria-pressed={isActive}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={stop.image}
          alt={stop.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span
          className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
            isActive ? "bg-brass text-ink" : "bg-ink/70 text-sand"
          }`}
        >
          {index + 1}
        </span>
        <span className="absolute right-2 top-2 rounded-sm bg-brass/95 px-1.5 py-0.5 font-display text-xs text-ink">
          {stop.distanceKm} km
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-sm leading-snug tracking-tight text-ink">
            {stop.name}
          </h4>
          <Icon className="size-3.5 shrink-0 text-brass" strokeWidth={1.5} />
        </div>
        <p className="mt-1.5 text-[11px] font-light leading-relaxed text-ink/45">
          {stop.distanceKm} km from retreat · {stop.segmentKm} km leg · ~
          {stop.driveTime}
        </p>
      </div>
    </motion.button>
  );
}

function RouteTimeline({ compact = false }) {
  return (
    <div className="relative overflow-hidden border border-ink/10 bg-white/60 px-4 py-6 sm:px-6 md:px-10 md:py-8">
      <div
        className="pointer-events-none absolute inset-y-0 left-5 w-px bg-gradient-to-b from-brass via-seafoam-deep to-brass sm:left-8 md:left-12"
        aria-hidden
      />
      <p className="pl-4 text-[11px] font-medium uppercase tracking-[0.22em] text-brass sm:pl-6 md:pl-10">
        Route timeline
      </p>
      <ol className="mt-6 space-y-0 sm:mt-8 md:pl-4">
        <li className="relative flex gap-3 pb-6 sm:gap-5 sm:pb-8 md:gap-8">
          <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-brass bg-ink text-[9px] font-medium uppercase tracking-wider text-sand sm:h-8 sm:w-8 sm:text-[10px]">
            0
          </span>
          <div className="min-w-0 flex-1 border-b border-ink/8 pb-6 sm:pb-8">
            <p className="font-display text-base text-ink sm:text-lg">
              {sightseeingRoute.origin.name}
            </p>
            <p className="mt-1 text-xs font-light text-ink/50 sm:text-sm">
              {sightseeingRoute.origin.location} · Starting point
            </p>
          </div>
          {!compact && (
            <span className="shrink-0 pt-0.5 font-display text-xs text-ink/35 sm:text-sm">
              0 km
            </span>
          )}
        </li>

        {sightseeing.map((stop, i) => (
          <li
            key={stop.id}
            className="relative flex gap-3 pb-6 last:pb-0 sm:gap-5 sm:pb-8 md:gap-8"
          >
            <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-seafoam-deep/50 bg-mist font-display text-xs text-ink sm:h-8 sm:w-8 sm:text-sm">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 border-b border-ink/8 pb-6 last:border-b-0 last:pb-0 sm:pb-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-display text-base leading-snug text-ink sm:text-lg">
                    {stop.name}
                  </p>
                  <p className="mt-1 text-xs font-light text-ink/50 sm:text-sm">
                    {stop.type}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 sm:items-end">
                  <span className="font-display text-sm text-brass sm:text-base">
                    {stop.distanceKm} km total
                  </span>
                  <span className="text-[11px] font-light text-ink/50 sm:text-xs">
                    {stop.segmentKm} km {legFromLabel(i).toLowerCase()} · ~
                    {stop.driveTime} this leg
                  </span>
                </div>
              </div>
            </div>
            <span className="hidden shrink-0 pt-0.5 font-display text-sm text-brass md:block">
              {stop.distanceKm} km
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function ExploreIdukki() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const activeStop = sightseeing[activeIndex];

  return (
    <section id="idukki" className="overflow-x-clip bg-foam section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Around the retreat"
            title="Sightseeing route map"
            description="Follow the highland circuit from Mount Misty Retreat to viewpoints and waterfalls across Idukki — arranged as per your requirements."
          />
        </SectionReveal>

        <SectionReveal className="mt-8 lg:mt-10" y={24}>
          <RouteStats />
        </SectionReveal>

        {/* Mobile layout */}
        <div className="mt-8 space-y-6 lg:hidden">
          <SectionReveal y={24}>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-brass">
              Route map
            </p>
            <RouteMapPanel
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              reduce={reduce}
              compact
            />
          </SectionReveal>

          <SectionReveal y={20}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStop.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: easeLuxury }}
              >
                <StopDetailCard stop={activeStop} stopIndex={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </SectionReveal>

          <SectionReveal y={20}>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-brass">
              Route stops
            </p>
            <div className="grid grid-cols-2 gap-3">
              {sightseeing.map((stop, i) => (
                <MobileStopCard
                  key={stop.id}
                  stop={stop}
                  index={i}
                  isActive={activeIndex === i}
                  onSelect={setActiveIndex}
                />
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} y={20}>
            <RouteTimeline compact />
          </SectionReveal>
        </div>

        {/* Desktop layout */}
        <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-12 lg:gap-10">
          <SectionReveal className="lg:col-span-7" y={32}>
            <RouteMapPanel
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
              reduce={reduce}
            />
          </SectionReveal>

          <SectionReveal className="lg:col-span-5" delay={0.08} y={32}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStop.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: easeLuxury }}
                className="flex h-full flex-col"
              >
                <StopDetailCard
                  stop={activeStop}
                  stopIndex={activeIndex}
                  className="flex h-full flex-col"
                />

                <ol className="mt-4 space-y-2 border border-ink/10 bg-white/50 p-3">
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
              </motion.div>
            </AnimatePresence>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-10 hidden lg:block" delay={0.12}>
          <RouteTimeline />
        </SectionReveal>

        <SectionReveal delay={0.18}>
          <p className="mt-8 max-w-xl text-sm font-light leading-relaxed text-ink/50 sm:mt-10 sm:text-base">
            Stay with us. Explore Idukki. Take home the memories.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
