import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { gallery } from "../../data/resort";
import { easeOutExpo } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

export default function Gallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="gallery" className="bg-sand-light px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Gallery
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
            A visual quiet
          </h2>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((item, i) => {
            const spanClass =
              item.span === "wide"
                ? "col-span-2 aspect-[16/10]"
                : item.span === "tall"
                  ? "row-span-2 min-h-[280px] md:min-h-[420px]"
                  : "aspect-square";

            return (
              <SectionReveal
                key={item.id}
                delay={0.04 * i}
                className={`${spanClass} overflow-hidden bg-sand`}
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="group relative h-full w-full overflow-hidden"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
                </button>
              </SectionReveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-5 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute right-5 top-5 text-foam"
              onClick={() => setActive(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] max-w-5xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
