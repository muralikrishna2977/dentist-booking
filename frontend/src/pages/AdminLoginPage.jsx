import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "admin@oroglee.com",
    password: "admin123"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await api.adminLogin(form);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800">Admin Login</h2>
        <p className="text-center text-slate-500 mt-2">Access appointments dashboard</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Admin Email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {error && (
            <div className="rounded-xl bg-red-100 text-red-700 px-4 py-3">{error}</div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
