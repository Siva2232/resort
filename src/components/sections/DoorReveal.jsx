import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { brand } from "../../data/resort";

const PANORAMA = [
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1800&q=80",
    label: "Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1800&q=80",
    label: "Lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1800&q=80",
    label: "Terrace light",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1800&q=80",
    label: "Living",
  },
];

const HOTSPOTS = [
  { id: "linen", label: "Belgian linen", x: 28, y: 58 },
  { id: "timber", label: "Hand-finished timber", x: 62, y: 42 },
  { id: "light", label: "Highland light", x: 78, y: 28 },
];

function DoorPanel({ side }) {
  const isLeft = side === "left";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0c1820]">
      {/* Deep lacquer base */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(118deg, #071218 0%, #12252e 38%, #1a3340 62%, #0d1f28 100%)"
            : "linear-gradient(242deg, #071218 0%, #12252e 38%, #1a3340 62%, #0d1f28 100%)",
        }}
      />

      {/* Classic vertical grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0, transparent 14px, rgba(212,196,168,0.07) 14px, rgba(212,196,168,0.07) 15px)",
        }}
      />

      {/* Outer molding */}
      <div
        aria-hidden
        className="absolute inset-3 border border-brass/20 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)] md:inset-5"
      />
      <div
        aria-hidden
        className="absolute inset-5 border border-white/[0.06] md:inset-7"
      />

      {/* Classic raised panels — top & bottom */}
      <div className="absolute inset-x-8 top-[8%] bottom-[52%] md:inset-x-12">
        <div className="h-full border border-brass/18 bg-gradient-to-b from-white/[0.04] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.35)]" />
      </div>
      <div className="absolute inset-x-8 top-[52%] bottom-[8%] md:inset-x-12">
        <div className="h-full border border-brass/18 bg-gradient-to-b from-white/[0.03] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.35)]" />
      </div>

      {/* Hinges */}
      <div
        aria-hidden
        className={`absolute top-[18%] flex flex-col gap-16 md:gap-20 ${
          isLeft ? "left-2 md:left-3" : "right-2 md:right-3"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-10 w-2.5 rounded-sm bg-gradient-to-b from-brass-light via-brass to-[#7a6040] shadow-[0_2px_8px_rgba(0,0,0,0.4)] md:h-12 md:w-3"
          />
        ))}
      </div>

      {/* Brass plate + handle */}
      <div
        className={`absolute top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 ${
          isLeft ? "right-5 md:right-9" : "left-5 md:left-9"
        }`}
      >
        <div className="flex size-11 items-center justify-center rounded-full border border-brass/50 bg-gradient-to-br from-brass-light/30 to-brass/10 backdrop-blur-sm md:size-12">
          <span className="font-display text-sm tracking-wide text-brass-light">
            {brand.name.charAt(0)}
          </span>
        </div>
        <div className="h-20 w-1.5 rounded-full bg-gradient-to-b from-brass-light via-brass to-[#8a6d45] shadow-[0_0_24px_rgba(184,149,108,0.45)] md:h-24" />
        {/* Keyhole */}
        <div className="mt-1 flex h-4 w-3 flex-col items-center">
          <div className="size-2 rounded-full border border-brass/60 bg-ink/80" />
          <div className="mt-[-1px] h-2.5 w-[3px] rounded-b-sm bg-ink/80 ring-1 ring-brass/40" />
        </div>
      </div>

      {/* Seam highlight */}
      <div
        aria-hidden
        className={`absolute inset-y-0 w-16 ${
          isLeft
            ? "right-0 bg-gradient-to-l from-brass/25 to-transparent"
            : "left-0 bg-gradient-to-r from-brass/25 to-transparent"
        }`}
      />
    </div>
  );
}

function Interior360({ enabled, brightness, scale, onYawChange }) {
  const stageRef = useRef(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const look = useMotionValue(0);
  const lookSpring = useSpring(look, { stiffness: 90, damping: 22, mass: 0.4 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 60, damping: 18 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 60, damping: 18 });
  const [activeHotspot, setActiveHotspot] = useState(null);

  const panoramaX = useTransform(lookSpring, [-1, 1], ["0%", "-66.66%"]);
  const depthX = useTransform(lookSpring, [-1, 1], ["4%", "-4%"]);
  const rotateY = useTransform(lookSpring, [-1, 1], [2.5, -2.5]);
  const fogX = useTransform(lookSpring, [-1, 1], ["6%", "-6%"]);
  const combinedRotateY = useTransform(
    [rotateY, tiltXSpring],
    ([base, tilt]) => base + tilt
  );

  useEffect(() => {
    const unsub = lookSpring.on("change", (v) => {
      onYawChange?.(Math.round(((v + 1) / 2) * 360));
    });
    return unsub;
  }, [lookSpring, onYawChange]);

  useEffect(() => {
    if (!enabled) return;
    let raf;
    const tick = (now) => {
      if (!dragging.current) {
        const t = now / 1000;
        const base = look.get();
        const drift = Math.sin(t * 0.35) * 0.008;
        if (Math.abs(base) < 0.9) look.set(base * 0.999 + drift * 0.12);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, look]);

  const onPointerDown = (e) => {
    if (!enabled) return;
    if (e.target.closest("[data-hotspot]")) return;
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!enabled || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(nx * 8);
    tiltY.set(ny * -6);

    if (dragging.current) {
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      const next = Math.max(
        -1,
        Math.min(1, look.get() - dx / (rect.width * 0.55))
      );
      look.set(next);
    }
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const transform3d = useMotionTemplate`perspective(1200px) rotateX(${tiltYSpring}deg) rotateY(${combinedRotateY}deg) scale(${scale})`;

  return (
    <motion.div
      ref={stageRef}
      className={`absolute inset-0 touch-none ${enabled ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
      style={{ opacity: brightness }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        dragging.current = false;
        tiltX.set(0);
        tiltY.set(0);
      }}
    >
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ transform: transform3d }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 flex h-full w-[300%] will-change-transform"
          style={{ x: panoramaX }}
        >
          {PANORAMA.map((shot) => (
            <div key={shot.src} className="relative h-full w-1/4 shrink-0">
              <img
                src={shot.src}
                alt={shot.label}
                className="h-full w-full object-cover"
                draggable={false}
                decoding="async"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,28,36,0.45)_100%)]"
          style={{ x: depthX }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            x: fogX,
            background:
              "linear-gradient(90deg, rgba(11,28,36,0.55) 0%, transparent 22%, transparent 78%, rgba(11,28,36,0.55) 100%)",
          }}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/35" />

      {enabled &&
        HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            type="button"
            data-hotspot
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
            }}
            aria-label={spot.label}
          >
            <span className="relative flex size-9 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-brass/30" />
              <span className="relative size-2.5 rounded-full bg-brass shadow-[0_0_12px_rgba(184,149,108,0.8)] ring-2 ring-foam/40" />
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-ink/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foam backdrop-blur-md transition-all duration-300 ${
                activeHotspot === spot.id
                  ? "translate-y-0 opacity-100"
                  : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              {spot.label}
            </span>
          </button>
        ))}
    </motion.div>
  );
}

/**
 * Cinematic classic doors → interactive 360° suite look-around.
 */
export default function DoorReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [yaw, setYaw] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const leftX = useTransform(scrollYProgress, [0.06, 0.55], ["0%", "-104%"]);
  const rightX = useTransform(scrollYProgress, [0.06, 0.55], ["0%", "104%"]);
  const interiorScale = useTransform(scrollYProgress, [0, 0.55], [1.22, 1]);
  const interiorBrightness = useTransform(
    scrollYProgress,
    [0.08, 0.5],
    [0.4, 1]
  );
  const captionOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.28, 0.42],
    [1, 1, 0.15, 0]
  );
  const hudOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.88, 0.96],
    [0, 1, 1, 0]
  );
  const lightSpill = useTransform(scrollYProgress, [0.06, 0.4], [0, 1]);
  const seamOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const doorShadow = useTransform(
    scrollYProgress,
    [0.08, 0.45],
    ["0px 0px 0px rgba(0,0,0,0)", "48px 0 90px rgba(0,0,0,0.6)"]
  );
  const doorShadowRight = useTransform(
    scrollYProgress,
    [0.08, 0.45],
    ["0px 0px 0px rgba(0,0,0,0)", "-48px 0 90px rgba(0,0,0,0.6)"]
  );
  const glassY = useTransform(scrollYProgress, [0.5, 0.65], [28, 0]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setDoorsOpen(v > 0.52);
    });
  }, [scrollYProgress]);

  if (reduce) {
    return (
      <section
        aria-label="Enter the retreat"
        className="relative flex min-h-[75vh] items-end overflow-hidden bg-ink"
      >
        <img
          src={PANORAMA[0].src}
          alt="Retreat interior"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <div className="section-shell relative z-10 px-5 pb-16 md:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
            Step inside
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight text-foam md:text-5xl">
            The doors open to quiet interiors
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="Open the doors to the 360 suite experience"
      className="relative h-[280vh] bg-ink"
    >
      <div className="sticky top-0 h-svh min-h-[640px] overflow-hidden">
        {/* Interactive interior beyond the doors */}
        <Interior360
          enabled={doorsOpen}
          brightness={interiorBrightness}
          scale={interiorScale}
          onYawChange={setYaw}
        />

        {/* Warm light through the seam */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[min(48vw,320px)] -translate-x-1/2"
          style={{
            opacity: lightSpill,
            background:
              "radial-gradient(ellipse at center, rgba(212,184,150,0.4) 0%, rgba(212,184,150,0.1) 42%, transparent 72%)",
          }}
        />

        {/* Floating dust motes */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] overflow-hidden"
          style={{ opacity: lightSpill }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute size-0.5 rounded-full bg-sand/50"
              style={{
                left: `${12 + i * 7}%`,
                top: `${20 + (i % 5) * 12}%`,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.55, 0.15],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            />
          ))}
        </motion.div>

        {/* Classic doors */}
        <motion.div
          className="absolute inset-y-0 left-0 z-20 w-1/2 will-change-transform"
          style={{ x: leftX, boxShadow: doorShadow }}
        >
          <DoorPanel side="left" />
        </motion.div>
        <motion.div
          className="absolute inset-y-0 right-0 z-20 w-1/2 will-change-transform"
          style={{ x: rightX, boxShadow: doorShadowRight }}
        >
          <DoorPanel side="right" />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brass/50 to-transparent"
          style={{ opacity: seamOpacity }}
        />

        {/* Closed-door caption */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: captionOpacity }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
            Scroll to enter
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl tracking-tight text-foam md:text-5xl lg:text-6xl">
            Open the doors
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base font-light leading-relaxed text-seafoam/75">
            A classic threshold — then a living 360° look through the suite.
          </p>
        </motion.div>

        {/* Open-door HUD — glassmorphism 360 controls */}
        <motion.div
          className={`absolute inset-x-0 bottom-0 z-30 px-5 pb-10 md:px-8 md:pb-14 ${
            doorsOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ opacity: hudOpacity, y: glassY }}
        >
          <div className="section-shell">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-md rounded-2xl border border-white/12 bg-ink/40 px-6 py-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full border border-brass/40 text-[10px] font-medium tracking-wider text-brass-light">
                    360°
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sand">
                    Suite look-around
                  </p>
                </div>
                <p className="mt-3 font-display text-2xl tracking-tight text-foam md:text-3xl">
                  Timber, linen, highland light
                </p>
                <p className="mt-2 text-sm font-light text-seafoam/70">
                  Drag left or right to look around the interior.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { value: "12", label: "Suites" },
                  { value: "360°", label: "View" },
                  { value: "24/7", label: "Care" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-[5.5rem] rounded-xl border border-white/10 bg-foam/5 px-4 py-3 backdrop-blur-md"
                  >
                    <p className="font-display text-xl text-brass-light">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-seafoam/55">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compass / yaw indicator */}
            <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-foam/45">
              <span className="h-px flex-1 max-w-16 bg-foam/25" />
              Drag · Look · Explore
              <span className="rounded-full border border-brass/35 bg-brass/10 px-2.5 py-1 font-medium tracking-[0.14em] text-brass-light">
                {String(yaw).padStart(3, "0")}°
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}