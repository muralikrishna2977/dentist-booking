import { useState } from "react";
import { api } from "../api/api";

export default function BookingModal({ dentist, onClose, onSuccess }) {
  const [form, setForm] = useState({
    patientName: "",
    age: "",
    gender: "",
    appointmentDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validate = () => {
    if (!form.patientName.trim()) return "Patient name is required";
    if (!form.age || Number(form.age) < 1 || Number(form.age) > 120) return "Enter valid age";
    if (!form.gender) return "Select gender";
    if (!form.appointmentDate) return "Select appointment date";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.bookAppointment({
        ...form,
        age: Number(form.age),
        dentistId: dentist._id
      });

      setSuccessMsg(response.message);
      onSuccess();
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 relative animate-[fadeIn_.2s_ease-in-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-slate-800">Book Appointment</h2>
        <p className="text-slate-500 mt-1">
          With <span className="font-semibold">{dentist.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            name="appointmentDate"
            min={minDate}
            value={form.appointmentDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {error && (
            <div className="rounded-xl bg-red-100 text-red-700 px-4 py-3">{error}</div>
          )}

          {successMsg && (
            <div className="rounded-xl bg-emerald-100 text-emerald-700 px-4 py-3">
              {successMsg}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
