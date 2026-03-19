export default function StatusBadge({ status }) {
  const styles = {
    Booked: "bg-yellow-100 text-yellow-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}
