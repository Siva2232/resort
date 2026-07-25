import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { contact } from "../../data/resort";
import { easeLuxury } from "../../utils/motion";

function WhatsAppIcon({ className }) {
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
const telHref = `tel:+${phoneDigits}`;
const waHref = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
  "Hello Auralis, I'd like to enquire about a stay."
)}`;

const actions = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: waHref,
    icon: WhatsAppIcon,
    className: "bg-[#25D366] text-white hover:bg-[#1ebe57]",
    external: true,
  },
  {
    id: "call",
    label: "Call",
    href: telHref,
    icon: Phone,
    className: "bg-brass text-ink hover:bg-brass-light",
  },
];

export default function ContactToggle() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const labelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-4 z-[55] flex flex-col items-center gap-2.5 md:bottom-8 md:right-8"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            className="mb-1 flex flex-col items-end gap-3"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.07,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.li
                  key={action.id}
                  variants={{
                    hidden: reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: 16, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.35, ease: easeLuxury },
                    },
                  }}
                >
                  <a
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`group flex items-center gap-3 rounded-full py-1.5 pl-4 pr-1.5 shadow-[0_10px_30px_-12px_rgba(11,28,36,0.55)] transition-colors ${action.className}`}
                    aria-label={action.label}
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-xs font-medium tracking-wide">
                      {action.label}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-full bg-black/10">
                      <Icon className="size-5" />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-1.5">
        <motion.button
          type="button"
          aria-expanded={open}
          aria-controls={labelId}
          aria-label={open ? "Close enquire options" : "Enquire"}
          onClick={() => setOpen((v) => !v)}
          className="relative flex size-14 items-center justify-center rounded-full bg-ink text-foam shadow-[0_14px_36px_-10px_rgba(11,28,36,0.65)] ring-1 ring-seafoam/25"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          whileTap={reduce ? undefined : { scale: 0.94 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
        >
          <span id={labelId} className="sr-only">
            Call or WhatsApp enquire options
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={reduce ? false : { opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.22, ease: easeLuxury }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {open ? (
                <X className="size-5" strokeWidth={1.75} />
              ) : (
                <MessageCircle className="size-5" strokeWidth={1.75} />
              )}
            </motion.span>
          </AnimatePresence>

          {!open && !reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-brass/40"
              animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.button>

        <span className="select-none text-[10px] font-medium uppercase tracking-[0.22em] text-ink/70">
          Enquire
        </span>
      </div>
    </div>
  );
}
