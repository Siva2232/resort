import { motion, useReducedMotion } from "framer-motion";
import { easeLuxury } from "../../utils/motion";

const variants = {
  solid:
    "bg-brass text-ink hover:bg-brass-light border border-transparent",
  ghost:
    "border border-foam/40 bg-transparent text-foam hover:border-foam/70 hover:bg-foam/5",
  ink: "bg-ink text-foam border border-transparent hover:bg-ink-soft",
  outline:
    "border border-ink/20 bg-transparent text-ink hover:border-brass hover:text-brass",
};

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  variant = "solid",
}) {
  const reduce = useReducedMotion();
  const base = `relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3.5 text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-500 ${variants[variant] || variants.solid}`;

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
      className={`${base} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <motion.span
        className={`pointer-events-none absolute inset-0 ${
          variant === "solid"
            ? "bg-brass-light"
            : variant === "ink"
              ? "bg-ink-soft"
              : "bg-foam/10"
        }`}
        initial={{ y: "110%" }}
        whileHover={{ y: "0%" }}
        transition={{ duration: 0.45, ease: easeLuxury }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
