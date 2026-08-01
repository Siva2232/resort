import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { brand, contact, navLinks } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury } from "../../utils/motion";
import BrandLogo from "../ui/BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-ink text-foam">
      {/* CTA band */}
      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-end md:px-8 md:py-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              Begin the journey
            </p>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foam md:text-4xl lg:text-5xl">
              Ready for mist, timber, and quiet highland light?
            </h2>
          </div>
          <motion.button
            type="button"
            onClick={() => scrollToId("#contact")}
            className="group inline-flex items-center gap-3 rounded-sm bg-brass px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-ink"
            whileHover={{ y: -2, backgroundColor: "#d4b896" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            Reserve a stay
            <ArrowUpRight
              size={15}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </div>

      {/* Main columns */}
      <div className="section-shell grid gap-12 border-t border-white/8 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-8 md:py-20">
        <div className="md:col-span-5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#top");
            }}
            className="inline-block"
            aria-label={brand.fullName}
          >
            <BrandLogo size="lg" />
          </a>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.28em] text-sand/80">
            Edathana · Idukki
          </p>
          <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-seafoam/65">
            A quiet highland stay amid mist, forest, and slow mornings.
          </p>
          <motion.div
            className="mt-8 h-px w-16 origin-left bg-brass/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeLuxury }}
          />
        </div>

        <div className="md:col-span-2 md:col-start-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sand">
            Explore
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#about");
                }}
                className="text-sm font-light text-foam/60 transition-colors hover:text-foam"
              >
                About
              </a>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(link.href);
                  }}
                  className="text-sm font-light text-foam/60 transition-colors hover:text-foam"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-sand">
            Reach us
          </p>
          <ul className="mt-5 space-y-5">
            <li className="flex gap-3">
              <MapPin
                size={15}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-brass"
              />
              <div className="text-sm font-light leading-relaxed text-foam/65">
                {contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-brass-light transition-colors hover:text-foam"
                >
                  View on Google Maps
                  <ExternalLink size={12} strokeWidth={1.6} />
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail
                size={15}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-brass"
              />
              <a
                href={`mailto:${contact.email}`}
                className="text-sm font-light text-foam/65 transition-colors hover:text-foam"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone
                size={15}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-brass"
              />
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="text-sm font-light text-foam/65 transition-colors hover:text-foam"
              >
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-5 py-6 md:px-8">
        <div className="section-shell flex flex-col gap-3 text-[11px] font-light tracking-wide text-foam/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>Edathana · Idukki · Kerala</p>
            <button
              type="button"
              onClick={() => scrollToId("#top")}
              className="text-foam/50 transition-colors hover:text-brass-light"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
