import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function EventDashboard() {
  const { eventName } = useParams();

  const event = decodeURIComponent(eventName || "");

  const [juries, setJuries] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // LOAD EVENT DATA
  // =====================================================

  async function loadEventData() {
    try {
      setLoading(true);

      console.log("=================================");
      console.log("ADMIN EVENT DASHBOARD");
      console.log("Event from URL:", event);
      console.log("=================================");

      // -------------------------------------------------
      // 1. LOAD JURIES
      // -------------------------------------------------

      const {
        data: juryData,
        error: juryError,
      } = await supabase
        .from("juries")
        .select("*")
        .eq("event", event);

      if (juryError) {
        console.error(
          "Jury loading error:",
          juryError
        );
      } else {
        console.log(
          "Juries found:",
          juryData
        );
      }

      setJuries(juryData || []);

      // -------------------------------------------------
      // 2. LOAD LIVE MARKS
      // -------------------------------------------------

      console.log(
        "Searching live_marks for event:",
        event
      );

      const {
        data: liveData,
        error: liveError,
      } = await supabase
        .from("live_marks")
        .select("*")
        .eq("event", event)
        .order("updated_at", {
          ascending: false,
        });

      if (liveError) {
        console.error(
          "LIVE MARKS ERROR:",
          liveError
        );

        alert(
          "Could not load live results:\n\n" +
            liveError.message
        );

        setResults([]);
      } else {
        console.log(
          "LIVE MARKS DATA:",
          liveData
        );

        console.log(
          "Number of live results:",
          liveData?.length || 0
        );

        setResults(liveData || []);
      }
    } catch (error) {
      console.error(
        "Unexpected EventDashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // INITIAL LOAD + REALTIME
  // =====================================================

  useEffect(() => {
    if (!event) {
      return;
    }

    loadEventData();

    // ---------------------------------------------------
    // JURY REALTIME
    // ---------------------------------------------------

    const juryChannel = supabase
      .channel(`juries_${event}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "juries",
        },
        (payload) => {
          console.log(
            "Jury table changed:",
            payload
          );

          loadEventData();
        }
      )
      .subscribe();

    // ---------------------------------------------------
    // LIVE MARKS REALTIME
    // ---------------------------------------------------

    const liveMarksChannel = supabase
      .channel(`live_marks_${event}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_marks",
        },
        (payload) => {
          console.log(
            "LIVE MARKS TABLE CHANGED:",
            payload
          );

          loadEventData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(juryChannel);
      supabase.removeChannel(liveMarksChannel);
    };
  }, [event]);

  // =====================================================
  // BACK TO ADMIN
  // =====================================================

  function goBack() {
    window.location.href = "/admin/dashboard";
  }

  // =====================================================
  // REFRESH
  // =====================================================

  function refresh() {
    loadEventData();
  }

  // =====================================================
  // DELETE JURY
  // =====================================================

  async function deleteJury(id) {
    const ok = window.confirm(
      "Are you sure you want to delete this jury?"
    );

    if (!ok) {
      return;
    }

    // Delete live marks first
    const {
      error: liveError,
    } = await supabase
      .from("live_marks")
      .delete()
      .eq("jury_id", id);

    if (liveError) {
      alert(
        "Could not delete live marks:\n\n" +
          liveError.message
      );

      return;
    }

    // Delete jury
    const {
      error: juryError,
    } = await supabase
      .from("juries")
      .delete()
      .eq("id", id);

    if (juryError) {
      alert(
        "Could not delete jury:\n\n" +
          juryError.message
      );

      return;
    }

    alert("Jury deleted successfully.");

    loadEventData();
  }

  // =====================================================
  // DOWNLOAD PDF
  // =====================================================

  function downloadPDF() {
    if (results.length === 0) {
      alert(
        "No results available for this event."
      );

      return;
    }

    // Sort highest marks first
    const sortedResults = [...results].sort(
      (a, b) =>
        Number(b.marks || 0) -
        Number(a.marks || 0)
    );

    // Create A4 PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const pageHeight =
      doc.internal.pageSize.getHeight();

    // =================================================
    // HEADER BACKGROUND
    // =================================================

    doc.setFillColor(
      20,
      83,
      45
    );

    doc.rect(
      0,
      0,
      pageWidth,
      55,
      "F"
    );

    // =================================================
    // INSTITUTE NAME
    // =================================================

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(15);

    doc.text(
      "NEHRU INSTITUTE OF ENGINEERING",
      pageWidth / 2,
      15,
      {
        align: "center",
      }
    );

    doc.text(
      "AND TECHNOLOGY",
      pageWidth / 2,
      22,
      {
        align: "center",
      }
    );

    // =================================================
    // NEHRU GRAND KACHERI
    // =================================================

    doc.setFontSize(20);

    doc.text(
      "NEHRU GRAND KACHERI",
      pageWidth / 2,
      33,
      {
        align: "center",
      }
    );

    // =================================================
    // AVATAR 2026
    // =================================================

    doc.setTextColor(
      220,
      252,
      231
    );

    doc.setFontSize(14);

    doc.text(
      "AVATAR 2026",
      pageWidth / 2,
      44,
      {
        align: "center",
      }
    );

    // =================================================
    // HEADER LINE
    // =================================================

    doc.setDrawColor(
      255,
      255,
      255
    );

    doc.setLineWidth(0.5);

    doc.line(
      25,
      50,
      pageWidth - 25,
      50
    );

    // =================================================
    // REPORT TITLE
    // =================================================

    doc.setTextColor(
      30,
      41,
      59
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(20);

    doc.text(
      "JURY MARKING RESULT",
      pageWidth / 2,
      72,
      {
        align: "center",
      }
    );

    // =================================================
    // EVENT INFORMATION
    // =================================================

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(12);

    doc.setTextColor(
      71,
      85,
      105
    );

    doc.text(
      `Event: ${event}`,
      20,
      88
    );

    doc.text(
      `Total Participants: ${sortedResults.length}`,
      20,
      97
    );

    // =================================================
    // TABLE DATA
    // =================================================

    const tableData =
      sortedResults.map(
        (item, index) => [
          index + 1,
          item.name || "",
          item.dept || "",
          item.class || "",
          item.college || "",
          `${item.marks || 0}/100`,
        ]
      );

    // =================================================
    // RESULTS TABLE
    // =================================================

    autoTable(doc, {
      startY: 108,

      head: [
        [
          "Rank",
          "Name",
          "Department",
          "Class",
          "College",
          "Marks",
        ],
      ],

      body: tableData,

      theme: "grid",

      margin: {
        left: 15,
        right: 15,
      },

      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 4,

        textColor: [
          51,
          65,
          85,
        ],

        lineColor: [
          226,
          232,
          240,
        ],

        lineWidth: 0.2,

        valign: "middle",
      },

      headStyles: {
        fillColor: [
          22,
          101,
          52,
        ],

        textColor: [
          255,
          255,
          255,
        ],

        fontStyle: "bold",

        halign: "center",
      },

      alternateRowStyles: {
        fillColor: [
          248,
          250,
          252,
        ],
      },

      columnStyles: {
        0: {
          halign: "center",
          cellWidth: 15,
        },

        1: {
          cellWidth: 38,
        },

        2: {
          cellWidth: 32,
        },

        3: {
          cellWidth: 22,
        },

        4: {
          cellWidth: 45,
        },

        5: {
          halign: "center",
          cellWidth: 25,
          fontStyle: "bold",
        },
      },

      // =================================================
      // FOOTER ON EVERY PAGE
      // =================================================

      didDrawPage: function () {
        // Footer line
        doc.setDrawColor(
          203,
          213,
          225
        );

        doc.setLineWidth(0.3);

        doc.line(
          20,
          pageHeight - 20,
          pageWidth - 20,
          pageHeight - 20
        );

        // Footer text
        doc.setFontSize(8);

        doc.setTextColor(
          100,
          116,
          139
        );

        doc.text(
          "NEHRU GRAND KACHERI • AVATAR 2026",
          pageWidth / 2,
          pageHeight - 13,
          {
            align: "center",
          }
        );

        // Page number
        doc.text(
          `Page ${doc.internal.getNumberOfPages()}`,
          pageWidth - 20,
          pageHeight - 13,
          {
            align: "right",
          }
        );
      },
    });

    // =================================================
    // FILE NAME
    // =================================================

    const safeFileName =
      event.replace(
        /[^a-z0-9]/gi,
        "_"
      );

    doc.save(
      `${safeFileName}_Results.pdf`
    );
  }

  // =====================================================
  // STATISTICS
  // =====================================================

  const onlineJuries = juries.filter(
    (jury) =>
      jury.current_status === "Online" ||
      jury.status === "Online"
  );

  const submittedJuries = juries.filter(
    (jury) =>
      jury.submitted === true
  );

  const sortedResults = [
    ...results,
  ].sort(
    (a, b) =>
      Number(b.marks || 0) -
      Number(a.marks || 0)
  );

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-900 text-white">

      {/* ================================================
          HEADER
      ================================================= */}

      <div className="bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-xl">

        <div className="max-w-7xl mx-auto px-8 py-6">

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

            <div>

              <button
                onClick={goBack}
                className="
                  text-green-300
                  hover:text-green-200
                  font-semibold
                  mb-3
                  transition
                "
              >
                ← Back to Events
              </button>

              <p className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-green-300
                font-semibold
              ">
                NEHRU GRAND KACHERI
              </p>

              <h1 className="
                text-3xl
                md:text-4xl
                font-bold
                text-white
                mt-2
              ">
                {event}
              </h1>

              <p className="
                text-gray-300
                mt-1
              ">
                Event Dashboard • AVATAR 2026
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={refresh}
                className="
                  bg-blue-600
                  hover:bg-blue-500
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  transition
                "
              >
                ↻ Refresh
              </button>

              <button
                onClick={downloadPDF}
                className="
                  bg-green-600
                  hover:bg-green-500
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  shadow-lg
                  transition
                "
              >
                ↓ Download PDF
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================
          MAIN
      ================================================= */}

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* ==============================================
            EVENT HEADER
        =============================================== */}

        <div className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-green-700
          via-emerald-600
          to-green-800
          rounded-2xl
          shadow-2xl
          p-8
          mb-8
          border
          border-green-400/20
        ">

          <div className="
            absolute
            -right-10
            -top-16
            w-48
            h-48
            rounded-full
            bg-white/10
          " />

          <div className="
            absolute
            -left-10
            -bottom-20
            w-56
            h-56
            rounded-full
            bg-black/10
          " />

          <div className="relative">

            <p className="
              text-green-100
              text-sm
              uppercase
              tracking-widest
              font-semibold
            ">
              Selected Event
            </p>

            <h2 className="
              text-4xl
              md:text-5xl
              font-bold
              mt-2
            ">
              {event}
            </h2>

            <p className="
              mt-3
              text-green-100
            ">
              View and monitor all juries and live
              results for this event.
            </p>

          </div>

        </div>

        {/* ==============================================
            STATISTICS
        =============================================== */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-5
          mb-8
        ">

          {/* TOTAL JURIES */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-xl
            p-6
            hover:bg-white/15
            transition
          ">

            <p className="text-gray-300">
              Total Juries
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-blue-300
              mt-2
            ">
              {juries.length}
            </h2>

            <p className="
              text-xs
              text-gray-400
              mt-2
            ">
              Assigned to this event
            </p>

          </div>

          {/* ONLINE JURIES */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-xl
            p-6
            hover:bg-white/15
            transition
          ">

            <p className="text-gray-300">
              Online Juries
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-green-300
              mt-2
            ">
              {onlineJuries.length}
            </h2>

            <p className="
              text-xs
              text-gray-400
              mt-2
            ">
              Currently active
            </p>

          </div>

          {/* SUBMITTED */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-xl
            p-6
            hover:bg-white/15
            transition
          ">

            <p className="text-gray-300">
              Submitted
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-purple-300
              mt-2
            ">
              {submittedJuries.length}
            </h2>

            <p className="
              text-xs
              text-gray-400
              mt-2
            ">
              Jury submissions
            </p>

          </div>

          {/* PARTICIPANTS */}

          <div className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/10
            rounded-2xl
            shadow-xl
            p-6
            hover:bg-white/15
            transition
          ">

            <p className="text-gray-300">
              Participants
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-orange-300
              mt-2
            ">
              {results.length}
            </h2>

            <p className="
              text-xs
              text-gray-400
              mt-2
            ">
              Live result entries
            </p>

          </div>

        </div>

        {/* ==============================================
            ASSIGNED JURIES
        =============================================== */}

        <div className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          shadow-2xl
          p-6
          mb-8
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-start
            md:items-center
            gap-4
            mb-6
          ">

            <div>

              <h2 className="
                text-2xl
                font-bold
                text-white
              ">
                Assigned Juries
              </h2>

              <p className="
                text-gray-300
                mt-1
              ">
                Juries assigned to {event}
              </p>

            </div>

            <span className="
              bg-blue-500/20
              border
              border-blue-400/20
              text-blue-200
              px-4
              py-2
              rounded-xl
              font-semibold
            ">
              {juries.length} Juries
            </span>

          </div>

          {loading ? (

            <div className="
              text-center
              py-10
              text-gray-300
            ">
              Loading juries...
            </div>

          ) : juries.length === 0 ? (

            <div className="
              border
              border-white/10
              rounded-xl
              p-10
              text-center
              bg-black/10
            ">

              <div className="text-4xl mb-3">
                👥
              </div>

              <p className="
                text-gray-300
              ">
                No jury has been assigned to this
                event yet.
              </p>

              <button
                onClick={() => {
                  window.location.href =
                    "/admin/add-jury";
                }}
                className="
                  mt-4
                  bg-green-600
                  hover:bg-green-500
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                + Add Jury
              </button>

            </div>

          ) : (

            <div className="
              overflow-x-auto
              rounded-xl
              border
              border-white/10
            ">

              <table className="w-full">

                <thead className="
                  bg-black/20
                ">

                  <tr>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Jury Name
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Username
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Status
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Submission
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Last Seen
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {juries.map((jury) => (

                    <tr
                      key={jury.id}
                      className="
                        border-t
                        border-white/10
                        hover:bg-white/5
                        transition
                      "
                    >

                      <td className="
                        p-4
                        font-semibold
                        text-white
                      ">
                        {jury.name}
                      </td>

                      <td className="
                        p-4
                        text-gray-300
                      ">
                        {jury.username}
                      </td>

                      <td className="p-4">

                        <span
                          className={
                            jury.current_status ===
                              "Online" ||
                            jury.status === "Online"
                              ? "bg-green-500/20 text-green-300 border border-green-400/20 px-3 py-1 rounded-full text-sm font-semibold"
                              : "bg-gray-500/20 text-gray-300 border border-gray-400/20 px-3 py-1 rounded-full text-sm"
                          }
                        >
                          {jury.current_status ||
                            jury.status ||
                            "Offline"}
                        </span>

                      </td>

                      <td className="p-4">

                        {jury.submitted ? (

                          <span className="
                            bg-green-500/20
                            text-green-300
                            border
                            border-green-400/20
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                          ">
                            Submitted
                          </span>

                        ) : (

                          <span className="
                            bg-yellow-500/20
                            text-yellow-300
                            border
                            border-yellow-400/20
                            px-3
                            py-1
                            rounded-full
                            text-sm
                          ">
                            Not Submitted
                          </span>

                        )}

                      </td>

                      <td className="
                        p-4
                        text-sm
                        text-gray-400
                      ">

                        {jury.last_seen
                          ? new Date(
                              jury.last_seen
                            ).toLocaleString()
                          : "-"}

                      </td>

                      <td className="p-4">

                        <button
                          onClick={() =>
                            deleteJury(jury.id)
                          }
                          className="
                            bg-red-600/80
                            hover:bg-red-500
                            text-white
                            px-3
                            py-1.5
                            rounded-lg
                            text-sm
                            font-semibold
                            transition
                          "
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* ==============================================
            LIVE RESULTS
        =============================================== */}

        <div className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          shadow-2xl
          p-6
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            md:items-center
            gap-4
            mb-6
          ">

            <div>

              <h2 className="
                text-2xl
                font-bold
                text-white
              ">
                Live Results
              </h2>

              <p className="
                text-gray-300
                mt-1
              ">
                Real-time marks for {event}
              </p>

            </div>

            <span className="
              bg-green-500/20
              border
              border-green-400/20
              text-green-300
              px-4
              py-2
              rounded-xl
              font-semibold
            ">
              {results.length} Results
            </span>

          </div>

          {loading ? (

            <div className="
              text-center
              py-10
              text-gray-300
            ">
              Loading results...
            </div>

          ) : results.length === 0 ? (

            <div className="
              border
              border-white/10
              rounded-xl
              p-10
              text-center
              bg-black/10
            ">

              <div className="text-5xl mb-4">
                📊
              </div>

              <h3 className="
                text-xl
                font-semibold
                text-white
              ">
                No Live Results Yet
              </h3>

              <p className="
                text-gray-400
                mt-2
              ">
                Results will appear here when the
                jury sends marks.
              </p>

            </div>

          ) : (

            <div className="
              overflow-x-auto
              rounded-xl
              border
              border-white/10
            ">

              <table className="w-full">

                <thead className="
                  bg-black/20
                ">

                  <tr>

                    <th className="
                      p-4
                      text-gray-200
                      font-semibold
                    ">
                      Rank
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Name
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Department
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      Class
                    </th>

                    <th className="
                      p-4
                      text-left
                      text-gray-200
                      font-semibold
                    ">
                      College
                    </th>

                    <th className="
                      p-4
                      text-gray-200
                      font-semibold
                    ">
                      Marks
                    </th>

                    <th className="
                      p-4
                      text-gray-200
                      font-semibold
                    ">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {sortedResults.map(
                    (item, index) => (

                      <tr
                        key={
                          item.id ||
                          `${item.jury_id}-${item.name}-${index}`
                        }
                        className={`
                          border-t
                          border-white/10
                          transition
                          ${
                            index === 0
                              ? "bg-yellow-500/10"
                              : "hover:bg-white/5"
                          }
                        `}
                      >

                        <td className="
                          p-4
                          text-center
                        ">

                          {index === 0 ? (

                            <span className="text-2xl">
                              🥇
                            </span>

                          ) : (

                            <span className="
                              text-gray-300
                              font-semibold
                            ">
                              {index + 1}
                            </span>

                          )}

                        </td>

                        <td className="
                          p-4
                          font-semibold
                          text-white
                        ">
                          {item.name || "-"}
                        </td>

                        <td className="
                          p-4
                          text-gray-300
                        ">
                          {item.dept || "-"}
                        </td>

                        <td className="
                          p-4
                          text-gray-300
                        ">
                          {item.class || "-"}
                        </td>

                        <td className="
                          p-4
                          text-gray-300
                        ">
                          {item.college || "-"}
                        </td>

                        <td className="
                          p-4
                          text-center
                        ">

                          <span className="
                            font-bold
                            text-green-300
                          ">
                            {item.marks ?? 0}
                          </span>

                          <span className="
                            text-gray-400
                          ">
                            /100
                          </span>

                        </td>

                        <td className="
                          p-4
                          text-center
                        ">

                          <span className="
                            bg-green-500/20
                            text-green-300
                            border
                            border-green-400/20
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            whitespace-nowrap
                          ">
                            Jury Sent Update
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* ================================================
          FOOTER
      ================================================= */}

      <footer className="
        text-center
        py-8
        text-gray-400
        text-sm
      ">

        <p className="font-semibold text-gray-300">
          NEHRU INSTITUTE OF ENGINEERING AND TECHNOLOGY
        </p>

        <p className="mt-1">
          NEHRU GRAND KACHERI • AVATAR 2026
        </p>

      </footer>

    </div>
  );
}

export default EventDashboard;