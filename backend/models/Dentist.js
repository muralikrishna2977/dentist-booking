import mongoose from "mongoose";

const dentistSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    qualification: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true,
      min: 0
    },
    clinicName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
      index: true
    },
    specialization: {
      type: String,
      default: "General Dentist"
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Dentist", dentistSchema);
