import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db.js";
import Dentist from "./models/Dentist.js";
import Admin from "./models/Admin.js";

import authRoutes from "./routes/authRoutes.js";
import dentistRoutes from "./routes/dentistRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Dentist Booking API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/dentists", dentistRoutes);
app.use("/api/appointments", appointmentRoutes);

const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword
    });
    console.log("Default admin created");
  }
};

const seedDentists = async () => {
  const count = await Dentist.countDocuments();
  if (count === 0) {
    await Dentist.insertMany([
      {
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
        name: "Dr. Ananya Reddy",
        qualification: "BDS, MDS",
        experience: 8,
        clinicName: "Bright Smile Dental Care",
        address: "Road No. 2, Banjara Hills",
        location: "Hyderabad",
        specialization: "Orthodontist"
      },
      {
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
        name: "Dr. Vikram Sharma",
        qualification: "BDS",
        experience: 5,
        clinicName: "Pearl Dental Studio",
        address: "Madhapur Main Road",
        location: "Hyderabad",
        specialization: "General Dentist"
      },
      {
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
        name: "Dr. Neha Kapoor",
        qualification: "BDS, MDS",
        experience: 10,
        clinicName: "WhiteCare Clinic",
        address: "Sector 21",
        location: "Delhi",
        specialization: "Cosmetic Dentist"
      },
      {
        photo: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f",
        name: "Dr. Rahul Verma",
        qualification: "BDS",
        experience: 6,
        clinicName: "Family Dental Hub",
        address: "Kukatpally",
        location: "Hyderabad",
        specialization: "Pediatric Dentist"
      },
      {
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
        name: "Dr. Sneha Iyer",
        qualification: "BDS, MDS",
        experience: 12,
        clinicName: "Elite Dental Center",
        address: "Anna Nagar",
        location: "Chennai",
        specialization: "Endodontist"
      },
      {
        photo: "https://images.unsplash.com/photo-1584515933487-779824d29309",
        name: "Dr. Arjun Mehta",
        qualification: "BDS",
        experience: 7,
        clinicName: "Smile Craft Clinic",
        address: "HSR Layout",
        location: "Bengaluru",
        specialization: "General Dentist"
      }
    ]);
    console.log("Dentists seeded");
  }
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await seedAdmin();
  await seedDentists();
  console.log(`Server running on port ${PORT}`);
});
