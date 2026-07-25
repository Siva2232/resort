import {
  Wifi,
  Wind,
  Waves,
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
  Waves,
  UtensilsCrossed,
  Sparkles,
  Car,
};

export default function Facilities() {
  return (
    <section className="border-y border-ink/5 bg-ink px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-sand">
            Facilities
          </p>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {facilities.map((item, i) => {
            const Icon = icons[item.icon] || Sparkles;
            return (
              <SectionReveal key={item.id} delay={0.06 * i}>
                <motion.div
                  className="flex flex-col items-center gap-3 text-center"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <motion.span
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/30"
                    whileHover={{
                      borderColor: "rgba(184,149,108,0.8)",
                      backgroundColor: "rgba(184,149,108,0.12)",
                    }}
                    transition={{ duration: 0.35, ease: easeLuxury }}
                  >
                    <Icon className="h-5 w-5 text-brass" strokeWidth={1.5} />
                  </motion.span>
                  <p className="text-sm font-light text-seafoam">{item.label}</p>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
