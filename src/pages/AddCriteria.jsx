import { useState } from "react";
import { supabase } from "../supabase";

function AddCriteria() {
  // ==============================
  // 35 EVENTS
  // ==============================

  const events = [
    "Solo Song",
    "Solo Dance",
    "Group Dance",
    "Instrumental Music",
    "Mime",
    "Mono Act",
    "Fashion Parade",
    "Mr. & Ms. Fest",
    "Pencil Sketching",
    "Photography",
    "Bridal Makeup",
    "Mehendi",
    "Chill Chef",
    "RJ Hunt",
    "Street Play",
    "Wealth Out of Waste",
    "Technical Quiz",
    "Web Design",
    "Coding Challenge",
    "Hackathon",
    "Ideathon",
    "Digital Designing",
    "Drone Challenge",
    "Best Manager",
    "Commerce Dumb Charades",
    "Vyaapaar Vision",
    "Brand Blitz",
    "Logo Designing",
    "Ad Zap",
    "IPL Auction",
    "Meme Creation",
    "Reels Challenge",
    "Rapid Fire",
    "Freeze Dance",
    "Guess the Song",
  ];

  // ==============================
  // SELECTED EVENT
  // ==============================

  const [event, setEvent] = useState("");

  // ==============================
  // CRITERIA LIST
  // ==============================

  const [criteriaList, setCriteriaList] = useState([
    {
      criteria: "",
      conditions: "",
      max_marks: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // ==============================
  // CHANGE CRITERIA
  // ==============================

  function changeCriteria(index, field, value) {
    const updated = [...criteriaList];

    updated[index][field] = value;

    setCriteriaList(updated);
  }

  // ==============================
  // ADD ANOTHER CRITERIA
  // ==============================

  function addCriteria() {
    setCriteriaList([
      ...criteriaList,
      {
        criteria: "",
        conditions: "",
        max_marks: "",
      },
    ]);
  }

  // ==============================
  // REMOVE CRITERIA
  // ==============================

  function removeCriteria(index) {
    if (criteriaList.length === 1) {
      alert("At least one criteria is required");
      return;
    }

    const updated = criteriaList.filter(
      (_, i) => i !== index
    );

    setCriteriaList(updated);
  }

  // ==============================
  // SAVE ALL CRITERIA
  // ==============================

  async function saveCriteria() {
    // ------------------------------
    // CHECK EVENT
    // ------------------------------

    if (!event) {
      alert("Please select an event");
      return;
    }

    // ------------------------------
    // CHECK EACH CRITERIA
    // ------------------------------

    for (let i = 0; i < criteriaList.length; i++) {
      const item = criteriaList[i];

      if (
        !item.criteria.trim() ||
        !item.conditions.trim() ||
        !item.max_marks
      ) {
        alert(
          `Please fill all fields in Criteria ${i + 1}`
        );

        return;
      }

      if (Number(item.max_marks) <= 0) {
        alert(
          `Maximum marks for Criteria ${i + 1} must be greater than 0`
        );

        return;
      }
    }

    // ------------------------------
    // CHECK TOTAL MARKS
    // ------------------------------

    const totalMarks = criteriaList.reduce(
      (total, item) =>
        total + Number(item.max_marks),
      0
    );

    if (totalMarks !== 100) {
      alert(
        `Total maximum marks must be 100.\n\nCurrent total: ${totalMarks}`
      );

      return;
    }

    // ------------------------------
    // START LOADING
    // ------------------------------

    setLoading(true);

    // ------------------------------
    // PREPARE DATA
    // ------------------------------

    const data = criteriaList.map((item) => ({
      event: event,
      criteria: item.criteria.trim(),
      conditions: item.conditions.trim(),
      max_marks: Number(item.max_marks),
    }));

    console.log("Saving criteria:", data);

    // ------------------------------
    // INSERT INTO SUPABASE
    // ------------------------------

    const { error } = await supabase
      .from("event_criteria")
      .insert(data);

    // ------------------------------
    // HANDLE ERROR
    // ------------------------------

    if (error) {
      console.log("Supabase Error:", error);

      alert(error.message);

      setLoading(false);

      return;
    }

    // ------------------------------
    // SUCCESS
    // ------------------------------

    alert(
      `Criteria for "${event}" added successfully!`
    );

    // ------------------------------
    // RESET FORM
    // ------------------------------

    setCriteriaList([
      {
        criteria: "",
        conditions: "",
        max_marks: "",
      },
    ]);

    setEvent("");

    setLoading(false);
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        {/* ============================== */}
        {/* HEADER */}
        {/* ============================== */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Add Event Criteria
          </h1>

          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => {
              window.location.href =
                "/admin/dashboard";
            }}
          >
            Back
          </button>

        </div>

        {/* ============================== */}
        {/* MAIN BOX */}
        {/* ============================== */}

        <div className="bg-white p-6 rounded-xl shadow">

          {/* ============================== */}
          {/* EVENT SELECTION */}
          {/* ============================== */}

          <label className="font-bold">
            Select Event
          </label>

          <select
            className="border p-3 w-full mt-2 mb-6 rounded"
            value={event}
            onChange={(e) =>
              setEvent(e.target.value)
            }
          >

            <option value="">
              Select Event
            </option>

            {events.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

          {/* ============================== */}
          {/* CRITERIA HEADING */}
          {/* ============================== */}

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Criteria
            </h2>

            <div className="text-sm font-semibold text-gray-600">
              Total:{" "}
              {criteriaList.reduce(
                (total, item) =>
                  total +
                  Number(item.max_marks || 0),
                0
              )}{" "}
              / 100
            </div>

          </div>

          {/* ============================== */}
          {/* CRITERIA LIST */}
          {/* ============================== */}

          {criteriaList.map(
            (item, index) => (

              <div
                key={index}
                className="border rounded-lg p-4 mb-4 bg-gray-50"
              >

                {/* ============================== */}
                {/* CRITERIA HEADER */}
                {/* ============================== */}

                <div className="flex justify-between items-center mb-3">

                  <h3 className="font-bold">
                    Criteria {index + 1}
                  </h3>

                  {criteriaList.length > 1 && (
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() =>
                        removeCriteria(index)
                      }
                    >
                      Remove
                    </button>
                  )}

                </div>

                {/* ============================== */}
                {/* CRITERIA NAME */}
                {/* ============================== */}

                <label className="font-semibold">
                  Criteria Name
                </label>

                <input
                  type="text"
                  className="border p-3 w-full mt-1 mb-4 rounded"
                  placeholder="Example: UI Design"
                  value={item.criteria}
                  onChange={(e) =>
                    changeCriteria(
                      index,
                      "criteria",
                      e.target.value
                    )
                  }
                />

                {/* ============================== */}
                {/* CONDITIONS */}
                {/* ============================== */}

                <label className="font-semibold">
                  Conditions
                </label>

                <input
                  type="text"
                  className="border p-3 w-full mt-1 mb-4 rounded"
                  placeholder="Example: Responsive layout"
                  value={item.conditions}
                  onChange={(e) =>
                    changeCriteria(
                      index,
                      "conditions",
                      e.target.value
                    )
                  }
                />

                {/* ============================== */}
                {/* MAXIMUM MARKS */}
                {/* ============================== */}

                <label className="font-semibold">
                  Maximum Marks
                </label>

                <input
                  type="number"
                  min="1"
                  className="border p-3 w-full mt-1 rounded"
                  placeholder="Example: 20"
                  value={item.max_marks}
                  onChange={(e) =>
                    changeCriteria(
                      index,
                      "max_marks",
                      e.target.value
                    )
                  }
                />

              </div>

            )
          )}

          {/* ============================== */}
          {/* ADD CRITERIA BUTTON */}
          {/* ============================== */}

          <button
            type="button"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded mb-5"
            onClick={addCriteria}
          >
            + Add Another Criteria
          </button>

          {/* ============================== */}
          {/* TOTAL MARKS */}
          {/* ============================== */}

          <div className="border rounded-lg p-4 mb-5 bg-gray-50">

            <div className="flex justify-between">

              <span className="font-semibold">
                Total Maximum Marks
              </span>

              <span
                className={`font-bold ${
                  criteriaList.reduce(
                    (total, item) =>
                      total +
                      Number(item.max_marks || 0),
                    0
                  ) === 100
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {criteriaList.reduce(
                  (total, item) =>
                    total +
                    Number(item.max_marks || 0),
                  0
                )}{" "}
                / 100
              </span>

            </div>

          </div>

          {/* ============================== */}
          {/* SAVE BUTTON */}
          {/* ============================== */}

          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded w-full disabled:opacity-50"
            onClick={saveCriteria}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save All Criteria"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddCriteria;