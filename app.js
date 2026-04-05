// D&D Group Finder — State-driven UI
// UI = f(state)

// --- Options Data ---
const OPTIONS = {
  role: [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk",
    "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard", "Artificer"
  ],
  playStyle: [
    "Roleplay Heavy", "Combat Heavy", "Balanced", "Exploration Focused", "Story Driven"
  ],
  experience: [
    "Brand New", "Beginner", "Intermediate", "Experienced", "Veteran"
  ],
  commitment: [
    "Casual", "Semi-Regular", "Weekly", "Dedicated", "Hardcore"
  ],
  schedule: [
    "Weekday Mornings", "Weekday Afternoons", "Weekday Evenings",
    "Weekend Mornings", "Weekend Afternoons", "Weekend Evenings", "Flexible"
  ],
};

// --- State ---
const state = {
  query: "",
  page: "home",
  profile: {
    name: "",
    role: "",
    playStyle: "",
    experience: "",
    commitment: "",
    location: "",
    schedule: "",
  },
  overlay: {
    open: false,
    field: null, // which field is being edited
  },
};

// --- Element References ---
const els = {
  navSearch: document.querySelector("#nav-search"),
  heroSearch: document.querySelector("#hero-search"),
  myGroupsBtn: document.querySelector("#my-groups-btn"),
  createBtn: document.querySelector("#create-btn"),
  profileBtn: document.querySelector("#profile-btn"),
  backBtn: document.querySelector("#back-btn"),
  pageHome: document.querySelector("#page-home"),
  pageProfile: document.querySelector("#page-profile"),
  overlay: document.querySelector("#overlay"),
  overlayTitle: document.querySelector("#overlay-title"),
  overlayBody: document.querySelector("#overlay-body"),
  overlayClose: document.querySelector("#overlay-close"),
  displayName: document.querySelector("#display-name"),
  displayRole: document.querySelector("#display-role"),
};

// --- Field display names ---
const FIELD_LABELS = {
  name: "Name",
  role: "Role",
  playStyle: "Play Style",
  experience: "Experience Level",
  commitment: "Commitment Level",
  location: "Location",
  schedule: "Schedule",
};

// --- Render ---
function render() {
  // Show/hide pages
  els.pageHome.style.display = state.page === "home" ? "flex" : "none";
  els.pageProfile.style.display = state.page === "profile" ? "block" : "none";

  // Sync search
  els.navSearch.value = state.query;
  if (state.page === "home") {
    els.heroSearch.value = state.query;
  }

  // Update profile display values
  els.displayName.textContent = state.profile.name || "[Name]";
  els.displayRole.textContent = state.profile.role || "[Role]";

  const fields = ["playStyle", "experience", "commitment", "location", "schedule"];
  fields.forEach((field) => {
    const el = document.querySelector("#display-" + field);
    if (el) {
      const val = state.profile[field];
      if (val) {
        el.textContent = val;
        el.classList.add("field-value-filled");
      } else {
        el.textContent = field === "location" ? "Enter..." : "Select...";
        el.classList.remove("field-value-filled");
      }
    }
  });

  // Overlay
  if (state.overlay.open) {
    els.overlay.style.display = "flex";
    renderOverlay();
  } else {
    els.overlay.style.display = "none";
  }
}

function renderOverlay() {
  const field = state.overlay.field;
  els.overlayTitle.textContent = "Select " + FIELD_LABELS[field];
  els.overlayBody.innerHTML = "";

  // Text input fields: name and location
  if (field === "name" || field === "location") {
    els.overlayTitle.textContent = "Enter " + FIELD_LABELS[field];

    const input = document.createElement("input");
    input.type = "text";
    input.className = "overlay-text-input";
    input.placeholder = "Type your " + FIELD_LABELS[field].toLowerCase() + "...";
    input.value = state.profile[field] || "";

    const saveBtn = document.createElement("button");
    saveBtn.className = "overlay-save-btn";
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
      state.profile[field] = input.value.trim();
      state.overlay.open = false;
      state.overlay.field = null;
      render();
    });

    // Allow enter key to save
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveBtn.click();
      }
    });

    els.overlayBody.appendChild(input);
    els.overlayBody.appendChild(saveBtn);

    // Auto-focus the input
    setTimeout(() => input.focus(), 50);
    return;
  }

  // Button-select fields
  const options = OPTIONS[field];
  if (!options) return;

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "overlay-option-btn";
    btn.textContent = option;

    // Highlight current selection
    if (state.profile[field] === option) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      state.profile[field] = option;
      state.overlay.open = false;
      state.overlay.field = null;
      render();
    });

    els.overlayBody.appendChild(btn);
  });
}

// --- Open overlay for a field ---
function openOverlay(field) {
  state.overlay.open = true;
  state.overlay.field = field;
  render();
}

// --- Event Listeners ---
function wireEvents() {
  // Search sync
  els.navSearch.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  els.heroSearch.addEventListener("input", (e) => {
    state.query = e.target.value;
    render();
  });

  // Page navigation
  els.profileBtn.addEventListener("click", () => {
    state.page = "profile";
    render();
  });

  els.backBtn.addEventListener("click", () => {
    state.page = "home";
    render();
  });

  // Profile field clicks — name and role in top row
  els.displayName.addEventListener("click", () => openOverlay("name"));
  els.displayRole.addEventListener("click", () => openOverlay("role"));

  // Profile field clicks — the five fields
  document.querySelectorAll(".profile-field[data-field]").forEach((el) => {
    el.addEventListener("click", () => {
      const field = el.getAttribute("data-field");
      openOverlay(field);
    });
  });

  // Overlay close
  els.overlayClose.addEventListener("click", () => {
    state.overlay.open = false;
    state.overlay.field = null;
    render();
  });

  // Close overlay on background click
  els.overlay.addEventListener("click", (e) => {
    if (e.target === els.overlay) {
      state.overlay.open = false;
      state.overlay.field = null;
      render();
    }
  });

  // Placeholder nav buttons
  els.myGroupsBtn.addEventListener("click", () => {
    console.log("Navigate to My Groups");
  });

  els.createBtn.addEventListener("click", () => {
    console.log("Navigate to Create Group");
  });
}

wireEvents();
render();
