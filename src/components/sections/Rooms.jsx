import { motion } from "framer-motion";
import { rooms } from "../../data/resort";
import { formatPrice, scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import ImageCarousel from "../ui/ImageCarousel";
import ClipReveal from "../ui/ClipReveal";
import MagneticButton from "../ui/MagneticButton";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

export default function Rooms() {
  return (
    <section id="stay" className="bg-mist section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Accommodation"
            title="Suites shaped by mist and canopy"
            description="Each stay opens toward forest light — quiet interiors, private decks, and the highlands beyond."
          />
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
                      {room.category}
                    </p>
                    <h3 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
                      {room.name}
                    </h3>
                    <p className="mt-5 max-w-md text-base font-light leading-relaxed text-ink/65">
                      {room.description}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-x-1 gap-y-2 text-sm font-light text-ink/50">
                      {room.amenities.map((item, i) => (
                        <li key={item} className="flex items-center">
                          {i > 0 && (
                            <span className="mx-3 h-px w-3 bg-ink/20" aria-hidden />
                          )}
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-ink/10 pt-8">
                      <p className="font-display text-2xl text-ink md:text-3xl">
                        {formatPrice(room.price)}
                        <span className="ml-2 font-sans text-sm font-light tracking-normal text-ink/45">
                          / night
                        </span>
                      </p>
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
      </div>
    </section>
  );
}
