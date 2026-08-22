import { motion } from "framer-motion";
import {
  accommodationOptions,
  premiumBookings,
  rooms,
  tariff,
} from "../../data/resort";
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
            eyebrow="Room tariff"
            title={tariff.title}
            description={tariff.greeting.lines.join(" ")}
          />
          <div className="mt-6 max-w-2xl border-l-2 border-seafoam-deep pl-5">
            <p className="font-display text-lg text-ink">{tariff.greeting.salutation}</p>
            {tariff.greeting.lines.map((line) => (
              <p
                key={line}
                className="mt-2 text-base font-light leading-relaxed text-ink/60"
              >
                {line}
              </p>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-12 md:mt-14" y={28}>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
            Accommodation options
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-ink text-sand">
                  <th className="px-4 py-3.5 font-medium uppercase tracking-[0.12em]">
                    Accommodation
                  </th>
                  <th className="px-4 py-3.5 font-medium uppercase tracking-[0.12em]">
                    No. of Units
                  </th>
                  <th className="px-4 py-3.5 font-medium uppercase tracking-[0.12em]">
                    Regular Tariff
                  </th>
                  <th className="px-4 py-3.5 font-medium uppercase tracking-[0.12em]">
                    Inaugural Offer
                  </th>
                </tr>
              </thead>
              <tbody>
                {accommodationOptions.map((option, index) => (
                  <tr
                    key={option.id}
                    className={index % 2 === 0 ? "bg-foam" : "bg-white/70"}
                  >
                    <td className="border-t border-ink/8 px-4 py-3.5 font-medium text-ink">
                      {option.name}
                    </td>
                    <td className="border-t border-ink/8 px-4 py-3.5 text-ink/65">
                      {option.units}
                    </td>
                    <td className="border-t border-ink/8 px-4 py-3.5 text-ink/45 line-through">
                      {formatPrice(option.regularPrice)}
                    </td>
                    <td className="border-t border-ink/8 px-4 py-3.5">
                      <span className="inline-block bg-seafoam/50 px-2 py-0.5 font-display text-base text-ink">
                        {formatPrice(option.inauguralPrice)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-5 space-y-1.5">
            {tariff.notes.map((note) => (
              <li
                key={note}
                className="text-xs font-light italic leading-relaxed text-ink/45"
              >
                * {note}
              </li>
            ))}
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
                    {room.subtitle && (
                      <p className="mt-2 text-sm font-light text-ink/50">
                        {room.subtitle}
                      </p>
                    )}
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

        <SectionReveal className="mt-16 md:mt-20" y={32}>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
            Premium bookings
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {premiumBookings.map((booking) => (
              <article
                key={booking.id}
                className="flex h-full flex-col border border-ink/10 bg-foam/60 px-6 py-8"
              >
                <h3 className="font-display text-2xl tracking-tight text-ink">
                  {booking.name}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink/55">
                  {booking.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap items-end gap-6 border-t border-ink/10 pt-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink/40">
                      Regular tariff
                    </p>
                    <p className="mt-1 font-display text-lg text-ink/35 line-through">
                      {formatPrice(booking.regularPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-seafoam-deep">
                      Inaugural offer
                    </p>
                    <p className="mt-1 font-display text-2xl text-ink">
                      {formatPrice(booking.price)}
                      <span className="ml-2 font-sans text-sm font-light text-ink/45">
                        / night
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <MagneticButton
                    variant="outline"
                    onClick={() => scrollToId("#contact")}
                  >
                    Enquire
                  </MagneticButton>
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className="mt-16 md:mt-20">
          <div className="flex flex-col items-start gap-4 border-t border-ink/10 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-base font-light leading-relaxed text-ink/55">
              Find the stay that suits your escape — Deluxe, Suite, Misty
              Cottage, or a complete resort booking.
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
