import { motion, useScroll } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-brass"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
