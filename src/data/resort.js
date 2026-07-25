export const brand = {
  name: "Auralis",
  fullName: "Auralis Beach Retreat",
  tagline: "Where the sea writes the day in soft light.",
  about:
    "Nestled along a quiet stretch of Kerala coastline, Auralis is a sanctuary of salt air, warm wood, and unhurried mornings. Every suite opens toward the water. Every evening ends with the horizon.",
  aboutSecondary:
    "Architecture of timber and limewash. Interiors that favour texture over ornament. A shoreline reserved for guests who prefer quiet over spectacle.",
};

export const aboutImage =
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80";

export const aboutStats = [
  { value: "12", label: "Private suites" },
  { value: "6 km", label: "Of quiet shore" },
  { value: "24/7", label: "Concierge care" },
];

export const aboutFeatures = [
  {
    id: "shore",
    title: "Private shoreline",
    description:
      "A reserved beach path opens from the gardens — morning swims, evening walks, and night skies without crowd.",
    icon: "Waves",
  },
  {
    id: "craft",
    title: "Crafted interiors",
    description:
      "Hand-finished timber, linen, and local stone. Spaces designed to hold light gently from dawn to dusk.",
    icon: "Home",
  },
  {
    id: "table",
    title: "Coastal table",
    description:
      "Seasonal Kerala seafood and garden produce, prepared simply and served where the breeze reaches the plate.",
    icon: "UtensilsCrossed",
  },
  {
    id: "ritual",
    title: "Rest rituals",
    description:
      "Ayurvedic therapies and slow spa hours shaped for travel-weary bodies — quiet, unhurried, restorative.",
    icon: "Sparkles",
  },
];

export const navLinks = [
  { label: "Stay", href: "#stay" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const rooms = [
  {
    id: "lagoon",
    name: "Lagoon Suite",
    category: "Garden facing",
    price: 8500,
    description:
      "Soft linens, a private verandah, and filtered light through coconut palms. Ideal for quiet escapes.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
    amenities: ["King bed", "Rain shower", "Garden view"],
  },
  {
    id: "ocean",
    name: "Ocean Pavilion",
    category: "Sea facing",
    price: 12000,
    description:
      "Floor-to-ceiling glass frames the Arabian Sea. Wake to waves, sleep to the hush of tide.",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
    amenities: ["King bed", "Ocean terrace", "Daybed"],
  },
  {
    id: "auralis",
    name: "Auralis Residence",
    category: "Private villa",
    price: 18500,
    description:
      "A standalone villa with its own plunge pool and beach path. Designed for longer, slower stays.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80",
    amenities: ["Plunge pool", "Living room", "Butler service"],
  },
];

export const facilities = [
  { id: "wifi", label: "Complimentary Wi‑Fi", icon: "Wifi" },
  { id: "ac", label: "Climate control", icon: "Wind" },
  { id: "beach", label: "Private beach access", icon: "Waves" },
  { id: "dining", label: "In-suite dining", icon: "UtensilsCrossed" },
  { id: "spa", label: "Coastal spa rituals", icon: "Sparkles" },
  { id: "transfer", label: "Airport transfers", icon: "Car" },
];

export const experiences = [
  {
    id: "backwater",
    title: "Backwater dawn",
    description:
      "A private canoe glide through misted canals as the village wakes.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seafood",
    title: "Catch of the coast",
    description:
      "Chef-led tasting of local seafood grilled over coconut husk.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lighthouse",
    title: "Lighthouse walk",
    description:
      "Guided evening stroll to the historic light and shoreline park.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ayurveda",
    title: "Salt & stillness",
    description:
      "A ninety-minute Ayurvedic ritual designed for travel-weary bodies.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
];

export const gallery = [
  {
    id: "g1",
    alt: "Resort pool at dusk",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    span: "wide",
  },
  {
    id: "g2",
    alt: "Bedroom with ocean light",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    span: "tall",
  },
  {
    id: "g3",
    alt: "Beach path through palms",
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
    span: "normal",
  },
  {
    id: "g4",
    alt: "Outdoor dining under lanterns",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    span: "normal",
  },
  {
    id: "g5",
    alt: "Infinity edge overlooking sea",
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
    span: "wide",
  },
  {
    id: "g6",
    alt: "Lounge with woven textures",
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
    span: "normal",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "We arrived exhausted and left restored. The ocean pavilion felt like a private world — staff attentive without hovering.",
    name: "Maya R.",
    place: "Singapore",
  },
  {
    id: "t2",
    quote:
      "Mornings on the verandah, evenings by the tide. Auralis understands how to make time slow down.",
    name: "James & Elena K.",
    place: "London",
  },
  {
    id: "t3",
    quote:
      "Design, silence, and salt air in perfect balance. We are already planning our return for the monsoon.",
    name: "Arjun V.",
    place: "Bengaluru",
  },
];

export const contact = {
  address: "Shoreline Road, Mararikulam North, Alappuzha, Kerala 688549",
  email: "stay@auralis.example",
  phone: "+91 90000 11223",
  phoneSecondary: "+91 90000 44556",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=76.30%2C9.58%2C76.38%2C9.64&layer=mapnik&marker=9.61%2C76.34",
};

export const heroImage =
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80";

export const heroVideo =
  "https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4";
