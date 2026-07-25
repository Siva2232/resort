import { motion, useReducedMotion } from "framer-motion";
import { easeLuxury } from "../../utils/motion";

export default function ImageReveal({
  src,
  alt,
  className = "",
  imgClassName = "",
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`overflow-hidden bg-sand-light ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-sand-light ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.9, ease: easeLuxury }}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
      />
    </div>
  );
}
