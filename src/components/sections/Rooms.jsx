import { motion } from "framer-motion";
import { rooms } from "../../data/resort";
import { formatPrice, scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import ImageReveal from "../ui/ImageReveal";
import SectionReveal from "../ui/SectionReveal";

export default function Rooms() {
  return (
    <section id="stay" className="bg-sand-light px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Accommodation
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl tracking-tight text-ink md:text-5xl">
            Rooms shaped by light and tide
          </h2>
        </SectionReveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {rooms.map((room, index) => {
            const reverse = index % 2 === 1;
            return (
              <SectionReveal key={room.id} delay={0.05 * index} y={64}>
                <article
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <ImageReveal
                    src={room.image}
                    alt={room.name}
                    className="aspect-[4/3] w-full"
                  />

                  <motion.div
                    className={reverse ? "md:pr-8" : "md:pl-4"}
                    initial={{ opacity: 0, x: reverse ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: easeLuxury }}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-seafoam-deep">
                      {room.category}
                    </p>
                    <h3 className="mt-3 font-display text-3xl tracking-tight text-ink md:text-4xl">
                      {room.name}
                    </h3>
                    <p className="mt-4 text-base font-light leading-relaxed text-ink/70">
                      {room.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-light text-ink/55">
                      {room.amenities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-baseline gap-6">
                      <p className="font-display text-2xl text-ink">
                        {formatPrice(room.price)}
                        <span className="ml-2 font-sans text-sm font-light text-ink/50">
                          / night
                        </span>
                      </p>
                      <motion.button
                        type="button"
                        onClick={() => scrollToId("#contact")}
                        className="text-sm font-medium text-brass underline-offset-4"
                        whileHover={{ x: 4, color: "#0b1c24" }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                      >
                        Enquire →
                      </motion.button>
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
