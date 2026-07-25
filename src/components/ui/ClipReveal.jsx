import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

/**
 * Scroll-linked center-out "door" clip reveal for media blocks.
 */
export default function ClipReveal({
  children,
  className = "",
  fromInset = 42,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.35"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(8% ${fromInset}% 8% ${fromInset}%)`,
      "inset(0% 0% 0% 0%)",
    ]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ clipPath, scale }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
