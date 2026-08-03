const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// listing api routes
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes=require("./routes/user.js")

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users",userRoutes);


// Set up routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("RentEase Backend API is running!");
});

// MongoDB setup
const PORT = process.env.PORT || 3001;
const primaryMongoUri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/rentease";
const fallbackMongoUri = "mongodb://127.0.0.1:27017/rentease";

async function connectDB() {
  try {
    console.log(`Connecting to MongoDB at: ${primaryMongoUri}`);
    await mongoose.connect(primaryMongoUri, {
      dbName: "rentease",
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.warn(`Primary MongoDB connection failed: ${err.message}`);
    if (primaryMongoUri !== fallbackMongoUri) {
      console.log(`Attempting fallback to local MongoDB: ${fallbackMongoUri}...`);
      try {
        await mongoose.connect(fallbackMongoUri, {
          dbName: "rentease",
          serverSelectionTimeoutMS: 5000,
        });
        console.log("Connected to local fallback MongoDB successfully!");
      } catch (fallbackErr) {
        console.error("Local fallback MongoDB connection also failed:", fallbackErr.message);
      }
    }
  }
}

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});