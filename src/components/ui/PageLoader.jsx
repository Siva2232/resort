import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brand } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";

export default function PageLoader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeLuxury, delay: 0.15 }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-40%", opacity: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="font-display text-4xl tracking-tight text-foam md:text-5xl"
            >
              {brand.name}
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: easeLuxury }}
            className="absolute mt-20 text-[11px] font-medium uppercase tracking-[0.32em] text-sand/70"
          >
            Forest Retreat
          </motion.p>
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-brass"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: easeLuxury }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
