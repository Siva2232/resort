import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const AUTO_MS = 5200;
const SWIPE_MIN = 48;

function StarRating({ rating = 5, dark = true }) {
  const value = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.5}
          className={
            i < value
              ? dark
                ? "fill-brass text-brass"
                : "fill-brass text-brass"
              : dark
                ? "fill-transparent text-foam/25"
                : "fill-transparent text-ink/25"
          }
          aria-hidden
        />
      ))}
    </div>
  );
}

function QuoteCard3D({ item, index, compact = false }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });
  const glowX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(184,149,108,0.14), transparent 55%)`;

  const onMove = (e) => {
    if (reduce || compact || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={
        reduce || compact
          ? false
          : {
              opacity: 0,
              rotateY: index % 2 === 0 ? -22 : 22,
              rotateX: 12,
              z: -100,
              y: 50,
            }
      }
      whileInView={
        compact ? undefined : { opacity: 1, rotateY: 0, rotateX: 0, z: 0, y: 0 }
      }
      viewport={compact ? undefined : { once: true, amount: 0.3 }}
      transition={{
        duration: 0.95,
        delay: 0.1 * index,
        ease: easeOutExpo,
      }}
      className={compact ? "h-full" : undefined}
      style={
        compact
          ? undefined
          : { transformStyle: "preserve-3d", perspective: 1200 }
      }
    >
      <motion.blockquote
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`relative flex h-full flex-col border border-white/8 bg-ink-soft/40 ${
          compact ? "p-6" : "p-7 md:p-8"
        }`}
        style={
          reduce || compact
            ? undefined
            : {
                rotateX: rx,
                rotateY: ry,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
              }
        }
        whileHover={reduce || compact ? undefined : { z: 30 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {!reduce && !compact && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glow }}
          />
        )}

        <div
          className="relative"
          style={
            reduce || compact ? undefined : { transform: "translateZ(24px)" }
          }
        >
          <StarRating rating={item.rating ?? 5} />
        </div>

        <motion.span
          aria-hidden
          className="relative mt-4 font-display text-5xl leading-none text-brass/50 md:text-6xl"
          style={
            reduce || compact ? undefined : { transform: "translateZ(28px)" }
          }
        >
          “
        </motion.span>
        <p
          className={`relative mt-2 font-display leading-[1.45] tracking-tight text-seafoam ${
            compact ? "text-lg" : "text-xl md:text-[1.35rem]"
          }`}
          style={
            reduce || compact ? undefined : { transform: "translateZ(18px)" }
          }
        >
          {item.quote}
        </p>
        <motion.div
          className="relative mt-8 h-px w-12 origin-left bg-brass/45"
          initial={compact ? false : { scaleX: 0 }}
          whileInView={compact ? undefined : { scaleX: 1 }}
          viewport={compact ? undefined : { once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeLuxury }}
          style={
            reduce || compact
              ? { transformOrigin: "left" }
              : { transform: "translateZ(12px)", transformOrigin: "left" }
          }
        />
        <footer
          className="relative mt-5"
          style={
            reduce || compact ? undefined : { transform: "translateZ(22px)" }
          }
        >
          <p className="text-sm font-medium tracking-wide text-foam">
            {item.name}
          </p>
          <p className="mt-1 text-[11px] font-light uppercase tracking-[0.18em] text-seafoam/45">
            {item.place}
          </p>
        </footer>
      </motion.blockquote>
    </motion.div>
  );
}

function MobileCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = testimonials.length;

  const go = useCallback(
    (dir) => {
      if (count < 2) return;
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (reduce || paused || count < 2) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, count, go, index]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    if (touchX.current == null) {
      setPaused(false);
      return;
    }
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) >= SWIPE_MIN) go(dx < 0 ? 1 : -1);
    setPaused(false);
  };

  const item = testimonials[index];

  return (
    <div
      className="relative mt-12 md:hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest testimonials"
    >
      <div className="relative min-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: direction > 0 ? 56 : -56 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, x: direction > 0 ? -40 : 40 }
            }
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="h-full"
          >
            <QuoteCard3D item={item} index={index} compact />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => {
            const active = i === index;
            return (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active ? "w-6 bg-brass" : "w-2 bg-foam/25 hover:bg-foam/45"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Testimonials — swipe carousel on mobile, 3D grid on desktop */
export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink section-pad">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-seafoam/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-shell relative">
        <SectionReveal>
          <SectionHeader
            tone="dark"
            eyebrow="Guest voices"
            title="What stays with them"
            description="Quiet praise from travellers who came for rest — and found the highlands."
          />
        </SectionReveal>

        <MobileCarousel />

        <div
          className="mt-16 hidden gap-8 md:mt-20 md:grid md:grid-cols-3 md:gap-8 lg:gap-10"
          style={{ perspective: 1400 }}
        >
          {testimonials.map((item, i) => (
            <QuoteCard3D key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
