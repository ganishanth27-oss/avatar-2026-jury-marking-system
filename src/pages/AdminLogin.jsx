import { useState } from "react";
import { useNavigate } from "react-router-dom";

import neitLogo from "../assets/neit-logo.png";
import avatarLogo from "../assets/avatar-logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "admin",
        "true"
      );

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } else {
      alert("Wrong Admin Username or Password");
    }
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-[#020617] relative">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-5 py-7">


        {/* ================= HEADER ================= */}

        <div className="relative flex items-center justify-center min-h-[145px]">


          {/* ===== NEIT LOGO LEFT ===== */}

          <div className="absolute left-0 top-1/2 -translate-y-1/2">

            <div className="w-[105px] h-[105px] md:w-[125px] md:h-[125px] bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">

              <img
                src={neitLogo}
                alt="NEIT Logo"
                className="w-full h-full object-contain"
              />

            </div>

          </div>


          {/* ===== CENTER TITLE ===== */}

          <div className="text-center px-32 md:px-40">

            <h2 className="text-sm sm:text-lg md:text-xl font-semibold tracking-[0.18em] text-white uppercase">

              NEHRU INSTITUTE OF ENGINEERING AND TECHNOLOGY

            </h2>


            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-white">

              NEHRU GRAND KACHERI

            </h1>


            <p className="mt-3 text-lg sm:text-xl md:text-2xl font-bold tracking-[0.35em] text-emerald-400">

              AVATAR 2026

            </p>

          </div>


          {/* ===== AVATAR LOGO RIGHT ===== */}

          <div className="absolute right-0 top-1/2 -translate-y-1/2">

            <div className="w-[105px] h-[105px] md:w-[125px] md:h-[125px] bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">

              <img
                src={avatarLogo}
                alt="AVATAR Logo"
                className="w-full h-full object-contain"
              />

            </div>

          </div>

        </div>


        {/* ================= ADMIN LOGIN ================= */}

        <div className="flex justify-center mt-7">


          <div className="w-full max-w-[520px]">


            {/* LOGIN CARD */}

            <div className="bg-[#1b1e2d]/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-8 py-9 md:px-12 md:py-10">


              {/* ===== ICON ===== */}

              <div className="flex justify-center mb-5">

                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shadow-lg">

                  <span className="text-3xl">
                    🛡️
                  </span>

                </div>

              </div>


              {/* ===== TITLE ===== */}

              <div className="text-center mb-8">

                <h2 className="text-3xl md:text-4xl font-bold text-white">

                  Admin Login

                </h2>

                <p className="mt-2 text-gray-400 text-base">

                  Enter administrator credentials to continue

                </p>

              </div>


              {/* ================= USERNAME ================= */}

              <div className="mb-5">

                <label className="block text-white text-base font-medium mb-2">

                  Username

                </label>

                <input
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="w-full h-16 px-5 rounded-xl bg-[#353847] border border-gray-500/60 text-white text-lg placeholder-gray-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                />

              </div>


              {/* ================= PASSWORD ================= */}

              <div className="mb-8">

                <label className="block text-white text-base font-medium mb-2">

                  Password

                </label>

                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full h-16 px-5 rounded-xl bg-[#353847] border border-gray-500/60 text-white text-lg placeholder-gray-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                />

              </div>


              {/* ================= LOGIN BUTTON ================= */}

              <button
                className="w-full h-16 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white text-xl font-bold shadow-lg shadow-emerald-900/30 transition duration-200"
                onClick={login}
              >

                Login

              </button>


              {/* ================= FOOTER ================= */}

              <p className="text-center text-gray-500 text-xs mt-6">

                Authorized Administrators Only

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;