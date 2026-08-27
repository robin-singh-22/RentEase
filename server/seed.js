const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Listing = require("./models/Listing");
const User = require("./models/User");

dotenv.config();

const mongoUri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/rentease";

const sampleListings = [
  {
    category: "Islands",
    type: "An entire place",
    streetAddress: "10 Ocean Breeze Boulevard",
    aptSuite: "Villa 3",
    city: "Bora Bora",
    province: "Leeward Islands",
    country: "French Polynesia",
    guestCount: 4,
    bedroomCount: 2,
    bedCount: 2,
    bathroomCount: 2,
    amenities: ["Wifi,TV,Free parking,Air conditioning,Garden,Bath tub,Outdoor shower"],
    listingPhotoPaths: ["public/uploads/island_cat.webp", "public/uploads/1.jpg", "public/uploads/2.jpg"],
    title: "Overwater Coral Bungalow with Lagoon Access",
    description: "Wake up to crystalline turquoise waters and vibrant marine life right beneath your private sundeck in paradise.",
    highlight: "Private Lagoon Access",
    highlightDesc: "Direct stairs to the pristine coral reef lagoon and complimentary sea kayaks.",
    price: 450,
  },
  {
    category: "Islands",
    type: "An entire place",
    streetAddress: "42 Palm Haven Way",
    aptSuite: "Suite A",
    city: "Santorini",
    province: "Cyclades",
    country: "Greece",
    guestCount: 3,
    bedroomCount: 1,
    bedCount: 2,
    bathroomCount: 1,
    amenities: ["Wifi,Air conditioning,Garden,Microwave,Stove,TV,Outdoor dining area"],
    listingPhotoPaths: ["public/uploads/island_cat.webp", "public/uploads/3.jpg", "public/uploads/4.jpg"],
    title: "Whitewashed Cliffside Villa with Caldera Sunset Views",
    description: "Experience the magic of Santorini from this handcrafted cliffside cave home overlooking the Aegean Sea.",
    highlight: "Spectacular Caldera Views",
    highlightDesc: "Unobstructed sunset panoramas from your private hot tub balcony.",
    price: 320,
  },
  {
    category: "Beachfront",
    type: "An entire place",
    streetAddress: "101 Pacific Coast Highway",
    aptSuite: "Penthouse 4B",
    city: "Malibu",
    province: "California",
    country: "United States",
    guestCount: 6,
    bedroomCount: 3,
    bedCount: 3,
    bathroomCount: 3,
    amenities: ["Wifi,TV,Kitchen,Free parking,Air conditioning,Barbecue grill,Outdoor dining area"],
    listingPhotoPaths: ["public/uploads/beach_cat.jpg", "public/uploads/one.jpg", "public/uploads/two.jpg"],
    title: "Modern Malibu Coastal Retreat on Carbon Beach",
    description: "Step straight onto the golden sand. Floor-to-ceiling glass doors open to expansive oceanfront decks.",
    highlight: "Direct Beachfront Access",
    highlightDesc: "Private stairs directly onto Billionaire's Beach with surfboards and beach chairs included.",
    price: 580,
  },
  {
    category: "Amazing Pools",
    type: "An entire place",
    streetAddress: "77 Palm Oasis Drive",
    aptSuite: "Estate 1",
    city: "Palm Springs",
    province: "California",
    country: "United States",
    guestCount: 8,
    bedroomCount: 4,
    bedCount: 5,
    bathroomCount: 3,
    amenities: ["Wifi,TV,Kitchen,Free parking,Air conditioning,Barbecue grill,Garden,Camp fire"],
    listingPhotoPaths: ["public/uploads/pool_cat.jpg", "public/uploads/three.jpg", "public/uploads/four.jpg"],
    title: "Mid-Century Oasis with Heated Saltwater Infinity Pool",
    description: "Architectural masterpiece designed for indoor-outdoor desert living featuring an illuminated night pool and fire pit.",
    highlight: "Heated Resort-Style Pool",
    highlightDesc: "Includes integrated spa, baja shelf, outdoor bar, and custom sound system.",
    price: 490,
  },
  {
    category: "Iconic cities",
    type: "An entire place",
    streetAddress: "220 Avenue des Champs-Élysées",
    aptSuite: "Apt 501",
    city: "Paris",
    province: "Île-de-France",
    country: "France",
    guestCount: 2,
    bedroomCount: 1,
    bedCount: 1,
    bathroomCount: 1,
    amenities: ["Wifi,TV,Kitchen,Dedicated workspace,Air conditioning,Microwave,Stove"],
    listingPhotoPaths: ["public/uploads/modern_cat.webp", "public/uploads/5.jpg", "public/uploads/6.jpg"],
    title: "Elegant Parisian Loft Overlooking the Eiffel Tower",
    description: "Charming Haussmannian apartment featuring chevron hardwood floors, marble fireplace, and balcony with Eiffel views.",
    highlight: "Heart of the City",
    highlightDesc: "Walking distance to world-class dining, fashion boutiques, and the Seine.",
    price: 290,
  },
  {
    category: "Windmills",
    type: "An entire place",
    streetAddress: "12 Windmill Canal Road",
    aptSuite: "Mill 1",
    city: "Zaanse Schans",
    province: "North Holland",
    country: "Netherlands",
    guestCount: 4,
    bedroomCount: 2,
    bedCount: 2,
    bathroomCount: 1,
    amenities: ["Wifi,TV,Kitchen,Free parking,Garden,Microwave,Stove"],
    listingPhotoPaths: ["public/uploads/windmill_cat.webp", "public/uploads/windmills_1.jpg", "public/uploads/windmills_2.jpg"],
    title: "Historic 18th Century Working Windmill on the Canal",
    description: "Stay in an authentic Dutch windmill beautifully converted into a luxurious and cozy holiday residence.",
    highlight: "Authentic Heritage",
    highlightDesc: "Original wooden gears, scenic canal views, and complimentary bicycles.",
    price: 260,
  },
  {
    category: "Countryside",
    type: "An entire place",
    streetAddress: "88 Hillside Meadow Lane",
    aptSuite: "Cottage",
    city: "Cotswolds",
    province: "Gloucestershire",
    country: "United Kingdom",
    guestCount: 5,
    bedroomCount: 2,
    bedCount: 3,
    bathroomCount: 2,
    amenities: ["Wifi,TV,Kitchen,Free parking,Garden,Camp fire,Dedicated workspace"],
    listingPhotoPaths: ["public/uploads/countryside_cat.webp", "public/uploads/7.jpg", "public/uploads/8.jpg"],
    title: "Charming Stone Cottage Surrounded by Rolling Green Hills",
    description: "Tranquil retreat with English cottage gardens, wood-burning stove, and picturesque walking trails at your doorstep.",
    highlight: "Peaceful Country Living",
    highlightDesc: "Panoramic green pasture views and fresh local farm breakfast basket provided.",
    price: 210,
  },
  {
    category: "Lakefront",
    type: "An entire place",
    streetAddress: "5 Lakeview Terrace",
    aptSuite: "Cabin A",
    city: "Lake Tahoe",
    province: "Nevada",
    country: "United States",
    guestCount: 6,
    bedroomCount: 3,
    bedCount: 4,
    bathroomCount: 2,
    amenities: ["Wifi,TV,Kitchen,Free parking,Garden,Camp fire,Barbecue grill"],
    listingPhotoPaths: ["public/uploads/lake_cat.webp", "public/uploads/1.jpg", "public/uploads/3.jpg"],
    title: "Rustic Luxury Timber Lodge with Private Boat Dock",
    description: "Nestled among towering pines with glass panoramic frontage opening directly to crystal Lake Tahoe.",
    highlight: "Private Dock & Kayaks",
    highlightDesc: "Includes two paddleboards, outdoor fire pit, and cedar hot tub overlooking the lake.",
    price: 380,
  },
  {
    category: "Castles",
    type: "An entire place",
    streetAddress: "1 Royal Highlands Gate",
    aptSuite: "Tower Wing",
    city: "Edinburgh",
    province: "Highlands",
    country: "United Kingdom",
    guestCount: 10,
    bedroomCount: 5,
    bedCount: 6,
    bathroomCount: 4,
    amenities: ["Wifi,TV,Kitchen,Free parking,Garden,Dedicated workspace,Bath tub"],
    listingPhotoPaths: ["public/uploads/castle_cat.webp", "public/uploads/lux_cat.jpg", "public/uploads/two.jpg"],
    title: "16th-Century Scottish Castle Tower & Private Grounds",
    description: "Live like royalty in a historic stone fortress complete with great hall, grand fireplaces, and lush gardens.",
    highlight: "Historic Royal Estate",
    highlightDesc: "Over 50 acres of private forest, secret stone spiral staircases, and antique library.",
    price: 750,
  },
  {
    category: "Camping",
    type: "An entire place",
    streetAddress: "Route 66 Pine Canyon",
    aptSuite: "Tent 4",
    city: "Moab",
    province: "Utah",
    country: "United States",
    guestCount: 2,
    bedroomCount: 1,
    bedCount: 1,
    bathroomCount: 1,
    amenities: ["Camp fire,Barbecue grill,Outdoor dining area,Free parking,First aid kit"],
    listingPhotoPaths: ["public/uploads/camping_cat.jpg", "public/uploads/four.jpg", "public/uploads/7.jpg"],
    title: "Luxury Glamping Safari Dome under Dark Starlit Skies",
    description: "Experience ultra-cozy desert glamping with plush king bed, wood stove, and unobstructed stargazing skylight.",
    highlight: "Unmatched Stargazing",
    highlightDesc: "Designated International Dark Sky Park with telescope and fire pit wood provided.",
    price: 180,
  },
];

async function seed() {
  try {
    await mongoose.connect(mongoUri, { dbName: "rentease" });
    console.log("Connected to MongoDB for seeding.");

    let user = await User.findOne();
    if (!user) {
      console.log("Creating default host user...");
      user = new User({
        firstName: "RentEase",
        lastName: "Host",
        email: "host@rentease.com",
        password: "hashedpassword123",
        profileImagePath: "public/uploads/Screenshot 2024-11-16 170540.png",
      });
      await user.save();
    }

    const count = await Listing.countDocuments();
    if (count > 0) {
      console.log(`Found ${count} existing listings. Clearing and re-seeding fresh data...`);
      await Listing.deleteMany({});
    }

    const listingsWithCreator = sampleListings.map((item) => ({
      ...item,
      creator: user._id,
    }));

    await Listing.insertMany(listingsWithCreator);
    console.log(`Successfully seeded ${sampleListings.length} listings!`);
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
