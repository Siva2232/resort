export const brand = {
  name: "Mount Misty",
  fullName: "Mount Misty Retreat",
  tagline: "Escape into the mist.",
  taglineShort: "Escape into the mist",
  about:
    "High above the beautiful landscapes of Idukki, Mount Misty Retreat offers a peaceful escape surrounded by mountains, greenery and the ever-changing beauty of the mist.",
  aboutSecondary:
    "Wake up to cool mountain air. Watch the hills disappear into the clouds. Explore the beauty around you, or simply slow down and enjoy doing nothing.",
  aboutTertiary:
    "Whether it is a romantic getaway, honeymoon, family holiday or peaceful weekend escape, Mount Misty Retreat is a place to pause, breathe and reconnect.",
  aboutClose: "Your escape begins here.",
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
  { value: "16", label: "Rooms & cottages" },
  { value: "15 Aug", label: "Grand inauguration" },
  { value: "Idukki", label: "Kerala highlands" },
];

export const aboutFeatures = [
  {
    id: "views",
    title: "Breathtaking hill views",
    description:
      "Wake up to panoramic views of Idukki’s lush mountains and mist-covered landscapes.",
    icon: "Mountain",
  },
  {
    id: "nature",
    title: "Nature all around",
    description:
      "Experience the greenery, cool climate and peaceful atmosphere of the Idukki highlands.",
    icon: "Trees",
  },
  {
    id: "stays",
    title: "Comfortable stays",
    description:
      "Thoughtfully designed rooms created for relaxation, privacy and uninterrupted views.",
    icon: "BedDouble",
  },
  {
    id: "escape",
    title: "Perfect for every escape",
    description:
      "A beautiful setting for couples, families, friends and anyone looking for a break from the everyday.",
    icon: "Heart",
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
    id: "classic",
    name: "Classic Room",
    category: "8 units",
    units: 8,
    price: 3500,
    regularPrice: 5500,
    description:
      "Thoughtfully appointed for a comfortable highland stay — quiet interiors, restful nights, and an easy inaugural tariff.",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    category: "4 units",
    units: 4,
    price: 4500,
    regularPrice: 7500,
    description:
      "A more spacious stay with refined comfort — designed to make your inaugural visit to Mount Misty Retreat memorable.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "cottage",
    name: "Signature Cottage – 2 BHK",
    category: "4 units",
    units: 4,
    price: 7500,
    regularPrice: 10500,
    description:
      "A two-bedroom cottage for families and longer stays — private, generous, and offered at a special inaugural rate.",
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

export const roomFeatures = [
  { id: "views", label: "Beautiful hill and nature views", icon: "Mountain" },
  { id: "bedding", label: "Comfortable premium bedding", icon: "BedDouble" },
  { id: "bath", label: "Modern en-suite bathrooms", icon: "Bath" },
  { id: "wifi", label: "Wi-Fi", icon: "Wifi" },
  { id: "tea", label: "Tea & coffee facilities", icon: "Coffee" },
  { id: "entertainment", label: "Smart entertainment", icon: "Tv" },
  { id: "housekeeping", label: "Housekeeping", icon: "Sparkles" },
];

export const additionalFacilities = [
  {
    id: "classic",
    name: "Classic Room",
    extras: [
      { label: "Air Conditioning", price: 800, type: "addon" },
      { label: "Extra Bed", price: 500, type: "addon" },
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    extras: [
      { label: "Air Conditioning", price: 900, type: "addon" },
      { label: "Extra Bed", price: 500, type: "addon" },
    ],
  },
  {
    id: "cottage",
    name: "Misty Cottage – 2 BHK",
    extras: [
      { label: "Full Cottage Booking", price: 14500, type: "rate" },
      { label: "Air Conditioning", price: 1600, type: "addon" },
      { label: "Extra Bed", price: 500, type: "addon" },
    ],
  },
];

export const experiences = [
  {
    id: "mornings",
    title: "Wake Up to the Mountains",
    description:
      "There is something magical about mornings in Idukki. The cool breeze. The sound of nature. The mountains covered in mist. And the first rays of sunlight appearing through the clouds.",
    detail:
      "At Mount Misty Retreat, the destination itself becomes part of your stay.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "couples",
    title: "A Little More Romance in the Mountains",
    description:
      "Looking for a peaceful honeymoon stay in Idukki? Let the mountains set the mood.",
    detail:
      "From quiet mornings to sunset moments overlooking the hills, Mount Misty Retreat offers couples the perfect setting to slow down and enjoy time together. Create memories that stay long after the mist clears.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "family",
    title: "Time Well Spent Together",
    description:
      "Leave behind busy schedules and spend meaningful time with the people who matter most.",
    detail:
      "Explore the surrounding nature, share time together and simply take in the beauty of Idukki. Because the best family memories don’t need a plan.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  },
];

export const inauguration = {
  eyebrow: "The journey begins",
  title: "Grand Inauguration of Mount Misty Retreat",
  body: "We are delighted to welcome you as we begin a new chapter in the hills of Idukki.",
  date: "15 August 2026",
  time: "10:30 AM – 11:30 AM",
  close: "Come experience Mount Misty Retreat as it opens its doors.",
};

export const nearbyAttractions = [
  "Munnar",
  "Idukki Dam",
  "Calvary Mount",
  "Ramakkalmedu",
  "Tea plantations",
  "Hill viewpoints",
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
    alt: "Evening light among the trees",
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
  whatsappUrl: "https://wa.me/917907808656",
  mapsUrl: "https://maps.app.goo.gl/Pup59CyU29h8nFKL7?g_st=ac",
  mapEmbed:
    "https://www.google.com/maps?q=Pulickathotty+P.O.+Edathana+Idukki+685607&output=embed",
};

export const heroImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80";
