import {
  Wifi,
  Wind,
  Trees,
  UtensilsCrossed,
  Sparkles,
  Car,
} from "lucide-react";
import { motion } from "framer-motion";
import { facilities } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

const icons = {
  Wifi,
  Wind,
  Trees,
  UtensilsCrossed,
  Sparkles,
  Car,
};

export default function Facilities() {
  return (
    <section className="bg-ink px-5 py-20 md:px-8 md:py-24">
      <div className="section-shell">
        <SectionReveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              Included with every stay
            </p>
            <div className="h-px w-10 bg-brass/50" aria-hidden />
          </div>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4">
          {facilities.map((item, i) => {
            const Icon = icons[item.icon] || Sparkles;
            return (
              <SectionReveal key={item.id} delay={0.05 * i}>
                <motion.div
                  className="group flex flex-col items-center gap-4 text-center"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <motion.span
                    className="flex size-14 items-center justify-center border border-brass/25 text-brass transition-colors duration-500 group-hover:border-brass/60 group-hover:bg-brass/10"
                    transition={{ duration: 0.35, ease: easeLuxury }}
                  >
                    <Icon className="size-5" strokeWidth={1.35} />
                  </motion.span>
                  <p className="max-w-[8.5rem] text-[13px] font-light leading-snug text-seafoam/85">
                    {item.label}
                  </p>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
