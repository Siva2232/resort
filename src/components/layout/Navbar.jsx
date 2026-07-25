import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, contact, navLinks } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["stay", "experience", "gallery", "contact", "about"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.45, ease: easeLuxury }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
          scrolled || open
            ? "border-b border-white/10 bg-ink/90 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="section-shell flex h-[4.5rem] items-center justify-between md:h-[5.25rem]">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="group flex items-baseline gap-2.5"
            whileHover={{ opacity: 0.85 }}
          >
            <span className="font-display text-[1.4rem] tracking-tight text-foam md:text-[1.65rem]">
              {brand.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-sand/70 sm:inline">
              Forest Retreat
            </span>
          </motion.a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={`relative px-4 py-2 text-[13px] font-light tracking-[0.06em] transition-colors duration-300 ${
                    isActive ? "text-foam" : "text-foam/65 hover:text-foam"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-px origin-left bg-brass transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="text-[12px] font-light tracking-wide text-foam/55 transition-colors hover:text-foam"
            >
              {contact.phone}
            </a>
            <motion.button
              type="button"
              onClick={() => go("#contact")}
              className="rounded-sm bg-brass px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink"
              whileHover={{ y: -1, backgroundColor: "#d4b896" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              Reserve
            </motion.button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[60] flex size-10 items-center justify-center text-foam lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                transition={{ duration: 0.22, ease: easeLuxury }}
                className="absolute"
              >
                {open ? (
                  <X size={22} strokeWidth={1.4} />
                ) : (
                  <Menu size={22} strokeWidth={1.4} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,149,108,0.12),transparent_50%)]"
              aria-hidden
            />

            <div className="relative flex h-full flex-col px-6 pb-10 pt-28">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand/70">
                Menu
              </p>

              <nav className="mt-8 flex flex-1 flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.08 + 0.06 * i,
                      duration: 0.55,
                      ease: easeOutExpo,
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="group flex items-baseline justify-between border-b border-white/8 py-4"
                  >
                    <span className="font-display text-3xl tracking-tight text-foam transition-colors group-hover:text-brass-light sm:text-4xl">
                      {link.label}
                    </span>
                    <span className="text-[11px] font-light tracking-[0.18em] text-foam/30">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, ease: easeLuxury }}
                className="mt-8 space-y-5"
              >
                <button
                  type="button"
                  onClick={() => go("#contact")}
                  className="w-full rounded-sm bg-brass py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink"
                >
                  Reserve a stay
                </button>
                <div className="flex flex-col gap-1 text-sm font-light text-seafoam/65">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-foam"
                  >
                    {contact.phone}
                  </a>
                  <p className="text-xs text-foam/40">Adimali · Kerala</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
