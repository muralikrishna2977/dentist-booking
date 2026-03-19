import express from "express";
import Dentist from "../models/Dentist.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all dentists with search/filter/pagination
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      location = "",
      specialization = "",
      page = 1,
      limit = 6
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { clinicName: { $regex: search, $options: "i" } },
        { qualification: { $regex: search, $options: "i" } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (specialization) {
      query.specialization = { $regex: specialization, $options: "i" };
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const total = await Dentist.countDocuments(query);
    const dentists = await Dentist.find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.json({
      dentists,
      total,
      currentPage,
      totalPages: Math.ceil(total / perPage)
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dentists" });
  }
});

// POST add dentist
router.post("/", protectAdmin, async (req, res) => {
  try {
    const dentist = await Dentist.create(req.body);
    res.status(201).json({
      message: "Dentist added successfully",
      dentist
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add dentist",
      error: error.message
    });
  }
});

export default router;
