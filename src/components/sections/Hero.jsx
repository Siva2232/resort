import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { brand, heroImage, heroVideo } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import {
  easeLuxury,
  easeOutExpo,
  staggerContainer,
  wordReveal,
} from "../../utils/motion";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.75]);

  const words = brand.fullName.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale: videoScale, y: videoY }}
      >
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
          aria-hidden
          initial={reduce ? false : { scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: easeLuxury }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20"
        style={reduce ? undefined : { opacity: overlayOpacity }}
      />

      {/* soft light sweep */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(200,217,211,0.12)_45%,transparent_70%)]"
          initial={{ x: "-40%", opacity: 0 }}
          animate={{ x: "40%", opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.4, ease: easeLuxury }}
        />
      )}

      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easeLuxury }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-sand"
          >
            Coastal luxury retreat
          </motion.p>

          <motion.h1
            className="font-display text-5xl leading-[1.05] tracking-tight text-foam sm:text-6xl md:text-7xl lg:text-8xl"
            variants={staggerContainer}
            initial={reduce ? false : "hidden"}
            animate="visible"
          >
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden align-bottom">
                <motion.span className="inline-block" variants={wordReveal}>
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: easeOutExpo }}
            className="mt-5 max-w-md text-base font-light leading-relaxed text-seafoam md:text-lg"
          >
            {brand.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.25, ease: easeOutExpo }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollToId("#contact")}>
              Book Now
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToId("#stay")}
            >
              View stays
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {!reduce && (
        <motion.div
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-foam/55">
            Scroll
          </span>
          <motion.span
            className="block h-8 w-px bg-foam/50"
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>
      )}
    </section>
  );
}
