export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
  titleClassName = "",
}) {
  const isDark = tone === "dark";
  const centered = align === "center";

  return (
    <header
      className={`${centered ? "mx-auto max-w-2xl text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p
          className={`text-[11px] font-medium uppercase tracking-[0.28em] ${
            isDark ? "text-sand" : "text-brass"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 font-display tracking-tight text-balance ${
          isDark ? "text-foam" : "text-ink"
        } text-4xl leading-[1.08] md:text-5xl lg:text-[3.35rem] ${titleClassName}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-md text-base font-light leading-relaxed ${
            isDark ? "text-seafoam/70" : "text-ink/55"
          } ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
