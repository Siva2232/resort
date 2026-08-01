import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeLuxury } from "../../utils/motion";
import BrandLogo from "./BrandLogo";

export default function PageLoader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setShow(false);
      return undefined;
    }
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeLuxury, delay: 0.15 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.85, ease: easeLuxury }}
          >
            <BrandLogo size="xl" imgClassName="max-w-[min(88vw,22rem)]" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: easeLuxury }}
            className="mt-8 text-[11px] font-medium uppercase tracking-[0.32em] text-sand/70"
          >
            Edathana · Idukki
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: easeLuxury }}
            className="mt-3 max-w-xs text-center text-sm font-light leading-relaxed text-seafoam/60"
          >
            A quiet highland stay amid mist, forest, and slow mornings.
          </motion.p>
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-brass"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.55, ease: easeLuxury }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
