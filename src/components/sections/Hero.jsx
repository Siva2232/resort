import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import heroPoster from "../../assets/herovideo-poster.jpg";
import heroVideo from "../../assets/herovideo.mp4";
import { brand } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.78]);

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
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster}
          aria-hidden
          initial={reduce ? false : { scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: easeLuxury }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,36,0.35)_0%,rgba(11,28,36,0.25)_40%,rgba(11,28,36,0.78)_100%)]"
        style={reduce ? undefined : { opacity: overlayOpacity }}
      />

      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(200,217,211,0.1)_48%,transparent_66%)]"
          initial={{ x: "-35%", opacity: 0 }}
          animate={{ x: "35%", opacity: 1 }}
          transition={{ duration: 2.6, delay: 0.35, ease: easeLuxury }}
        />
      )}

      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-20 pt-28 md:px-8 md:pb-28"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="section-shell">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: easeLuxury }}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.32em] text-sand"
          >
            Edathana · Idukki Highlands
          </motion.p>

          <motion.h1
            className="max-w-4xl font-display text-6xl leading-[0.95] tracking-tight text-foam sm:text-7xl md:text-8xl lg:text-[7.5rem]"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.55, ease: easeOutExpo }}
          >
            {brand.fullName}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: easeOutExpo }}
            className="mt-3 font-display text-xl italic tracking-tight text-seafoam/90 md:text-2xl"
          >
            {brand.taglineShort}
          </motion.p>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: easeOutExpo }}
            className="mt-6 max-w-md text-base font-light leading-relaxed text-seafoam/85 md:text-lg"
          >
            {brand.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: easeOutExpo }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollToId("#contact")}>
              Reserve a stay
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToId("#stay")}
            >
              Explore suites
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {!reduce && (
        <motion.div
          className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 0.9 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-foam/45">
            Enter
          </span>
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-foam/60 to-transparent"
            animate={{ scaleY: [0.45, 1, 0.45], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        </motion.div>
      )}
    </section>
  );
}
