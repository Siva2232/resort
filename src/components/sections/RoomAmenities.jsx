import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  Box,
  Car,
  Clock,
  Coffee,
  Droplets,
  Lock,
  ScrollText,
  Sparkles,
  Trees,
  Tv,
  UtensilsCrossed,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import {
  houseRules,
  propertyTimings,
  roomAmenities,
  roomAmenityGroups,
} from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const amenityIcons = {
  Mirror: Sparkles,
  Archive,
  Lock,
  Tv,
  Coffee,
  Flame: Droplets,
  Refrigerator: Box,
  Wind,
  Shirt: Zap,
  UtensilsCrossed,
  Car,
  Waves,
  Trees,
};

const timingIcons = {
  Coffee,
  UtensilsCrossed,
  Waves,
  Trees,
};

function getGroupSubtitle(groupId) {
  return roomAmenityGroups.find((g) => g.id === groupId)?.subtitle ?? "";
}

function MobileAmenityCard({ item, index }) {
  const reduce = useReducedMotion();
  const subtitle = getGroupSubtitle(item.group);
  const Icon = amenityIcons[item.icon] || Coffee;

  return (
    <motion.article
      className="flex min-h-[158px] flex-col border border-ink/8 bg-white/80 p-4"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.03 * index, duration: 0.55, ease: easeOutExpo }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/5 text-brass">
          <Icon className="size-4" strokeWidth={1.35} aria-hidden />
        </span>
        <span className="font-display text-sm tabular-nums text-ink/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-3 font-display text-[15px] leading-snug tracking-tight text-ink">
        {item.label}
      </h3>

      {(item.featured || item.paid) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.featured && (
            <span className="rounded-full bg-seafoam/55 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink/60">
              Included
            </span>
          )}
          {item.paid && (
            <span className="rounded-full border border-brass/35 bg-brass/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-brass">
              Paid
            </span>
          )}
        </div>
      )}

      <p className="mt-auto pt-3 text-xs font-light leading-relaxed text-ink/45">
        {subtitle}
      </p>
    </motion.article>
  );
}

function MobileTimingCard({ item, index }) {
  const reduce = useReducedMotion();
  const Icon = timingIcons[item.icon] || Clock;

  return (
    <motion.article
      className="flex min-h-[148px] flex-col border border-ink/8 bg-white/80 p-3.5"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.03 * index, duration: 0.55, ease: easeOutExpo }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/5 text-brass">
          <Icon className="size-3.5" strokeWidth={1.35} aria-hidden />
        </span>
        <span className="font-display text-xs tabular-nums text-ink/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-2.5 font-display text-[13px] leading-snug tracking-tight text-ink">
        {item.label}
      </h3>
      <p className="mt-1.5 text-[11px] font-medium leading-snug text-brass">
        {item.time}
      </p>
      {item.note && (
        <p className="mt-auto pt-2 text-[10px] font-light italic leading-relaxed text-ink/45">
          {item.note}
        </p>
      )}
    </motion.article>
  );
}

function MobileRuleCard({ rule, index }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className="flex min-h-[120px] flex-col border border-white/10 bg-white/[0.05] p-3.5"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.025 * index, duration: 0.55, ease: easeOutExpo }}
    >
      <span className="font-display text-xs tabular-nums text-brass/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-2 text-[11px] font-light leading-relaxed text-seafoam/85">
        {rule}
      </p>
    </motion.li>
  );
}

function AmenityTile({ item, index, isActive, onHover }) {
  const Icon = amenityIcons[item.icon] || Coffee;
  const reduce = useReducedMotion();
  const subtitle = getGroupSubtitle(item.group);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => onHover(item.id)}
      onFocus={() => onHover(item.id)}
      className={`group relative w-full overflow-hidden border px-5 py-5 text-left transition-colors ${
        isActive
          ? "border-brass/40 bg-white shadow-[0_20px_50px_-30px_rgba(184,149,108,0.45)]"
          : "border-ink/8 bg-white/70"
      }`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.04 * index, duration: 0.65, ease: easeOutExpo }}
      whileHover={reduce ? undefined : { y: -3 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_80%_0%,rgba(143,171,163,0.18),transparent_50%)]"
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brass/25 text-brass transition-all duration-300 group-hover:border-brass/50 group-hover:bg-brass/5">
          <Icon className="size-5" strokeWidth={1.35} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-lg tracking-tight text-ink">
              {item.label}
            </p>
            {item.paid && (
              <span className="rounded-full border border-brass/35 bg-brass/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-brass-light">
                Paid
              </span>
            )}
            {item.featured && (
              <span className="rounded-full bg-seafoam/50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-ink/55">
                Included
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm font-light text-ink/45">{subtitle}</p>
        </div>

        <span className="font-display text-sm tabular-nums text-ink/20">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.button>
  );
}

export default function RoomAmenities() {
  const [activeId, setActiveId] = useState(
    roomAmenities.find((a) => a.featured)?.id ?? roomAmenities[0].id
  );
  const activeItem = roomAmenities.find((a) => a.id === activeId) ?? roomAmenities[0];
  const ActiveIcon = amenityIcons[activeItem.icon] || Coffee;
  const activeGroup = roomAmenityGroups.find((g) => g.id === activeItem.group);

  return (
    <section className="relative overflow-hidden bg-mist section-pad">
      <div
        className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-seafoam/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal>
          <SectionHeader
            eyebrow="In every room"
            title="Amenities"
            description="Thoughtfully curated comforts in every accommodation — from quiet storage to in-room entertainment and daily essentials."
          />
        </SectionReveal>

        {/* Mobile — numbered grid cards */}
        <SectionReveal className="mt-10 lg:hidden" y={24}>
          <div className="mb-5 flex items-end justify-between border-b border-ink/10 pb-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brass">
                Room essentials
              </p>
              <p className="mt-1 font-display text-2xl text-ink">
                {roomAmenities.length} amenities
              </p>
            </div>
            <p className="max-w-[10rem] text-right text-xs font-light text-ink/45">
              Included with every stay
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {roomAmenities.map((item, i) => (
              <MobileAmenityCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </SectionReveal>

        {/* Desktop — split showcase */}
        <SectionReveal className="mt-12 hidden lg:block" y={32}>
          <div className="grid overflow-hidden border border-ink/10 lg:grid-cols-12">
            <div className="relative bg-ink px-7 py-10 text-foam md:px-10 md:py-12 lg:col-span-5">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 0%, rgba(184,149,108,0.22), transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(200,217,211,0.12), transparent 45%)",
                }}
                aria-hidden
              />

              <div className="relative">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand/70">
                  Room essentials
                </p>
                <p className="mt-4 font-display text-4xl tracking-tight text-sand md:text-[2.75rem]">
                  {roomAmenities.length}
                  <span className="ml-2 text-2xl text-seafoam/70">included</span>
                </p>
                <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-seafoam/75">
                  Classic rooms, suites, and cottages arrive ready for rest —
                  with storage, entertainment, refreshments, and grooming
                  essentials already in place.
                </p>

                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeLuxury }}
                  className="mt-10 border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-brass/10 text-brass">
                      <ActiveIcon className="size-6" strokeWidth={1.25} />
                    </span>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand/55">
                        {activeGroup?.title}
                      </p>
                      <p className="mt-2 font-display text-2xl tracking-tight text-sand">
                        {activeItem.label}
                      </p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-seafoam/70">
                        {activeGroup?.subtitle}
                        {activeItem.paid
                          ? " · Available on request"
                          : " · Included with your stay"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {roomAmenityGroups.map((group) => (
                    <span
                      key={group.id}
                      className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-seafoam/60"
                    >
                      {group.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-foam/80 p-5 md:p-7 lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {roomAmenities.map((item, i) => (
                  <AmenityTile
                    key={item.id}
                    item={item}
                    index={i}
                    isActive={activeId === item.id}
                    onHover={setActiveId}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10 hidden md:block" delay={0.1} y={24}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {roomAmenityGroups.map((group, groupIndex) => {
              const items = roomAmenities.filter((a) => a.group === group.id);
              return (
                <motion.div
                  key={group.id}
                  className="border border-ink/8 bg-white/50 px-5 py-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    delay: 0.06 * groupIndex,
                    duration: 0.7,
                    ease: easeOutExpo,
                  }}
                >
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brass">
                    {group.title}
                  </p>
                  <p className="mt-1 text-xs font-light text-ink/45">
                    {group.subtitle}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {items.map((item) => {
                      const Icon = amenityIcons[item.icon] || Coffee;
                      return (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 border-t border-ink/8 pt-3 first:border-t-0 first:pt-0"
                        >
                          <Icon
                            className="size-3.5 shrink-0 text-brass"
                            strokeWidth={1.5}
                          />
                          <span className="text-sm font-light text-ink/70">
                            {item.label}
                          </span>
                          {item.paid && (
                            <span className="ml-auto text-[9px] uppercase tracking-[0.12em] text-ink/35">
                              Paid
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </SectionReveal>

        {/* Timings & house rules — from guest welcome guide */}
        <SectionReveal className="mt-16 md:mt-20" y={28}>
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
              During your stay
            </p>
            <h3 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
              Timings & house rules
            </h3>
            <p className="mt-4 text-base font-light leading-relaxed text-ink/55">
              To ensure a comfortable and enjoyable stay for everyone, please
              review our service timings and property guidelines.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="border border-ink/10 bg-white/60 p-5 md:p-8">
                <div className="flex items-center gap-3 border-b border-ink/10 pb-4 md:pb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/30 bg-brass/5 text-brass">
                    <Clock className="size-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h4 className="font-display text-xl tracking-tight text-ink">
                    Timings
                  </h4>
                </div>

                <ul className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
                  {propertyTimings.map((item, index) => (
                    <MobileTimingCard
                      key={item.id}
                      item={item}
                      index={index}
                    />
                  ))}
                </ul>

                <ul className="mt-6 hidden space-y-5 lg:block">
                  {propertyTimings.map((item, index) => {
                    const Icon = timingIcons[item.icon] || Clock;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          delay: 0.05 * index,
                          duration: 0.55,
                          ease: easeOutExpo,
                        }}
                        className="flex gap-4 border-t border-ink/8 pt-5 first:border-t-0 first:pt-0"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/25 bg-brass/5 text-brass">
                          <Icon className="size-4" strokeWidth={1.35} aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-base tracking-tight text-ink">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-brass">
                            {item.time}
                          </p>
                          {item.note && (
                            <p className="mt-2 text-xs font-light italic leading-relaxed text-ink/50">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-full overflow-hidden border border-ink/10 bg-ink px-5 py-7 text-foam md:px-8 md:py-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 0%, rgba(184,149,108,0.2), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(200,217,211,0.1), transparent 50%)",
                  }}
                  aria-hidden
                />
                <div className="relative flex items-center gap-3 border-b border-white/10 pb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/35 bg-brass/10 text-brass">
                    <ScrollText className="size-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h4 className="font-display text-xl tracking-tight text-sand">
                    Rules & regulations
                  </h4>
                </div>

                <ol className="relative mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 lg:mt-6">
                  {houseRules.map((rule, index) => (
                    <MobileRuleCard
                      key={rule}
                      rule={rule}
                      index={index}
                    />
                  ))}
                </ol>

                <p className="relative mt-6 text-center font-display text-base italic text-sand/80 md:mt-8 md:text-lg">
                  Thank you for your cooperation.
                </p>
                <p className="relative mt-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-seafoam/55">
                  Wish you a pleasant stay
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
