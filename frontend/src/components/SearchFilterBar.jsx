export default function SearchFilterBar({
  search,
  setSearch,
  location,
  setLocation,
  specialization,
  setSpecialization,
  onReset
}) {
  return (
    <div className="glass rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Search by doctor, clinic, qualification..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Filter by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Filter by specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        className="px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={onReset}
        className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
