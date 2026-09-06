import { motion, useReducedMotion } from "framer-motion";
import { Home, Mountain, Trees, Waves } from "lucide-react";
import { propertyHighlights } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeOutExpo } from "../../utils/motion";
import MagneticButton from "../ui/MagneticButton";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const icons = {
  Mountain,
  Waves,
  Home,
  Trees,
};

function HighlightCard({ item, index, featured = false }) {
  const reduce = useReducedMotion();
  const Icon = icons[item.icon] || Mountain;

  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden ${
        featured
          ? "min-h-[320px] sm:min-h-[340px] md:min-h-[380px]"
          : "min-h-[300px] sm:min-h-[280px] md:min-h-[280px]"
      }`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: 0.06 * index, duration: 0.7, ease: easeOutExpo }}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={item.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/15" />
      </div>

      <div className="relative z-10 flex min-h-[inherit] flex-1 flex-col justify-between gap-6 p-5 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-ink/40 text-brass backdrop-blur-sm">
            <Icon className="size-4" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="font-display text-sm tabular-nums text-foam/35">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sand/80">
            {item.eyebrow}
          </p>
          <h3
            className={`mt-2 break-words font-display tracking-tight text-foam ${
              featured
                ? "text-2xl leading-snug md:text-4xl lg:text-[2.75rem]"
                : "text-xl leading-snug md:text-2xl"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-3 max-w-md font-light leading-relaxed text-seafoam/85 ${
              featured ? "text-sm md:text-base" : "text-sm"
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function PropertyHighlights() {
  const [scenic, pool, cottage, park] = propertyHighlights;

  return (
    <section id="highlights" className="relative bg-mist section-pad">
      <div
        className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-seafoam/30 blur-3xl"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="On the property"
              title="Four things you’ll remember"
              description="Not just another photo dump — these are the spaces that define a stay at Mount Misty."
              titleClassName="max-w-xl"
            />
            <p className="max-w-xs text-sm font-light leading-relaxed text-ink/50 md:pb-1 md:text-right">
              Scenic views, mountain-side pool, 2BHK cottages, and a children’s
              park — clear and easy to spot.
            </p>
          </div>
        </SectionReveal>

        {/* Mobile — clear stacked cards (single column avoids cramped cutoff) */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {propertyHighlights.map((item, i) => (
            <HighlightCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Desktop — focused bento */}
        <div className="mt-12 hidden gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(360px,auto)_minmax(260px,auto)]">
          <div className="lg:col-span-8 lg:row-span-1">
            <HighlightCard item={scenic} index={0} featured />
          </div>
          <div className="lg:col-span-4 lg:row-span-2">
            <HighlightCard item={pool} index={1} featured />
          </div>
          <div className="lg:col-span-4">
            <HighlightCard item={cottage} index={2} />
          </div>
          <div className="lg:col-span-4">
            <HighlightCard item={park} index={3} />
          </div>
        </div>

        {/* Label strip — quick scan labels */}
        <SectionReveal className="mt-8" delay={0.08} y={16}>
          <div className="grid grid-cols-2 gap-1 border border-ink/10 bg-white/60 p-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-ink/10">
            {propertyHighlights.map((item, i) => {
              const Icon = icons[item.icon] || Mountain;
              return (
                <div
                  key={item.id}
                  className="flex min-w-0 items-center gap-3 px-3 py-3 md:px-5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brass/10 text-brass">
                    <Icon className="size-3.5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-ink/40">
                      0{i + 1}
                    </p>
                    <p className="text-sm font-medium leading-snug text-ink">
                      {item.shortTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10" delay={0.1}>
          <div className="flex flex-col items-start gap-4 border-t border-ink/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm font-light leading-relaxed text-ink/55">
              Want more? Browse the full photo gallery for rooms, dining, and
              every corner of the retreat.
            </p>
            <MagneticButton
              variant="outline"
              onClick={() => scrollToId("#gallery")}
            >
              Open full gallery
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
