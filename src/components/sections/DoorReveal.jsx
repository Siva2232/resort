import { ChevronLeft, ChevronRight } from "lucide-react";
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

/** Warm teak / walnut palette for carved wooden doors. */
const WOOD = {
  deep: "#2a1810",
  dark: "#3d2518",
  base: "#5c3824",
  mid: "#7a4f32",
  warm: "#96603c",
  light: "#b0784a",
  grain: "#c4925e",
  highlight: "#d4a574",
  plank: "#6b4428",
};

const WOOD_FACE = (isLeft) =>
  isLeft
    ? `linear-gradient(118deg, ${WOOD.deep} 0%, ${WOOD.dark} 14%, ${WOOD.base} 32%, ${WOOD.mid} 48%, ${WOOD.warm} 58%, ${WOOD.base} 72%, ${WOOD.dark} 88%, ${WOOD.deep} 100%)`
    : `linear-gradient(242deg, ${WOOD.deep} 0%, ${WOOD.dark} 14%, ${WOOD.base} 32%, ${WOOD.mid} 48%, ${WOOD.warm} 58%, ${WOOD.base} 72%, ${WOOD.dark} 88%, ${WOOD.deep} 100%)`;

const WOOD_GRAIN = `
  repeating-linear-gradient(
    90deg,
    transparent 0px, transparent 5px,
    rgba(42,24,16,0.14) 5px, rgba(42,24,16,0.14) 6px
  ),
  repeating-linear-gradient(
    90deg,
    transparent 0px, transparent 28px,
    rgba(0,0,0,0.07) 28px, rgba(0,0,0,0.07) 29px
  ),
  repeating-linear-gradient(
    0deg,
    transparent 0px, transparent 18px,
    rgba(255,220,180,0.035) 18px, rgba(255,220,180,0.035) 19px,
    transparent 19px, transparent 42px,
    rgba(0,0,0,0.05) 42px, rgba(0,0,0,0.05) 43px
  ),
  repeating-linear-gradient(
    3deg,
    transparent 0px, transparent 96px,
    rgba(180,120,70,0.06) 96px, rgba(180,120,70,0.06) 98px
  )
`;

const WOOD_PANEL_FACE =
  "linear-gradient(168deg, rgba(212,165,116,0.22) 0%, rgba(180,120,72,0.08) 28%, rgba(42,24,16,0.18) 62%, rgba(26,16,10,0.42) 100%)";

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
        className="relative h-full w-full border border-[#8b5a35]/45"
        style={{
          background: WOOD_PANEL_FACE,
          boxShadow:
            "inset 0 2px 0 rgba(212,165,116,0.18), inset 0 -6px 16px rgba(26,16,10,0.55), inset 4px 0 12px rgba(0,0,0,0.12), inset -4px 0 12px rgba(0,0,0,0.12), 0 2px 0 rgba(180,120,72,0.2)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ backgroundImage: WOOD_GRAIN }}
        />
        <div className="absolute inset-[5px] border border-[#6b4428]/35 md:inset-[7px]" />
        <div className="absolute inset-[10px] border border-[#d4a574]/10 md:inset-[13px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[14%] top-[10%] h-[28%] rounded-[100%] opacity-35"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,228,196,0.16), transparent 70%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}

/** Carved teak double doors — warm grain, brass hardware. */
function DoorPanel({ side }) {
  const isLeft = side === "left";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#2a1810]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: WOOD_FACE(isLeft) }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.72]"
        style={{ backgroundImage: WOOD_GRAIN }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-55"
        style={{
          background: isLeft
            ? "linear-gradient(128deg, rgba(255,220,180,0.14) 0%, transparent 32%, transparent 52%, rgba(26,16,10,0.42) 100%)"
            : "linear-gradient(232deg, rgba(255,220,180,0.14) 0%, transparent 32%, transparent 52%, rgba(26,16,10,0.42) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-[6px] border border-[#a67c52]/35 md:inset-[10px]"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(212,165,116,0.12), inset 0 0 80px rgba(26,16,10,0.45), 0 0 0 1px rgba(90,56,36,0.35)",
        }}
      />
      <div aria-hidden className="absolute inset-[11px] border border-[#6b4428]/30 md:inset-[17px]" />
      <div aria-hidden className="absolute inset-[17px] border border-[#d4a574]/10 md:inset-[24px]" />
      <div aria-hidden className="absolute inset-[22px] border border-[#5c3824]/25 md:inset-[30px]" />

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
            className="absolute inset-0 rotate-45 border border-[#a67c52]/50"
            style={{
              background:
                "linear-gradient(145deg, rgba(212,165,116,0.24), transparent 48%, rgba(42,24,16,0.35))",
              boxShadow:
                "inset 0 0 0 1px rgba(255,228,196,0.1), 0 8px 24px rgba(26,16,10,0.45)",
            }}
          />
          <div aria-hidden className="absolute inset-[18%] rotate-45 border border-[#8b5a35]/35" />
          <div aria-hidden className="absolute inset-[32%] rotate-45 border border-[#6b4428]/25" />
          <span className="relative z-[1] font-display text-2xl tracking-wide text-[#f5ead8] md:text-3xl">
            {brand.fullName.charAt(0)}
          </span>
        </div>
      </RaisedPanel>

      <div
        aria-hidden
        className="absolute inset-x-[28px] top-[49%] h-[2.2%] md:inset-x-[42px]"
        style={{
          background:
            "linear-gradient(180deg, #4a2f1a 0%, #c4925e 22%, #96603c 50%, #6b4428 78%, #3d2518 100%)",
          boxShadow:
            "0 1px 0 rgba(255,228,196,0.12), 0 -1px 0 rgba(26,16,10,0.5), 0 4px 12px rgba(26,16,10,0.35)",
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
            className="absolute inset-[3px] rounded-full border border-[#4a2f1a]/50"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, #7a4f32 0%, #5c3824 55%, #3d2518 100%)",
            }}
          />
          <div aria-hidden className="absolute inset-[10px] rounded-full border border-[#c4925e]/40" />
          <div aria-hidden className="absolute inset-[16px] rounded-full border border-[#8b5a35]/25" />
          <div className="relative z-[1] flex flex-col items-center text-center">
            <span className="font-display text-lg leading-none tracking-wide text-[#f5ead8] md:text-xl">
              MM
            </span>
            <span className="mt-1 text-[6px] font-medium uppercase tracking-[0.2em] text-[#d4a574]/75 md:text-[7px]">
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
          <span className="text-[7px] font-medium uppercase tracking-[0.24em] text-[#2a1810]/90 md:text-[8px]">
            {brand.fullName}
          </span>
        </div>

        <div
          className="relative flex flex-col items-center px-3.5 py-5 md:px-4 md:py-6"
          style={{
            background:
              "linear-gradient(165deg, #f0dcc0 0%, #d4a574 16%, #b0784a 40%, #96603c 70%, #6b4428 100%)",
            boxShadow:
              "0 8px 28px rgba(26,16,10,0.55), inset 0 1px 0 rgba(255,240,220,0.55), inset 0 -2px 0 rgba(42,24,16,0.35)",
            borderRadius: "2px",
          }}
        >
          <div aria-hidden className="absolute inset-[3px] border border-white/25" />
          <div aria-hidden className="absolute inset-[7px] border border-[#6b4428]/25" />

          <div
            className="relative h-3.5 w-[4.25rem] rounded-full md:h-4 md:w-[5rem]"
            style={{
              background:
                "linear-gradient(180deg, #faf0e4 0%, #d4a574 40%, #8b5a35 100%)",
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
                  "radial-gradient(circle at 32% 28%, #fff8ee, #c4925e 48%, #5c3824)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.45)",
              }}
            />
          </div>

          <div className="mt-4 flex flex-col items-center">
            <div
              className="size-3 rounded-full md:size-3.5"
              style={{
                background: "#2a1810",
                boxShadow:
                  "inset 0 2px 4px rgba(0,0,0,0.9), 0 0 0 1px rgba(107,68,40,0.65)",
              }}
            />
            <div
              className="mt-[-2px] h-3.5 w-[3.5px] rounded-b-[1px] md:h-4"
              style={{
                background: "#2a1810",
                boxShadow: "0 0 0 1px rgba(107,68,40,0.55)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className={`absolute inset-y-0 w-14 md:w-[4.5rem] ${
          isLeft
            ? "right-0 bg-gradient-to-l from-[#c4925e]/35 via-[#8b5a35]/12 to-transparent"
            : "left-0 bg-gradient-to-r from-[#c4925e]/35 via-[#8b5a35]/12 to-transparent"
        }`}
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#a67c52]/45 to-transparent"
      />
    </div>
  );
}

/**
 * Interior gallery — auto-slides once the doors are open.
 */
function InteriorCarousel({ index, direction, showDots }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    INTERIOR_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  const slide = INTERIOR_SLIDES[index] ?? INTERIOR_SLIDES[0];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#2a1810]">
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

      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1810]/60 via-transparent to-[#3d2518]/30" />

      {showDots && SLIDE_COUNT > 1 && (
        <div
          aria-hidden
          className="absolute bottom-28 left-1/2 z-[5] flex -translate-x-1/2 items-center gap-2 md:bottom-32"
        >
          {INTERIOR_SLIDES.map((s, i) => (
            <span
              key={s.src}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-7 bg-[#f5ead8]" : "w-1.5 bg-[#f5ead8]/35"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SlideNavButton({ label, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-[#c4925e]/40 bg-[#2a1810]/60 text-[#f5ead8] shadow-[0_8px_24px_rgba(26,16,10,0.45)] backdrop-blur-sm transition duration-300 hover:border-[#d4a574]/65 hover:bg-[#3d2518]/80 md:size-12"
    >
      {children}
    </button>
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
  const [slideDirection, setSlideDirection] = useState(1);
  const [doorsOpen, setDoorsOpen] = useState(false);

  const goSlide = useCallback((dir) => {
    setSlideDirection(dir);
    setSlideIndex((i) => (i + dir + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (!doorsOpen || reduce || SLIDE_COUNT < 2) return;
    const id = window.setTimeout(() => goSlide(1), SLIDE_INTERVAL);
    return () => window.clearTimeout(id);
  }, [doorsOpen, reduce, goSlide, slideIndex]);

  useEffect(() => {
    if (!doorsOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goSlide(-1);
      if (e.key === "ArrowRight") goSlide(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doorsOpen, goSlide]);

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
        className="relative flex min-h-[70vh] items-end overflow-hidden bg-[#2a1810]"
      >
        <img
          src={INTERIOR}
          alt="Retreat interior"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1810] via-[#3d2518]/45 to-transparent" />
        <div className="section-shell relative z-10 px-5 pb-16 md:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#d4a574]">
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
      className="relative h-[180vh] overflow-x-clip bg-[#1f140c]"
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
            index={slideIndex}
            direction={slideDirection}
            showDots={doorsOpen}
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
              "radial-gradient(ellipse at center, rgba(245,220,180,0.55) 0%, rgba(196,146,94,0.2) 38%, transparent 72%)",
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
                    "linear-gradient(180deg, #8b5a35 0%, #5c3824 35%, #3d2518 100%)",
                  boxShadow: "1px 0 0 rgba(196,146,94,0.35)",
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
                    "linear-gradient(180deg, #8b5a35 0%, #5c3824 35%, #3d2518 100%)",
                  boxShadow: "-1px 0 0 rgba(196,146,94,0.35)",
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
          className="pointer-events-none absolute inset-0 z-[28] bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(31,20,12,0.58)_100%)]"
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4a574]/45 to-transparent"
          style={{ opacity: seamOpacity }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: captionOpacity, y: captionY }}
        >
          <div
            className="mb-5 h-px w-16 bg-gradient-to-r from-transparent via-[#c4925e]/70 to-transparent"
            aria-hidden
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#d4a574]">
            The threshold
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl tracking-tight text-[#faf5ee] md:text-5xl lg:text-6xl">
            Open the doors
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base font-light leading-relaxed text-[#e8d4b5]/75">
            A quiet passage into Mount Misty’s highland interiors.
          </p>
          <div
            className="mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#c4925e]/70 to-transparent"
            aria-hidden
          />
        </motion.div>

        {doorsOpen && SLIDE_COUNT > 1 && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[35] flex -translate-y-1/2 justify-between px-4 md:px-8">
            <SlideNavButton label="Previous interior" onClick={() => goSlide(-1)}>
              <ChevronLeft size={20} strokeWidth={1.5} />
            </SlideNavButton>
            <SlideNavButton label="Next interior" onClick={() => goSlide(1)}>
              <ChevronRight size={20} strokeWidth={1.5} />
            </SlideNavButton>
          </div>
        )}

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-14 md:px-8 md:pb-20"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <div className="section-shell">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#d4a574]">
              Within · {slideIndex + 1} / {SLIDE_COUNT}
            </p>
            <p className="mt-3 max-w-md font-display text-3xl tracking-tight text-[#faf5ee] md:text-4xl">
              {INTERIOR_SLIDES[slideIndex]?.alt ??
                "Timber, linen, and soft highland light."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
