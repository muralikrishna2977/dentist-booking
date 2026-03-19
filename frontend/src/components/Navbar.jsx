import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          OroGlee Dental
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full transition ${
              location.pathname === "/"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            Home
          </Link>

          {!token ? (
            <Link
              to="/admin-login"
              className={`px-4 py-2 rounded-full transition ${
                location.pathname === "/admin-login"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }`}
            >
              Admin
            </Link>
          ) : (
            <>
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-full transition ${
                  location.pathname === "/admin"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200"
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
