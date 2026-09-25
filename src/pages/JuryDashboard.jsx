import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../supabase";
import * as pdfjsLib from "pdfjs-dist";
import EVENT_CRITERIA from "../data/eventCriteria";

function JuryDashboard() {
  // ===============================
  // JURY
  // ===============================

  const [jury, setJury] = useState(
    JSON.parse(localStorage.getItem("jury"))
  );

  // ===============================
  // EVENT
  // ===============================

  const [selectedEvent, setSelectedEvent] = useState("");

  // ===============================
  // PARTICIPANTS
  // ===============================

  const [participants, setParticipants] = useState([]);

  // ===============================
  // SUBMISSION
  // ===============================

  const [submitted, setSubmitted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(false);

  // ===============================
  // MANUAL PARTICIPANT
  // ===============================

  const [manualName, setManualName] = useState("");
  const [manualDept, setManualDept] = useState("");
  const [manualClass, setManualClass] = useState("");
  const [manualCollege, setManualCollege] = useState("");

  // ===============================
  // EDIT
  // ===============================

  const [editIndex, setEditIndex] = useState(null);

  // ===============================
  // STATUS
  // ===============================

  const intervalRef = useRef(null);

  // ===============================
  // START
  // ===============================

  useEffect(() => {
    if (!jury) {
      return;
    }

    loadJury();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // ===============================
  // LOAD JURY
  // ===============================

  async function loadJury() {
    const { data, error } = await supabase
      .from("juries")
      .select("*")
      .eq("id", jury.id)
      .single();

    if (error || !data) {
      alert("Jury account deleted");

      localStorage.removeItem("jury");

      window.location.href = "/jury/login";

      return;
    }

    setJury(data);

    localStorage.setItem(
      "jury",
      JSON.stringify(data)
    );

    // ===============================
    // ASSIGNED EVENT
    // ===============================

    if (data.event) {
      setSelectedEvent(data.event);

      console.log(
        "Assigned Jury Event:",
        data.event
      );

      console.log(
        "Available Criteria:",
        EVENT_CRITERIA[data.event]
      );
    }

    // ===============================
    // ONLINE STATUS
    // ===============================

    await updateStatus("Online");

    intervalRef.current = setInterval(() => {
      updateStatus("Online");
    }, 5000);

    // ===============================
    // SUBMISSION
    // ===============================

    checkSubmission();

    // ===============================
    // LOAD PARTICIPANTS
    // ===============================

    loadParticipants();
  }

  // ===============================
  // SELECTED EVENT CRITERIA
  // ===============================

  const selectedCriteria =
    selectedEvent
      ? EVENT_CRITERIA[selectedEvent] || []
      : [];

  // ===============================
  // UPDATE STATUS
  // ===============================

  async function updateStatus(status) {
    if (!jury) {
      return;
    }

    await supabase
      .from("juries")
      .update({
        current_status: status,
        last_seen: new Date().toISOString(),
      })
      .eq("id", jury.id);
  }

  // ===============================
  // CHECK SUBMISSION
  // ===============================

  async function checkSubmission() {
    const { data } = await supabase
      .from("juries")
      .select("submitted")
      .eq("id", jury.id)
      .single();

    if (data) {
      setSubmitted(data.submitted);
    }
  }

  // ===============================
  // LOAD PARTICIPANTS
  // ===============================

  async function loadParticipants() {
    console.log(
      "Loading participants for jury:",
      jury.id
    );

    // ===============================
    // LIVE MARKS
    // ===============================

    const {
      data: liveData,
      error: liveError,
    } = await supabase
      .from("live_marks")
      .select("*")
      .eq("jury_id", jury.id);

    if (liveError) {
      console.log(
        "Live marks loading error:",
        liveError.message
      );
    }

    // ===============================
    // FINAL PARTICIPANTS
    // ===============================

    const {
      data: finalData,
      error: finalError,
    } = await supabase
      .from("participants")
      .select("*")
      .eq("jury_id", jury.id);

    if (finalError) {
      console.log(
        "Final participants loading error:",
        finalError.message
      );
    }

    // ===============================
    // COMBINE
    // ===============================

    const combined = [];

    if (liveData && liveData.length > 0) {
      liveData.forEach((item) => {
        combined.push({
          name: item.name || "",
          dept: item.dept || "",
          class: item.class || "",
          college: item.college || "",
          marks:
            item.marks !== null &&
            item.marks !== undefined
              ? item.marks
              : "",
          criteriaMarks:
            item.criteria_marks || {},
        });
      });
    }

    if (finalData && finalData.length > 0) {
      finalData.forEach((item) => {
        const alreadyExists =
          combined.some(
            (participant) =>
              participant.name === item.name
          );

        if (!alreadyExists) {
          combined.push({
            name: item.name || "",
            dept: item.dept || "",
            class: item.class || "",
            college: item.college || "",
            marks:
              item.marks !== null &&
              item.marks !== undefined
                ? item.marks
                : "",
            criteriaMarks:
              item.criteria_marks || {},
          });
        }
      });
    }

    setParticipants(combined);

    console.log(
      "Loaded participants:",
      combined
    );
  }

  // ===============================
  // CHANGE CRITERION MARK
  // ===============================

  function changeCriterionMark(
    participantIndex,
    criterionName,
    value,
    maxMarks
  ) {
    let numericValue = value;

    if (value !== "") {
      numericValue = Number(value);

      if (numericValue < 0) {
        numericValue = 0;
      }

      if (numericValue > maxMarks) {
        numericValue = maxMarks;
      }
    }

    const updated = [...participants];

    const currentCriteriaMarks =
      updated[participantIndex]
        .criteriaMarks || {};

    const newCriteriaMarks = {
      ...currentCriteriaMarks,
      [criterionName]: numericValue,
    };

    const total = selectedCriteria.reduce(
      (sum, criterion) => {
        const mark =
          newCriteriaMarks[criterion.name];

        return (
          sum +
          (mark === "" ||
          mark === undefined ||
          mark === null
            ? 0
            : Number(mark))
        );
      },
      0
    );

    updated[participantIndex] = {
      ...updated[participantIndex],
      criteriaMarks: newCriteriaMarks,
      marks: total,
    };

    setParticipants(updated);

    setLastUpdated(false);

    updateStatus("Entering Marks");
  }

  // ===============================
  // EXCEL
  // ===============================

  function uploadExcel(file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(
          event.target.result,
          {
            type: "binary",
          }
        );

        const sheet =
          workbook.Sheets[
            workbook.SheetNames[0]
          ];

        const data =
          XLSX.utils.sheet_to_json(sheet);

        const list = data.map((item) => ({
          name:
            item.Name ||
            item.name ||
            "",
          dept:
            item.Dept ||
            item.Department ||
            item.dept ||
            "",
          class:
            item.Class ||
            item.class ||
            "",
          college:
            item.College ||
            item.college ||
            "",
          marks: "",
          criteriaMarks: {},
        }));

        setParticipants(list);

        setLastUpdated(false);

        updateStatus("Entering Marks");
      } catch (error) {
        console.log(error);

        alert(
          "Could not read Excel file"
        );
      }
    };

    reader.readAsBinaryString(file);
  }

  // ===============================
  // PDF
  // ===============================

  async function readPDF(file) {
    try {
      const buffer =
        await file.arrayBuffer();

      const pdf =
        await pdfjsLib.getDocument({
          data: buffer,
        }).promise;

      let text = "";

      for (
        let i = 1;
        i <= pdf.numPages;
        i++
      ) {
        const page =
          await pdf.getPage(i);

        const content =
          await page.getTextContent();

        content.items.forEach((item) => {
          text += item.str + "\n";
        });
      }

      const list = text
        .split("\n")
        .filter((x) => x.trim())
        .map((name) => ({
          name: name.trim(),
          dept: "",
          class: "",
          college: "",
          marks: "",
          criteriaMarks: {},
        }));

      setParticipants(list);

      setLastUpdated(false);

      updateStatus("Entering Marks");
    } catch (error) {
      console.log(error);

      alert(
        "Could not read PDF file"
      );
    }
  }

  // ===============================
  // TXT
  // ===============================

  async function readTXT(file) {
    try {
      const text =
        await file.text();

      const list = text
        .split("\n")
        .filter((x) => x.trim())
        .map((name) => ({
          name: name.trim(),
          dept: "",
          class: "",
          college: "",
          marks: "",
          criteriaMarks: {},
        }));

      setParticipants(list);

      setLastUpdated(false);

      updateStatus("Entering Marks");
    } catch (error) {
      console.log(error);

      alert(
        "Could not read TXT file"
      );
    }
  }

  // ===============================
  // FILE UPLOAD
  // ===============================

  function handleUpload(e) {
    const file =
      e.target.files[0];

    if (!file) {
      return;
    }

    const fileName =
      file.name.toLowerCase();

    updateStatus(
      "Uploading Participants"
    );

    if (
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".xls")
    ) {
      uploadExcel(file);
    } else if (
      fileName.endsWith(".pdf")
    ) {
      readPDF(file);
    } else if (
      fileName.endsWith(".txt")
    ) {
      readTXT(file);
    } else {
      alert(
        "Only Excel, PDF or TXT files are allowed"
      );
    }

    e.target.value = "";
  }

  // ===============================
  // ADD PARTICIPANT
  // ===============================

  function addParticipant() {
    if (!manualName.trim()) {
      alert(
        "Please enter participant name"
      );

      return;
    }

    const newParticipant = {
      name: manualName.trim(),
      dept: manualDept.trim(),
      class: manualClass.trim(),
      college: manualCollege.trim(),
      marks: "",
      criteriaMarks: {},
    };

    setParticipants([
      ...participants,
      newParticipant,
    ]);

    setManualName("");
    setManualDept("");
    setManualClass("");
    setManualCollege("");

    setLastUpdated(false);

    updateStatus("Entering Marks");
  }

  // ===============================
  // EDIT PARTICIPANT
  // ===============================

  function editParticipant(index) {
    const participant =
      participants[index];

    setEditIndex(index);

    setManualName(
      participant.name
    );

    setManualDept(
      participant.dept
    );

    setManualClass(
      participant.class
    );

    setManualCollege(
      participant.college
    );
  }

  // ===============================
  // UPDATE PARTICIPANT
  // ===============================

  function updateParticipant() {
    if (editIndex === null) {
      return;
    }

    if (!manualName.trim()) {
      alert(
        "Participant name is required"
      );

      return;
    }

    const updated =
      [...participants];

    updated[editIndex] = {
      ...updated[editIndex],
      name: manualName.trim(),
      dept: manualDept.trim(),
      class: manualClass.trim(),
      college: manualCollege.trim(),
    };

    setParticipants(updated);

    setEditIndex(null);

    setManualName("");
    setManualDept("");
    setManualClass("");
    setManualCollege("");

    setLastUpdated(false);
  }

  // ===============================
  // CANCEL EDIT
  // ===============================

  function cancelEdit() {
    setEditIndex(null);

    setManualName("");
    setManualDept("");
    setManualClass("");
    setManualCollege("");
  }

  // ===============================
  // DELETE PARTICIPANT
  // ===============================

  function deleteParticipant(index) {
    const confirmDelete =
      window.confirm(
        "Delete this participant?"
      );

    if (!confirmDelete) {
      return;
    }

    const updated =
      participants.filter(
        (_, i) =>
          i !== index
      );

    setParticipants(updated);

    setLastUpdated(false);
  }

  // ===============================
  // SEND LIVE UPDATE
  // ===============================

  async function sendUpdate() {
    if (!selectedEvent) {
      alert(
        "No event assigned to this jury"
      );

      return;
    }

    if (participants.length === 0) {
      alert(
        "Please add participants first"
      );

      return;
    }

    const data =
      participants.map((item) => ({
        jury_id: jury.id,

        event: selectedEvent,

        name: item.name,

        dept: item.dept,

        class: item.class,

        college: item.college,

        marks: Number(
          item.marks || 0
        ),

        criteria_marks:
          item.criteriaMarks || {},
      }));

    console.log(
      "Sending live update:",
      data
    );

    const {
      data: savedData,
      error,
    } = await supabase
      .from("live_marks")
      .upsert(data, {
        onConflict:
          "jury_id,name",
      })
      .select();

    if (error) {
      console.error(
        "Send Update Error:",
        error
      );

      alert(
        "Could not send update:\n\n" +
          error.message
      );

      return;
    }

    console.log(
      "Live update saved:",
      savedData
    );

    setLastUpdated(true);

    await updateStatus("Online");

    alert(
      "Jury update sent successfully!"
    );
  }

  // ===============================
  // FINAL SUBMIT
  // ===============================

  async function submitMarks() {
    if (submitted) {
      alert(
        "Marks already submitted"
      );

      return;
    }

    if (!selectedEvent) {
      alert(
        "No event assigned to this jury"
      );

      return;
    }

    if (participants.length === 0) {
      alert(
        "Please add participants first"
      );

      return;
    }

    const incomplete =
      participants.some(
        (participant) =>
          participant.marks === "" ||
          participant.marks === null ||
          participant.marks === undefined
      );

    if (incomplete) {
      alert(
        "Please enter marks for all participants"
      );

      return;
    }

    const confirmSubmit =
      window.confirm(
        "Are you sure you want to submit the final marks? You will not be able to edit them after submission."
      );

    if (!confirmSubmit) {
      return;
    }

    const data =
      participants.map((item) => ({
        jury_id: jury.id,

        event: selectedEvent,

        name: item.name,

        dept: item.dept,

        class: item.class,

        college: item.college,

        marks: Number(
          item.marks || 0
        ),

        criteria_marks:
          item.criteriaMarks || {},
      }));

    const {
      error,
    } = await supabase
      .from("participants")
      .insert(data);

    if (error) {
      console.log(error);

      alert(error.message);

      return;
    }

    const {
      error: juryError,
    } = await supabase
      .from("juries")
      .update({
        submitted: true,

        current_status:
          "Marks Submitted",

        last_seen:
          new Date().toISOString(),
      })
      .eq(
        "id",
        jury.id
      );

    if (juryError) {
      alert(
        juryError.message
      );

      return;
    }

    setSubmitted(true);

    const updatedJury = {
      ...jury,
      submitted: true,
      current_status:
        "Marks Submitted",
    };

    setJury(updatedJury);

    localStorage.setItem(
      "jury",
      JSON.stringify(
        updatedJury
      )
    );

    alert(
      "Final Marks Submitted Successfully"
    );
  }

  // ===============================
  // LOGOUT
  // ===============================

  async function logout() {
    await supabase
      .from("juries")
      .update({
        current_status:
          "Offline",

        last_seen:
          new Date().toISOString(),
      })
      .eq(
        "id",
        jury.id
      );

    clearInterval(
      intervalRef.current
    );

    localStorage.removeItem(
      "jury"
    );

    window.location.href =
      "/jury/login";
  }

  // ===============================
  // NO LOGIN
  // ===============================

  if (!jury) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-xl shadow">

          <h1 className="text-2xl font-bold mb-4">
            Please Login First
          </h1>

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded"
            onClick={() =>
              (window.location.href =
                "/jury/login")
            }
          >
            Go To Jury Login
          </button>

        </div>

      </div>
    );
  }

  // ===============================
  // DASHBOARD
  // ===============================

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5 gap-4">

          <div>

            <h1 className="text-3xl font-bold">
              Jury Dashboard
            </h1>

            <p className="text-xl mt-4">
              Welcome{" "}
              <b>{jury.name}</b>
            </p>

            <p className="font-bold mt-1">
              Assigned Event:{" "}
              <span className="text-blue-600">
                {jury.event || "Not Assigned"}
              </span>
            </p>

          </div>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        {/* EVENT INFORMATION */}

        <div className="bg-white p-6 rounded-xl shadow mt-6">

          <h2 className="text-xl font-bold mb-2">
            Assigned Event
          </h2>

          <p className="text-gray-500 mb-4">
            You can only mark participants for your assigned event.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Event
            </p>

            <p className="text-2xl font-bold text-blue-700">
              {selectedEvent ||
                "No Event Assigned"}
            </p>

          </div>

        </div>

        {/* NO CRITERIA WARNING */}

        {selectedEvent &&
          selectedCriteria.length === 0 && (

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg mt-6">

              <b>
                Criteria not found
              </b>

              <p className="mt-1">
                No judging criteria are configured
                for "{selectedEvent}".
              </p>

              <p className="mt-1">
                Please ask the administrator to add
                criteria for this event.
              </p>

            </div>

          )}

        {/* JUDGING CRITERIA */}

        {selectedEvent &&
          selectedCriteria.length > 0 && (

            <div className="bg-white rounded-xl shadow p-6 mt-6">

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedEvent}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Judging Criteria
                  </p>

                </div>

                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  Total: 100 Marks
                </div>

              </div>

              <div className="mt-6 space-y-4">

                {selectedCriteria.map(
                  (
                    criterion,
                    index
                  ) => (

                    <div
                      key={
                        criterion.name
                      }
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                          <p className="text-sm text-gray-400">
                            Criterion{" "}
                            {index + 1}
                          </p>

                          <h3 className="text-lg font-semibold text-gray-800">
                            {
                              criterion.name
                            }
                          </h3>

                        </div>

                        <span className="text-sm font-semibold text-gray-500">
                          Max:{" "}
                          {
                            criterion.maxMarks
                          }
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        {/* ADD PARTICIPANT */}

        <div className="bg-white p-6 rounded-xl shadow mt-6">

          <h2 className="text-xl font-bold mb-4">
            Add Participant
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">

            <input
              type="text"
              className="border p-3 rounded"
              placeholder="Name"
              value={manualName}
              disabled={submitted}
              onChange={(e) =>
                setManualName(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              className="border p-3 rounded"
              placeholder="Department"
              value={manualDept}
              disabled={submitted}
              onChange={(e) =>
                setManualDept(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              className="border p-3 rounded"
              placeholder="Class"
              value={manualClass}
              disabled={submitted}
              onChange={(e) =>
                setManualClass(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              className="border p-3 rounded"
              placeholder="College"
              value={manualCollege}
              disabled={submitted}
              onChange={(e) =>
                setManualCollege(
                  e.target.value
                )
              }
            />

            <div className="flex gap-2">

              {editIndex === null ? (

                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded w-full"
                  onClick={
                    addParticipant
                  }
                  disabled={submitted}
                >
                  Add
                </button>

              ) : (

                <>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={
                      updateParticipant
                    }
                    disabled={submitted}
                  >
                    Update
                  </button>

                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={
                      cancelEdit
                    }
                    disabled={submitted}
                  >
                    Cancel
                  </button>
                </>

              )}

            </div>

          </div>

        </div>

        {/* FILE UPLOAD */}

        <div className="bg-white p-6 rounded-xl shadow mt-6">

          <h2 className="text-xl font-bold mb-3">
            Upload Participants
          </h2>

          <p className="text-gray-600 mb-3">
            Excel, PDF or TXT file
          </p>

          <input
            type="file"
            accept=".xlsx,.xls,.pdf,.txt"
            onChange={
              handleUpload
            }
            disabled={submitted}
          />

        </div>

        {/* PARTICIPANT TABLE */}

        <div className="bg-white rounded-xl shadow mt-6 overflow-x-auto">

          <table className="border-collapse w-full">

            <thead>

              <tr className="bg-gray-200">

                <th className="border p-3">
                  Name
                </th>

                <th className="border p-3">
                  Dept
                </th>

                <th className="border p-3">
                  Class
                </th>

                <th className="border p-3">
                  College
                </th>

                <th className="border p-3">
                  Marks
                </th>

                <th className="border p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {participants.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-8 text-gray-500"
                  >
                    No participants added yet.
                  </td>

                </tr>

              ) : (

                participants.map(
                  (
                    p,
                    index
                  ) => (

                    <tr
                      key={index}
                    >

                      <td className="border p-3">
                        {p.name}
                      </td>

                      <td className="border p-3">
                        {p.dept}
                      </td>

                      <td className="border p-3">
                        {p.class}
                      </td>

                      <td className="border p-3">
                        {p.college}
                      </td>

                      <td className="border p-3">

                        <div className="flex flex-col gap-2">

                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="border p-2 rounded w-28 font-bold"
                            value={
                              p.marks
                            }
                            disabled={
                              submitted ||
                              !selectedEvent
                            }
                            readOnly
                          />

                          <span className="text-xs text-gray-500">
                            Total / 100
                          </span>

                        </div>

                      </td>

                      <td className="border p-3">

                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                          onClick={() =>
                            editParticipant(
                              index
                            )
                          }
                          disabled={
                            submitted
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded ml-2"
                          onClick={() =>
                            deleteParticipant(
                              index
                            )
                          }
                          disabled={
                            submitted
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

        {/* CRITERIA MARKING */}

        {selectedEvent &&
          selectedCriteria.length > 0 &&
          participants.length > 0 && (

            <div className="bg-white rounded-xl shadow mt-6 p-6">

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">

                <div>

                  <h2 className="text-2xl font-bold">
                    Enter Judging Marks
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Enter marks for each participant based on the event criteria.
                  </p>

                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold">
                  Maximum: 100
                </div>

              </div>

              <div className="space-y-8">

                {participants.map(
                  (
                    participant,
                    participantIndex
                  ) => (

                    <div
                      key={
                        participantIndex
                      }
                      className="border-2 border-gray-200 rounded-xl p-5"
                    >

                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-5">

                        <div>

                          <h3 className="text-xl font-bold text-gray-800">
                            {
                              participant.name
                            }
                          </h3>

                          <p className="text-gray-500 text-sm">
                            {
                              participant.dept
                            }
                            {" • "}
                            {
                              participant.class
                            }
                            {" • "}
                            {
                              participant.college
                            }
                          </p>

                        </div>

                        <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-lg">

                          <span className="text-sm">
                            Total Marks
                          </span>

                          <div className="text-2xl font-bold">
                            {
                              participant.marks ||
                              0
                            }
                            {" / 100"}
                          </div>

                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {selectedCriteria.map(
                          (
                            criterion
                          ) => {

                            const currentMark =
                              participant
                                .criteriaMarks?.[
                                criterion.name
                              ] ?? "";

                            return (

                              <div
                                key={
                                  criterion.name
                                }
                                className="border border-gray-200 bg-gray-50 rounded-lg p-4"
                              >

                                <div className="flex justify-between items-center mb-3">

                                  <label className="font-semibold text-gray-800">
                                    {
                                      criterion.name
                                    }
                                  </label>

                                  <span className="text-sm text-gray-500">
                                    Max{" "}
                                    {
                                      criterion.maxMarks
                                    }
                                  </span>

                                </div>

                                <input
                                  type="number"
                                  min="0"
                                  max={
                                    criterion.maxMarks
                                  }
                                  value={
                                    currentMark
                                  }
                                  disabled={
                                    submitted
                                  }
                                  placeholder="Enter marks"
                                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                                  onChange={(
                                    e
                                  ) =>
                                    changeCriterionMark(
                                      participantIndex,
                                      criterion.name,
                                      e.target.value,
                                      criterion.maxMarks
                                    )
                                  }
                                />

                              </div>

                            );
                          }
                        )}

                      </div>

                      <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">

                        <div className="flex justify-between items-center">

                          <span className="font-semibold text-gray-700">
                            Participant Total
                          </span>

                          <span className="text-2xl font-bold text-blue-700">
                            {
                              participant.marks ||
                              0
                            }
                            {" / 100"}
                          </span>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )}

        {/* BUTTONS */}

        <div className="mt-6 flex flex-wrap gap-3">

          <button
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded"
            onClick={
              sendUpdate
            }
            disabled={
              submitted ||
              !selectedEvent
            }
          >
            {lastUpdated
              ? "Updated ✓"
              : "Send Update"}
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-3 rounded"
            onClick={
              submitMarks
            }
            disabled={
              submitted ||
              !selectedEvent
            }
          >
            {submitted
              ? "Submitted"
              : "Final Submit"}
          </button>

        </div>

        {/* SUBMITTED */}

        {submitted && (

          <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded mt-5">

            <b>
              Marks Submitted
            </b>

            <br />

            Final marks have already been submitted.

          </div>

        )}

      </div>

    </div>
  );
}

export default JuryDashboard;