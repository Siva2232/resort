import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import ImageCarousel from "../ui/ImageCarousel";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

/** Gallery — 3D flip lightbox + perspective thumbnail mosaic */
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const reduce = useReducedMotion();
  const active = activeIndex !== null ? gallery[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setActiveIndex((i) =>
          i === null ? i : (i - 1 + gallery.length) % gallery.length
        );
      }
      if (e.key === "ArrowRight") {
        setDirection(1);
        setActiveIndex((i) =>
          i === null ? i : (i + 1) % gallery.length
        );
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const go = (dir) => {
    setDirection(dir);
    setActiveIndex((i) => (i + dir + gallery.length) % gallery.length);
  };

  const flipVariants = {
    enter: (d) =>
      reduce
        ? { opacity: 0, scale: 0.96 }
        : {
            opacity: 0,
            rotateY: d > 0 ? 55 : -55,
            scale: 0.88,
            z: -120,
          },
    center: { opacity: 1, rotateY: 0, scale: 1, z: 0 },
    exit: (d) =>
      reduce
        ? { opacity: 0, scale: 0.96 }
        : {
            opacity: 0,
            rotateY: d > 0 ? -45 : 45,
            scale: 0.9,
            z: -80,
          },
  };

  return (
    <section id="gallery" className="bg-mist section-pad">
      <div className="section-shell">
        <SectionReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Gallery"
              title="A visual quiet"
              titleClassName="max-w-md"
            />
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink/50 md:pb-1 md:text-right">
              Forests, suites, and highland light — the atmosphere of a stay at
              Auralis.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-12 md:mt-14" y={40}>
          <motion.div
            initial={reduce ? false : { opacity: 0, rotateX: 12, y: 40 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            style={{ transformPerspective: 1200 }}
          >
            <ImageCarousel
              images={gallery}
              altPrefix="Auralis gallery"
              className="aspect-[16/10] w-full md:aspect-[2.4/1]"
              interval={4500}
            />
          </motion.div>
        </SectionReveal>

        <div
          className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 md:grid-cols-8 md:gap-3"
          style={{ perspective: 1000 }}
        >
          {gallery.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => {
                setDirection(0);
                setActiveIndex(i);
              }}
              initial={
                reduce
                  ? false
                  : {
                      opacity: 0,
                      rotateY: i % 2 === 0 ? -28 : 28,
                      z: -60,
                    }
              }
              whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.04 * i,
                ease: easeOutExpo,
              }}
              whileHover={
                reduce
                  ? undefined
                  : { y: -6, rotateY: i % 2 === 0 ? 6 : -6, z: 24 }
              }
              style={{ transformStyle: "preserve-3d" }}
              className="group relative aspect-square overflow-hidden bg-sand"
              aria-label={`Open ${item.alt}`}
            >
              <img
                src={item.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-5 backdrop-blur-lg"
            onClick={() => setActiveIndex(null)}
            style={{ perspective: 1600 }}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-20 text-foam/80 transition-colors hover:text-foam md:right-8 md:top-8"
              onClick={() => setActiveIndex(null)}
            >
              <X size={26} strokeWidth={1.4} />
            </button>

            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 text-foam/60 transition-colors hover:text-foam md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeft size={34} strokeWidth={1.2} />
            </button>

            <button
              type="button"
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-foam/60 transition-colors hover:text-foam md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <ChevronRight size={34} strokeWidth={1.2} />
            </button>

            <div
              className="relative flex max-h-[85vh] w-full max-w-5xl items-center justify-center"
              style={{ perspective: 1600 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: easeOutExpo }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full"
                >
                  <img
                    src={active.src}
                    alt={active.alt}
                    className="mx-auto max-h-[72vh] w-auto max-w-full object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)]"
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4, ease: easeLuxury }}
                    className="mt-5 text-center text-[13px] font-light tracking-wide text-foam/60"
                  >
                    {active.alt}
                    <span className="mx-3 text-foam/25">·</span>
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(gallery.length).padStart(2, "0")}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
