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

export const tariff = {
  title: "Room Tariff & Inaugural Offer",
  greeting: {
    salutation: "Dear Guest,",
    lines: [
      "Warm greetings from Mount Misty Retreat.",
      "We are delighted to welcome you to our retreat and present our Special Inaugural Offers, thoughtfully designed to make your stay comfortable and memorable.",
    ],
  },
  notes: [
    "All rates are subject to the applicable terms and conditions of Mount Misty Retreat.",
    "Infinity Swimming Pool access is available for Deluxe & Suite Room guests from 8:30 AM to 6:30 PM only.",
  ],
  closing:
    "We look forward to welcoming you and making your stay at Mount Misty Retreat a truly memorable experience.",
};

export const accommodationOptions = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    units: 8,
    regularPrice: 5500,
    inauguralPrice: 3500,
  },
  {
    id: "suite",
    name: "Suite Room",
    units: 4,
    regularPrice: 7500,
    inauguralPrice: 4500,
  },
  {
    id: "cottage-2bhk",
    name: "Misty Cottage – 2 BHK",
    units: 2,
    regularPrice: 10500,
    inauguralPrice: 7500,
  },
  {
    id: "cottage-4bhk",
    name: "Misty Cottage – 4 BHK (2 Floor)",
    units: 1,
    regularPrice: 17500,
    inauguralPrice: 14500,
  },
  {
    id: "complete-resort",
    name: "Complete Resort Booking",
    units: 1,
    regularPrice: 80000,
    inauguralPrice: 55500,
  },
];

export const rooms = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    category: "8 units",
    units: 8,
    price: 3500,
    regularPrice: 5500,
    description:
      "Comfortable highland accommodation with thoughtful amenities — offered at a special inaugural tariff for our opening guests.",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "suite",
    name: "Suite Room",
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
    id: "cottage-2bhk",
    name: "Misty Cottage – 2 BHK",
    category: "2 units",
    units: 2,
    subtitle: "2 Bedroom, Hall, Kitchen, Sitout",
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

export const premiumBookings = [
  {
    id: "cottage-4bhk",
    name: "Misty Cottage 4 BHK Full Booking",
    subtitle:
      "4 Bedroom, 2 Hall, 2 Kitchen, 2 Sitout, Private Infinity Pool Access, Private Campfire Access, Private Space",
    units: 1,
    price: 14500,
    regularPrice: 17500,
  },
  {
    id: "complete-resort",
    name: "Complete Resort & Property Booking",
    subtitle: "Exclusive use of the entire retreat and its facilities",
    units: 1,
    price: 55500,
    regularPrice: 80000,
  },
];

const sharedFreeExtras = [
  { label: "Infinity Pool access", price: 0, type: "free", note: "*" },
  { label: "Breakfast", price: 0, type: "free" },
  { label: "Children's park access", price: 0, type: "free" },
  { label: "Wi-Fi Access", price: 0, type: "free" },
];

const sharedPaidExtras = [
  { label: "Campfire", price: 1500, type: "addon" },
  { label: "Barbeque", price: 3000, type: "addon" },
];

export const additionalFacilities = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    extras: [
      ...sharedFreeExtras,
      { label: "Air Conditioning", price: 500, type: "addon" },
      { label: "Extra Bed", price: 500, type: "addon" },
      ...sharedPaidExtras,
    ],
  },
  {
    id: "suite",
    name: "Suite Room",
    extras: [
      ...sharedFreeExtras,
      { label: "Air Conditioning", price: 900, type: "addon" },
      { label: "Extra Bed", price: 500, type: "addon" },
      ...sharedPaidExtras,
    ],
  },
  {
    id: "cottage-2bhk",
    name: "Misty Cottage – 2 BHK",
    subtitle: "2 Bedroom, Hall, Kitchen, Sitout",
    extras: [
      ...sharedFreeExtras,
      { label: "Air Conditioning", price: 1600, type: "addon" },
      { label: "Extra Bed", price: 500, type: "addon" },
      ...sharedPaidExtras,
    ],
  },
];

export const premiumBookingExtras = [
  {
    id: "cottage-4bhk",
    name: "Misty Cottage 4 BHK Full Booking",
    subtitle:
      "4 Bedroom, 2 Hall, 2 Kitchen, 2 Sitout, Private Infinity Pool Access, Private Campfire Access, Private Space",
    extras: [
      ...sharedFreeExtras,
      { label: "Air Conditioning", price: 700, type: "addon", unit: "/ Room" },
      { label: "Extra Bed", price: 500, type: "addon", unit: "/ Room" },
      ...sharedPaidExtras,
    ],
  },
  {
    id: "complete-resort",
    name: "Complete Resort & Property Booking Facilities",
    extras: [
      ...sharedFreeExtras,
      { label: "Air Conditioning", price: 700, type: "addon", unit: "/ Room" },
      { label: "Extra Bed", price: 500, type: "addon", unit: "/ Room" },
      ...sharedPaidExtras,
    ],
  },
];

export const propertyAmenities = [
  {
    id: "rooms",
    title: "16 Well-Appointed Rooms",
    description: "Comfortable accommodation for guests and families.",
    icon: "BedDouble",
  },
  {
    id: "parking",
    title: "Spacious Parking Area",
    description: "Ample parking space for guests and visitors.",
    icon: "ParkingCircle",
  },
  {
    id: "restaurant",
    title: "60-Seater Restaurant",
    description: "Enjoy delicious meals in a comfortable dining environment.",
    icon: "UtensilsCrossed",
  },
  {
    id: "hall",
    title: "200-Seater Program Hall",
    description: "Ideal for celebrations, corporate events, and special occasions.",
    icon: "Users",
  },
  {
    id: "pool",
    title: "24/7 Infinity Pool Access",
    description: "Relax and enjoy convenient swimming pool access throughout the day.",
    icon: "Waves",
  },
];

export const roomAmenities = [
  { id: "dressing", label: "Dressing Unit", icon: "Mirror", group: "comfort" },
  { id: "wardrobe", label: "Wardrobe", icon: "Archive", group: "comfort" },
  { id: "locker", label: "Locker", icon: "Lock", group: "comfort" },
  { id: "tv", label: "Smart Android TV", icon: "Tv", group: "entertainment", featured: true },
  { id: "kettle", label: "Electric Kettle", icon: "Coffee", group: "refreshments" },
  { id: "heater", label: "Water Heater", icon: "Flame", group: "bathroom" },
  { id: "fridge", label: "Mini Fridge", icon: "Refrigerator", group: "refreshments" },
  { id: "dryer", label: "Hair Dryer", icon: "Wind", group: "bathroom" },
  { id: "iron", label: "Iron Box", icon: "Shirt", group: "bathroom" },
  { id: "restaurant", label: "Restaurant Access", icon: "UtensilsCrossed", group: "services" },
  { id: "pickup", label: "Pickup & Drop", icon: "Car", group: "services", paid: true },
];

export const roomAmenityGroups = [
  { id: "comfort", title: "Comfort & storage", subtitle: "Space to settle in" },
  { id: "entertainment", title: "Entertainment", subtitle: "Stay connected" },
  { id: "refreshments", title: "Refreshments", subtitle: "In-room convenience" },
  { id: "bathroom", title: "Bathroom & grooming", subtitle: "Daily essentials" },
  { id: "services", title: "Services", subtitle: "Beyond your room" },
];

export const propertyTimings = [
  {
    id: "breakfast",
    label: "Breakfast Time",
    time: "7:00 AM – 10:30 AM",
    icon: "Coffee",
  },
  {
    id: "restaurant",
    label: "Restaurant Time",
    time: "7:00 AM – 7:00 PM",
    note: "All orders will be closed at 7:00 PM",
    icon: "UtensilsCrossed",
  },
  {
    id: "pool",
    label: "Pool Time",
    time: "7:00 AM – 7:00 PM",
    icon: "Waves",
  },
  {
    id: "park",
    label: "Children's Park",
    time: "7:00 AM – 5:00 PM",
    icon: "Trees",
  },
];

export const houseRules = [
  "Check-in: 2:00 PM onwards | Check-out: 11:00 AM",
  "Please carry a valid ID proof for check-in.",
  "Outside food and beverages are not allowed.",
  "Smoking is strictly prohibited inside the rooms.",
  "We request you to always maintain a minimal voice to ensure a peaceful and pleasant stay for all guests.",
  "Children must be supervised by adults at all times.",
  "Do not litter. Please use dustbins and help us keep the property clean.",
  "Any damages to hotel property will be chargeable.",
  "Management is not responsible for the loss of personal belongings.",
  "Follow pool rules and use appropriate swimwear.",
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

const sightseeingStops = [
  {
    id: "kottappara",
    name: "Kottappara Viewpoint",
    type: "Viewpoint",
    segmentKm: 8,
    driveTime: "20 min",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "meenuliyan",
    name: "Meenuliyan Para",
    type: "Viewpoint",
    segmentKm: 6,
    driveTime: "15 min",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kattadikadavu",
    name: "Kattadikadavu Viewpoint",
    type: "Viewpoint",
    segmentKm: 5,
    driveTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "thommankuthu",
    name: "Thommankuthu Waterfalls",
    type: "Waterfalls",
    segmentKm: 14,
    driveTime: "35 min",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "anayadikuthu",
    name: "Anayadikuthu Waterfalls",
    type: "Waterfalls",
    segmentKm: 9,
    driveTime: "22 min",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
  },
];

/** Cumulative distance from retreat — derived from each leg (segmentKm). */
export const sightseeing = sightseeingStops.reduce((acc, stop) => {
  const distanceKm = (acc.at(-1)?.distanceKm ?? 0) + stop.segmentKm;
  acc.push({ ...stop, distanceKm });
  return acc;
}, []);

function parseDriveMinutes(driveTime) {
  const match = String(driveTime).match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function formatRouteDriveTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours === 0) return `~${mins} min`;
  if (mins === 0) return `~${hours} hr`;
  return `~${hours}h ${mins}m`;
}

const totalDriveMinutes = sightseeing.reduce(
  (sum, stop) => sum + parseDriveMinutes(stop.driveTime),
  0
);

export const sightseeingRoute = {
  origin: {
    name: "Mount Misty Retreat",
    location: "Edathana, Idukki",
  },
  note: "Distances and routes are arranged as per your requirements during your stay.",
  totalDistanceKm: sightseeing.at(-1)?.distanceKm ?? 0,
  totalDriveMinutes,
  estimatedDriveTime: formatRouteDriveTime(totalDriveMinutes),
  estimatedDriveTimeNote: "Total driving between all 5 stops",
};

/** @deprecated use sightseeing */
export const nearbyAttractions = sightseeing.map((s) => s.name);

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
  email: "mountmistyretreat@gmail.com",
  phone: "+91 79078 08656",
  phoneSecondary: "+91 79078 08656",
  whatsappUrl: "https://wa.me/917907808656",
  mapsUrl: "https://maps.app.goo.gl/DFj175PudexhbU676?g_st=ac",
  mapEmbed:
    "https://www.google.com/maps?q=9.998917,76.849972&z=15&output=embed",
};

export const heroImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80";
