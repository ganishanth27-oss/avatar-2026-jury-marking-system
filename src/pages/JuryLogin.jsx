import { useState } from "react";
import { supabase } from "../supabase";
import { events } from "../components/events";
import { useNavigate } from "react-router-dom";

import neitLogo from "../assets/neit-logo.png";
import avatarLogo from "../assets/avatar-logo.png";

function JuryLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [event, setEvent] = useState("");

  const [loading, setLoading] = useState(false);

  async function login() {
    if (!username || !password || !event) {
      alert("Fill all details");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("juries")
      .select("*")
      .eq("username", username);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      alert("Username not found");
      setLoading(false);
      return;
    }

    const jury = data[0];

    if (jury.password !== password) {
      alert("Wrong Password");
      setLoading(false);
      return;
    }

    if (jury.event !== event) {
      alert(
        `Wrong Event. This jury is assigned to "${jury.event}".`
      );
      setLoading(false);
      return;
    }

    // Update live status
    const { error: statusError } = await supabase
      .from("juries")
      .update({
        current_status: "Logged In",
      })
      .eq("id", jury.id);

    if (statusError) {
      console.error("Status update error:", statusError);
    }

    // Save jury information
    const updatedJury = {
      ...jury,
      current_status: "Logged In",
    };

    localStorage.setItem(
      "jury",
      JSON.stringify(updatedJury)
    );

    alert("Login Successful");

    navigate("/jury/dashboard");

    setLoading(false);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4">

      {/* Background Glow - Left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>

      {/* Background Glow - Right */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl">

        {/* ================= TOP HEADER ================= */}
        <div className="relative min-h-[150px] flex items-center justify-center">

          {/* NEIT LOGO - LEFT */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">
              <img
                src={neitLogo}
                alt="NEIT Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* CENTER TITLE */}
          <div className="text-center px-32">

            <p className="text-sm md:text-lg font-semibold tracking-[0.18em] text-gray-300">
              NEHRU INSTITUTE OF ENGINEERING AND TECHNOLOGY
            </p>

            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-wide text-white">
              NEHRU GRAND KACHERI
            </h1>

            <p className="mt-3 text-lg md:text-2xl font-bold tracking-[0.35em] text-green-400">
              AVATAR 2026
            </p>

          </div>

          {/* AVATAR LOGO - RIGHT */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">
              <img
                src={avatarLogo}
                alt="AVATAR Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>

        {/* ================= LOGIN CARD ================= */}
        <div className="flex justify-center mt-8">

          <div className="w-full max-w-md">

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-10">

              {/* Login Heading */}
              <div className="text-center mb-8">

                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-green-500/20 border border-green-400/30 flex items-center justify-center">
                  <span className="text-2xl">
                    ⚖️
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-white">
                  Jury Login
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Enter your credentials to continue
                </p>

              </div>

              {/* Username */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>

                <input
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

              </div>

              {/* Password */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>

                <input
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              {/* Event */}
              <div className="mb-7">

                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Event
                </label>

                <select
                  className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                >

                  <option
                    value=""
                    className="text-slate-900"
                  >
                    Select Event
                  </option>

                  {events.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="text-slate-900"
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* Login Button */}
              <button
                className="w-full p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg shadow-green-900/30 transition duration-200 hover:from-green-400 hover:to-emerald-500 hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={login}
                disabled={loading}
              >
                {loading ? "Checking..." : "Login"}
              </button>

              {/* Bottom Text */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Authorized Jury Members Only
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default JuryLogin;