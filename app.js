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

// --- Mock Listings Data ---
const LISTINGS = [
  {
    id: 1,
    name: "Shadow Garden",
    description: "We lurk in the shadows to destroy the corrupt. Our group is focused on hype moments and aura. Join if you like aura farming.",
    tags: ["Expert", "3-5 hours", "Weekly", "5e (5th Edition)"],
    dm: "DarkLord99",
    members: ["Ren", "Kai", "Sora"],
    location: "Online",
    schedule: "Weekday Evenings",
    commitment: "Dedicated",
    playStyle: "Roleplay Heavy",
    experience: "Veteran",
  },
  {
    id: 2,
    name: "Arthur's Knights",
    description: "A beginner friendly group. We play as only knights and knight related classes. Chivalry above all!",
    tags: ["Beginner", "2-3 hours", "Weekly", "5e (5th Edition)", "≤ 1 mile away"],
    dm: "SirLancelot",
    members: ["Gwen", "Percy", "Merlin", "Elaine"],
    location: "Chicago, IL",
    schedule: "Weekend Afternoons",
    commitment: "Weekly",
    playStyle: "Balanced",
    experience: "Beginner",
  },
  {
    id: 3,
    name: "Over Stars",
    description: "We host space themed D&D sessions! All experience levels welcome. Explore the cosmos with us.",
    tags: ["Beginner", "1-2 hours", "Bi-weekly", "5e (5th Edition)"],
    dm: "CosmicDM",
    members: ["Luna", "Orion"],
    location: "Online",
    schedule: "Weekend Evenings",
    commitment: "Casual",
    playStyle: "Exploration Focused",
    experience: "Beginner",
  },
  {
    id: 4,
    name: "Generic Group Sixty Seven",
    description: "67.",
    tags: ["Intermediate", "1-2 hours", "Monthly", "5e (5th Edition)"],
    dm: "ChillDM",
    members: ["Alex", "Jordan", "Sam", "Riley", "Quinn"],
    location: "Online",
    schedule: "Flexible",
    commitment: "Semi-Regular",
    playStyle: "Balanced",
    experience: "Intermediate",
  },
  {
    id: 5,
    name: "It's Always Sunny in Baldurs Gate",
    description: "Hardcore players wanted. high difficulty campaigns with permadeath rules.",
    tags: ["Expert", "3-5 hours", "Weekly", "5e (5th Edition)", "1-2 miles away"],
    dm: "TPKMaster",
    members: ["Charlie", "Mac", "Dennis"],
    location: "Evanston, IL",
    schedule: "Weekday Evenings",
    commitment: "Hardcore",
    playStyle: "Combat Heavy",
    experience: "Veteran",
  },
  {
    id: 6,
    name: "Not so solo leveling",
    description: "A aura first group that loves hype moments and aura. We hate good writing",
    tags: ["Intermediate", "2-3 hours", "Weekly", "5e (5th Edition)"],
    dm: "Narrator",
    members: ["Bria", "Fenwick", "Talia", "Dorian"],
    location: "Online",
    schedule: "Weekday Evenings",
    commitment: "Weekly",
    playStyle: "Story Driven",
    experience: "Intermediate",
  },
  {
    id: 7,
    name: "looking for new players",
    description: "Brand new to D&D? This is the place. We teach the rules as we go and keep things super beginner friendly.",
    tags: ["Beginner", "≤ 1 hour", "Bi-weekly", "5e (5th Edition)"],
    dm: "PatientDM",
    members: ["Newbie1", "Newbie2"],
    location: "Online",
    schedule: "Weekend Mornings",
    commitment: "Casual",
    playStyle: "Balanced",
    experience: "Brand New",
  },
  {
    id: 8,
    name: "OnlyHands",
    description: "A campaign that ONLY casts Mage Hand. DON'T PICK A CLASS THAT CAN'T LEARN MAGE HAND.",
    tags: ["Intermediate", "2-3 hours", "Weekly", "5e (5th Edition)", "2-5 miles away"],
    dm: "RangerRick",
    members: ["Scout", "Tracker", "Willow", "Birch"],
    location: "Oak Park, IL",
    schedule: "Weekend Afternoons",
    commitment: "Weekly",
    playStyle: "Exploration Focused",
    experience: "Intermediate",
  },
  {
    id: 9,
    name: "Try hard builds only",
    description: "Play the meta or don't play at all.",
    tags: ["Advanced", "1-2 hours", "Monthly", "3.5e"],
    dm: "RotatingDM",
    members: ["Various"],
    location: "Online",
    schedule: "Flexible",
    commitment: "Casual",
    playStyle: "Balanced",
    experience: "Beginner",
  },
  {
    id: 10,
    name: "Critical Chaos",
    description: "High energy, combat-heavy sessions with tons of homebrew rules.",
    tags: ["Advanced", "3-5 hours", "Weekly", "Pathfinder 1e/2e"],
    dm: "CritFisher",
    members: ["Bash", "Slash", "Zap", "Boom", "Heal"],
    location: "Online",
    schedule: "Weekday Afternoons",
    commitment: "Weekly",
    playStyle: "Combat Heavy",
    experience: "Experienced",
  },
];

// --- State ---
const state = {
  query: "",
  page: "home", // home, search, filters, profile, my group listings, group page
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
    field: null,
  },
  search: {
    selectedListingId: 1,
  },
  filters: {
    active: [],   // applied filters shown in filter bar
    pending: [],  // selections on filter page before Apply
    fromPage: "search",
  },
  group: {
    selectedGroup: null,
  },
  chat: {
    // Keyed by group id. Each entry is an array of {sender, text, isMine}
    messagesByGroupId: {
      1: [
        { sender: "DarkLord69", text: "Welcome.", isMine: false, isDM: true },
      ],
      2: [
        { sender: "SirLancelot", text: "Welcome", isMine: false, isDM: true },
      ],
      3: [
        { sender: "CosmicDM", text: "Welcome", isMine: false, isDM: true },
      ],
      6: [
        { sender: "Narrator", text: "Welcome", isMine: false, isDM: true },
      ],
    },
  },
  joinedGroupIds: [2, 3, 6],
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
  pageSearch: document.querySelector("#page-search"),
  pageFilters: document.querySelector("#page-filters"),
  pageProfile: document.querySelector("#page-profile"),
  pageCreateGroup: document.querySelector("#page-create-group"),
  createGroupBackBtn: document.querySelector("#create-group-back-btn"),
  listingsPanel: document.querySelector("#listings-panel"),
  detailPanel: document.querySelector("#detail-panel"),
  filterTags: document.querySelector("#filter-tags"),
  filterIconBtn: document.querySelector("#filter-icon-btn"),
  filterBackBtn: document.querySelector("#filter-back-btn"),
  applyFiltersBtn: document.querySelector("#apply-filters-btn"),
  filterSelectionCount: document.querySelector("#filter-selection-count"),
  overlay: document.querySelector("#overlay"),
  overlayTitle: document.querySelector("#overlay-title"),
  overlayBody: document.querySelector("#overlay-body"),
  overlayClose: document.querySelector("#overlay-close"),
  displayName: document.querySelector("#display-name"),
  displayRole: document.querySelector("#display-role"),
  pageGroup: document.querySelector("#page-group"),
  pageGroupListing: document.querySelector("#group-listing"),
  pageChat: document.querySelector("#page-chat"),
  navLogo: document.querySelector(".nav-logo"),
  logoFallback: document.querySelector("#logo-fallback"),
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

// --- Helpers ---
function listingMatchesSearch(listing, query) {
  if (!query) return true;

  const searchableText = [
    listing.name,
    listing.description,
    listing.dm,
    listing.location,
    listing.schedule,
    listing.commitment,
    listing.playStyle,
    listing.experience,
    ...(listing.tags || []),
    ...(listing.members || []),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

// --- Render ---
function render() {
  // Show/hide pages
  els.pageHome.style.display = state.page === "home" ? "flex" : "none";
  els.pageSearch.style.display = state.page === "search" ? "block" : "none";
  els.pageFilters.style.display = state.page === "filters" ? "block" : "none";
  els.pageProfile.style.display = state.page === "profile" ? "block" : "none";
  els.pageCreateGroup.style.display = state.page === "createGroup" ? "block" : "none";
  els.pageGroup.style.display = state.page === "group" ? "block" : "none";
  els.pageGroupListing.style.display = state.page === "myGroups" ? "block" : "none";
  els.pageChat.style.display = state.page === "chat" ? "flex" : "none";

  // Sync search
  els.navSearch.value = state.query;
  if (els.heroSearch) {
    els.heroSearch.value = state.query;
  }

  // Render search page
  if (state.page === "search") {
    renderListings();
    renderDetail();
    renderFilterBar();
  }

  // Render filter page selections
  if (state.page === "filters") {
    renderFilterPage();
  }

  // Render group page
  if (state.page === "group") {
    renderGroup();
  }

  // Render my groups page
  if (state.page === "myGroups") {
    renderMyGroups();
  }

  // Render chat page
  if (state.page === "chat") {
    renderChat();
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

function renderMyGroups() {
  const query = state.query.trim().toLowerCase();

  let joined = state.joinedGroupIds
    .map(id => LISTINGS.find(l => l.id === id))
    .filter(Boolean);

  if (query) {
    joined = joined.filter((listing) => listingMatchesSearch(listing, query));
  }

  if (state.filters.active.length > 0) {
    joined = joined.filter((l) =>
      state.filters.active.some((tag) => l.tags.includes(tag))
    );
  }

  const emptyMessage = joined.length === 0
    ? state.filters.active.length > 0 || query
      ? "No joined groups match your search or filters."
      : "You haven't joined any groups yet. Find one on the search page!"
    : "";

  els.pageGroupListing.innerHTML = `
    <div class="my-groups-header">
      <h1 class="my-groups-title">My Groups</h1>
      <button class="filter-btn" id="my-groups-filter-btn" aria-label="Open filters">
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
      </button>
    </div>

    <div class="my-groups-list">
      ${joined.length === 0 ? `
        <p class="my-groups-empty">${emptyMessage}</p>
      ` : joined.map(group => `
        <div class="my-group-card" data-id="${group.id}">
          <div class="my-group-left">
            <h3>${group.name}</h3>
            <p>${group.description}</p>
          </div>

          <div class="my-group-right">
            <ul>
              <li>${group.experience === "Veteran" ? "Experienced Only" : group.experience}</li>
              <li>${group.commitment}</li>
              <li>${group.location === "Online" ? "Online" : "In-Person"}</li>
            </ul>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  document.querySelectorAll(".my-group-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = Number(card.getAttribute("data-id"));
      const group = LISTINGS.find(l => l.id === id);

      state.group.selectedGroup = group;
      state.page = "group";
      render();
    });
  });

  const myGroupsFilterBtn = document.getElementById("my-groups-filter-btn");
  if (myGroupsFilterBtn) {
    myGroupsFilterBtn.addEventListener("click", () => {
      state.filters.pending = [...state.filters.active];
      state.filters.fromPage = "myGroups";
      state.page = "filters";
      render();
    });
  }
}

function renderGroup() {
  const group = state.group.selectedGroup;
  if (!group) return;

  els.pageGroup.innerHTML = `
    <div class="group-header">
      <button class="back-btn" id="group-back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
      </button>
      <h2 class="group-title">${group.name}</h2>
      <div class="group-actions">
        <button class="icon-btn" id="group-chat-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M7 21v-2a4 4 0 0 1 3-3.87"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="15" height="10" rx="2"/>
            <polygon points="17 12 22 9 22 15 17 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="group-layout">
      <div class="group-left">

        <section class="group-about">
          <h3>About Us</h3>
          <p>${group.description}</p>

          <div class="group-tags">
            ${group.tags.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
        </section>

        <section class="group-members">
          <h3>Members</h3>

          <div class="member">
            <div class="member-circle"></div>
            <span>${group.dm}</span>
            <button class="role-btn dm">👑 DM</button>
          </div>

          ${group.members.map(m => `
            <div class="member">
              <div class="member-circle"></div>
              <span>${m}</span>
              <button class="role-btn">Player</button>
            </div>
          `).join("")}

        </section>

      </div>

      <div class="group-right">
        <h3>Campaign Calendar</h3>
        <div class="calendar-box">
          <div class="calendar-grid">
            ${[...Array(14)].map((_, i) => `
              <span class="${[8,12].includes(i) ? "active" : ""}">
                ${i+1}
              </span>
            `).join("")}
          </div>
        </div>

        <div class="upcoming-box">
          <h4>Upcoming Campaigns</h4>

          <div class="group-event">
            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3 7h7l-5.5 5 2 7-6.5-4-6.5 4 2-7L2 9h7z"/>
            </svg>
            September 9 <br>
            <small>${group.location}</small>
          </div>
          <div class="group-event">
            <svg class="star-icon" xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3 7h7l-5.5 5 2 7-6.5-4-6.5 4 2-7L2 9h7z"/>
            </svg>
            September 13 <br>
            <small>${group.location}</small>
          </div>
        </div>

      </div>
    </div>
  `;

  document.getElementById("group-back-btn").addEventListener("click", () => {
    state.page = "myGroups";
    render();
  });

  document.getElementById("group-chat-btn").addEventListener("click", () => {
    state.page = "chat";
    render();
  });
}

function ensureChatExists(groupId, dmName = "DM") {
  if (!state.chat.messagesByGroupId) {
    state.chat.messagesByGroupId = {};
  }

  if (!state.chat.messagesByGroupId[groupId]) {
    state.chat.messagesByGroupId[groupId] = [
      {
        sender: dmName,
        text: "Welcome.",
        isMine: false,
        isDM: true,
      },
    ];
  }
}

function initializeAllChats() {
  LISTINGS.forEach(group => {
    ensureChatExists(group.id, group.dm);
  });
}

// --- Render Chat ---
function renderChat() {
  const group = state.group.selectedGroup;
  if (!group) return;

  if (!state.chat.messagesByGroupId[group.id]) {
    state.chat.messagesByGroupId[group.id] = [];
  }
  const messages = state.chat.messagesByGroupId[group.id];

  const avatarSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4"/>
      <path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  `;

  els.pageChat.innerHTML = `
    <div class="group-header">
      <button class="back-btn" id="chat-back-btn" aria-label="Go back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
      </button>
      <h2 class="group-title">${group.name}</h2>
      <div class="group-actions">
        <button class="icon-btn" aria-label="Members">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M7 21v-2a4 4 0 0 1 3-3.87"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
        <button class="icon-btn" id="chat-video-btn" aria-label="Video call">
          <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="7" width="15" height="10" rx="2"/>
            <polygon points="17 12 22 9 22 15 17 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="chat-messages" id="chat-messages">
      ${messages.map(m => `
        <div class="chat-msg ${m.isMine ? "mine" : "theirs"}">
          <div class="chat-avatar">
            ${m.isDM ? '<span class="crown">👑</span>' : ""}
            ${avatarSvg}
          </div>
          <div class="chat-bubble">${escapeHtml(m.text)}</div>
        </div>
      `).join("")}
    </div>

    <div class="chat-input-bar">
      <button class="chat-plus-btn" aria-label="Add">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
      <input type="text" class="chat-text-input" id="chat-text-input" placeholder="Send message" />
      <button class="chat-send-btn" id="chat-send-btn" aria-label="Send">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  `;

  const msgsEl = document.getElementById("chat-messages");
  msgsEl.scrollTop = msgsEl.scrollHeight;

  document.getElementById("chat-back-btn").addEventListener("click", () => {
    state.page = "group";
    render();
  });

  document.getElementById("chat-video-btn").addEventListener("click", () => {
    // intentionally no-op for prototype
  });

  const input = document.getElementById("chat-text-input");
  const sendBtn = document.getElementById("chat-send-btn");

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    state.chat.messagesByGroupId[group.id].push({
      sender: state.profile.name || "You",
      text,
      isMine: true,
      isDM: false,
    });
    render();
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

// Tiny HTML escape helper for chat messages
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Render Listings ---
function renderListings() {
  els.listingsPanel.innerHTML = "";

  const query = state.query.trim().toLowerCase();

  let filtered = LISTINGS.filter((listing) => listingMatchesSearch(listing, query));

  if (state.filters.active.length > 0) {
    filtered = filtered.filter((l) => {
      return state.filters.active.some((tag) => l.tags.includes(tag));
    });
  }

  if (filtered.length === 0) {
    state.search.selectedListingId = null;
    els.listingsPanel.innerHTML = '<div class="listings-empty">No groups match your search or filters.</div>';
    return;
  }

  if (!filtered.find((l) => l.id === state.search.selectedListingId)) {
    state.search.selectedListingId = filtered[0].id;
  }

  filtered.forEach((listing) => {
    const card = document.createElement("div");
    card.className = "listing-card";
    if (listing.id === state.search.selectedListingId) {
      card.classList.add("listing-card-active");
    }

    card.innerHTML = `
      <h3 class="listing-name">${listing.name}</h3>
      <p class="listing-desc">${listing.description}</p>
      <div class="listing-tags">
        ${listing.tags.map((t) => `<span class="listing-tag">${t}</span>`).join("")}
      </div>
    `;

    card.addEventListener("click", () => {
      state.search.selectedListingId = listing.id;
      render();
    });

    els.listingsPanel.appendChild(card);
  });
}

// --- Render Detail Panel ---
function renderDetail() {
  const listing = LISTINGS.find((l) => l.id === state.search.selectedListingId);
  if (!listing) {
    els.detailPanel.innerHTML = '<div class="detail-empty">Select a group to see details.</div>';
    return;
  }

  const memberCircles = listing.members.map(() => `<span class="member-circle"></span>`).join("");
  const isJoined = state.joinedGroupIds.includes(listing.id);

  els.detailPanel.innerHTML = `
    <h2 class="detail-name">${listing.name}</h2>
    <div class="detail-row">
      <span class="detail-label">DM</span>
      <span class="detail-value"><span class="dm-crown">&#128081;</span> <span class="member-circle"></span></span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Members</span>
      <span class="detail-value">${memberCircles}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Location</span>
      <span class="detail-value">${listing.location}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Schedule</span>
      <span class="detail-value">${listing.schedule}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Commitment level</span>
      <span class="detail-value">${listing.commitment}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Play style</span>
      <span class="detail-value">${listing.playStyle}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Experience</span>
      <span class="detail-value">${listing.experience}</span>
    </div>
    <div class="detail-action">
      <button class="request-join-btn" id="request-join-btn" ${isJoined ? "disabled" : ""}>
        ${isJoined ? "Joined ✓" : "Request to join"}
      </button>
    </div>
  `;

  const joinBtn = document.getElementById("request-join-btn");
  if (joinBtn && !isJoined) {
    joinBtn.addEventListener("click", () => {
      if (!state.joinedGroupIds.includes(listing.id)) {
        state.joinedGroupIds.push(listing.id);
      }
      render();
    });
  }
}

// --- Render Overlay ---
function renderOverlay() {
  const field = state.overlay.field;
  els.overlayTitle.textContent = "Select " + FIELD_LABELS[field];
  els.overlayBody.innerHTML = "";

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

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveBtn.click();
      }
    });

    els.overlayBody.appendChild(input);
    els.overlayBody.appendChild(saveBtn);
    setTimeout(() => input.focus(), 50);
    return;
  }

  const options = OPTIONS[field];
  if (!options) return;

  options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "overlay-option-btn";
    btn.textContent = option;

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

// --- Render Filter Bar (tags on search page) ---
function renderFilterBar() {
  els.filterTags.innerHTML = "";
  state.filters.active.forEach((tag) => {
    const span = document.createElement("span");
    span.className = "filter-bar-tag";
    span.textContent = tag;

    const removeBtn = document.createElement("span");
    removeBtn.className = "filter-bar-tag-remove";
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.filters.active = state.filters.active.filter((t) => t !== tag);
      render();
    });

    span.appendChild(removeBtn);
    els.filterTags.appendChild(span);
  });
}

// --- Render Filter Page ---
function renderFilterPage() {
  els.filterSelectionCount.textContent = state.filters.pending.length + " / 4 selected";

  document.querySelectorAll("#page-filters .ftag").forEach((btn) => {
    const val = btn.getAttribute("data-value");
    if (state.filters.pending.includes(val)) {
      btn.classList.add("ftag-selected");
    } else {
      btn.classList.remove("ftag-selected");
    }
  });
}

// --- Navigate to search ---
function goToSearch() {
  state.page = "search";
  render();
}

// --- Event Listeners ---
function wireEvents() {
  // Nav search
  els.navSearch.addEventListener("focus", () => {
    state.filters.active = [];
    goToSearch();
  });

  els.navSearch.addEventListener("input", (e) => {
    state.query = e.target.value;
    if (state.page !== "search") {
      state.page = "search";
    }
    render();
  });

  // Hero search
  els.heroSearch.addEventListener("focus", () => {
    goToSearch();
  });

  els.heroSearch.addEventListener("input", (e) => {
    state.query = e.target.value;
    if (state.page !== "search") {
      state.page = "search";
    }
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

  // Profile field clicks
  els.displayName.addEventListener("click", () => openOverlay("name"));
  els.displayRole.addEventListener("click", () => openOverlay("role"));

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

  els.overlay.addEventListener("click", (e) => {
    if (e.target === els.overlay) {
      state.overlay.open = false;
      state.overlay.field = null;
      render();
    }
  });

  // Filter page
  els.filterIconBtn.addEventListener("click", () => {
    state.filters.pending = [...state.filters.active];
    state.filters.fromPage = "search";
    state.page = "filters";
    render();
  });

  els.filterBackBtn.addEventListener("click", () => {
    state.page = state.filters.fromPage || "search";
    render();
  });

  els.applyFiltersBtn.addEventListener("click", () => {
    state.filters.active = [...state.filters.pending];
    state.page = state.filters.fromPage || "search";
    render();
  });

  document.querySelectorAll("#page-filters .ftag").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-value");
      if (state.filters.pending.includes(val)) {
        state.filters.pending = state.filters.pending.filter((t) => t !== val);
      } else if (state.filters.pending.length < 4) {
        state.filters.pending.push(val);
      }
      renderFilterPage();
    });
  });

  function goHome() {
    state.page = "home";
    state.query = "";
    render();
  }

  if (els.navLogo) {
    els.navLogo.style.cursor = "pointer";
    els.navLogo.addEventListener("click", goHome);
  }

  if (els.logoFallback) {
    els.logoFallback.style.cursor = "pointer";
    els.logoFallback.addEventListener("click", goHome);
  }

  els.myGroupsBtn.addEventListener("click", () => {
    state.filters.active = [];
    state.page = "myGroups";
    render();
  });

  els.createBtn.addEventListener("click", () => {
    state.page = "createGroup";
    render();
  });

  els.createGroupBackBtn.addEventListener("click", () => {
    state.page = "home";
    render();
  });
}

wireEvents();
initializeAllChats();
render();
