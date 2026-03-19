import { useEffect, useState } from "react";
import { api } from "../api/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import StatusBadge from "../components/StatusBadge";

export default function AdminDashboard() {
  const token = localStorage.getItem("adminToken");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.getAppointments(token);
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.updateAppointmentStatus(id, status, token);
      setAppointments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Appointments Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage all booked appointments</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
            Total: {appointments.length}
          </div>
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && appointments.length === 0 && (
          <div className="text-center py-10 text-slate-500">No appointments found.</div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="px-4">Patient Name</th>
                  <th className="px-4">Age</th>
                  <th className="px-4">Gender</th>
                  <th className="px-4">Appointment Date</th>
                  <th className="px-4">Dentist</th>
                  <th className="px-4">Clinic</th>
                  <th className="px-4">Status</th>
                  <th className="px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item._id} className="bg-slate-50 shadow-sm rounded-2xl">
                    <td className="px-4 py-4 font-medium">{item.patientName}</td>
                    <td className="px-4 py-4">{item.age}</td>
                    <td className="px-4 py-4">{item.gender}</td>
                    <td className="px-4 py-4">
                      {new Date(item.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">{item.dentistName}</td>
                    <td className="px-4 py-4">{item.clinicName}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        className="px-3 py-2 rounded-lg border border-slate-200 outline-none"
                      >
                        <option value="Booked">Booked</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
