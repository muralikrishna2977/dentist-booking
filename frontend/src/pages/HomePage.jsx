import { useEffect, useState } from "react";
import { api } from "../api/api";
import DentistCard from "../components/DentistCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import BookingModal from "../components/BookingModal";
import Pagination from "../components/Pagination";
import SearchFilterBar from "../components/SearchFilterBar";

export default function HomePage() {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1
  });

  const fetchDentists = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.getDentists({
        search,
        location,
        specialization,
        page,
        limit: 6
      });

      setDentists(data.dentists);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDentists();
  }, [search, location, specialization, page]);

  const handleReset = () => {
    setSearch("");
    setLocation("");
    setSpecialization("");
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
          Book Your Dentist Appointment <span className="text-blue-600">Easily</span>
        </h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Find experienced dentists, compare clinics, and schedule appointments in a smooth and interactive way.
        </p>
      </section>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        location={location}
        setLocation={setLocation}
        specialization={specialization}
        setSpecialization={setSpecialization}
        onReset={handleReset}
      />

      <div className="mt-8">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && dentists.length === 0 && (
          <div className="text-center bg-white rounded-2xl p-10 shadow">
            No dentists found for current filters.
          </div>
        )}

        {!loading && !error && dentists.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dentists.map((dentist) => (
                <DentistCard
                  key={dentist._id}
                  dentist={dentist}
                  onBook={setSelectedDentist}
                />
              ))}
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {selectedDentist && (
        <BookingModal
          dentist={selectedDentist}
          onClose={() => setSelectedDentist(null)}
          onSuccess={() => {}}
        />
      )}
    </main>
  );
}
