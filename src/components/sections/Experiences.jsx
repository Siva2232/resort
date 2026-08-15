import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { experiences } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

/** Experiences — 3D tilt cards + cinematic detail modal */
export default function Experiences() {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="bg-foam section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Experiences"
            title="Wake up to the mountains"
            description="There is something magical about mornings in Idukki. At Mount Misty Retreat, the destination itself becomes part of your stay."
          />
        </SectionReveal>

        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          style={{ perspective: 1400 }}
        >
          {experiences.map((item, i) => {
            const card = (
              <motion.button
                type="button"
                onClick={() => setActive(item)}
                className="group relative w-full text-left"
                initial={
                  reduce
                    ? false
                    : { opacity: 0, rotateX: 28, y: 60, z: -80 }
                }
                whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.9,
                  delay: 0.08 * i,
                  ease: easeOutExpo,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-sand-light shadow-[0_24px_50px_-28px_rgba(11,28,36,0.45)]">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    whileHover={reduce ? undefined : { scale: 1.08 }}
                    transition={{ duration: 0.85, ease: easeLuxury }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                  <span className="absolute left-4 top-4 font-display text-sm text-foam/45">
                    0{i + 1}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl tracking-tight text-foam md:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="mt-1 shrink-0 text-foam/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass-light"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-seafoam/75">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );

            if (reduce) {
              return <div key={item.id}>{card}</div>;
            }

            return (
              <Tilt
                key={item.id}
                tiltMaxAngleX={9}
                tiltMaxAngleY={11}
                perspective={1200}
                transitionSpeed={1200}
                scale={1.02}
                glareEnable
                glareMaxOpacity={0.12}
                glareColor="#d4c4a8"
                glarePosition="all"
                className="transform-gpu"
              >
                {card}
              </Tilt>
            );
          })}
        </div>
      </div>

      {/* 3D detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-5 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
              onClick={() => setActive(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.article
              role="dialog"
              aria-modal
              aria-label={active.title}
              initial={
                reduce
                  ? { opacity: 0, scale: 0.96 }
                  : { opacity: 0, rotateX: 18, scale: 0.88, y: 40 }
              }
              animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
              exit={
                reduce
                  ? { opacity: 0, scale: 0.96 }
                  : { opacity: 0, rotateX: -10, scale: 0.92, y: 24 }
              }
              transition={{ duration: 0.55, ease: easeOutExpo }}
              style={{ transformPerspective: 1400, transformStyle: "preserve-3d" }}
              className="relative z-10 grid w-full max-w-4xl overflow-hidden bg-ink shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)] md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[480px]">
                <img
                  src={active.image}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="relative flex flex-col justify-between p-7 text-foam md:p-10">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
                    Experience
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                    {active.title}
                  </h3>
                  <p className="mt-5 text-base font-light leading-relaxed text-seafoam/80">
                    {active.description}
                  </p>
                  {active.detail && (
                    <p className="mt-4 text-base font-light leading-relaxed text-seafoam/70">
                      {active.detail}
                    </p>
                  )}
                </div>
                <p className="mt-10 text-sm font-light text-seafoam/50">
                  Slow mornings, hill views, and time together — at your own pace.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close experience"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex size-10 items-center justify-center bg-ink/50 text-foam backdrop-blur-sm transition-colors hover:bg-ink/80"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
