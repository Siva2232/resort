import { BedDouble, Home, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { additionalFacilities } from "../../data/resort";
import { formatPrice } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

const extraIcons = {
  "Air Conditioning": Wind,
  "Extra Bed": BedDouble,
  "Full Cottage Booking": Home,
};

export default function Facilities() {
  return (
    <section className="bg-ink px-5 py-20 md:px-8 md:py-24">
      <div className="section-shell">
        <SectionReveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              Additional facilities
            </p>
            <div className="h-px w-10 bg-brass/50" aria-hidden />
            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-seafoam/70">
              Optional add-ons to tailor your stay. All rates are subject to the
              applicable terms and conditions of Mount Misty Retreat.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {additionalFacilities.map((group, i) => (
            <SectionReveal key={group.id} delay={0.06 * i}>
              <motion.div
                className="flex h-full flex-col border border-brass/20 px-6 py-8"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <h3 className="font-display text-2xl tracking-tight text-sand">
                  {group.name}
                </h3>
                <ul className="mt-8 space-y-5">
                  {group.extras.map((extra) => {
                    const Icon = extraIcons[extra.label] || Wind;
                    return (
                      <li
                        key={extra.label}
                        className="flex items-start justify-between gap-4 border-t border-brass/15 pt-5 first:border-t-0 first:pt-0"
                      >
                        <span className="flex items-center gap-3 text-sm font-light text-seafoam/85">
                          <Icon
                            className="size-4 shrink-0 text-brass"
                            strokeWidth={1.35}
                          />
                          {extra.label}
                        </span>
                        <span className="shrink-0 font-display text-base text-sand">
                          {extra.type === "addon" ? "+" : ""}
                          {formatPrice(extra.price)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.18}>
          <p className="mt-14 text-center text-sm font-light leading-relaxed text-seafoam/55">
            We look forward to welcoming you and making your stay at Mount Misty
            Retreat a truly memorable experience.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
