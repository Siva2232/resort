import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

/** Scroll progress: doors finish opening slowly, then slides begin. */
const DOOR_END = 0.4;
/** Last slide holds until near the end of the sticky section. */
const SLIDES_END = 0.95;

/** Velvet ease-out — slow start, long soft finish on the hinges. */
function easeDoorOpen(t) {
  const x = Math.min(1, Math.max(0, t));
  return 1 - (1 - x) ** 5;
}

function DoorPanel({ side }) {
  const isLeft = side === "left";

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a1218]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: isLeft
            ? "linear-gradient(112deg, #060d12 0%, #101c24 28%, #182830 52%, #0e1a22 78%, #081015 100%)"
            : "linear-gradient(248deg, #060d12 0%, #101c24 28%, #182830 52%, #0e1a22 78%, #081015 100%)",
        }}
      />

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

      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background: isLeft
            ? "linear-gradient(125deg, rgba(255,255,255,0.05) 0%, transparent 38%, transparent 62%, rgba(0,0,0,0.25) 100%)"
            : "linear-gradient(235deg, rgba(255,255,255,0.05) 0%, transparent 38%, transparent 62%, rgba(0,0,0,0.25) 100%)",
        }}
      />

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
          <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/40 bg-gradient-to-br from-brass/15 via-transparent to-brass/5 md:size-16">
            <div className="flex size-10 items-center justify-center rounded-full border border-brass/30 md:size-11">
              <span className="font-display text-lg tracking-wide text-brass-light/90 md:text-xl">
                {brand.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-[28px] top-[48.5%] h-[3%] md:inset-x-[40px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(184,149,108,0.18), rgba(0,0,0,0.35))",
          boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
        }}
      />

      {/* Hinges sit on the outer edge — the real pivot */}
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

      <div
        className={`absolute top-1/2 z-10 flex -translate-y-1/2 flex-col items-center ${
          isLeft ? "right-6 md:right-10" : "left-6 md:left-10"
        }`}
      >
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

        <div
          className="relative flex flex-col items-center rounded-sm px-2.5 py-4 md:px-3 md:py-5"
          style={{
            background:
              "linear-gradient(160deg, #e8d4b5 0%, #c4a574 28%, #b8956c 55%, #8f7350 100%)",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="relative h-2.5 w-14 rounded-full md:h-3 md:w-16"
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

      <div
        aria-hidden
        className={`absolute inset-y-0 w-10 md:w-14 ${
          isLeft
            ? "right-0 bg-gradient-to-l from-brass/30 via-brass/10 to-transparent"
            : "left-0 bg-gradient-to-r from-brass/30 via-brass/10 to-transparent"
        }`}
      />

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

/**
 * Scroll-driven interior gallery — index advances with scroll, not autoplay.
 */
function InteriorCarousel({ index, showDots }) {
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const prevIndex = useRef(index);

  useEffect(() => {
    if (index !== prevIndex.current) {
      setDirection(index > prevIndex.current ? 1 : -1);
      prevIndex.current = index;
    }
  }, [index]);

  useEffect(() => {
    INTERIOR_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

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
 * Hinged double doors — push open on their hinges (rotateY),
 * then scroll through interior images before the next section.
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

  // After doors open, map remaining scroll across each interior image
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const open = v >= DOOR_END * 0.88;
    setDoorsOpen((prev) => (prev === open ? prev : open));

    let next = 0;
    if (v > DOOR_END) {
      const t = Math.min(
        1,
        Math.max(0, (v - DOOR_END) / (SLIDES_END - DOOR_END))
      );
      next = Math.min(SLIDE_COUNT - 1, Math.floor(t * SLIDE_COUNT));
    }
    setSlideIndex((prev) => (prev === next ? prev : next));
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
      className="relative h-[560vh] bg-ink"
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
          <InteriorCarousel index={slideIndex} showDots={doorsOpen} />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 -translate-x-1/2"
          style={{
            opacity: lightSpill,
            width: lightWidth,
            background:
              "radial-gradient(ellipse at center, rgba(212,184,150,0.45) 0%, rgba(212,184,150,0.12) 40%, transparent 70%)",
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
                className="absolute inset-y-0 -right-[5px] w-[5px] origin-left"
                style={{
                  transform: "rotateY(90deg)",
                  background:
                    "linear-gradient(180deg, #2a3a44 0%, #152028 40%, #0c141a 100%)",
                  boxShadow: "1px 0 0 rgba(184,149,108,0.25)",
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
                className="absolute inset-y-0 -left-[5px] w-[5px] origin-right"
                style={{
                  transform: "rotateY(-90deg)",
                  background:
                    "linear-gradient(180deg, #2a3a44 0%, #152028 40%, #0c141a 100%)",
                  boxShadow: "-1px 0 0 rgba(184,149,108,0.25)",
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
          className="pointer-events-none absolute inset-y-0 left-1/2 z-[25] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brass/50 to-transparent"
          style={{ opacity: seamOpacity }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: captionOpacity, y: captionY }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
            Scroll slowly to enter
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl tracking-tight text-foam md:text-5xl lg:text-6xl">
            Open the doors
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base font-light leading-relaxed text-seafoam/75">
            Ease the hinges open — into quiet highland interiors.
          </p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-14 md:px-8 md:pb-20"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <div className="section-shell">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              The interior · {slideIndex + 1} / {SLIDE_COUNT}
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
