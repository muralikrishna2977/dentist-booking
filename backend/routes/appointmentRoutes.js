import express from "express";
import Appointment from "../models/Appointment.js";
import Dentist from "../models/Dentist.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create appointment
router.post("/", async (req, res) => {
  try {
    const { patientName, age, gender, appointmentDate, dentistId } = req.body;

    if (!patientName || !age || !gender || !appointmentDate || !dentistId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ message: "Appointment date cannot be in the past" });
    }

    const dentist = await Dentist.findById(dentistId);
    if (!dentist) {
      return res.status(404).json({ message: "Dentist not found" });
    }

    const appointment = await Appointment.create({
      patientName,
      age,
      gender,
      appointmentDate,
      dentist: dentistId
    });

    const populatedAppointment = await Appointment.findById(appointment._id).populate("dentist");

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: populatedAppointment
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment" });
  }
});

// Get all appointments
router.get("/", protectAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("dentist")
      .sort({ appointmentDate: 1, createdAt: -1 });

    const formatted = appointments.map((item) => ({
      _id: item._id,
      patientName: item.patientName,
      age: item.age,
      gender: item.gender,
      appointmentDate: item.appointmentDate,
      status: item.status,
      dentistName: item.dentist?.name || "",
      clinicName: item.dentist?.clinicName || ""
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

// Update appointment status
router.patch("/:id/status", protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Booked", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("dentist");

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Appointment status updated",
      appointment: updated
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status" });
  }
});

export default router;
