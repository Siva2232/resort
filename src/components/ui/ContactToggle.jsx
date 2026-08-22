import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { contact } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";

export function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const phoneDigits = contact.phone.replace(/\D/g, "");
export const telHref = `tel:+${phoneDigits}`;
export const waHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
  "Hello Mount Misty Retreat, I'd like to enquire about a stay."
)}`;

export const contactQuickActions = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: waHref,
    external: true,
    buttonClass:
      "bg-[#25D366] text-white hover:bg-[#1ebe57] ring-[#25D366]/30 shadow-[0_10px_28px_-10px_rgba(37,211,102,0.5)]",
    iconWrapClass: "bg-[#128C7E]/25",
    pulseClass: "ring-[#25D366]/45",
  },
  {
    id: "call",
    label: "Call",
    href: telHref,
    external: false,
    buttonClass:
      "bg-brass text-ink hover:bg-brass-light ring-brass/30 shadow-[0_10px_28px_-10px_rgba(184,149,108,0.5)]",
    iconWrapClass: "bg-ink/10",
    pulseClass: "ring-brass/40",
  },
];

function ActionIcon({ id, className }) {
  if (id === "call") {
    return <Phone className={className} strokeWidth={1.75} />;
  }
  return <WhatsAppIcon className={className} />;
}

function FloatingAction({ action, index, reduce }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.45,
        ease: easeLuxury,
      }}
      className="flex flex-col items-center gap-1.5"
    >
      <motion.a
        href={action.href}
        {...(action.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label={action.label}
        className={`group relative flex size-14 items-center justify-center rounded-full ring-1 transition-colors ${action.buttonClass}`}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      >
        {!reduce && (
          <motion.span
            aria-hidden
            className={`pointer-events-none absolute inset-0 rounded-full ring-2 ${action.pulseClass}`}
            animate={{ scale: [1, 1.28], opacity: [0.5, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.6,
            }}
          />
        )}
        <span
          className={`flex size-11 items-center justify-center rounded-full ${action.iconWrapClass}`}
        >
          <ActionIcon id={action.id} className="size-5" />
        </span>
      </motion.a>
      <span className="select-none text-[10px] font-medium uppercase tracking-[0.2em] text-ink/70">
        {action.label}
      </span>
    </motion.div>
  );
}

function InlineAction({ action, onClick }) {
  return (
    <a
      href={action.href}
      {...(action.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      onClick={onClick}
      className={`inline-flex flex-1 items-center justify-center gap-2.5 rounded-sm px-4 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] ring-1 transition-colors ${action.buttonClass}`}
    >
      <span
        className={`flex size-8 items-center justify-center rounded-full ${action.iconWrapClass}`}
      >
        <ActionIcon id={action.id} className="size-4" />
      </span>
      {action.label}
    </a>
  );
}

function FooterAction({ action }) {
  return (
    <a
      href={action.href}
      {...(action.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`inline-flex items-center gap-2.5 rounded-sm px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] ring-1 transition-colors ${action.buttonClass}`}
    >
      <span
        className={`flex size-7 items-center justify-center rounded-full ${action.iconWrapClass}`}
      >
        <ActionIcon id={action.id} className="size-3.5" />
      </span>
      {action.label}
    </a>
  );
}

export function ContactActionButtons({
  variant = "floating",
  className = "",
  onActionClick,
}) {
  const reduce = useReducedMotion();

  if (variant === "floating") {
    return (
      <div
        className={`flex flex-col items-center gap-4 ${className}`}
        aria-label="Quick contact"
      >
        {contactQuickActions.map((action, index) => (
          <FloatingAction
            key={action.id}
            action={action}
            index={index}
            reduce={reduce}
          />
        ))}
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div className={`space-y-3 ${className}`} aria-label="Contact options">
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-sand/70">
          Contact us
        </p>
        <div className="flex gap-3">
          {contactQuickActions.map((action) => (
            <InlineAction
              key={action.id}
              action={action}
              onClick={onActionClick}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap gap-3 ${className}`}
      aria-label="Contact options"
    >
      {contactQuickActions.map((action) => (
        <FooterAction key={action.id} action={action} />
      ))}
    </div>
  );
}

export default function ContactToggle() {
  const [footerInView, setFooterInView] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { threshold: 0.06, rootMargin: "0px 0px -48px 0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!footerInView && (
        <motion.div
          key="contact-toggle"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.96, pointerEvents: "none" }
          }
          transition={{ duration: reduce ? 0.15 : 0.35, ease: easeLuxury }}
          className="fixed bottom-5 right-4 z-30 md:bottom-8 md:right-8"
        >
          <ContactActionButtons variant="floating" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
