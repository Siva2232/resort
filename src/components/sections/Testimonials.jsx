import { motion } from "framer-motion";
import { testimonials } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

export default function Testimonials() {
  return (
    <section className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-sand">
            Guest voices
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl tracking-tight text-foam md:text-5xl">
            What stays with them
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {testimonials.map((item, i) => (
            <SectionReveal key={item.id} delay={0.1 * i} y={40}>
              <motion.blockquote
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <motion.span
                  aria-hidden
                  className="mb-4 block font-display text-5xl leading-none text-brass/70"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: easeLuxury }}
                >
                  “
                </motion.span>
                <p className="font-display text-xl leading-relaxed text-seafoam md:text-2xl">
                  {item.quote}
                </p>
                <motion.div
                  className="mt-6 h-px origin-left bg-brass/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: easeLuxury }}
                />
                <footer className="mt-5">
                  <p className="text-sm font-medium text-foam">{item.name}</p>
                  <p className="mt-1 text-xs font-light tracking-wide text-seafoam/55">
                    {item.place}
                  </p>
                </footer>
              </motion.blockquote>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
