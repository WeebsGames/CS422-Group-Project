// Events Finder — Homework Starter
// Goal: implement a small state-driven UI (UI = f(state)).
//
// Rules:
// 1) Keep a single source of truth in `state`.
// 2) Event handlers update state, then call `render()`.
// 3) `render()` draws the UI from state (do not “patch” UI elsewhere).

// --- Data (Model) ---
const EVENTS = [
  { title: "Jazz in the Park", venue: "Millennium Park", date: "2026-02-01", free: true },
  { title: "Museum Late Night", venue: "Art Institute", date: "2026-01-29", free: false },
  { title: "Knitting Circle", venue: "Oak Park Public Library", date: "2026-01-25", free: true },
  { title: "Winter Food Fest", venue: "Navy Pier", date: "2026-02-10", free: false },
  { title: "Beginner Yoga", venue: "Garfield Park Conservatory", date: "2026-01-23", free: true },
  { title: "Indie Film Screening", venue: "Gene Siskel Film Center", date: "2026-02-03", free: false },
];

// --- State (single source of truth) ---
const state = {
  query: "",
  freeOnly: false,
  sort: "dateAsc",
};

// --- Elements (View references) ---
const els = {
  q: document.querySelector("#q"),
  freeOnly: document.querySelector("#freeOnly"),
  sort: document.querySelector("#sort"),
  status: document.querySelector("#status"),
  results: document.querySelector("#results"),
};

// --- Helpers ---
function matchesQuery(ev, q) {
  const hay = (ev.title + " " + ev.venue).toLowerCase();
  return hay.includes(q.toLowerCase());
}

// TODO 1: implement sorting based on state.sort
function compareByDate(a, b) {
  // Hint: const da = new Date(a.date); const db = new Date(b.date);
  // For ascending, return da - db; for descending, return db - da (or negate).
  const da = new Date(a.date)
  const db = new Date(b.date)
  if (state.sort == "dateAsc"){
    return da-db
  }
  return db-da;
}

// TODO 2: return a filtered + sorted list based on `state`
function getVisibleEvents() {
  // Steps:
  // - start with EVENTS.slice()
  // - filter by query (if state.query not empty)
  // - filter by freeOnly (if state.freeOnly true)
  // - sort with compareByDate
  return EVENTS;
}

// TODO 3: render status line + results list + empty state
function render() {
  // Requirements:
  // - status: "Showing X of Y events"
  // - clear results and re-render from scratch
  // - if X === 0, show an empty-state message
}

// TODO 4: wire up event listeners (input/change) that update state and call render()
function wireEvents() {
  // - q input: update state.query
  // - freeOnly change: update state.freeOnly
  // - sort change: update state.sort
}

wireEvents();
render();
