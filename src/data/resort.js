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
    src: "/gallery/mmr-01.webp",
    alt: "Aerial view of Mount Misty Retreat above the misty Idukki valley",
  },
  {
    src: "/gallery/mmr-08.webp",
    alt: "Resort, infinity pool and misty highland peaks",
  },
  {
    src: "/gallery/mmr-05.webp",
    alt: "Balcony lounge overlooking forested mountains",
  },
  {
    src: "/gallery/mmr-14.webp",
    alt: "Mount Misty Retreat — gallery photo 14",
  },
];

/** @deprecated use aboutImages */
export const aboutImage = aboutImages[0].src;

export const aboutFeatures = [
  {
    id: "views",
    title: "Breathtaking hill views",
    description:
      "Wake up to panoramic views of Idukki’s lush mountains and mist-covered landscapes.",
    icon: "Mountain",
    image: "/gallery/mmr-25.webp",
  },
  {
    id: "nature",
    title: "Nature all around",
    description:
      "Experience the greenery, cool climate and peaceful atmosphere of the Idukki highlands.",
    icon: "Trees",
    image: "/gallery/mmr-06.webp",
  },
  {
    id: "stays",
    title: "Comfortable stays",
    description:
      "Thoughtfully designed rooms created for relaxation, privacy and uninterrupted views.",
    icon: "BedDouble",
    image: "/gallery/mmr-12.webp",
  },
  {
    id: "escape",
    title: "Perfect for every escape",
    description:
      "A beautiful setting for couples, families, friends and anyone looking for a break from the everyday.",
    icon: "Heart",
    image: "/gallery/mmr-09.webp",
  },
];

export const navLinks = [
  { label: "Stay", href: "#stay" },
  { label: "Highlights", href: "#highlights" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const propertyHighlights = [
  {
    id: "scenic",
    title: "Scenic View from Resort",
    shortTitle: "Scenic View",
    eyebrow: "The vista",
    description:
      "Wake to misty valleys and layered highland peaks — the view that defines Mount Misty.",
    image: "/gallery/mmr-25.webp",
    icon: "Mountain",
    span: "wide",
  },
  {
    id: "pool",
    title: "Mountain View Swimming Pool",
    shortTitle: "Infinity Pool",
    eyebrow: "Poolside",
    description:
      "Swim with the hills as your backdrop. Our mountain-view pool is open for quiet morning and evening dips.",
    image: "/gallery/mmr-30.webp",
    icon: "Waves",
    span: "tall",
  },
  {
    id: "cottage-2bhk",
    title: "2BHK Cottages",
    shortTitle: "2BHK Cottages",
    eyebrow: "Stay",
    description:
      "Spacious Misty Cottages with living space, kitchen comforts, and private sitouts for families and longer stays.",
    image: "/gallery/mmr-44.webp",
    icon: "Home",
    span: "square",
  },
  {
    id: "park",
    title: "Children Park",
    shortTitle: "Children Park",
    eyebrow: "For little ones",
    description:
      "Open green play space on the property — so children can explore while you enjoy the highland calm.",
    image: "/gallery/mmr-08.webp",
    icon: "Trees",
    span: "square",
  },
];

export const tariff = {
  title: "Room Tariff",
  greeting: {
    salutation: "Dear Guest,",
    lines: [
      "Warm greetings from Mount Misty Retreat.",
      "We are delighted to welcome you to our retreat. Our room tariffs are thoughtfully set to make your stay comfortable and memorable.",
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
    regularPrice: 7500,
    price: 5500,
  },
  {
    id: "suite",
    name: "Suite Room",
    units: 4,
    regularPrice: 10000,
    price: 7500,
  },
  {
    id: "cottage-2bhk",
    name: "Misty Cottage – 2 BHK",
    units: 2,
    regularPrice: 13000,
    price: 10500,
  },
  {
    id: "cottage-4bhk",
    name: "Misty Cottage – 4 BHK (2 Floor)",
    units: 1,
    regularPrice: 20000,
    price: 17500,
  },
  {
    id: "complete-resort",
    name: "Complete Resort Booking",
    units: 1,
    regularPrice: 95000,
    price: 80000,
  },
];

export const rooms = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    category: "8 units",
    units: 8,
    regularPrice: 7500,
    price: 5500,
    description:
      "Comfortable highland accommodation with thoughtful amenities for a restful stay in the mist.",
    images: [
      "/gallery/mmr-12.webp",
      "/gallery/mmr-35.webp",
      "/gallery/mmr-05.webp",
    ],
  },
  {
    id: "suite",
    name: "Suite Room",
    category: "4 units",
    units: 4,
    regularPrice: 10000,
    price: 7500,
    description:
      "A more spacious stay with refined comfort — designed to make your visit to Mount Misty Retreat memorable.",
    images: [
      "/gallery/mmr-35.webp",
      "/gallery/mmr-12.webp",
      "/gallery/mmr-06.webp",
    ],
  },
  {
    id: "cottage-2bhk",
    name: "Misty Cottage – 2 BHK",
    category: "2 units",
    units: 2,
    subtitle: "2 Bedroom, Hall, Kitchen, Sitout",
    regularPrice: 13000,
    price: 10500,
    description:
      "A two-bedroom cottage for families and longer stays — private, generous, and set among the hills.",
    images: [
      "/gallery/mmr-44.webp",
      "/gallery/mmr-49.webp",
      "/gallery/mmr-46.webp",
      "/gallery/mmr-47.webp",
      "/gallery/mmr-50.webp",
      "/gallery/mmr-52.webp",
      "/gallery/mmr-54.webp",
      "/gallery/mmr-43.webp",
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
    regularPrice: 20000,
    price: 17500,
  },
  {
    id: "complete-resort",
    name: "Complete Resort & Property Booking",
    subtitle: "Exclusive use of the entire retreat and its facilities",
    units: 1,
    regularPrice: 95000,
    price: 80000,
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
    image: "/gallery/mmr-01.webp",
  },
  {
    id: "couples",
    title: "A Little More Romance in the Mountains",
    description:
      "Looking for a peaceful honeymoon stay in Idukki? Let the mountains set the mood.",
    detail:
      "From quiet mornings to sunset moments overlooking the hills, Mount Misty Retreat offers couples the perfect setting to slow down and enjoy time together. Create memories that stay long after the mist clears.",
    image: "/gallery/mmr-05.webp",
  },
  {
    id: "family",
    title: "Time Well Spent Together",
    description:
      "Leave behind busy schedules and spend meaningful time with the people who matter most.",
    detail:
      "Explore the surrounding nature, share time together and simply take in the beauty of Idukki. Because the best family memories don’t need a plan.",
    image: "/gallery/mmr-08.webp",
  },
];

const sightseeingStops = [
  {
    id: "meenuliyan",
    name: "Meenuliyan Para",
    type: "Viewpoint",
    segmentKm: 2.5,
    driveTime: "8 min",
    image: "/gallery/meenuliyan-para.webp",
  },
  {
    id: "kattadikadavu",
    name: "Kattadikadavu Viewpoint",
    type: "Viewpoint",
    segmentKm: 7.5,
    driveTime: "18 min",
    image: "/gallery/kattadikadavu.webp",
  },
  {
    id: "thommankuthu",
    name: "Thommankuthu Waterfalls",
    type: "Waterfalls",
    segmentKm: 16,
    driveTime: "40 min",
    image: "/gallery/thommankuthu.webp",
  },
  {
    id: "anayadikuthu",
    name: "Anayadikuthu Waterfalls",
    type: "Waterfalls",
    segmentKm: 1.5,
    driveTime: "5 min",
    image: "/gallery/anayadikuthu.webp",
  },
  {
    id: "palkulammedu",
    name: "Palkulammedu",
    type: "Viewpoint",
    segmentKm: 31,
    driveTime: "55 min",
    image: "/gallery/palkulammedu.webp",
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
    alt: "Aerial view of Mount Misty Retreat above the misty Idukki valley",
    src: "/gallery/mmr-01.webp",
  },
  {
    id: "g2",
    alt: "Resort buildings with emerald roofs among highland forest",
    src: "/gallery/mmr-02.webp",
  },
  {
    id: "g3",
    alt: "Wide drone view of Mount Misty Retreat and surrounding hills",
    src: "/gallery/mmr-03.webp",
  },
  {
    id: "g4",
    alt: "Morning mist around the retreat hillside",
    src: "/gallery/mmr-04.webp",
  },
  {
    id: "g5",
    alt: "Balcony lounge overlooking forested mountains",
    src: "/gallery/mmr-05.webp",
  },
  {
    id: "g6",
    alt: "Covered verandah seating with hill views",
    src: "/gallery/mmr-06.webp",
  },
  {
    id: "g7",
    alt: "Outdoor lounge with mountain panorama",
    src: "/gallery/mmr-07.webp",
  },
  {
    id: "g8",
    alt: "Aerial view of the retreat, pool, and misty peaks",
    src: "/gallery/mmr-08.webp",
  },
  {
    id: "g9",
    alt: "Resort exterior nestled in lush greenery",
    src: "/gallery/mmr-09.webp",
  },
  {
    id: "g10",
    alt: "Property approach through highland forest",
    src: "/gallery/mmr-10.webp",
  },
  {
    id: "g11",
    alt: "Mount Misty Retreat — photo 11",
    src: "/gallery/mmr-11.webp",
  },
  {
    id: "g12",
    alt: "Deluxe bedroom with balcony and forest views",
    src: "/gallery/mmr-12.webp",
  },
  {
    id: "g13",
    alt: "Mount Misty Retreat — photo 13",
    src: "/gallery/mmr-13.webp",
  },
  {
    id: "g14",
    alt: "Mount Misty Retreat — photo 14",
    src: "/gallery/mmr-14.webp",
  },
  {
    id: "g15",
    alt: "Reception lobby with warm wood and brass accents",
    src: "/gallery/mmr-15.webp",
  },
  {
    id: "g16",
    alt: "Mount Misty Retreat — photo 16",
    src: "/gallery/mmr-16.webp",
  },
  {
    id: "g17",
    alt: "Mount Misty Retreat — photo 17",
    src: "/gallery/mmr-17.webp",
  },
  {
    id: "g18",
    alt: "Mount Misty Retreat — photo 18",
    src: "/gallery/mmr-18.webp",
  },
  {
    id: "g19",
    alt: "Mount Misty Retreat — photo 19",
    src: "/gallery/mmr-19.webp",
  },
  {
    id: "g20",
    alt: "Restaurant dining hall at Mount Misty Retreat",
    src: "/gallery/mmr-20.webp",
  },
  {
    id: "g21",
    alt: "Mount Misty Retreat — photo 21",
    src: "/gallery/mmr-21.webp",
  },
  {
    id: "g22",
    alt: "Mount Misty Retreat — photo 22",
    src: "/gallery/mmr-22.webp",
  },
  {
    id: "g23",
    alt: "Mount Misty Retreat — photo 23",
    src: "/gallery/mmr-23.webp",
  },
  {
    id: "g24",
    alt: "Mount Misty Retreat — photo 24",
    src: "/gallery/mmr-24.webp",
  },
  {
    id: "g25",
    alt: "Mount Misty Retreat — photo 25",
    src: "/gallery/mmr-25.webp",
  },
  {
    id: "g26",
    alt: "Mount Misty Retreat — photo 26",
    src: "/gallery/mmr-26.webp",
  },
  {
    id: "g27",
    alt: "Mount Misty Retreat — photo 27",
    src: "/gallery/mmr-27.webp",
  },
  {
    id: "g28",
    alt: "Mount Misty Retreat — photo 28",
    src: "/gallery/mmr-28.webp",
  },
  {
    id: "g29",
    alt: "Mount Misty Retreat — photo 29",
    src: "/gallery/mmr-29.webp",
  },
  {
    id: "g30",
    alt: "Mount Misty Retreat — photo 30",
    src: "/gallery/mmr-30.webp",
  },
  {
    id: "g31",
    alt: "Mount Misty Retreat — photo 31",
    src: "/gallery/mmr-31.webp",
  },
  {
    id: "g32",
    alt: "Mount Misty Retreat — photo 32",
    src: "/gallery/mmr-32.webp",
  },
  {
    id: "g33",
    alt: "Mount Misty Retreat — photo 33",
    src: "/gallery/mmr-33.webp",
  },
  {
    id: "g34",
    alt: "Mount Misty Retreat — photo 34",
    src: "/gallery/mmr-34.webp",
  },
  {
    id: "g35",
    alt: "Suite bedroom with gold accents and marble floors",
    src: "/gallery/mmr-35.webp",
  },
  {
    id: "g36",
    alt: "Mount Misty Retreat — photo 36",
    src: "/gallery/mmr-36.webp",
  },
  {
    id: "g37",
    alt: "Mount Misty Retreat — photo 37",
    src: "/gallery/mmr-37.webp",
  },
  {
    id: "g38",
    alt: "Mount Misty Retreat — photo 38",
    src: "/gallery/mmr-38.webp",
  },
  {
    id: "g39",
    alt: "Mount Misty Retreat — photo 39",
    src: "/gallery/mmr-39.webp",
  },
  {
    id: "g40",
    alt: "Mount Misty Retreat — photo 40",
    src: "/gallery/mmr-40.webp",
  },
  {
    id: "g41",
    alt: "Mount Misty Retreat — photo 41",
    src: "/gallery/mmr-41.webp",
  },
  {
    id: "g42",
    alt: "Mount Misty Retreat — photo 42",
    src: "/gallery/mmr-42.webp",
  },
  {
    id: "g43",
    alt: "Misty Cottage 2 BHK — aerial view among misty hills",
    src: "/gallery/mmr-43.webp",
  },
  {
    id: "g44",
    alt: "Misty Cottage 2 BHK — dining and living hall",
    src: "/gallery/mmr-44.webp",
  },
  {
    id: "g45",
    alt: "Misty Cottage 2 BHK — living hall toward balcony",
    src: "/gallery/mmr-45.webp",
  },
  {
    id: "g46",
    alt: "Misty Cottage 2 BHK — private balcony with forest view",
    src: "/gallery/mmr-46.webp",
  },
  {
    id: "g47",
    alt: "Misty Cottage 2 BHK — kitchen with green cabinetry",
    src: "/gallery/mmr-47.webp",
  },
  {
    id: "g48",
    alt: "Misty Cottage 2 BHK — kitchen and sink area",
    src: "/gallery/mmr-48.webp",
  },
  {
    id: "g49",
    alt: "Misty Cottage 2 BHK — bedroom with forest views",
    src: "/gallery/mmr-49.webp",
  },
  {
    id: "g50",
    alt: "Misty Cottage 2 BHK — bedroom with TV wall",
    src: "/gallery/mmr-50.webp",
  },
  {
    id: "g51",
    alt: "Misty Cottage 2 BHK — bathroom vanity",
    src: "/gallery/mmr-51.webp",
  },
  {
    id: "g52",
    alt: "Misty Cottage 2 BHK — bedroom with wardrobe",
    src: "/gallery/mmr-52.webp",
  },
  {
    id: "g53",
    alt: "Misty Cottage 2 BHK — bedroom corner with wood accents",
    src: "/gallery/mmr-53.webp",
  },
  {
    id: "g54",
    alt: "Misty Cottage 2 BHK — bathroom with shower",
    src: "/gallery/mmr-54.webp",
  },
  {
    id: "g55",
    alt: "Mount Misty Retreat — photo 55",
    src: "/gallery/mmr-55.webp",
  },
  {
    id: "g56",
    alt: "Mount Misty Retreat — photo 56",
    src: "/gallery/mmr-56.webp",
  },
  {
    id: "g57",
    alt: "Mount Misty Retreat — photo 57",
    src: "/gallery/mmr-57.webp",
  },
  {
    id: "g58",
    alt: "Mount Misty Retreat — photo 58",
    src: "/gallery/mmr-58.webp",
  },
  {
    id: "g59",
    alt: "Mount Misty Retreat — photo 59",
    src: "/gallery/mmr-59.webp",
  },
  {
    id: "g60",
    alt: "Mount Misty Retreat — photo 60",
    src: "/gallery/mmr-60.webp",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "We arrived exhausted and left restored. The ridge pavilion felt like a private world — staff attentive without hovering.",
    name: "Maya R.",
    place: "Singapore",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "Mornings on the verandah, evenings watching mist lift from the valley. Mount Misty understands how to make time slow down.",
    name: "James & Elena K.",
    place: "London",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Forest silence and panoramic light in perfect balance. We are already planning our return for the monsoon.",
    name: "Arjun V.",
    place: "Bengaluru",
    rating: 5,
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

export const heroImage = "/gallery/mmr-01.webp";
