import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["Booked", "Completed", "Cancelled"],
      default: "Booked"
    },
    dentist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentist",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
