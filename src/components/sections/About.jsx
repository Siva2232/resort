import { motion } from "framer-motion";
import { Trees, MapPin, Sunrise, Plane, ArrowDown } from "lucide-react";
import {
  aboutFeatures,
  aboutImages,
  aboutStats,
  brand,
} from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import ImageCarousel from "../ui/ImageCarousel";
import ClipReveal from "../ui/ClipReveal";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const icons = {
  Trees,
  MapPin,
  Sunrise,
  Plane,
};

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-foam section-pad">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
      />

      <div className="section-shell relative">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-end">
          <SectionReveal className="md:col-span-5">
            <SectionHeader
              eyebrow="The retreat"
              title={
                <>
                  Welcome to{" "}
                  <span className="italic text-ink-soft">{brand.name}</span>
                </>
              }
            />
          </SectionReveal>

          <SectionReveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="text-lg font-light leading-[1.7] text-ink/70 md:text-xl">
              {brand.about}
            </p>
            <p className="mt-6 text-base font-light leading-relaxed text-ink/50">
              {brand.aboutSecondary}
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <SectionReveal className="lg:col-span-8" y={48}>
            <ClipReveal className="relative overflow-hidden">
              <div className="relative">
                <ImageCarousel
                  images={aboutImages}
                  altPrefix="Auralis forest retreat"
                  className="aspect-[16/10] w-full md:aspect-[21/11]"
                  interval={5000}
                />
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7, ease: easeLuxury }}
                  className="pointer-events-none absolute bottom-10 left-5 z-10 max-w-xs text-sm font-light leading-relaxed text-foam/90 md:bottom-12 md:left-7"
                >
                  Mist, timber, and forest light — composed for slower days.
                </motion.p>
              </div>
            </ClipReveal>
          </SectionReveal>

          <SectionReveal
            className="flex flex-col justify-between gap-8 bg-ink px-8 py-10 text-foam md:px-10 md:py-12 lg:col-span-4"
            delay={0.12}
            y={48}
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-sand">
                At a glance
              </p>
              <p className="mt-4 font-display text-2xl leading-snug tracking-tight md:text-[1.75rem]">
                A quiet sanctuary.
                <br />
                A wide horizon.
                <br />
                Nothing rushed.
              </p>
            </div>

            <ul className="space-y-5 border-t border-white/10 pt-8">
              {aboutStats.map((stat, i) => (
                <motion.li
                  key={stat.label}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.12 + i * 0.08,
                    duration: 0.55,
                    ease: easeLuxury,
                  }}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="font-display text-4xl tracking-tight text-brass-light">
                    {stat.value}
                  </span>
                  <span className="text-right text-sm font-light text-seafoam/75">
                    {stat.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={() => scrollToId("#stay")}
              className="inline-flex items-center gap-2 self-start text-[13px] font-medium uppercase tracking-[0.16em] text-sand"
              whileHover={{ y: 3 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            >
              Explore stays
              <ArrowDown size={14} strokeWidth={1.75} />
            </motion.button>
          </SectionReveal>
        </div>

        <div className="mt-24 md:mt-32">
          <SectionReveal>
            <div className="flex flex-col gap-6 border-t border-ink/10 pt-14 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Why stay here"
                title="The perfect blend of sanctuary & exploration"
                titleClassName="max-w-xl lg:text-5xl"
              />
              <p className="max-w-sm pb-1 text-sm font-light leading-relaxed text-ink/45 md:text-right">
                Forest stillness when you need rest. Iconic trails and viewpoints
                when you want to wander.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {aboutFeatures.map((feature, i) => {
              const Icon = icons[feature.icon] || Trees;
              return (
                <SectionReveal key={feature.id} delay={0.06 * i} y={32}>
                  <motion.article
                    className="group h-full"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <div className="flex items-center justify-between border-b border-ink/10 pb-5">
                      <span className="flex size-10 items-center justify-center text-brass transition-colors duration-300 group-hover:text-ink">
                        <Icon size={18} strokeWidth={1.4} />
                      </span>
                      <span className="font-display text-sm text-ink/25">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="mt-6 font-display text-xl tracking-tight text-ink md:text-[1.35rem]">
                      {feature.title}
                    </h4>
                    <p className="mt-3 text-sm font-light leading-relaxed text-ink/55">
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
