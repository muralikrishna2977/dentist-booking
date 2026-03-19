export default function DentistCard({ dentist, onBook }) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden transition hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <img
          src={dentist.photo}
          alt={dentist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow">
          {dentist.available ? "Available" : "Unavailable"}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800">{dentist.name}</h3>
        <p className="text-blue-700 font-medium mt-1">{dentist.qualification}</p>
        <p className="text-sm text-slate-500 mt-1">{dentist.specialization}</p>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold">Experience:</span> {dentist.experience} years</p>
          <p><span className="font-semibold">Clinic:</span> {dentist.clinicName}</p>
          <p><span className="font-semibold">Address:</span> {dentist.address}</p>
          <p><span className="font-semibold">Location:</span> {dentist.location}</p>
        </div>

        <button
          onClick={() => onBook(dentist)}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 font-semibold hover:opacity-90 transition"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
