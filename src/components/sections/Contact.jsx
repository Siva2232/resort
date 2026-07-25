import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight, Check } from "lucide-react";
import { contact } from "../../data/resort";
import { easeLuxury, easeOutExpo } from "../../utils/motion";
import SectionReveal from "../ui/SectionReveal";

const initial = {
  name: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  room: "",
  message: "",
};

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
  const [focused, setFocused] = useState(null);

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
    setSubmitted(true);
    setForm(initial);
  };

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
      content: contact.address,
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
      label: "Phone",
      content: (
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="transition-colors hover:text-brass-light"
          >
            {contact.phone}
          </a>
          <a
            href={`tel:${contact.phoneSecondary.replace(/\s/g, "")}`}
            className="transition-colors hover:text-brass-light"
          >
            {contact.phoneSecondary}
          </a>
        </span>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-sand-light px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-seafoam/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-brass/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionReveal className="mb-12 max-w-2xl md:mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Enquire
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl lg:text-6xl">
            Begin your stay
          </h2>
          <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-ink/60">
            Share your dates and preferences. Our concierge replies within one
            business day — this demo form records locally only.
          </p>
        </SectionReveal>

        <div className="grid overflow-hidden lg:grid-cols-12 lg:min-h-[640px]">
          {/* Left panel */}
          <SectionReveal className="relative flex flex-col justify-between bg-ink px-7 py-10 text-foam md:px-10 md:py-12 lg:col-span-5">
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-40"
              aria-hidden
              style={{
                background:
                  "radial-gradient(ellipse at 20% 0%, rgba(184,149,108,0.25), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(200,217,211,0.12), transparent 50%)",
              }}
            />

            <div className="relative">
              <p className="font-display text-2xl tracking-tight md:text-3xl">
                Auralis Concierge
              </p>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-seafoam/80">
                Tell us how you wish to arrive — we will prepare the room, the
                light, and the quiet.
              </p>

              <ul className="mt-10 space-y-7">
                {details.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.1 + i * 0.08,
                        duration: 0.6,
                        ease: easeLuxury,
                      }}
                      className="flex gap-4"
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

            <div className="relative mt-12 overflow-hidden border border-white/10">
              <div className="absolute left-3 top-3 z-10 bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-sand backdrop-blur-sm">
                Location
              </div>
              <iframe
                title="Auralis location map"
                src={contact.mapEmbed}
                className="h-44 w-full opacity-80 grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </SectionReveal>

          {/* Form panel */}
          <SectionReveal
            className="bg-foam px-6 py-10 md:px-10 md:py-12 lg:col-span-7"
            delay={0.08}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: easeOutExpo }}
                  className="flex h-full min-h-[420px] flex-col items-start justify-center"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: 0.1,
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-seafoam text-ink"
                  >
                    <Check size={24} strokeWidth={1.75} />
                  </motion.span>
                  <p className="mt-8 font-display text-3xl tracking-tight text-ink md:text-4xl">
                    Enquiry received
                  </p>
                  <p className="mt-4 max-w-md text-base font-light leading-relaxed text-ink/60">
                    Thank you. In a live site, our concierge would confirm
                    availability and rates within one business day.
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-brass"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  >
                    Send another enquiry
                    <ArrowUpRight size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: easeLuxury }}
                  onSubmit={onSubmit}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={errors.name}>
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
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
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
                      <option value="lagoon">Lagoon Suite</option>
                      <option value="ocean">Ocean Pavilion</option>
                      <option value="auralis">Auralis Residence</option>
                    </select>
                  </Field>

                  <Field id="message" label="Message" error={errors.message}>
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
                  </Field>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs font-light leading-relaxed text-ink/45">
                      By sending, you agree to be contacted about this enquiry.
                      No booking is confirmed until we reply.
                    </p>
                    <motion.button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-8 py-3.5 text-sm font-medium text-foam"
                      whileHover={{ scale: 1.03, backgroundColor: "#152a33" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 22,
                      }}
                    >
                      Send enquiry
                      <ArrowUpRight size={16} strokeWidth={1.75} />
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
