import {
  BedDouble,
  ParkingCircle,
  Users,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  additionalFacilities,
  premiumBookingExtras,
  propertyAmenities,
  tariff,
} from "../../data/resort";
import { formatPrice } from "../../utils/helpers";
import { easeOutExpo } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

const propertyIcons = {
  BedDouble,
  ParkingCircle,
  UtensilsCrossed,
  Users,
  Waves,
};

function ExtraRow({ extra }) {
  const isFree = extra.type === "free";

  return (
    <li className="flex items-start justify-between gap-4 border-t border-brass/15 pt-5 first:border-t-0 first:pt-0">
      <span className="text-sm font-light text-seafoam/85">
        {extra.label}
        {extra.note && (
          <span className="text-seafoam/50">{extra.note}</span>
        )}
      </span>
      <span
        className={`shrink-0 text-sm font-medium ${
          isFree ? "bg-seafoam/20 px-2 py-0.5 text-seafoam" : "font-display text-sand"
        }`}
      >
        {isFree
          ? "Free"
          : `+${formatPrice(extra.price)}${extra.unit || ""}`}
      </span>
    </li>
  );
}

function FacilityCard({ group, index }) {
  return (
    <SectionReveal delay={0.06 * index}>
      <motion.div
        className="flex h-full flex-col border border-brass/20 px-6 py-8"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
      >
        <h3 className="font-display text-2xl tracking-tight text-sand">
          {group.name}
        </h3>
        {group.subtitle && (
          <p className="mt-2 text-xs font-light leading-relaxed text-seafoam/60">
            {group.subtitle}
          </p>
        )}
        <ul className="mt-8 space-y-5">
          {group.extras.map((extra) => (
            <ExtraRow key={`${group.id}-${extra.label}`} extra={extra} />
          ))}
        </ul>
      </motion.div>
    </SectionReveal>
  );
}

function MobilePropertyCard({ item, index }) {
  const reduce = useReducedMotion();
  const Icon = propertyIcons[item.icon] || Waves;

  return (
    <motion.li
      className="flex min-h-[148px] flex-col border border-white/10 bg-white/[0.05] p-3.5"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.03 * index, duration: 0.55, ease: easeOutExpo }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass">
          <Icon className="size-3.5" strokeWidth={1.35} aria-hidden />
        </span>
        <span className="font-display text-xs tabular-nums text-sand/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-2.5 font-display text-[13px] leading-snug tracking-tight text-sand">
        {item.title}
      </p>
      <p className="mt-1.5 text-[11px] font-light leading-relaxed text-seafoam/70">
        {item.description}
      </p>
    </motion.li>
  );
}

export default function Facilities() {
  return (
    <section className="bg-ink px-5 py-20 md:px-8 md:py-24">
      <div className="section-shell">
        <SectionReveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              Additional facilities & add-ons
            </p>
            <div className="h-px w-10 bg-brass/50" aria-hidden />
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {additionalFacilities.map((group, i) => (
            <FacilityCard key={group.id} group={group} index={i} />
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
          {premiumBookingExtras.map((group, i) => (
            <FacilityCard key={group.id} group={group} index={i + 3} />
          ))}
        </div>

        <SectionReveal className="mt-16" delay={0.12}>
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
            Property facilities
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 md:hidden">
            {propertyAmenities.map((item, i) => (
              <MobilePropertyCard key={item.id} item={item} index={i} />
            ))}
          </ul>

          <ul className="mt-10 hidden space-y-0 md:block">
            {propertyAmenities.map((item, i) => {
              const Icon = propertyIcons[item.icon] || Waves;
              return (
                <li
                  key={item.id}
                  className={`flex items-start gap-5 px-5 py-5 md:items-center md:px-8 ${
                    i % 2 === 0 ? "bg-white/[0.04]" : "bg-transparent"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass/30 text-brass">
                    <Icon className="size-4" strokeWidth={1.35} />
                  </span>
                  <div>
                    <p className="font-display text-lg text-sand">{item.title}</p>
                    <p className="mt-1 text-sm font-light text-seafoam/70">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.18}>
          <ul className="mt-10 space-y-1.5 text-center">
            {tariff.notes.map((note) => (
              <li
                key={note}
                className="text-xs font-light italic text-seafoam/50"
              >
                * {note}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm font-light leading-relaxed text-seafoam/55">
            {tariff.closing}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
