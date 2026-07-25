import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "../../data/resort";

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px), (pointer: coarse)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return mobile;
}

const PANORAMA = [
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=70",
    label: "Suite",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=70",
    label: "Lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=70",
    label: "Terrace light",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=70",
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
    <div className="relative h-full w-full overflow-hidden bg-[#0a1218]">
      {/* Ebony lacquer body */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(112deg, #060d12 0%, #101c24 28%, #182830 52%, #0e1a22 78%, #081015 100%)"
            : "linear-gradient(248deg, #060d12 0%, #101c24 28%, #182830 52%, #0e1a22 78%, #081015 100%)",
        }}
      />

      {/* Polished wood grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg,
              transparent 0px,
              transparent 11px,
              rgba(212,196,168,0.055) 11px,
              rgba(212,196,168,0.055) 12px
            ),
            repeating-linear-gradient(90deg,
              transparent 0px,
              transparent 47px,
              rgba(184,149,108,0.04) 47px,
              rgba(184,149,108,0.04) 48px
            )
          `,
        }}
      />

      {/* Soft sheen across the door */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background: isLeft
            ? "linear-gradient(125deg, rgba(255,255,255,0.05) 0%, transparent 38%, transparent 62%, rgba(0,0,0,0.25) 100%)"
            : "linear-gradient(235deg, rgba(255,255,255,0.05) 0%, transparent 38%, transparent 62%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Outer brass frame — double reveal */}
      <div
        aria-hidden
        className="absolute inset-[10px] border border-brass/25 md:inset-[14px]"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 60px rgba(0,0,0,0.45)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[16px] border border-white/[0.05] md:inset-[22px]"
      />

      {/* Classic raised panels — hotel door proportions */}
      <div className="absolute inset-x-[28px] top-[7%] bottom-[54%] md:inset-x-[40px]">
        <div
          className="relative h-full border border-brass/22"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.01) 40%, rgba(0,0,0,0.15) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 8px rgba(0,0,0,0.35), 0 1px 0 rgba(184,149,108,0.12)",
          }}
        >
          <div className="absolute inset-[7px] border border-brass/12 md:inset-[10px]" />
          <div className="absolute inset-[14px] border border-white/[0.04] md:inset-[18px]" />
        </div>
      </div>

      <div className="absolute inset-x-[28px] top-[50%] bottom-[7%] md:inset-x-[40px]">
        <div
          className="relative h-full border border-brass/22"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 35%, rgba(0,0,0,0.18) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 8px rgba(0,0,0,0.35), 0 1px 0 rgba(184,149,108,0.1)",
          }}
        >
          <div className="absolute inset-[7px] border border-brass/12 md:inset-[10px]" />
          <div className="absolute inset-[14px] border border-white/[0.04] md:inset-[18px]" />
          {/* Monogram medallion on lower panel */}
          <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/40 bg-gradient-to-br from-brass/15 via-transparent to-brass/5 md:size-16">
            <div className="flex size-10 items-center justify-center rounded-full border border-brass/30 md:size-11">
              <span className="font-display text-lg tracking-wide text-brass-light/90 md:text-xl">
                {brand.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center rail between panels */}
      <div
        aria-hidden
        className="absolute inset-x-[28px] top-[48.5%] h-[3%] md:inset-x-[40px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(184,149,108,0.18), rgba(0,0,0,0.35))",
          boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
        }}
      />

      {/* Luxury hinges */}
      <div
        aria-hidden
        className={`absolute top-[14%] flex flex-col gap-[18%] ${
          isLeft ? "left-[6px] md:left-[8px]" : "right-[6px] md:right-[8px]"
        }`}
        style={{ height: "72%" }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative">
            <div
              className="h-11 w-3 rounded-[2px] md:h-14 md:w-3.5"
              style={{
                background:
                  "linear-gradient(90deg, #c4a574 0%, #e2c9a0 35%, #b8956c 55%, #8a6d45 100%)",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.45), inset 1px 0 0 rgba(255,255,255,0.35), inset -1px 0 0 rgba(0,0,0,0.25)",
              }}
            />
            <span className="absolute left-1/2 top-1.5 size-1 -translate-x-1/2 rounded-full bg-[#5c4830]/70" />
            <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#5c4830]/70" />
          </div>
        ))}
      </div>

      {/* Brass escutcheon + lever handle */}
      <div
        className={`absolute top-1/2 z-10 flex -translate-y-1/2 flex-col items-center ${
          isLeft ? "right-6 md:right-10" : "left-6 md:left-10"
        }`}
      >
        {/* Name plate */}
        <div
          className="mb-5 flex h-7 min-w-[4.5rem] items-center justify-center px-3 md:h-8 md:min-w-[5.25rem]"
          style={{
            background:
              "linear-gradient(180deg, #d4b896 0%, #b8956c 48%, #9a7a52 100%)",
            boxShadow:
              "0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-ink/80 md:text-[10px]">
            {brand.name}
          </span>
        </div>

        {/* Escutcheon plate */}
        <div
          className="relative flex flex-col items-center rounded-sm px-2.5 py-4 md:px-3 md:py-5"
          style={{
            background:
              "linear-gradient(160deg, #e8d4b5 0%, #c4a574 28%, #b8956c 55%, #8f7350 100%)",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
        >
          {/* Lever handle */}
          <div
            className={`relative h-2.5 w-14 rounded-full md:h-3 md:w-16 ${
              isLeft ? "origin-right" : "origin-left"
            }`}
            style={{
              background:
                "linear-gradient(180deg, #f0e0c8 0%, #d4b896 40%, #a88458 100%)",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.55)",
              transform: isLeft ? "translateX(6px)" : "translateX(-6px)",
            }}
          >
            <span
              className={`absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full md:size-4 ${
                isLeft ? "left-0" : "right-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #f5ead8, #b8956c 55%, #7a6040)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
              }}
            />
          </div>

          {/* Keyhole */}
          <div className="mt-3.5 flex flex-col items-center">
            <div
              className="size-2 rounded-full md:size-2.5"
              style={{
                background: "#1a1210",
                boxShadow:
                  "inset 0 1px 2px rgba(0,0,0,0.8), 0 0 0 1px rgba(90,70,45,0.5)",
              }}
            />
            <div
              className="mt-[-1px] h-2.5 w-[3px] rounded-b-[1px] md:h-3"
              style={{
                background: "#1a1210",
                boxShadow: "0 0 0 1px rgba(90,70,45,0.4)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Meeting-edge polish (where doors meet) */}
      <div
        aria-hidden
        className={`absolute inset-y-0 w-10 md:w-14 ${
          isLeft
            ? "right-0 bg-gradient-to-l from-brass/30 via-brass/10 to-transparent"
            : "left-0 bg-gradient-to-r from-brass/30 via-brass/10 to-transparent"
        }`}
      />

      {/* Top & bottom threshold lines */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent"
      />
    </div>
  );
}

function Interior360({ enabled, brightness, scale, onYawChange, isMobile }) {
  const stageRef = useRef(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const look = useMotionValue(0);
  // Springs are costly on mobile — use direct values there
  const lookSpring = useSpring(look, {
    stiffness: isMobile ? 180 : 90,
    damping: isMobile ? 28 : 22,
    mass: isMobile ? 0.25 : 0.4,
  });
  const [activeHotspot, setActiveHotspot] = useState(null);

  const shots = useMemo(
    () => (isMobile ? PANORAMA.slice(0, 3) : PANORAMA),
    [isMobile]
  );
  const stripWidth = isMobile ? "200%" : "300%";
  const slideWidth = isMobile ? "w-1/3" : "w-1/4";
  const panoramaX = useTransform(
    lookSpring,
    [-1, 1],
    isMobile ? ["0%", "-50%"] : ["0%", "-66.66%"]
  );

  useEffect(() => {
    if (!enabled || isMobile) return;
    let raf = 0;
    let last = 0;
    const tick = (now) => {
      // ~20fps idle drift — far cheaper than every frame
      if (now - last > 50 && !dragging.current) {
        last = now;
        const t = now / 1000;
        const base = look.get();
        const drift = Math.sin(t * 0.35) * 0.006;
        if (Math.abs(base) < 0.9) look.set(base * 0.999 + drift * 0.1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, isMobile, look]);

  useEffect(() => {
    if (!enabled) return;
    let lastSent = -1;
    const unsub = lookSpring.on("change", (v) => {
      const deg = Math.round(((v + 1) / 2) * 360);
      if (deg === lastSent) return;
      lastSent = deg;
      onYawChange?.(deg);
    });
    return unsub;
  }, [enabled, lookSpring, onYawChange]);

  const onPointerDown = (e) => {
    if (!enabled) return;
    if (e.target.closest("[data-hotspot]")) return;
    dragging.current = true;
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!enabled || !dragging.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const next = Math.max(
      -1,
      Math.min(1, look.get() - dx / (rect.width * 0.55))
    );
    look.set(next);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <motion.div
      ref={stageRef}
      className={`absolute inset-0 ${enabled ? "cursor-grab touch-none active:cursor-grabbing" : "pointer-events-none"}`}
      style={{ opacity: brightness }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Scale only — no perspective/rotate (those thrash mobile GPUs while scrolling) */}
      <motion.div
        className="absolute inset-0 origin-center"
        style={{ scale }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 flex h-full will-change-transform"
          style={{ width: stripWidth, x: panoramaX }}
        >
          {shots.map((shot) => (
            <div key={shot.src} className={`relative h-full ${slideWidth} shrink-0`}>
              <img
                src={shot.src}
                alt={shot.label}
                className="h-full w-full object-cover"
                draggable={false}
                decoding="async"
                loading={enabled ? "eager" : "lazy"}
              />
            </div>
          ))}
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,28,36,0.45)_100%)]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/35" />

      {enabled &&
        !isMobile &&
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
              <span className="relative size-2.5 rounded-full bg-brass ring-2 ring-foam/40" />
            </span>
            <span
              className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-ink/55 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foam backdrop-blur-md transition-opacity duration-300 ${
                activeHotspot === spot.id
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
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
 * Mobile: transform-only door scrub, no animated shadows / particles / 3D tilt.
 */
export default function DoorReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [yaw, setYaw] = useState(0);
  const [showInterior, setShowInterior] = useState(false);
  const openRef = useRef(false);
  const interiorMounted = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const leftX = useTransform(scrollYProgress, [0.06, 0.55], ["0%", "-104%"]);
  const rightX = useTransform(scrollYProgress, [0.06, 0.55], ["0%", "104%"]);
  const interiorScale = useTransform(
    scrollYProgress,
    [0, 0.55],
    isMobile ? [1.08, 1] : [1.18, 1]
  );
  const interiorBrightness = useTransform(
    scrollYProgress,
    [0.08, 0.5],
    [0.45, 1]
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

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const open = v > 0.52;
      if (open !== openRef.current) {
        openRef.current = open;
        setDoorsOpen(open);
      }
      if (v > 0.18 && !interiorMounted.current) {
        interiorMounted.current = true;
        setShowInterior(true);
      }
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
      className={`relative bg-ink ${isMobile ? "h-[200vh]" : "h-[260vh]"}`}
    >
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden [transform:translateZ(0)]">
        {showInterior ? (
          <Interior360
            enabled={doorsOpen}
            brightness={interiorBrightness}
            scale={interiorScale}
            onYawChange={setYaw}
            isMobile={isMobile}
          />
        ) : (
          <div className="absolute inset-0 bg-ink" />
        )}

        {/* Warm light — opacity only */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-[min(48vw,280px)] -translate-x-1/2"
          style={{
            opacity: lightSpill,
            background:
              "radial-gradient(ellipse at center, rgba(212,184,150,0.35) 0%, rgba(212,184,150,0.08) 42%, transparent 72%)",
          }}
        />

        {/* Doors — transform only (no animated box-shadow) */}
        <motion.div
          className="absolute inset-y-0 left-0 z-20 w-1/2 will-change-transform [backface-visibility:hidden]"
          style={{ x: leftX }}
        >
          <div className="h-full w-full shadow-[12px_0_40px_rgba(0,0,0,0.35)] md:shadow-[28px_0_60px_rgba(0,0,0,0.45)]">
            <DoorPanel side="left" />
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-y-0 right-0 z-20 w-1/2 will-change-transform [backface-visibility:hidden]"
          style={{ x: rightX }}
        >
          <div className="h-full w-full shadow-[-12px_0_40px_rgba(0,0,0,0.35)] md:shadow-[-28px_0_60px_rgba(0,0,0,0.45)]">
            <DoorPanel side="right" />
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brass/50 to-transparent"
          style={{ opacity: seamOpacity }}
        />

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

        <motion.div
          className={`absolute inset-x-0 bottom-0 z-30 px-5 pb-10 md:px-8 md:pb-14 ${
            doorsOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{ opacity: hudOpacity }}
        >
          <div className="section-shell">
            <div className="max-w-md border border-white/12 bg-ink/70 px-5 py-4 md:bg-ink/50 md:px-6 md:py-5 md:backdrop-blur-md">
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
              {!isMobile && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-brass-light/80">
                  {String(yaw).padStart(3, "0")}°
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
