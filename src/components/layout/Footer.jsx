import { brand, contact, navLinks } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-foam">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl tracking-tight">{brand.name}</p>
          <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-seafoam/80">
            {brand.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sand">
            Explore
          </p>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(link.href);
                  }}
                  className="text-sm font-light text-foam/75 transition-colors hover:text-foam"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-sand">
            Reach us
          </p>
          <ul className="mt-4 space-y-3 text-sm font-light text-foam/75">
            <li>{contact.address}</li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-foam">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-foam">
                {contact.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 md:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs font-light text-foam/45 md:text-left">
          © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          Demo content for presentation only.
        </p>
      </div>
    </footer>
  );
}
