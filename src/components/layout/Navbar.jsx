import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import { easeLuxury, easeOutExpo } from "../../utils/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        transition={{ duration: 0.9, delay: 1.6, ease: easeLuxury }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-white/5 bg-ink/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="font-display text-xl tracking-tight text-foam md:text-2xl"
            whileHover={{ opacity: 0.8 }}
          >
            {brand.name}
          </motion.a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="group relative text-sm font-light tracking-wide text-foam/80 transition-colors hover:text-foam"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <motion.button
              type="button"
              onClick={() => go("#contact")}
              className="rounded-sm bg-brass px-5 py-2.5 text-sm font-medium text-ink"
              whileHover={{ scale: 1.05, backgroundColor: "#d4b896" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              Book Now
            </motion.button>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-foam md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
            className="fixed inset-0 z-40 bg-ink md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-8 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + 0.07 * i, ease: easeLuxury }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="font-display text-4xl text-foam"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                type="button"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, ease: easeLuxury }}
                onClick={() => go("#contact")}
                className="mt-4 w-fit rounded-sm bg-brass px-6 py-3 text-sm font-medium text-ink"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
