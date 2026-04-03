# Homework: Events Finder — UI Programming (UI = f(state))

## Goal
Build a small state-driven interface in vanilla JavaScript that supports **search + filter + sort + feedback**.

You should practice the UI programming loop:
**Events → update state → render UI → user sees feedback**

---

## Getting started

### Option A: VS Code + Live Server (recommended)
1. Install VS Code.
2. Install the extension **Live Server** (publisher: Ritwick Dey).
3. Open this folder in VS Code.
4. Right-click `index.html` → **Open with Live Server**.

### Option B: No extension
Double-click `index.html` to open it in your browser.
(You will need to refresh the page after changes.)

---

## Completion checklist (what to do)
Work in `app.js` and do your best to implement the TODOs:

- [ ] Implement `compareByDate(a, b)` (sort ascending/descending)
- [ ] Implement `getVisibleEvents()` (filter + sort based on `state`)
- [ ] Implement `render()` (status line + results list + empty state)
- [ ] Implement `wireEvents()` (event listeners update `state` then call `render()`)

### Architecture guideline (helps you succeed)
- Keep truth in `state` (query, filter, sort).
- Event handlers update state and call `render()`.
- `render()` reads from state and updates the DOM.

---

## Reflection (required — put answers in this README before submitting)
Answer in 2–4 sentences each:

1. **Learnability:** What feedback would you want the UI to show after user actions? Why does it help?
2. **Efficiency:** What feature in this UI reduces effort/time for common tasks? Why?
3. **Safety:** What would prevent confusion or errors? (e.g., empty state, clear status, preventing invalid states)

---

## Submission (graded on completion)
Submit these files:
- `index.html`
- `style.css`
- `app.js`
- `README.md` (with your reflection answers included)

### Grading (completion-based)
This homework is graded on **completion**, not correctness.
- Full credit if you:
  - made a sincere attempt at the TODOs in `app.js`, and
  - included the reflection answers in `README.md`.

If your code isn’t fully working, that’s okay — submit what you have. Your goal is to practice the mental model and identify what you’d fix next.

---

## Optional exercises (not graded — for mastery)
Pick any 1–3 if you want extra practice:

1. **Persistence (+1 skill):** Save `{query, freeOnly, sort}` to `localStorage` on each change; restore on load.
2. **Keyboard shortcut:** Press `/` to focus the search box.
3. **Extra filter:** Add a venue dropdown filter generated from the data.
4. **Async UI:** Simulate loading with a “Loading…” state for 500ms before showing results.
5. **Safety upgrade:** Add a “Clear filters” button and show a confirmation *only* if it would discard typed input.
6. **Accessibility upgrade:** Add a “Skip to results” link and ensure focus order is logical.

(You don’t need to submit these; they’re for your own practice.)
