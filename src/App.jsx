import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddJury from "./pages/AddJury";
import EventDashboard from "./pages/EventDashboard";
import JuryLogin from "./pages/JuryLogin";
import JuryDashboard from "./pages/JuryDashboard";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow p-10 text-center">

        <h1 className="text-5xl font-bold text-gray-800">
          404
        </h1>

        <p className="text-gray-600 mt-3">
          Page Not Found
        </p>

        <button
          onClick={() => {
            window.location.href =
              "/admin/dashboard";
          }}
          className="
            mt-6
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-semibold
          "
        >
          Go to Admin Dashboard
        </button>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        {/* ADD JURY */}
        <Route
          path="/admin/add-jury"
          element={<AddJury />}
        />

        {/* EVENT DASHBOARD */}
        <Route
          path="/admin/event/:eventName"
          element={<EventDashboard />}
        />

        {/* JURY LOGIN */}
        <Route
          path="/jury/login"
          element={<JuryLogin />}
        />

        {/* JURY DASHBOARD */}
        <Route
          path="/jury/dashboard"
          element={<JuryDashboard />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;