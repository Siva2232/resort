import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import heroPoster from "../../assets/herovideo-poster.jpg";
import heroVideo from "../../assets/herovideo.mp4";
import heroPoster2 from "../../assets/herovideo-2-poster.jpg";
import heroVideo2 from "../../assets/herovideo-2.mp4";
import { brand } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import MagneticButton from "../ui/MagneticButton";

const HERO_VIDEOS = [
  {
    id: "retreat",
    src: heroVideo,
    poster: heroPoster,
    label: "Retreat film",
  },
  // {
  //   id: "mmr-ad",
  //   src: heroVideo2,
  //   poster: heroPoster2,
  //   label: "MMR film",
  // },
];

export default function Hero() {
  const ref = useRef(null);
  const videoRefs = useRef([]);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.38, 0.68]);

  const goTo = useCallback((index) => {
    setActive((index + HERO_VIDEOS.length) % HERO_VIDEOS.length);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === active) {
        el.currentTime = 0;
        const play = el.play();
        if (play?.catch) play.catch(() => {});
      } else {
        el.pause();
        el.currentTime = 0;
      }
    });
  }, [active]);

  const onEnded = useCallback(() => {
    goTo(active + 1);
  }, [active, goTo]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-svh min-h-[680px] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale: videoScale, y: videoY }}
      >
        {HERO_VIDEOS.map((clip, i) => (
          <motion.video
            key={clip.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
            muted
            playsInline
            autoPlay={i === 0}
            preload="auto"
            poster={clip.poster}
            aria-hidden
            onEnded={i === active ? onEnded : undefined}
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
            }}
            transition={{ duration: 0.85, ease: easeLuxury }}
            style={{ pointerEvents: "none" }}
          >
            <source src={clip.src} type="video/mp4" />
          </motion.video>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,36,0.22)_0%,rgba(11,28,36,0.16)_40%,rgba(11,28,36,0.62)_100%)]"
        style={reduce ? undefined : { opacity: overlayOpacity }}
      />

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(105deg,transparent_30%,rgba(200,217,211,0.1)_48%,transparent_66%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.6, delay: 0.35, ease: easeLuxury }}
        />
      )}

      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-24 pt-28 md:px-8 md:pb-28"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="section-shell">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: easeLuxury }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-sand"
          >
            {brand.taglineShort}
          </motion.p>

          <motion.h1
            className="max-w-4xl text-balance font-display text-[clamp(2.25rem,9vw,5.5rem)] leading-[0.95] tracking-tight text-foam"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.55, ease: easeOutExpo }}
          >
            Wake Up to the Beauty of Idukki.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: easeOutExpo }}
            className="mt-6 max-w-xl text-base font-light leading-relaxed text-seafoam/85 md:text-lg"
          >
            Nestled in the misty hills of Idukki, Kerala, Mount Misty Retreat is
            a peaceful nature retreat designed for slow mornings, breathtaking
            views and memorable stays.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOutExpo }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => {
                scrollToId("#booking-form");
                window.setTimeout(() => {
                  document.getElementById("name")?.focus({ preventScroll: true });
                }, 700);
              }}
            >
              Book Your Stay
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToId("#about")}
            >
              Explore the Retreat
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
        <div
          className="flex items-center gap-2.5"
          role="tablist"
          aria-label="Hero videos"
        >
          {HERO_VIDEOS.map((clip, i) => {
            const isActive = i === active;
            return (
              <button
                key={clip.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Play ${clip.label}`}
                onClick={() => goTo(i)}
                className="group relative flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-foam"
                      : "h-2 w-2 bg-foam/40 group-hover:bg-foam/70"
                  }`}
                />
                {isActive && (
                  <motion.span
                    layoutId="hero-dot-ring"
                    className="absolute inset-1.5 rounded-full border border-foam/55"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {!reduce && (
          <motion.div
            className="hidden flex-col items-center gap-2 sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.85, duration: 0.9 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-foam/45">
              Enter
            </span>
            <motion.span
              className="block h-8 w-px bg-gradient-to-b from-foam/60 to-transparent"
              animate={{ scaleY: [0.45, 1, 0.45], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
