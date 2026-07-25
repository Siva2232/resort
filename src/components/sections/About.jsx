import { motion } from "framer-motion";
import { Waves, Home, UtensilsCrossed, Sparkles, ArrowDown } from "lucide-react";
import {
  aboutFeatures,
  aboutImage,
  aboutStats,
  brand,
} from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import ImageReveal from "../ui/ImageReveal";
import SectionReveal from "../ui/SectionReveal";

const icons = {
  Waves,
  Home,
  UtensilsCrossed,
  Sparkles,
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-foam px-5 py-24 md:px-8 md:py-32"
    >
      <motion.div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-seafoam/40 blur-3xl"
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-16 bottom-24 h-56 w-56 rounded-full bg-sand/50 blur-3xl"
        aria-hidden
        animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Intro */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-end">
          <SectionReveal className="md:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-brass">
              The retreat
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Welcome to{" "}
              <span className="italic text-ink-soft">{brand.name}</span>
            </h2>
          </SectionReveal>

          <SectionReveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="text-lg font-light leading-relaxed text-ink/75 md:text-xl">
              {brand.about}
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-ink/55">
              {brand.aboutSecondary}
            </p>
          </SectionReveal>
        </div>

        {/* Image + stats */}
        <div className="mt-16 grid items-stretch gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <SectionReveal className="lg:col-span-8" y={56}>
            <div className="relative">
              <ImageReveal
                src={aboutImage}
                alt="Auralis retreat interiors overlooking the coast"
                className="aspect-[16/10] w-full md:aspect-[21/11]"
              />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.7, ease: easeLuxury }}
                className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 md:bottom-6 md:left-6 md:right-6"
              >
                <p className="max-w-xs bg-ink/55 px-4 py-3 text-sm font-light text-foam backdrop-blur-sm">
                  Timber, linen, and salt air — composed for slower days.
                </p>
              </motion.div>
            </div>
          </SectionReveal>

          <SectionReveal
            className="flex flex-col justify-between gap-6 bg-ink px-7 py-8 text-foam md:px-8 md:py-10 lg:col-span-4"
            delay={0.12}
            y={56}
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sand">
                At a glance
              </p>
              <p className="mt-3 font-display text-2xl leading-snug tracking-tight md:text-3xl">
                A small retreat. A long shore. Nothing rushed.
              </p>
            </div>

            <ul className="space-y-6 border-t border-white/10 pt-6">
              {aboutStats.map((stat, i) => (
                <motion.li
                  key={stat.label}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.55,
                    ease: easeLuxury,
                  }}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="font-display text-3xl tracking-tight text-brass-light md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-right text-sm font-light text-seafoam/80">
                    {stat.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={() => scrollToId("#stay")}
              className="mt-2 inline-flex items-center gap-2 self-start text-sm font-medium text-sand"
              whileHover={{ y: 3 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              Explore stays
              <ArrowDown size={14} strokeWidth={1.75} />
            </motion.button>
          </SectionReveal>
        </div>

        {/* Features */}
        <div className="mt-20 md:mt-24">
          <SectionReveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-brass">
                  What defines us
                </p>
                <h3 className="mt-3 max-w-md font-display text-3xl tracking-tight text-ink md:text-4xl">
                  Features of the shore life
                </h3>
              </div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-ink/50 md:text-right">
                Four quiet pillars that shape every stay — from the first tide to
                the last light.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {aboutFeatures.map((feature, i) => {
              const Icon = icons[feature.icon] || Sparkles;
              return (
                <SectionReveal key={feature.id} delay={0.07 * i} y={36}>
                  <motion.article
                    className="group h-full border-t border-ink/10 pt-6"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/30 text-brass transition-colors duration-300 group-hover:border-brass group-hover:bg-brass/10">
                      <Icon size={16} strokeWidth={1.5} />
                    </span>
                    <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/35">
                      0{i + 1}
                    </p>
                    <h4 className="mt-2 font-display text-xl tracking-tight text-ink">
                      {feature.title}
                    </h4>
                    <p className="mt-3 text-sm font-light leading-relaxed text-ink/60">
                      {feature.description}
                    </p>
                  </motion.article>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
