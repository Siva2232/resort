import { motion, useReducedMotion } from "framer-motion";
import { easeLuxury } from "../../utils/motion";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  variant = "solid",
}) {
  const reduce = useReducedMotion();

  const base =
    variant === "solid"
      ? "rounded-sm bg-brass px-7 py-3.5 text-sm font-medium text-ink"
      : "rounded-sm border border-foam/35 px-7 py-3.5 text-sm font-light text-foam";

  if (reduce) {
    return (
      <button type={type} onClick={onClick} className={`${base} ${className}`}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${base} relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <motion.span
        className={`pointer-events-none absolute inset-0 ${
          variant === "solid" ? "bg-brass-light" : "bg-foam/10"
        }`}
        initial={{ x: "-110%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.45, ease: easeLuxury }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
