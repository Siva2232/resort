import { inauguration } from "../../data/resort";
import { scrollToId } from "../../utils/helpers";
import MagneticButton from "../ui/MagneticButton";
import SectionReveal from "../ui/SectionReveal";

export default function Inauguration() {
  return (
    <section id="inauguration" className="bg-ink px-5 py-20 md:px-8 md:py-28">
      <div className="section-shell">
        <SectionReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-sand">
              {inauguration.eyebrow}
            </p>
            <div className="mx-auto mt-4 h-px w-10 bg-brass/50" aria-hidden />
            <h2 className="mt-6 font-display text-4xl tracking-tight text-foam md:text-5xl lg:text-[3.25rem]">
              {inauguration.title}
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-seafoam/75 md:text-lg">
              {inauguration.body}
            </p>
            <p className="mt-10 font-display text-3xl tracking-tight text-brass-light md:text-4xl">
              {inauguration.date}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-sand/80">
              {inauguration.time}
            </p>
            <p className="mt-8 text-base font-light leading-relaxed text-seafoam/65">
              {inauguration.close}
            </p>
            <div className="mt-10 flex justify-center">
              <MagneticButton onClick={() => scrollToId("#contact")}>
                Book Your Stay
              </MagneticButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
