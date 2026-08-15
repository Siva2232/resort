import { nearbyAttractions } from "../../data/resort";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

export default function ExploreIdukki() {
  return (
    <section id="idukki" className="bg-foam section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Around the retreat"
            title="Explore the beauty of Idukki"
            description="Mount Misty Retreat is surrounded by some of the most beautiful landscapes and attractions in Idukki. During your stay, explore the region’s mountains, plantations, viewpoints, dams and other natural attractions."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nearbyAttractions.map((place, i) => (
            <SectionReveal key={place} delay={0.05 * i} y={24}>
              <div className="flex items-baseline justify-between border-b border-ink/10 py-5">
                <span className="font-display text-xl tracking-tight text-ink md:text-[1.35rem]">
                  {place}
                </span>
                <span className="font-display text-sm text-ink/25">
                  0{i + 1}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="mt-14 max-w-xl text-base font-light leading-relaxed text-ink/50">
            Stay with us. Explore Idukki. Take home the memories.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
