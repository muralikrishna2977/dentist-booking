export default function ErrorMessage({ message }) {
  return (
    <div className="rounded-xl bg-red-100 text-red-700 px-4 py-3 border border-red-200">
      {message}
    </div>
  );
}
