import { useState } from "react";
import TimetableGrid, { COLOR_CYCLE } from "../components/TimetableGrid";
import Icon from "../components/Icon";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Seed data so the grid isn't empty on first load
//Here backend time table will be fed.
const SEED_CLASSES = [
  {
    id: 1,
    day: "Monday",
    start: "09:00",
    end: "10:30",
    name: "Advanced Math",
    venue: "A-204",
    color: "blue",
    repeats: true,
  },
  {
    id: 2,
    day: "Monday",
    start: "14:00",
    end: "16:00",
    name: "Physics Lab",
    venue: "Lab D-1",
    color: "orange",
    repeats: false,
  },
  {
    id: 3,
    day: "Tuesday",
    start: "10:00",
    end: "12:00",
    name: "Organic Chem",
    venue: "B-108",
    color: "green",
    repeats: true,
  },
  {
    id: 4,
    day: "Tuesday",
    start: "13:00",
    end: "14:00",
    name: "Statistics",
    venue: "A-101",
    color: "blue",
    repeats: true,
  },
  {
    id: 5,
    day: "Wednesday",
    start: "08:00",
    end: "10:00",
    name: "Calculus",
    venue: "C-203",
    color: "orange",
    repeats: true,
  },
  {
    id: 6,
    day: "Wednesday",
    start: "12:00",
    end: "14:00",
    name: "English Lit",
    venue: "C-301",
    color: "green",
    repeats: false,
  },
  {
    id: 7,
    day: "Thursday",
    start: "09:00",
    end: "12:00",
    name: "Research Lab",
    venue: "Lab E-2",
    color: "purple",
    repeats: true,
  },
  {
    id: 8,
    day: "Thursday",
    start: "14:00",
    end: "16:00",
    name: "Seminar",
    venue: "Hall B",
    color: "blue",
    repeats: false,
  },
  {
    id: 9,
    day: "Friday",
    start: "10:00",
    end: "12:00",
    name: "Data Science",
    venue: "Lab C-3",
    color: "orange",
    repeats: true,
  },
  {
    id: 10,
    day: "Friday",
    start: "13:00",
    end: "14:00",
    name: "Office Hours",
    venue: "Prof. Rm",
    color: "green",
    repeats: false,
  },
];

const EMPTY_FORM = {
  title: "",
  day: "",
  start: "",
  end: "",
  venue: "",
  repeats: false,
};

export default function TimetablePage() {
  const [classes, setClasses] = useState(SEED_CLASSES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [day, setDay] = useState("Select a day");
  const [isRecurring, setIsRecurring] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  // const set = (field) => (e) =>
  //   setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggle = () => setIsRecurring((prev) => !prev);

  const inputCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md text-ink bg-white font-sans
     border outline-none transition-colors duration-150
     ${focused === field ? "border-accent" : errors[field] ? "border-red-300" : "border-border"}
     placeholder:text-ink-muted placeholder:opacity-60`;

  const selectCls = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg text-md bg-white font-sans cursor-pointer
     border outline-none transition-colors duration-150
     ${focused === field ? "border-accent" : errors[field] ? "border-red-300" : "border-border"}
     ${form[field] ? "text-ink" : "text-ink-muted"}`;

  const validate = () => {
    const e = {};
    if (title.trim()=="") e.title = "Title is required";
    if (!day) e.day = "Select a day";
    if (!startTime) e.start = "Start time required";
    if (!endTime) e.end = "End time required";
    if (venue.trim()=="") e.venue = "Venue is required";
    if (startTime && endTime && startTime >= endTime)
      e.endTIme = "End must be after start";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const color = COLOR_CYCLE[classes.length % COLOR_CYCLE.length];
    const newClass = {
      id: Date.now(),
      day: day,
      start: startTime,
      end: endTime,
      name: title,
      venue: venue,
      color,
      repeats: isRecurring,
    };
    setClasses((prev) => [...prev, newClass]);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const repeatCount = classes.filter((c) => c.repeats).length;

  return (
    <>
      {/* ── Backdrop blur overlay ─────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm"
          onClick={closeModal}
        />
      )}

      {/* ── Add Class Modal ───────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
          <div
            className="bg-white border border-border rounded-2xl shadow-login w-full max-w-md pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-soft">
              <div>
                <h2 className="text-lg font-semibold text-ink tracking-tight">
                  Add Class
                </h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  Schedule a new class in your timetable
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-muted hover:bg-paper hover:text-ink transition-colors duration-150"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                  Class title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Mathematics"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setFocused("title")}
                  onBlur={() => setFocused(null)}
                  className={inputCls("title")}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Day */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                  Day
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  onFocus={() => setFocused("day")}
                  onBlur={() => setFocused(null)}
                  className={selectCls("day")}
                >
                  <option value="" disabled>
                    Select day
                  </option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.day && (
                  <p className="text-xs text-red-500 mt-1">{errors.day}</p>
                )}
              </div>

              {/* Start + End */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                    Start time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    onFocus={() => setFocused("start")}
                    onBlur={() => setFocused(null)}
                    className={inputCls("start")}
                  />
                  {errors.start && (
                    <p className="text-xs text-red-500 mt-1">{errors.start}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                    End time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    onFocus={() => setFocused("end")}
                    onBlur={() => setFocused(null)}
                    className={inputCls("end")}
                  />
                  {errors.end && (
                    <p className="text-xs text-red-500 mt-1">{errors.end}</p>
                  )}
                </div>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5 tracking-label">
                  Venue / Room
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hall A-204"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  onFocus={() => setFocused("venue")}
                  onBlur={() => setFocused(null)}
                  className={inputCls("venue")}
                />
                {errors.venue && (
                  <p className="text-xs text-red-500 mt-1">{errors.venue}</p>
                )}
              </div>

              {/* Repeat toggle */}
              <div
                onClick={toggle}
                className={`
                  flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer
                  transition-all duration-150 select-none
                  ${
                    isRecurring
                      ? "bg-accent-light border-accent-mid"
                      : "bg-paper border-border hover:border-accent-mid"
                  }
                `}
              >
                {/* Custom checkbox */}
                <div
                  className={`
                    w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center
                    shrink-0 transition-colors duration-150
                    ${isRecurring ? "bg-accent border-accent" : "bg-white border-border"}
                  `}
                >
                  {form.repeats && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p
                    className={`text-md font-medium ${form.repeats ? "text-accent" : "text-ink"}`}
                  >
                    Repeat next week
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    This class will appear every week in your timetable
                  </p>
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-border-soft">
              <button onClick={closeModal} className="btn-ghost flex-1">
                Cancel
              </button>
              <button onClick={handleAdd} className="btn-primary flex-1">
                Add to Timetable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page content ──────────────────────────────────── */}
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-0.5">
          <div>
            <h1 className="text-3xl font-semibold text-ink tracking-tighter">
              Timetable
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-1.5"
          >
            <Icon name="plus" size={14} className="text-white" />
            Add Class
          </button>
        </div>
        <p className="text-md text-ink-muted mb-6">
          Spring Semester 2026 · {classes.length} classes · {repeatCount}{" "}
          repeating weekly
        </p>

        {/* Color legend */}
        <div className="flex gap-4 mb-5 flex-wrap">
          {classes.slice(0, 5).map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-1.5 text-xs text-ink-muted"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  c.color === "blue"
                    ? "bg-accent"
                    : c.color === "orange"
                      ? "bg-orange-400"
                      : c.color === "green"
                        ? "bg-green-500"
                        : c.color === "purple"
                          ? "bg-purple-400"
                          : "bg-rose-400"
                }`}
              />
              {c.name}
            </div>
          ))}
          {classes.length > 5 && (
            <span className="text-xs text-ink-muted">
              +{classes.length - 5} more
            </span>
          )}
        </div>

        {/* Grid */}
        <TimetableGrid classes={classes} />
      </div>
    </>
  );
}
