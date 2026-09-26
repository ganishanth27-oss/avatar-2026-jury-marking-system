import { useEffect, useState } from "react";
import { supabase } from "../supabase";

// =====================================================
// 35 EVENTS
// =====================================================

const EVENTS = [
    "Pencil Sketch",
  "Photography",
  "Bridal Makeup",
  "Mehendi",
  "Chill Chef",
  "Freeze Dance",
  "Wealth Out of Waste",
  "Reels Challenge",
  "Solo Song",
  "Solo Dance",
  "Group Dance",
  "Instrumental Music",
  "Mime",
  "Group Song",
  "Variety Performance",
  "Fashion Parade",
  "Mr. & Ms. Avatar",
];

// =====================================================
// ADMIN DASHBOARD
// =====================================================

function AdminDashboard() {
  const [juries, setJuries] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===================================================
  // LOAD JURIES
  // ===================================================

  useEffect(() => {
    loadJuries();

    const juryChannel = supabase
      .channel("admin_juries_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "juries",
        },
        () => {
          loadJuries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(juryChannel);
    };
  }, []);

  // ===================================================
  // GET ALL JURIES
  // ===================================================

  async function loadJuries() {
    setLoading(true);

    const { data, error } = await supabase
      .from("juries")
      .select("*");

    if (error) {
      console.error(
        "Failed to load juries:",
        error.message
      );

      setJuries([]);
    } else {
      setJuries(data || []);
    }

    setLoading(false);
  }

  // ===================================================
  // OPEN EVENT DASHBOARD
  // ===================================================

  function openEvent(event) {
    const encodedEvent =
      encodeURIComponent(event);

    window.location.href =
      `/admin/event/${encodedEvent}`;
  }

  // ===================================================
  // ADD JURY
  // ===================================================

  function openAddJury() {
    window.location.href =
      "/admin/add-jury";
  }

  // ===================================================
  // LOGOUT
  // ===================================================

  function logout() {
    const confirmed =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmed) {
      return;
    }

    window.location.href = "/admin";
  }

  // ===================================================
  // TOTAL JURIES FOR EVENT
  // ===================================================

  function getEventJuryCount(event) {
    return juries.filter(
      (jury) => jury.event === event
    ).length;
  }

  // ===================================================
  // ONLINE JURIES FOR EVENT
  // ===================================================

  function getOnlineJuryCount(event) {
    return juries.filter(
      (jury) =>
        jury.event === event &&
        jury.current_status === "Online"
    ).length;
  }

  // ===================================================
  // TOTAL ONLINE JURIES
  // ===================================================

  const onlineJuries =
    juries.filter(
      (jury) =>
        jury.current_status === "Online"
    );

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 text-white relative overflow-hidden">

      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-xl">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* TITLE */}

            <div>

              <p className="text-green-300 text-sm font-semibold tracking-[0.25em] uppercase">
                Nehru Grand Kacheri
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
                Admin Dashboard
              </h1>

              <p className="text-gray-300 mt-2">
                Jury Marking Management System
              </p>

            </div>

            {/* HEADER BUTTONS */}

            <div className="flex flex-wrap gap-3">

              {/* REFRESH */}

              <button
                onClick={loadJuries}
                disabled={loading}
                className="
                  bg-blue-600
                  hover:bg-blue-500
                  disabled:bg-blue-300
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  hover:shadow-blue-500/30
                  transition-all
                "
              >
                {loading
                  ? "Refreshing..."
                  : "↻ Refresh"}
              </button>

              {/* ADD JURY */}

              <button
                onClick={openAddJury}
                className="
                  bg-green-600
                  hover:bg-green-500
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  hover:shadow-green-500/30
                  transition-all
                "
              >
                + Add Jury
              </button>

              {/* LOGOUT */}

              <button
                onClick={logout}
                className="
                  bg-red-600
                  hover:bg-red-500
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  hover:shadow-red-500/30
                  transition-all
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* ================================================= */}
        {/* WELCOME */}
        {/* ================================================= */}

        <div className="mb-8">

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Competition Control Center
          </h2>

          <p className="text-gray-300 mt-2">
            Monitor events, juries and their current activity.
          </p>

        </div>

        {/* ================================================= */}
        {/* STATISTICS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          {/* TOTAL EVENTS */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-2xl
            p-6
            hover:bg-white/15
            transition-all
          ">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-300 font-medium">
                  Total Events
                </p>

                <h2 className="text-4xl font-bold text-blue-400 mt-2">
                  {EVENTS.length}
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  Available competitions
                </p>

              </div>

              <div className="
                bg-blue-500/20
                text-blue-300
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                text-2xl
                font-bold
              ">
                E
              </div>

            </div>

          </div>

          {/* TOTAL JURIES */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-2xl
            p-6
            hover:bg-white/15
            transition-all
          ">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-300 font-medium">
                  Registered Juries
                </p>

                <h2 className="text-4xl font-bold text-green-400 mt-2">
                  {juries.length}
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  Total jury accounts
                </p>

              </div>

              <div className="
                bg-green-500/20
                text-green-300
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                text-2xl
                font-bold
              ">
                J
              </div>

            </div>

          </div>

          {/* ONLINE JURIES */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-2xl
            p-6
            hover:bg-white/15
            transition-all
          ">

            <div className="flex justify-between items-start">

              <div>

                <p className="text-gray-300 font-medium">
                  Online Juries
                </p>

                <h2 className="text-4xl font-bold text-purple-400 mt-2">
                  {onlineJuries.length}
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  Currently active
                </p>

              </div>

              <div className="
                bg-purple-500/20
                text-purple-300
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                text-2xl
              ">
                ●
              </div>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* EVENTS SECTION */}
        {/* ================================================= */}

        <section className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          shadow-2xl
          p-6
        ">

          {/* SECTION HEADER */}

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-3
            mb-6
          ">

            <div>

              <h2 className="text-2xl font-bold text-white">
                Events
              </h2>

              <p className="text-gray-300 mt-1">
                Select an event to manage its juries and results
              </p>

            </div>

            <div className="
              bg-green-500/20
              border
              border-green-400/20
              text-green-300
              px-4
              py-2
              rounded-xl
              font-semibold
              text-sm
            ">
              {EVENTS.length} Events
            </div>

          </div>

          {/* ================================================= */}
          {/* EVENT GRID */}
          {/* ================================================= */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
          ">

            {EVENTS.map(
              (event, index) => {

                const juryCount =
                  getEventJuryCount(event);

                const onlineCount =
                  getOnlineJuryCount(event);

                return (

                  <button
                    key={event}
                    type="button"
                    onClick={() =>
                      openEvent(event)
                    }
                    className="
                      group
                      text-left
                      bg-white/10
                      backdrop-blur-lg
                      border-2
                      border-white/10
                      hover:border-green-400
                      hover:bg-white/20
                      hover:shadow-2xl
                      rounded-2xl
                      p-5
                      transition-all
                      duration-300
                      cursor-pointer
                      focus:outline-none
                      focus:ring-2
                      focus:ring-green-400
                    "
                  >

                    {/* EVENT NUMBER */}

                    <div className="flex justify-between items-center">

                      <span className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-gray-400
                      ">
                        Event {index + 1}
                      </span>

                      <span className="
                        text-green-400
                        text-2xl
                        font-bold
                        group-hover:translate-x-1
                        transition-transform
                      ">
                        →
                      </span>

                    </div>

                    {/* EVENT NAME */}

                    <h3 className="
                      text-lg
                      font-bold
                      text-white
                      mt-3
                      group-hover:text-green-300
                    ">
                      {event}
                    </h3>

                    {/* JURY COUNT */}

                    <div className="flex flex-wrap gap-3 mt-4">

                      <span className="
                        bg-white/10
                        border
                        border-white/10
                        text-gray-300
                        px-3
                        py-1.5
                        rounded-lg
                        text-sm
                      ">

                        Juries:{" "}

                        <strong className="text-white">
                          {juryCount}
                        </strong>

                      </span>

                      <span className="
                        bg-green-500/10
                        border
                        border-green-400/20
                        text-green-300
                        px-3
                        py-1.5
                        rounded-lg
                        text-sm
                      ">

                        Online:{" "}

                        <strong>
                          {onlineCount}
                        </strong>

                      </span>

                    </div>

                    {/* OPEN TEXT */}

                    <div className="
                      mt-5
                      text-green-400
                      font-semibold
                      text-sm
                      group-hover:text-green-300
                    ">
                      Open Event Dashboard →
                    </div>

                  </button>

                );
              }
            )}

          </div>

        </section>

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loading && (

          <div className="
            mt-6
            text-center
            text-gray-300
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-xl
            p-4
          ">
            Updating jury information...
          </div>

        )}

      </main>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="
        relative
        z-10
        text-center
        py-8
        text-gray-400
        text-sm
      ">

        NEHRU INSTITUTE OF ENGINEERING AND TECHNOLOGY
        <br />
        NEHRU GRAND KACHERI • AVATAR 2026

      </footer>

    </div>
  );
}

export default AdminDashboard;