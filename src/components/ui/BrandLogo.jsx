import logo from "../../assets/logo.png";
import { brand } from "../../data/resort";

/**
 * Mount Misty Retreat mark — works on dark surfaces (logo has black field).
 */
export default function BrandLogo({
  className = "",
  imgClassName = "",
  showWordmark = false,
  size = "md",
}) {
  const heights = {
    sm: "h-12 md:h-14",
    md: "h-16 md:h-[4.75rem]",
    lg: "h-24 md:h-32",
    xl: "h-44 md:h-56",
  };

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt={brand.fullName}
        className={`${heights[size] ?? heights.md} w-auto object-contain ${imgClassName}`}
        decoding="async"
      />
      {showWordmark && (
        <span className="flex min-w-0 flex-col">
          <span className="font-display text-lg tracking-tight text-foam md:text-xl">
            {brand.name}
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-sand/70">
            {brand.taglineShort}
          </span>
        </span>
      )}
    </span>
  );
}
