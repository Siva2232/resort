import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  Box,
  Car,
  Coffee,
  Droplets,
  Lock,
  Sparkles,
  Tv,
  UtensilsCrossed,
  Wind,
  Zap,
} from "lucide-react";
import {
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
};

function AmenityTile({ item, index, isActive, onHover, compact = false }) {
  const Icon = amenityIcons[item.icon] || Coffee;
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onMouseEnter={() => onHover(item.id)}
      onFocus={() => onHover(item.id)}
      className={`group relative w-full overflow-hidden text-left transition-colors ${
        compact
          ? "border border-white/10 bg-white/[0.04] px-4 py-4"
          : "border border-ink/8 bg-white/70 px-5 py-5"
      } ${isActive && !compact ? "border-brass/40 bg-white shadow-[0_20px_50px_-30px_rgba(184,149,108,0.45)]" : ""} ${
        isActive && compact ? "border-brass/50 bg-white/[0.08]" : ""
      }`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.04 * index, duration: 0.65, ease: easeOutExpo }}
      whileHover={reduce ? undefined : { y: -3 }}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
          compact
            ? "bg-[radial-gradient(circle_at_20%_20%,rgba(184,149,108,0.14),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_80%_0%,rgba(143,171,163,0.18),transparent_50%)]"
        }`}
        aria-hidden
      />

      <div className="relative flex items-start gap-4">
        <span
          className={`flex shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            compact
              ? "h-10 w-10 border-brass/30 text-brass group-hover:border-brass group-hover:bg-brass/10"
              : "h-12 w-12 border-brass/25 text-brass group-hover:border-brass/50 group-hover:bg-brass/5"
          }`}
        >
          <Icon className={compact ? "size-4" : "size-5"} strokeWidth={1.35} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`font-display tracking-tight ${
                compact ? "text-base text-sand" : "text-lg text-ink"
              }`}
            >
              {item.label}
            </p>
            {item.paid && (
              <span className="rounded-full border border-brass/35 bg-brass/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-brass-light">
                Paid
              </span>
            )}
            {item.featured && !compact && (
              <span className="rounded-full bg-seafoam/50 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-ink/55">
                Included
              </span>
            )}
          </div>
          {!compact && (
            <p className="mt-1.5 text-sm font-light text-ink/45">
              {roomAmenityGroups.find((g) => g.id === item.group)?.subtitle}
            </p>
          )}
        </div>

        <span
          className={`font-display text-sm tabular-nums ${
            compact ? "text-sand/25" : "text-ink/20"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.button>
  );
}

export default function RoomAmenities() {
  const [activeId, setActiveId] = useState(roomAmenities.find((a) => a.featured)?.id ?? roomAmenities[0].id);
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

        <SectionReveal className="mt-12" y={32}>
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
                        {activeItem.paid ? " · Available on request" : " · Included with your stay"}
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
                    compact={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-10" delay={0.1} y={24}>
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
      </div>
    </section>
  );
}
