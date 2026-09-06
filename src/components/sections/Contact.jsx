import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, Mail, Phone, MessageCircle, ArrowUpRight, Check } from "lucide-react";
import { contact } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

const THANK_YOU_MS = 5000;

const initial = {
  name: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  room: "",
  message: "",
};

const roomLabels = {
  deluxe: "Deluxe Room",
  suite: "Suite Room",
  "cottage-2bhk": "Misty Cottage – 2 BHK",
  "cottage-4bhk": "Misty Cottage – 4 BHK",
  "complete-resort": "Complete Resort Booking",
};

function buildWhatsAppUrl(data) {
  const stay = roomLabels[data.room] || data.room || "Any available";
  const lines = [
    "Hello Mount Misty Retreat,",
    "",
    "I would like to enquire about a stay.",
    "",
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Check-in: ${data.checkIn}`,
    `Check-out: ${data.checkOut}`,
    `Guests: ${data.guests}`,
    `Preferred stay: ${stay}`,
    "",
    `Message: ${data.message.trim()}`,
  ];
  const text = encodeURIComponent(lines.join("\n"));
  const base = contact.whatsappUrl.replace(/\?.*$/, "");
  return `${base}?text=${text}`;
}

function ThankYouModal({ open, whatsappHref, onClose, onOpenWhatsApp }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="thank-you-modal"
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-ink/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-foam px-6 py-8 shadow-[0_24px_80px_rgba(11,28,36,0.45)] sm:px-8 sm:py-10"
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 40, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            transition={{ duration: 0.45, ease: easeOutExpo }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-seafoam text-ink">
                <Check size={24} strokeWidth={1.75} />
              </span>
              <h3
                id="thank-you-title"
                className="mt-6 font-display text-3xl tracking-tight text-ink"
              >
                Thank you
              </h3>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-ink/60">
                Your enquiry is ready. Opening WhatsApp in a few seconds so you
                can send it to Mount Misty Retreat.
              </p>

              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-ink/8">
                <motion.div
                  className="h-full origin-left bg-brass"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: THANK_YOU_MS / 1000,
                    ease: "linear",
                  }}
                />
              </div>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
                Redirecting in 5 seconds
              </p>

              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3.5 text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle size={16} strokeWidth={1.75} />
                Open WhatsApp now
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-ink/45"
              >
                Stay on site
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Field({
  id,
  label,
  error,
  children,
  className = "",
}) {
  return (
    <div className={`group relative ${className}`}>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/45 transition-colors group-focus-within:text-brass"
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-700/90"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState(contact.whatsappUrl);
  const [focused, setFocused] = useState(null);
  const reduce = useReducedMotion();

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email";
    if (!form.checkIn) next.checkIn = "Select check-in";
    if (!form.checkOut) next.checkOut = "Select check-out";
    if (
      form.checkIn &&
      form.checkOut &&
      new Date(form.checkOut) <= new Date(form.checkIn)
    ) {
      next.checkOut = "Check-out must be after check-in";
    }
    if (!form.message.trim()) next.message = "Add a short note";
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    const waUrl = buildWhatsAppUrl(form);
    setWhatsappHref(waUrl);
    setSubmitted(true);
    setForm(initial);
  };

  const openWhatsApp = () => {
    if (!whatsappHref) return;
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    setSubmitted(false);
  };

  // Show thank-you modal for 5s, then open WhatsApp
  useEffect(() => {
    if (!submitted || !whatsappHref) return;
    const timer = window.setTimeout(() => {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
      setSubmitted(false);
    }, THANK_YOU_MS);
    return () => window.clearTimeout(timer);
  }, [submitted, whatsappHref]);

  const inputBase =
    "w-full rounded-sm border bg-foam/80 px-4 py-3.5 text-sm font-light text-ink outline-none transition-all duration-300 placeholder:text-ink/30";

  const inputBorder = (name) =>
    errors[name]
      ? "border-red-400/70 focus:border-red-500 focus:bg-white"
      : focused === name
        ? "border-brass bg-white shadow-[0_0_0_3px_rgba(184,149,108,0.15)]"
        : "border-ink/10 hover:border-ink/25 focus:border-brass focus:bg-white focus:shadow-[0_0_0_3px_rgba(184,149,108,0.15)]";

  const focusProps = (name) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });

  const details = [
    {
      icon: MapPin,
      label: "Address",
      content: (
        <div>
          {contact.addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-brass-light transition-colors hover:text-foam"
          >
            Get Directions
          </a>
        </div>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      content: (
        <a
          href={`mailto:${contact.email}`}
          className="transition-colors hover:text-brass-light"
        >
          {contact.email}
        </a>
      ),
    },
    {
      icon: Phone,
      label: "Call us",
      content: (
        <a
          href={`tel:${contact.phone.replace(/\s/g, "")}`}
          className="transition-colors hover:text-brass-light"
        >
          {contact.phone}
        </a>
      ),
    },
    {
      icon: MessageCircle,
      label: "WhatsApp us",
      content: (
        <a
          href={contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-brass-light"
        >
          {contact.phone}
        </a>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-mist section-pad"
    >
      <div
        className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-seafoam/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
        aria-hidden
      />

      <div className="section-shell relative">
        <SectionReveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
            Enquire
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl">
            Your mountain escape awaits
          </h2>
          <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-ink/55">
            Ready to experience the mist? Whether you’re planning a romantic
            getaway, family holiday or peaceful escape, our team is here to help
            you plan your stay.
          </p>
        </SectionReveal>

        <div
          className="grid overflow-hidden lg:grid-cols-12 lg:min-h-[640px]"
          style={{ perspective: 1600 }}
        >
          {/* Left panel — 3D swing from left (map / contact details) */}
          <motion.div
            className="relative order-2 flex flex-col justify-between bg-ink px-7 py-10 text-foam md:px-10 md:py-12 lg:order-1 lg:col-span-5"
            initial={
              reduce
                ? false
                : { opacity: 0, rotateY: 28, x: -40, transformOrigin: "left center" }
            }
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse at 20% 0%, rgba(184,149,108,0.25), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(200,217,211,0.12), transparent 50%)",
              }}
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.3, 0.5, 0.3] }
              }
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative" style={{ transform: "translateZ(20px)" }}>
              <p className="font-display text-2xl tracking-tight md:text-3xl">
                Book your stay
              </p>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-seafoam/80">
                Call us, WhatsApp us, or send your dates below. Plan your escape
                to Mount Misty Retreat.
              </p>

              <ul className="mt-10 space-y-7">
                {details.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.label}
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, x: -20, rotateY: 12 }
                      }
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.2 + i * 0.1,
                        duration: 0.65,
                        ease: easeLuxury,
                      }}
                      whileHover={reduce ? undefined : { x: 6, z: 12 }}
                      className="flex gap-4"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brass/35 text-brass">
                        <Icon size={15} strokeWidth={1.5} />
                      </span>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand/70">
                          {item.label}
                        </p>
                        <div className="mt-1.5 text-sm font-light leading-relaxed text-seafoam">
                          {item.content}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <motion.div
              className="group/map relative mt-12 overflow-hidden rounded-sm border-2 border-[#5a9e6f]/35 shadow-[0_12px_40px_rgba(16,107,67,0.18)]"
              initial={reduce ? false : { opacity: 0, y: 24, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.75, ease: easeOutExpo }}
              style={{ transform: "translateZ(12px)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#106B43]/12 via-transparent to-[#c4925e]/10"
              />
              <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-sm bg-[#106B43]/90 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#f5faf7] shadow-md backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7dd3a0]/70 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#7dd3a0]" />
                </span>
                Location
              </div>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-sm bg-[#c4925e]/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#2a1810] shadow-md transition hover:bg-[#d4a574]"
              >
                Open in Maps
                <ArrowUpRight size={12} strokeWidth={2} />
              </a>
              <iframe
                title="Mount Misty Retreat location map"
                src={contact.mapEmbed}
                className="relative z-0 h-48 w-full brightness-[1.02] saturate-[1.15] contrast-[1.05] transition duration-500 group-hover/map:saturate-[1.25] md:h-52"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-12 bg-gradient-to-t from-[#1a3d2e]/35 to-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Form panel — 3D swing from right */}
          <motion.div
            className="order-1 bg-foam px-6 py-10 md:px-10 md:py-12 lg:order-2 lg:col-span-7"
            initial={
              reduce
                ? false
                : { opacity: 0, rotateY: -24, x: 40, transformOrigin: "right center" }
            }
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.08, ease: easeOutExpo }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Anchor for Book Your Stay / Enquire CTAs — land on form, not map */}
            <div id="booking-form" className="scroll-mt-28" tabIndex={-1} />
            <form
              onSubmit={onSubmit}
              className="space-y-6"
              noValidate
              style={{ transformStyle: "preserve-3d" }}
            >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={errors.name}>
                      <motion.div
                        animate={
                          focused === "name" && !reduce
                            ? { z: 16, scale: 1.01 }
                            : { z: 0, scale: 1 }
                        }
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={update}
                          placeholder="Alex Rivera"
                          className={`${inputBase} ${inputBorder("name")}`}
                          autoComplete="name"
                          {...focusProps("name")}
                        />
                      </motion.div>
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <motion.div
                        animate={
                          focused === "email" && !reduce
                            ? { z: 16, scale: 1.01 }
                            : { z: 0, scale: 1 }
                        }
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      >
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={update}
                          placeholder="you@example.com"
                          className={`${inputBase} ${inputBorder("email")}`}
                          autoComplete="email"
                          {...focusProps("email")}
                        />
                      </motion.div>
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-3">
                    <Field
                      id="checkIn"
                      label="Check-in"
                      error={errors.checkIn}
                    >
                      <input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        value={form.checkIn}
                        onChange={update}
                        className={`${inputBase} ${inputBorder("checkIn")}`}
                        {...focusProps("checkIn")}
                      />
                    </Field>
                    <Field
                      id="checkOut"
                      label="Check-out"
                      error={errors.checkOut}
                    >
                      <input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        value={form.checkOut}
                        onChange={update}
                        className={`${inputBase} ${inputBorder("checkOut")}`}
                        {...focusProps("checkOut")}
                      />
                    </Field>
                    <Field id="guests" label="Guests">
                      <select
                        id="guests"
                        name="guests"
                        value={form.guests}
                        onChange={update}
                        className={`${inputBase} ${inputBorder("guests")} appearance-none`}
                        {...focusProps("guests")}
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field id="room" label="Preferred stay">
                    <select
                      id="room"
                      name="room"
                      value={form.room}
                      onChange={update}
                      className={`${inputBase} ${inputBorder("room")} appearance-none`}
                      {...focusProps("room")}
                    >
                      <option value="">Any available</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite Room</option>
                      <option value="cottage-2bhk">Misty Cottage – 2 BHK</option>
                      <option value="cottage-4bhk">Misty Cottage – 4 BHK</option>
                      <option value="complete-resort">Complete Resort Booking</option>
                    </select>
                  </Field>

                  <Field id="message" label="Message" error={errors.message}>
                    <motion.div
                      animate={
                        focused === "message" && !reduce
                          ? { z: 12, scale: 1.005 }
                          : { z: 0, scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={update}
                        placeholder="Room preference, occasions, dietary notes, arrival time…"
                        className={`${inputBase} ${inputBorder("message")} resize-none`}
                        {...focusProps("message")}
                      />
                    </motion.div>
                  </Field>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs font-light leading-relaxed text-ink/45">
                      By sending, you agree to be contacted about this enquiry.
                      No booking is confirmed until we reply.
                    </p>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-8 py-3.5 text-sm font-medium text-foam"
                      whileHover={
                        reduce
                          ? undefined
                          : { scale: 1.03, rotateX: -4, backgroundColor: "#152a33" }
                      }
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 22,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      Check Availability
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </motion.button>
                  </div>
            </form>
          </motion.div>
        </div>
      </div>

      <ThankYouModal
        open={submitted}
        whatsappHref={whatsappHref}
        onClose={() => setSubmitted(false)}
        onOpenWhatsApp={openWhatsApp}
      />
    </section>
  );
}
