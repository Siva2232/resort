import { motion } from "framer-motion";
import { experiences } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";
import ImageReveal from "../ui/ImageReveal";
import SectionReveal from "../ui/SectionReveal";

export default function Experiences() {
  return (
    <section id="experience" className="bg-foam px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Experiences
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl tracking-tight text-ink md:text-5xl">
            Days beyond the room
          </h2>
          <p className="mt-4 max-w-md text-base font-light text-ink/60">
            Curated moments along the coast — paced slowly, reserved for guests
            of the retreat.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((item, i) => (
            <SectionReveal key={item.id} delay={0.08 * i} y={56}>
              <motion.article
                className="group"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <ImageReveal
                  src={item.image}
                  alt={item.title}
                  className="aspect-[3/4] w-full"
                />
                <motion.h3
                  className="mt-5 font-display text-xl tracking-tight text-ink"
                  transition={{ duration: 0.4, ease: easeLuxury }}
                >
                  {item.title}
                </motion.h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-ink/60">
                  {item.description}
                </p>
              </motion.article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
