import { sightseeing } from "../../data/resort";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

export default function ExploreIdukki() {
  return (
    <section id="idukki" className="bg-foam section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="Around the retreat"
            title="Sightseeing (as per requirements)"
            description="Mount Misty Retreat can arrange visits to some of the most beautiful viewpoints and waterfalls around Idukki during your stay."
          />
        </SectionReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sightseeing.slice(0, 4).map((place, i) => (
            <SectionReveal key={place.id} delay={0.05 * i} y={24}>
              <figure className="group overflow-hidden border border-ink/8 bg-mist">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <figcaption className="px-4 py-4">
                  <p className="font-display text-lg tracking-tight text-ink">
                    {place.name}
                  </p>
                </figcaption>
              </figure>
            </SectionReveal>
          ))}
        </div>

        {sightseeing[4] && (
          <SectionReveal className="mt-6" delay={0.2} y={24}>
            <figure className="group mx-auto max-w-md overflow-hidden border border-ink/8 bg-mist">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={sightseeing[4].image}
                  alt={sightseeing[4].name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="px-4 py-4 text-center">
                <p className="font-display text-lg tracking-tight text-ink">
                  {sightseeing[4].name}
                </p>
              </figcaption>
            </figure>
          </SectionReveal>
        )}

        <SectionReveal delay={0.2}>
          <p className="mt-14 max-w-xl text-base font-light leading-relaxed text-ink/50">
            Stay with us. Explore Idukki. Take home the memories.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
