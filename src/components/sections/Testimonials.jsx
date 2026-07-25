import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { testimonials } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

function QuoteCard3D({ item, index }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });
  const glowX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(184,149,108,0.14), transparent 55%)`;

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              rotateY: index % 2 === 0 ? -22 : 22,
              rotateX: 12,
              z: -100,
              y: 50,
            }
      }
      whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, z: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.95,
        delay: 0.1 * index,
        ease: easeOutExpo,
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <motion.blockquote
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative flex h-full flex-col border border-white/8 bg-ink-soft/40 p-7 md:p-8"
        style={
          reduce
            ? undefined
            : {
                rotateX: rx,
                rotateY: ry,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
              }
        }
        whileHover={reduce ? undefined : { z: 30 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: glow }}
          />
        )}

        <motion.span
          aria-hidden
          className="relative font-display text-6xl leading-none text-brass/50"
          style={reduce ? undefined : { transform: "translateZ(28px)" }}
        >
          “
        </motion.span>
        <p
          className="relative mt-2 font-display text-xl leading-[1.45] tracking-tight text-seafoam md:text-[1.35rem]"
          style={reduce ? undefined : { transform: "translateZ(18px)" }}
        >
          {item.quote}
        </p>
        <motion.div
          className="relative mt-8 h-px w-12 origin-left bg-brass/45"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeLuxury }}
          style={reduce ? undefined : { transform: "translateZ(12px)" }}
        />
        <footer
          className="relative mt-5"
          style={reduce ? undefined : { transform: "translateZ(22px)" }}
        >
          <p className="text-sm font-medium tracking-wide text-foam">
            {item.name}
          </p>
          <p className="mt-1 text-[11px] font-light uppercase tracking-[0.18em] text-seafoam/45">
            {item.place}
          </p>
        </footer>
      </motion.blockquote>
    </motion.div>
  );
}

/** Testimonials — depth-layered 3D quote cards that track the cursor */
export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink section-pad">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-seafoam/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-shell relative">
        <SectionReveal>
          <SectionHeader
            tone="dark"
            eyebrow="Guest voices"
            title="What stays with them"
            description="Quiet praise from travellers who came for rest — and found the highlands."
          />
        </SectionReveal>

        <div
          className="mt-16 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-10"
          style={{ perspective: 1400 }}
        >
          {testimonials.map((item, i) => (
            <QuoteCard3D key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
