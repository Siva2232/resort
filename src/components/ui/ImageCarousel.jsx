import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { easeLuxury } from "../../utils/motion";

/**
 * Auto-scrolling image carousel with progress bar, swipe, and pause on hover.
 */
export default function ImageCarousel({
  images = [],
  className = "",
  autoPlay = true,
  interval = 3800,
  showControls = true,
  showDots = true,
  altPrefix = "Gallery image",
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const slides = images
    .map((item, i) =>
      typeof item === "string"
        ? { src: item, alt: `${altPrefix} ${i + 1}` }
        : { src: item.src, alt: item.alt || `${altPrefix} ${i + 1}` }
    )
    .filter((s) => s.src);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const count = slides.length;
  const paused = hovered || dragging;

  const go = useCallback(
    (dir) => {
      if (count < 2) return;
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
      setProgressKey((k) => k + 1);
    },
    [count]
  );

  const goTo = useCallback(
    (next) => {
      if (next === index || count < 2) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      setProgressKey((k) => k + 1);
    },
    [count, index]
  );

  // Only autoplay when visible on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay || reduce || paused || !inView || count < 2) return;
    const id = window.setTimeout(() => go(1), interval);
    return () => window.clearTimeout(id);
  }, [autoPlay, reduce, paused, inView, count, interval, go, index]);

  useEffect(() => {
    if (count < 2 || !hovered) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, go, hovered]);

  if (!count) return null;

  const slide = slides[index];
  const shouldAnimateProgress =
    autoPlay && !reduce && !paused && inView && count > 1;

  return (
    <div
      ref={rootRef}
      className={`group relative overflow-hidden bg-sand-light ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={altPrefix}
    >
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.img
          key={`${slide.src}-${index}`}
          src={slide.src}
          alt={slide.alt}
          custom={direction}
          variants={{
            enter: (d) =>
              reduce
                ? { opacity: 0 }
                : { x: d > 0 ? "12%" : "-12%", opacity: 0 },
            center: { x: 0, opacity: 1 },
            exit: (d) =>
              reduce
                ? { opacity: 0 }
                : { x: d > 0 ? "-12%" : "12%", opacity: 0 },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduce ? 0.2 : 0.75, ease: easeLuxury }}
          drag={reduce || count < 2 ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -55) go(1);
            else if (info.offset.x > 55) go(-1);
            setDragging(false);
          }}
          className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing will-change-transform"
          decoding="async"
          draggable={false}
        />
      </AnimatePresence>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10"
      />

      {/* Auto-scroll progress */}
      {count > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-foam/15">
          <motion.div
            key={progressKey}
            className="h-full origin-left bg-brass"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: shouldAnimateProgress ? 1 : 0 }}
            transition={
              shouldAnimateProgress
                ? { duration: interval / 1000, ease: "linear" }
                : { duration: 0.2 }
            }
            style={{ transformOrigin: "left center" }}
          />
        </div>
      )}

      {showControls && count > 1 && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-3 md:px-4">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-ink/45 text-foam backdrop-blur-sm transition-opacity duration-300 hover:bg-ink/70 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-ink/45 text-foam backdrop-blur-sm transition-opacity duration-300 hover:bg-ink/70 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      )}

      {showDots && count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-7 bg-foam"
                  : "w-1.5 bg-foam/40 hover:bg-foam/70"
              }`}
            />
          ))}
        </div>
      )}

      <span className="sr-only" aria-live="polite">
        Image {index + 1} of {count}
      </span>
    </div>
  );
}
