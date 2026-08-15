import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  Coffee,
  Mountain,
  Sparkles,
  Tv,
  Wifi,
} from "lucide-react";
import { roomFeatures, rooms } from "../../data/resort";
import { formatPrice, scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import ImageCarousel from "../ui/ImageCarousel";
import ClipReveal from "../ui/ClipReveal";
import MagneticButton from "../ui/MagneticButton";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const featureIcons = {
  Bath,
  BedDouble,
  Coffee,
  Mountain,
  Sparkles,
  Tv,
  Wifi,
};

export default function Rooms() {
  return (
    <section id="stay" className="bg-mist section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Rooms & suites"
            title="Stay above the ordinary"
            description="Your room should be more than just a place to sleep. At Mount Misty Retreat, our accommodation is designed to give you comfort while keeping you connected to the beauty outside."
          />
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-ink/50">
            Wake up to mountain views, enjoy your morning coffee surrounded by
            mist and end your day in the comfort of your private space.
          </p>
        </SectionReveal>

        <SectionReveal className="mt-12 md:mt-14" y={32}>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
            Room features
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roomFeatures.map((feature) => {
              const Icon = featureIcons[feature.icon] || Sparkles;
              return (
                <li
                  key={feature.id}
                  className="flex items-center gap-3 border border-ink/8 bg-foam/50 px-4 py-3.5"
                >
                  <Icon
                    className="size-4 shrink-0 text-brass"
                    strokeWidth={1.4}
                  />
                  <span className="text-sm font-light text-ink/70">
                    {feature.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </SectionReveal>

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {rooms.map((room, index) => {
            const reverse = index % 2 === 1;
            return (
              <SectionReveal key={room.id} delay={0.04 * index} y={56}>
                <article
                  className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-20 ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative">
                    <span className="absolute -top-5 left-0 z-10 font-display text-sm tracking-[0.2em] text-ink/30 md:-top-6">
                      0{index + 1}
                    </span>
                    <ClipReveal fromInset={36} className="overflow-hidden">
                      <ImageCarousel
                        images={room.images}
                        altPrefix={room.name}
                        className="aspect-[4/3] w-full"
                        interval={4000 + index * 350}
                      />
                    </ClipReveal>
                  </div>

                  <motion.div
                    className={reverse ? "md:pr-6" : "md:pl-2"}
                    initial={{ opacity: 0, x: reverse ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.9, delay: 0.12, ease: easeLuxury }}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-seafoam-deep">
                      {room.units} units
                    </p>
                    <h3 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
                      {room.name}
                    </h3>
                    <p className="mt-5 max-w-md text-base font-light leading-relaxed text-ink/65">
                      {room.description}
                    </p>

                    <div className="mt-10 flex flex-wrap items-end gap-8 border-t border-ink/10 pt-8">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/40">
                          Regular tariff
                        </p>
                        <p className="mt-1 font-display text-xl text-ink/35 line-through decoration-ink/25">
                          {formatPrice(room.regularPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-seafoam-deep">
                          Inaugural offer
                        </p>
                        <p className="mt-1 font-display text-2xl text-ink md:text-3xl">
                          {formatPrice(room.price)}
                          <span className="ml-2 font-sans text-sm font-light tracking-normal text-ink/45">
                            / night
                          </span>
                        </p>
                      </div>
                      <MagneticButton
                        variant="outline"
                        onClick={() => scrollToId("#contact")}
                      >
                        Enquire
                      </MagneticButton>
                    </div>
                  </motion.div>
                </article>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal className="mt-16 md:mt-20">
          <div className="flex flex-col items-start gap-4 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-base font-light leading-relaxed text-ink/55">
              Find the stay that suits your escape — Classic, Deluxe, or a
              Signature Cottage.
            </p>
            <MagneticButton onClick={() => scrollToId("#contact")}>
              Find Your Perfect Stay
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
