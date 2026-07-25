import { motion, useReducedMotion } from "framer-motion";
import { easeLuxury } from "../../utils/motion";

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, delay, ease: easeLuxury }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
