export const brand = {
  name: "Mount Misty",
  fullName: "Mount Misty Retreat",
  tagline: "Escape into the mist.",
  taglineShort: "Escape into the mist",
  about:
    "Nestled in the highlands of Idukki, Mount Misty Retreat is a sanctuary of mist, timber, and unhurried mornings. Every suite opens toward quiet forest lands. Every evening settles into soft mountain light.",
  aboutSecondary:
    "Quiet stays for those who seek both rest and discovery — from pristine forest views to waterfalls, viewpoints, and easy links across Kerala’s highland belt.",
};

export const aboutImages = [
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    alt: "Sunlit forest canopy near the retreat",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    alt: "Mountain lake and highland horizons",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    alt: "Morning light over forested hills",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    alt: "Mist rolling through valley ridges",
  },
];

/** @deprecated use aboutImages */
export const aboutImage = aboutImages[0].src;

export const aboutStats = [
  { value: "12", label: "Private suites" },
  { value: "5+", label: "Nearby landmarks" },
  { value: "24/7", label: "Concierge care" },
];

export const aboutFeatures = [
  {
    id: "forest",
    title: "Surrounded by pristine forest",
    description:
      "Breathtaking, unfiltered natural views facing reserve forest lands and iconic spots like Kokkippara.",
    icon: "Trees",
  },
  {
    id: "attractions",
    title: "Heart of major attractions",
    description:
      "Minutes away from Kottappara Viewpoint, Meenuliyan Para, Kattadikadavu, Thommankuthu, and Anayadikuthu Waterfalls.",
    icon: "MapPin",
  },
  {
    id: "horizons",
    title: "Panoramic horizons",
    description:
      "Enjoy vast, breathtaking sightlines overlooking Adimali, Lower Periyar, and beyond.",
    icon: "Sunrise",
  },
  {
    id: "location",
    title: "Convenient location",
    description:
      "Easy connectivity to major transit hubs, including Nedumbassery (Cochin International Airport) and Ernakulam.",
    icon: "Plane",
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
    id: "canopy",
    name: "Canopy Suite",
    category: "Forest facing",
    price: 8500,
    description:
      "Soft linens, a private verandah, and filtered light through highland trees. Ideal for quiet escapes into the forest.",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["King bed", "Rain shower", "Forest view"],
  },
  {
    id: "ridge",
    name: "Ridge Pavilion",
    category: "Valley facing",
    price: 12000,
    description:
      "Floor-to-ceiling glass frames Adimali’s rolling ridges. Wake to mist, sleep to the hush of the hills.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["King bed", "Valley terrace", "Daybed"],
  },
  {
    id: "misty",
    name: "Misty Residence",
    category: "Private villa",
    price: 18500,
    description:
      "A standalone villa with its own lounge deck and forest path. Designed for longer, slower highland stays.",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Private deck", "Living room", "Butler service"],
  },
];

export const facilities = [
  { id: "wifi", label: "Complimentary Wi‑Fi", icon: "Wifi" },
  { id: "ac", label: "Climate control", icon: "Wind" },
  { id: "trail", label: "Forest trail access", icon: "Trees" },
  { id: "dining", label: "In-suite dining", icon: "UtensilsCrossed" },
  { id: "spa", label: "Highland spa rituals", icon: "Sparkles" },
  { id: "transfer", label: "Airport transfers", icon: "Car" },
];

export const experiences = [
  {
    id: "kokkippara",
    title: "Kokkippara overlook",
    description:
      "A guided morning walk to reserve-forest viewpoints and quiet lookouts.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "waterfall",
    title: "Waterfall trail",
    description:
      "Day trip to Thommankuthu and Anayadikuthu — cool pools, rock paths, and shade.",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "viewpoint",
    title: "Kottappara dusk",
    description:
      "Evening drive to Kottappara Viewpoint as the valleys turn gold and violet.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ayurveda",
    title: "Mist & stillness",
    description:
      "A ninety-minute Ayurvedic ritual designed for travel-weary bodies.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
];

export const gallery = [
  {
    id: "g1",
    alt: "Forest canopy in soft morning light",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g2",
    alt: "Highland suite with linen and timber",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g3",
    alt: "Misty mountain ridge at dawn",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g4",
    alt: "Outdoor dining among the trees",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g5",
    alt: "Valley panorama from the ridge",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g6",
    alt: "Resort lounge with woven textures",
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g7",
    alt: "Waterfall cascade in the highlands",
    src: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "g8",
    alt: "Sunset light over forested hills",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "We arrived exhausted and left restored. The ridge pavilion felt like a private world — staff attentive without hovering.",
    name: "Maya R.",
    place: "Singapore",
  },
  {
    id: "t2",
    quote:
      "Mornings on the verandah, evenings watching mist lift from the valley. Mount Misty understands how to make time slow down.",
    name: "James & Elena K.",
    place: "London",
  },
  {
    id: "t3",
    quote:
      "Forest silence and panoramic light in perfect balance. We are already planning our return for the monsoon.",
    name: "Arjun V.",
    place: "Bengaluru",
  },
];

export const contact = {
  address: "Pulickathotty P.O., Edathana, Idukki, Pin code 685607",
  addressLines: [
    "Mount Misty Retreat",
    "Pulickathotty P.O.",
    "Edathana",
    "Idukki",
    "Pin code 685607",
  ],
  email: "stay@mountmisty.example",
  phone: "+91 79078 08656",
  phoneSecondary: "+91 79078 08656",
  mapsUrl: "https://maps.app.goo.gl/Pup59CyU29h8nFKL7?g_st=ac",
  mapEmbed:
    "https://www.google.com/maps?q=Pulickathotty+P.O.+Edathana+Idukki+685607&output=embed",
};

export const heroImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80";
