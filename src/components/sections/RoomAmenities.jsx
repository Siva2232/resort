import {
  Archive,
  Box,
  Car,
  Coffee,
  Droplets,
  Lock,
  Sparkles,
  Tv,
  UtensilsCrossed,
  Wind,
  Zap,
} from "lucide-react";
import { roomAmenities } from "../../data/resort";
import SectionHeader from "../ui/SectionHeader";
import SectionReveal from "../ui/SectionReveal";

const amenityIcons = {
  Mirror: Sparkles,
  Archive,
  Lock,
  Tv,
  Coffee,
  Flame: Droplets,
  Refrigerator: Box,
  Wind,
  Shirt: Zap,
  UtensilsCrossed,
  Car,
};

export default function RoomAmenities() {
  return (
    <section className="bg-foam section-pad">
      <div className="section-shell">
        <SectionReveal>
          <SectionHeader
            eyebrow="In every room"
            title="Amenities"
            description="Every accommodation at Mount Misty Retreat is equipped with the essentials for a comfortable highland stay."
          />
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {roomAmenities.map((item, i) => {
            const Icon = amenityIcons[item.icon] || Coffee;
            return (
              <SectionReveal key={item.id} delay={0.04 * i} y={20}>
                <div className="flex flex-col items-center gap-3 border border-ink/8 bg-white/60 px-4 py-6 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brass/25 text-brass">
                    <Icon className="size-5" strokeWidth={1.35} />
                  </span>
                  <span className="text-sm font-light text-ink/75">
                    {item.label}
                  </span>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
