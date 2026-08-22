import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";

const INTERIOR_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=75",
    alt: "Suite with soft linen and timber",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=75",
    alt: "Quiet bedroom in highland light",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=75",
    alt: "Pavilion lounge overlooking mist",
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=75",
    alt: "Living room with woven textures",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75",
    alt: "Private residence and deck",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=75",
    alt: "Evening interiors aglow",
  },
];

const SLIDE_COUNT = INTERIOR_SLIDES.length;
const INTERIOR = INTERIOR_SLIDES[0].src;
const SLIDE_INTERVAL = 4200;

/** Scroll progress: doors finish opening near the end of the sticky section. */
const DOOR_END = 0.88;

/** Velvet ease-out — slow start, long soft finish on the hinges. */
function easeDoorOpen(t) {
  const x = Math.min(1, Math.max(0, t));
  return 1 - (1 - x) ** 5;
}

const BRASS =
  "linear-gradient(180deg, #e8d4b5 0%, #d4b896 28%, #b8956c 58%, #8f7350 100%)";
const BRASS_EDGE =
  "linear-gradient(90deg, #c4a574 0%, #f0e0c8 35%, #b8956c 58%, #7a6040 100%)";

function BrassCorner({ className }) {
  return (
    <div aria-hidden className={`absolute size-4 md:size-5 ${className}`}>
      <div
        className="absolute inset-0 border border-brass/50"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(240,224,200,0.25), 0 0 12px rgba(184,149,108,0.25)",
        }}
      />
      <div className="absolute inset-[3px] border border-brass/25" />
      <span
        className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: BRASS }}
      />
    </div>
  );
}

function RaisedPanel({ className, children }) {
  return (
    <div className={`absolute ${className}`}>
      <div
        className="relative h-full w-full border border-brass/30"
        style={{
          background:
            "linear-gradient(165deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 32%, rgba(0,0,0,0.12) 68%, rgba(0,0,0,0.28) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -4px 14px rgba(0,0,0,0.45), 0 2px 0 rgba(184,149,108,0.16)",
        }}
      >
        <div className="absolute inset-[5px] border border-brass/20 md:inset-[7px]" />
        <div className="absolute inset-[10px] border border-white/[0.05] md:inset-[13px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[14%] top-[10%] h-[28%] rounded-[100%] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.12), transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}

/** Palace lacquer door — ink + brass, royal and refined. */
function DoorPanel({ side }) {
  const isLeft = side === "left";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070e14]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(122deg, #03070a 0%, #0a141a 18%, #14232c 42%, #0d1a22 68%, #050b10 100%)"
            : "linear-gradient(238deg, #03070a 0%, #0a141a 18%, #14232c 42%, #0d1a22 68%, #050b10 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg,
              transparent 0px, transparent 7px,
              rgba(212,196,168,0.045) 7px, rgba(212,196,168,0.045) 8px
            ),
            repeating-linear-gradient(90deg,
              transparent 0px, transparent 36px,
              rgba(184,149,108,0.05) 36px, rgba(184,149,108,0.05) 37px
            ),
            repeating-linear-gradient(0deg,
              transparent 0px, transparent 48px,
              rgba(0,0,0,0.06) 48px, rgba(0,0,0,0.06) 49px
            )
          `,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background: isLeft
            ? "linear-gradient(130deg, rgba(255,255,255,0.08) 0%, transparent 34%, transparent 55%, rgba(0,0,0,0.38) 100%)"
            : "linear-gradient(230deg, rgba(255,255,255,0.08) 0%, transparent 34%, transparent 55%, rgba(0,0,0,0.38) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-[6px] border border-brass/40 md:inset-[10px]"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(184,149,108,0.15)",
        }}
      />
      <div aria-hidden className="absolute inset-[11px] border border-brass/22 md:inset-[17px]" />
      <div aria-hidden className="absolute inset-[17px] border border-white/[0.045] md:inset-[24px]" />
      <div aria-hidden className="absolute inset-[22px] border border-brass/12 md:inset-[30px]" />

      <BrassCorner className="left-[14px] top-[14px] md:left-[22px] md:top-[22px]" />
      <BrassCorner className="right-[14px] top-[14px] md:right-[22px] md:top-[22px]" />
      <BrassCorner className="bottom-[14px] left-[14px] md:bottom-[22px] md:left-[22px]" />
      <BrassCorner className="bottom-[14px] right-[14px] md:bottom-[22px] md:right-[22px]" />

      <div
        aria-hidden
        className="absolute inset-x-[28px] top-[5.5%] h-[1.8%] md:inset-x-[40px]"
        style={{
          background: BRASS,
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.45)",
        }}
      />

      <RaisedPanel className="inset-x-[28px] top-[9%] bottom-[52%] md:inset-x-[42px]">
        <div className="absolute left-1/2 top-[46%] flex size-[5.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center md:size-[6.5rem]">
          <div
            aria-hidden
            className="absolute inset-0 rotate-45 border border-brass/45"
            style={{
              background:
                "linear-gradient(145deg, rgba(232,212,181,0.16), transparent 48%, rgba(0,0,0,0.3))",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)",
            }}
          />
          <div aria-hidden className="absolute inset-[18%] rotate-45 border border-brass/30" />
          <div aria-hidden className="absolute inset-[32%] rotate-45 border border-brass/18" />
          <span className="relative z-[1] font-display text-2xl tracking-wide text-brass-light md:text-3xl">
            {brand.fullName.charAt(0)}
          </span>
        </div>
      </RaisedPanel>

      <div
        aria-hidden
        className="absolute inset-x-[28px] top-[49%] h-[2.2%] md:inset-x-[42px]"
        style={{
          background:
            "linear-gradient(180deg, #5c4830 0%, #e8d4b5 22%, #b8956c 50%, #8f7350 78%, #3d2e1c 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.25)",
        }}
      />

      <RaisedPanel className="inset-x-[28px] top-[52.5%] bottom-[8%] md:inset-x-[42px]">
        <div className="absolute left-1/2 top-1/2 flex size-[5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center md:size-[6rem]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background: BRASS,
              boxShadow:
                "0 8px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-[3px] rounded-full border border-[#5c4830]/40"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, #1a2830 0%, #0a141a 55%, #050b10 100%)",
            }}
          />
          <div aria-hidden className="absolute inset-[10px] rounded-full border border-brass/35" />
          <div aria-hidden className="absolute inset-[16px] rounded-full border border-brass/18" />
          <div className="relative z-[1] flex flex-col items-center text-center">
            <span className="font-display text-lg leading-none tracking-wide text-brass-light md:text-xl">
              MM
            </span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-[0.2em] text-brass/65 md:text-[7px]">
              Retreat
            </span>
          </div>
        </div>
      </RaisedPanel>

      <div
        aria-hidden
        className="absolute inset-x-[28px] bottom-[5.5%] h-[1.8%] md:inset-x-[40px]"
        style={{
          background: BRASS,
          boxShadow:
            "0 -2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
        }}
      />

      <div
        aria-hidden
        className={`absolute top-[11%] flex flex-col justify-between ${
          isLeft ? "left-[4px] md:left-[6px]" : "right-[4px] md:right-[6px]"
        }`}
        style={{ height: "78%" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative">
            <div
              className="relative h-14 w-4 overflow-hidden rounded-[2px] md:h-[4.25rem] md:w-[1.15rem]"
              style={{
                background: BRASS_EDGE,
                boxShadow:
                  "0 4px 16px rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,255,255,0.45), inset -1px 0 0 rgba(0,0,0,0.35)",
              }}
            >
              <span className="absolute inset-x-1 top-2.5 h-px bg-[#5c4830]/50" />
              <span className="absolute inset-x-1 bottom-2.5 h-px bg-[#5c4830]/50" />
              <span className="absolute left-1/2 top-3 size-1.5 -translate-x-1/2 rounded-full bg-[#3d2e1c]/80" />
              <span className="absolute bottom-3 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#3d2e1c]/80" />
            </div>
          </div>
        ))}
      </div>

      <div
        className={`absolute top-[49%] z-10 flex -translate-y-1/2 flex-col items-center ${
          isLeft ? "right-4 md:right-8" : "left-4 md:left-8"
        }`}
      >
        <div
          className="mb-4 flex min-h-8 min-w-[5.5rem] items-center justify-center px-3.5 md:min-h-9 md:min-w-[6.75rem]"
          style={{
            background: BRASS,
            boxShadow:
              "0 4px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.25)",
          }}
        >
          <span className="text-[7px] font-medium uppercase tracking-[0.24em] text-ink/85 md:text-[8px]">
            {brand.fullName}
          </span>
        </div>

        <div
          className="relative flex flex-col items-center px-3.5 py-5 md:px-4 md:py-6"
          style={{
            background:
              "linear-gradient(165deg, #f5ead8 0%, #e8d4b5 16%, #c4a574 40%, #b8956c 70%, #8a6d45 100%)",
            boxShadow:
              "0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.25)",
            borderRadius: "2px",
          }}
        >
          <div aria-hidden className="absolute inset-[3px] border border-white/25" />
          <div aria-hidden className="absolute inset-[7px] border border-[#5c4830]/20" />

          <div
            className="relative h-3.5 w-[4.25rem] rounded-full md:h-4 md:w-[5rem]"
            style={{
              background:
                "linear-gradient(180deg, #faf4ea 0%, #e2c9a0 40%, #a88458 100%)",
              boxShadow:
                "0 5px 14px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.7)",
              transform: isLeft ? "translateX(8px)" : "translateX(-8px)",
            }}
          >
            <span
              className={`absolute top-1/2 size-[1.15rem] -translate-y-1/2 rounded-full md:size-5 ${
                isLeft ? "-left-0.5" : "-right-0.5"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, #fff8ee, #d4b896 48%, #7a6040)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.45)",
              }}
            />
          </div>

          <div className="mt-4 flex flex-col items-center">
            <div
              className="size-3 rounded-full md:size-3.5"
              style={{
                background: "#0a0806",
                boxShadow:
                  "inset 0 2px 4px rgba(0,0,0,0.9), 0 0 0 1px rgba(90,70,45,0.6)",
              }}
            />
            <div
              className="mt-[-2px] h-3.5 w-[3.5px] rounded-b-[1px] md:h-4"
              style={{
                background: "#0a0806",
                boxShadow: "0 0 0 1px rgba(90,70,45,0.5)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className={`absolute inset-y-0 w-14 md:w-[4.5rem] ${
          isLeft
            ? "right-0 bg-gradient-to-l from-brass/40 via-brass/14 to-transparent"
            : "left-0 bg-gradient-to-r from-brass/40 via-brass/14 to-transparent"
        }`}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/55 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass/45 to-transparent"
      />
    </div>
  );
}

/**
 * Interior gallery — auto-slides once the doors are open.
 */
function InteriorCarousel({ playing, showDots, onIndexChange }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    INTERIOR_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  useEffect(() => {
    if (!playing || reduce || SLIDE_COUNT < 2) return;
    const id = window.setTimeout(() => go(1), SLIDE_INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, reduce, go, index]);

  const slide = INTERIOR_SLIDES[index] ?? INTERIOR_SLIDES[0];

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          custom={direction}
          variants={{
            enter: (d) =>
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.05, x: d > 0 ? "2.5%" : "-2.5%" },
            center: { opacity: 1, scale: 1, x: 0 },
            exit: (d) =>
              reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.015, x: d > 0 ? "-2%" : "2%" },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0.3 : 0.85, ease: easeLuxury }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          decoding="async"
          draggable={false}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />

      {showDots && SLIDE_COUNT > 1 && (
        <div
          aria-hidden
          className="absolute bottom-28 left-1/2 z-[5] flex -translate-x-1/2 items-center gap-2 md:bottom-32"
        >
          {INTERIOR_SLIDES.map((s, i) => (
            <span
              key={s.src}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-foam" : "w-1.5 bg-foam/35"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Hinged double doors — push open on their hinges (rotateY).
 * Interior photos auto-slide once the threshold is open.
 */
export default function DoorReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [doorsOpen, setDoorsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  // Doors open across a long, slow stretch of scroll
  const openAmountRaw = useTransform(scrollYProgress, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.015) / (DOOR_END - 0.015)));
    return easeDoorOpen(t);
  });

  // Right leaf lags — second hand pushing a heavy door
  const openAmountRightRaw = useTransform(scrollYProgress, (v) => {
    const start = 0.045;
    const t = Math.min(1, Math.max(0, (v - start) / (DOOR_END - start + 0.04)));
    return easeDoorOpen(t);
  });

  // Soft spring inertia — doors feel heavy and fluid, not 1:1 with the wheel
  const doorSpring = { stiffness: 48, damping: 28, mass: 1.15, restDelta: 0.001 };
  const openAmount = useSpring(openAmountRaw, doorSpring);
  const openAmountRight = useSpring(openAmountRightRaw, {
    ...doorSpring,
    mass: 1.35,
    stiffness: 42,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const open = v >= DOOR_END * 0.55;
    setDoorsOpen((prev) => (prev === open ? prev : open));
  });

  // Soft push to ~108° — settled open without a harsh snap
  const leftRotateY = useTransform(openAmount, [0, 1], [0, -108]);
  const rightRotateY = useTransform(openAmountRight, [0, 1], [0, 108]);

  const leftZ = useTransform(openAmount, [0, 0.45, 1], [0, 14, 6]);
  const rightZ = useTransform(openAmountRight, [0, 0.45, 1], [0, 14, 6]);

  const interiorScale = useTransform(openAmount, [0, 1], [1.12, 1]);
  const interiorOpacity = useTransform(openAmount, [0.04, 0.62], [0.22, 1]);
  const interiorY = useTransform(openAmount, [0, 1], ["3.5%", "0%"]);

  const captionOpacity = useTransform(openAmount, [0, 0.12, 0.48], [1, 0.9, 0]);
  const captionY = useTransform(openAmount, [0, 0.48], [0, -20]);
  const revealOpacity = useTransform(
    scrollYProgress,
    [DOOR_END * 0.86, DOOR_END + 0.05],
    [0, 1]
  );
  const revealY = useTransform(
    scrollYProgress,
    [DOOR_END * 0.86, DOOR_END + 0.07],
    [24, 0]
  );

  const lightSpill = useTransform(openAmount, [0.06, 0.58], [0, 1]);
  const lightWidth = useTransform(openAmount, [0, 1], ["10vw", "52vw"]);
  const seamOpacity = useTransform(openAmount, [0, 0.18], [1, 0]);

  const doorBrightness = useTransform(openAmount, [0, 0.5, 1], [1, 0.82, 0.66]);
  const doorFilter = useTransform(
    doorBrightness,
    (b) => `brightness(${b}) contrast(1.04)`
  );
  const doorBrightnessR = useTransform(
    openAmountRight,
    [0, 0.5, 1],
    [1, 0.82, 0.66]
  );
  const doorFilterR = useTransform(
    doorBrightnessR,
    (b) => `brightness(${b}) contrast(1.04)`
  );

  const shadowOpacity = useTransform(openAmount, [0.04, 0.42, 1], [0, 0.48, 0.22]);

  if (reduce) {
    return (
      <section
        aria-label="Enter the retreat"
        className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink"
      >
        <img
          src={INTERIOR}
          alt="Retreat interior"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
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
      aria-label="Open the doors to the retreat"
      className="relative h-[180vh] overflow-x-clip bg-ink"
    >
      <div
        className="sticky top-0 h-svh min-h-[560px] overflow-hidden"
        style={{
          perspective: "2400px",
          perspectiveOrigin: "50% 48%",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            scale: interiorScale,
            opacity: interiorOpacity,
            y: interiorY,
          }}
        >
          <InteriorCarousel
            playing={doorsOpen}
            showDots={doorsOpen}
            onIndexChange={setSlideIndex}
          />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 max-w-full -translate-x-1/2"
          style={{
            opacity: lightSpill,
            width: lightWidth,
            maxWidth: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(232,212,181,0.5) 0%, rgba(184,149,108,0.16) 38%, transparent 72%)",
          }}
        />

        <div
          className="absolute inset-0 z-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 origin-left will-change-transform [backface-visibility:hidden]"
            style={{
              rotateY: leftRotateY,
              z: leftZ,
              filter: doorFilter,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <DoorPanel side="left" />
              <div
                aria-hidden
                className="absolute inset-y-0 -right-[7px] w-[7px] origin-left"
                style={{
                  transform: "rotateY(90deg)",
                  background:
                    "linear-gradient(180deg, #3a4a54 0%, #1a2830 35%, #0c141a 100%)",
                  boxShadow: "1px 0 0 rgba(184,149,108,0.35)",
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-[8%] -right-8 w-24 origin-left"
                style={{
                  opacity: shadowOpacity,
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.55), transparent)",
                  transform: "rotateY(8deg) translateZ(-2px)",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 origin-right will-change-transform [backface-visibility:hidden]"
            style={{
              rotateY: rightRotateY,
              z: rightZ,
              filter: doorFilterR,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <DoorPanel side="right" />
              <div
                aria-hidden
                className="absolute inset-y-0 -left-[7px] w-[7px] origin-right"
                style={{
                  transform: "rotateY(-90deg)",
                  background:
                    "linear-gradient(180deg, #3a4a54 0%, #1a2830 35%, #0c141a 100%)",
                  boxShadow: "-1px 0 0 rgba(184,149,108,0.35)",
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-[8%] -left-8 w-24 origin-right"
                style={{
                  opacity: shadowOpacity,
                  background:
                    "linear-gradient(270deg, rgba(0,0,0,0.55), transparent)",
                  transform: "rotateY(-8deg) translateZ(-2px)",
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[28] bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(5,11,16,0.55)_100%)]"
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brass/55 to-transparent"
          style={{ opacity: seamOpacity }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: captionOpacity, y: captionY }}
        >
          <div
            className="mb-5 h-px w-16 bg-gradient-to-r from-transparent via-brass/70 to-transparent"
            aria-hidden
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-sand">
            The threshold
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl tracking-tight text-foam md:text-5xl lg:text-6xl">
            Open the doors
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base font-light leading-relaxed text-seafoam/75">
            A quiet passage into Mount Misty’s highland interiors.
          </p>
          <div
            className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-brass/70 to-transparent"
            aria-hidden
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-14 md:px-8 md:pb-20"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <div className="section-shell">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              Within · {slideIndex + 1} / {SLIDE_COUNT}
            </p>
            <p className="mt-3 max-w-md font-display text-3xl tracking-tight text-foam md:text-4xl">
              {INTERIOR_SLIDES[slideIndex]?.alt ??
                "Timber, linen, and soft highland light."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
