import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] relative">

      {/* ================= BACKGROUND GLOW ================= */}

      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 py-8">


        {/* ================= HEADER ================= */}

        <div className="relative w-full max-w-[1250px] flex items-center justify-center min-h-[150px] mb-8">


          {/* ===== NEIT LOGO LEFT ===== */}

          <div className="absolute left-0 top-1/2 -translate-y-1/2">

            <div className="w-[100px] h-[100px] md:w-[125px] md:h-[125px] bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">

              <img
                src="/neit-logo.png"
                alt="NEIT Logo"
                className="w-full h-full object-contain"
              />

            </div>

          </div>


          {/* ===== CENTER TITLE ===== */}

          <div className="text-center px-28 md:px-40">

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

            <div className="w-[100px] h-[100px] md:w-[125px] md:h-[125px] bg-white rounded-2xl p-3 shadow-2xl flex items-center justify-center">

              <img
                src="/avatar-logo.png"
                alt="AVATAR 2026 Logo"
                className="w-full h-full object-contain"
              />

            </div>

          </div>

        </div>


        {/* ================= WELCOME CARD ================= */}

        <div className="w-full max-w-[520px]">

          <div className="bg-[#1b1e2d]/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-8 py-9 md:px-12 md:py-10">


            {/* ===== ICON ===== */}

            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shadow-lg">

                <span className="text-3xl">
                  🏆
                </span>

              </div>

            </div>


            {/* ===== TITLE ===== */}

            <div className="text-center mb-8">

              <h2 className="text-3xl md:text-4xl font-bold text-white">

                Jury Marking System

              </h2>

              <p className="mt-2 text-gray-400 text-base">

                Digital Evaluation & Result Management Platform

              </p>

            </div>


            {/* ================= ADMIN BUTTON ================= */}

            <button
              className="w-full h-16 rounded-xl mb-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white text-lg font-bold shadow-lg shadow-emerald-900/30 transition duration-200"
              onClick={() => navigate("/admin")}
            >

              🛡️ &nbsp; Admin Login

            </button>


            {/* ================= JURY LOGIN ================= */}

            <button
              className="w-full h-16 rounded-xl mb-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-lg font-bold shadow-lg shadow-green-900/30 transition duration-200"
              onClick={() => navigate("/jury/login")}
            >

              ⚖️ &nbsp; Jury Login

            </button>


            {/* ================= FOOTER ================= */}

            <p className="text-center text-gray-500 text-xs mt-7">

              AVATAR 2026 • Digital Jury Evaluation Portal

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;