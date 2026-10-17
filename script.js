"use strict";

/*
=========================================
SEHAT SAATHI — HOSPITAL DATA
16 HOSPITALS
=========================================
*/

const HOSPITALS = [
  {
    name: "Aga Khan University Hospital",
    tag: "Private hospital",
    img: "images/aga-khan.jpg",
    text: "Explore hospital information, medical services and patient resources.",
    url: "https://hospitals.aku.edu/",
  },
  {
    name: "Indus Hospital",
    tag: "Healthcare services",
    img: "images/indus-hospital.jpg",
    text: "Learn about facilities and healthcare services.",
    url: "https://indushospital.org.pk/",
  },
  {
    name: "Jinnah Postgraduate Medical Centre",
    tag: "Medical centre",
    img: "images/jpmc.jpg",
    text: "Medical centre information and available resources.",
    url: "https://jpmc.edu.pk/",
  },
  {
    name: "Liaquat National Hospital",
    tag: "Private hospital",
    img: "images/lnh.jpg",
    text: "Multi-speciality hospital and medical college in Karachi.",
    url: "https://lnh.edu.pk/",
  },
  {
    name: "National Institute of Cardiovascular Diseases (NICVD)",
    tag: "Heart care",
    img: "images/nicvd.jpg",
    text: "Specialist institute for heart and cardiovascular care.",
    url: "https://nicvd.org/",
  },
  {
    name: "National Institute of Child Health (NICH)",
    tag: "Children's care",
    img: "images/nic.jpg",
    text: "Paediatric care and child health services.",
    url: "https://nich.edu.pk/",
  },
  {
    name: "Sindh Institute of Urology and Transplantation (SIUT)",
    tag: "Specialist care",
    img: "images/siut.jpg",
    text: "Kidney, urology and transplant services.",
    url: "https://siut.org/",
  },
  {
    name: "Tabba Heart Institute",
    tag: "Heart care",
    img: "images/thi.jpg",
    text: "Cardiac care and heart health information.",
    url: "https://tabbaheart.org/",
  },
  {
    name: "Saifee Hospital",
    tag: "Private hospital",
    img: "images/sah.jpg",
    text: "Community hospital offering a range of medical services.",
    url: "https://saifeehospital.com/",
  },
  {
    name: "South City Hospital",
    tag: "Private hospital",
    img: "images/sh.jpg",
    text: "Multi-speciality hospital in Karachi.",
    url: "https://southcityhospital.org/",
  },
  {
    name: "Medicare Cardiac and General Hospital",
    tag: "Heart and general care",
    img: "images/mc.jpg",
    text: "Cardiac care and general medical services in Karachi.",
    url: "https://medicarehospital.pk/",
  },
  {
    name: "Civil Hospital Karachi",
    tag: "Government hospital",
    img: "images/ch.jpg",
    text: "One of the city's large public hospitals.",
    url: "https://chk.gov.pk/",
  },
  {
    name: "Darul Sehat Hospital",
    tag: "Private hospital",
    img: "images/ds.jpg",
    text: "General and specialist healthcare services in Karachi.",
    url: "https://www.dsh.com.pk/",
  },
  {
    name: "Patel Hospital",
    tag: "Private hospital",
    img: "images/ph.jpg",
    text: "Private hospital with outpatient and inpatient services.",
    url: "https://patel-hospital.org.pk/",
  },
  {
    name: "Mamji Hospital",
    tag: "Private hospital",
    img: "images/mj.jpg",
    text: "Hospital in Karachi offering outpatient clinics, emergency care, diagnostic services, and inpatient facilities.",
    url: "https://mamjihospital.com/",
  },
  {
    name: "Orthopaedic and Medical Institute (OMI)",
    tag: "Private hospital",
    img: "images/omi.jpg",
    text: "Hospital in Karachi offering medical care and hospital services.",
    url: "https://www.omihospital.com/",
  },
];

/* Small helper: get an element by id */
function $(id) {
  return document.getElementById(id);
}

/* =====================================
   1. FEATURE A: MOBILE MENU (classList.toggle)
===================================== */
const menuToggle = $("menuToggle");
const mainNav = $("mainNav");

menuToggle.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕ Close" : "☰ Menu";
});

mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰ Menu";
  });
});

/* =====================================
   2. FEATURE B: DARK MODE (body.dark)
===================================== */
const themeToggle = $("themeToggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  if (themeMeta) {
    themeMeta.setAttribute("content", isDark ? "#101b19" : "#087f70");
  }
}

try {
  if (localStorage.getItem("sehat-theme") === "dark") {
    document.body.classList.add("dark");
  }
} catch (error) {
  /* storage not available: the toggle still works */
}
updateThemeButton();

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  updateThemeButton();
  try {
    localStorage.setItem("sehat-theme", isDark ? "dark" : "light");
  } catch (error) {
    /* ignore */
  }
});

/* =====================================
   3. BUILD 16 HOSPITAL CARDS + SELECT OPTIONS
===================================== */
const hospitalGrid = $("hospitalGrid");

HOSPITALS.forEach(function (h) {
  const card = document.createElement("article");
  card.className = "hospital-card";

  if (h.img) {
    const img = document.createElement("img");
    img.src = h.img;
    img.alt = h.name;
    img.loading = "lazy";
    card.appendChild(img);
  } else {
    const ph = document.createElement("div");
    ph.className = "card-placeholder";
    ph.setAttribute("aria-hidden", "true");
    ph.textContent = h.name.charAt(0) + "+";
    card.appendChild(ph);
  }

  const body = document.createElement("div");
  body.className = "card-body";

  const tag = document.createElement("p");
  tag.className = "tag";
  tag.textContent = h.tag;

  const title = document.createElement("h3");
  title.textContent = h.name;

  const text = document.createElement("p");
  text.textContent = h.text;

  const link = document.createElement("a");
  link.className = "btn btn-primary";
  link.href = h.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Official website ↗";

  body.append(tag, title, text, link);
  card.appendChild(body);
  hospitalGrid.appendChild(card);
});

["appointmentHospital", "consultHospital"].forEach(function (id) {
  const select = $(id);
  HOSPITALS.forEach(function (h) {
    const option = document.createElement("option");
    option.value = h.name;
    option.textContent = h.name;
    select.appendChild(option);
  });
});

/* =====================================
   4. VALIDATION HELPERS (no alert())
===================================== */
function showError(field, msgEl, message) {
  msgEl.textContent = message;
  msgEl.classList.add("error");
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
}

function clearError(field, msgEl) {
  msgEl.textContent = "";
  msgEl.classList.remove("error");
  field.classList.remove("invalid");
  field.removeAttribute("aria-invalid");
}

function isValidName(value) {
  return value.trim().length >= 3;
}

function isValidEmail(value) {
  const email = value.trim();

  if (
    !email ||
    email.length > 254 ||
    email.includes(" ") ||
    !email.includes("@") ||
    !email.includes(".")
  ) {
    return false;
  }

  const parts = email.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const local = parts[0];
  const domain = parts[1];

  return (
    local.length > 0 &&
    domain.length > 0 &&
    domain.includes(".") &&
    !domain.startsWith(".") &&
    !domain.endsWith(".") &&
    !domain.includes("..")
  );
}

/* Checks a list of {field, msg, test, text}; returns true if all pass */
function runChecks(checks) {
  let allValid = true;
  let firstBad = null;

  checks.forEach(function (c) {
    if (c.test()) {
      clearError(c.field, c.msg);
    } else {
      showError(c.field, c.msg, c.text);
      allValid = false;
      if (!firstBad) firstBad = c.field;
    }
  });

  if (firstBad) firstBad.focus();
  return allValid;
}

/* Clear a field's error as soon as the user types again */
function clearOnInput(pairs) {
  pairs.forEach(function (p) {
    const eventName = p[0].tagName === "SELECT" ? "change" : "input";
    p[0].addEventListener(eventName, function () {
      clearError(p[0], p[1]);
    });
  });
}

/* Builds <ul> with plain text items (safe: uses textContent) */
function buildList(items) {
  const ul = document.createElement("ul");
  items.forEach(function (text) {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
  return ul;
}

/* =====================================
   5. APPOINTMENT FORM + TOKEN + COUNTDOWN
===================================== */
const appointmentForm = $("appointmentForm");
const appointmentResult = $("appointmentResult");
const appointmentDate = $("appointmentDate");

const aName = $("patientName");
const aEmail = $("patientEmail");
const aHospital = $("appointmentHospital");
const aDept = $("appointmentDepartment");

const aNameMsg = $("patientNameMsg");
const aEmailMsg = $("patientEmailMsg");
const aHospitalMsg = $("appointmentHospitalMsg");
const aDeptMsg = $("appointmentDepartmentMsg");
const aDateMsg = $("appointmentDateMsg");

const tokenCard = $("tokenCard");
const MINUTES_PER_PATIENT = 7;
let countdownId = null;
let tokenCounter = 100 + Math.floor(Math.random() * 400);

function todayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

appointmentDate.min = todayString();

clearOnInput([
  [aName, aNameMsg],
  [aEmail, aEmailMsg],
  [aHospital, aHospitalMsg],
  [aDept, aDeptMsg],
  [appointmentDate, aDateMsg],
]);

appointmentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  appointmentDate.min = todayString();

  const valid = runChecks([
    {
      field: aName,
      msg: aNameMsg,
      test: function () {
        return isValidName(aName.value);
      },
      text: "Please enter the patient's full name.",
    },
    {
      field: aEmail,
      msg: aEmailMsg,
      test: function () {
        return isValidEmail(aEmail.value);
      },
      text: "Please enter a valid email.",
    },
    {
      field: aHospital,
      msg: aHospitalMsg,
      test: function () {
        return aHospital.value !== "";
      },
      text: "Please choose a hospital.",
    },
    {
      field: aDept,
      msg: aDeptMsg,
      test: function () {
        return aDept.value !== "";
      },
      text: "Please choose a department.",
    },
    {
      field: appointmentDate,
      msg: aDateMsg,
      test: function () {
        return (
          appointmentDate.value !== "" &&
          appointmentDate.value >= appointmentDate.min
        );
      },
      text: "Please select today or a future date.",
    },
  ]);

  if (!valid) {
    appointmentResult.hidden = true;
    return;
  }

  showReview();
});

/* Step 1: review screen with Confirm button */
function showReview() {
  appointmentResult.replaceChildren();

  const heading = document.createElement("h4");
  heading.textContent = "Please review your request";

  const details = buildList([
    "Patient: " + aName.value.trim(),
    "Hospital: " + aHospital.value,
    "Department: " + aDept.value,
    "Preferred date: " + appointmentDate.value,
  ]);

  const actions = document.createElement("div");
  actions.className = "result-actions";

  const confirmBtn = document.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.className = "btn btn-primary";
  confirmBtn.textContent = "Confirm appointment";
  confirmBtn.addEventListener("click", confirmAppointment);

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn btn-outline";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", function () {
    appointmentResult.hidden = true;
    aName.focus();
  });

  actions.append(confirmBtn, editBtn);
  appointmentResult.append(heading, details, actions);
  appointmentResult.hidden = false;
  appointmentResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* Step 2: confirm -> token appears + countdown starts */
function confirmAppointment() {
  tokenCounter += 1;
  const tokenText = "SS-" + String(tokenCounter).padStart(3, "0");

  /* Demo queue: 3 to 12 people ahead, about 7 minutes each */
  const peopleAhead = 3 + Math.floor(Math.random() * 10);
  const totalSeconds = peopleAhead * MINUTES_PER_PATIENT * 60;

  $("tokenNumber").textContent = tokenText;
  $("tokenInfo").textContent =
    aName.value.trim() +
    " · " +
    aHospital.value +
    " · " +
    aDept.value +
    " · " +
    appointmentDate.value;

  appointmentForm.hidden = true;
  tokenCard.hidden = false;
  tokenCard.scrollIntoView({ behavior: "smooth", block: "nearest" });

  startCountdown(totalSeconds);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function startCountdown(totalSeconds) {
  clearInterval(countdownId);
  const endTime = Date.now() + totalSeconds * 1000;

  function tick() {
    const left = Math.max(0, Math.round((endTime - Date.now()) / 1000));
    const h = Math.floor(left / 3600);
    const m = Math.floor((left % 3600) / 60);
    const s = left % 60;

    $("tokenTimer").textContent = pad(h) + ":" + pad(m) + ":" + pad(s);

    const ahead = Math.ceil(left / (MINUTES_PER_PATIENT * 60));
    $("tokenAhead").textContent = String(ahead);

    const done = ((totalSeconds - left) / totalSeconds) * 100;
    $("tokenProgress").style.width = done + "%";

    if (left === 0) {
      clearInterval(countdownId);
      $("tokenStatus").textContent =
        "It's your turn! Please go to the counter.";
    } else if (left <= 5 * 60) {
      $("tokenStatus").textContent = "Almost your turn. Please be ready.";
    } else {
      $("tokenStatus").textContent = "Please wait. Your turn will come soon.";
    }
  }

  tick();
  countdownId = setInterval(tick, 1000);
}

$("newAppointmentBtn").addEventListener("click", function () {
  clearInterval(countdownId);
  tokenCard.hidden = true;
  appointmentForm.hidden = false;
  appointmentForm.reset();
  appointmentResult.hidden = true;
  appointmentForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* =====================================
   6. ONLINE CONSULTATION FORM
===================================== */
const consultationForm = $("consultationForm");
const consultationResult = $("consultationResult");

const cName = $("consultName");
const cEmail = $("consultEmail");
const cHospital = $("consultHospital");
const cDept = $("consultDepartment");
const cMethod = $("contactMethod");

const cNameMsg = $("consultNameMsg");
const cEmailMsg = $("consultEmailMsg");
const cHospitalMsg = $("consultHospitalMsg");
const cDeptMsg = $("consultDepartmentMsg");
const cMethodMsg = $("contactMethodMsg");

clearOnInput([
  [cName, cNameMsg],
  [cEmail, cEmailMsg],
  [cHospital, cHospitalMsg],
  [cDept, cDeptMsg],
  [cMethod, cMethodMsg],
]);

consultationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const valid = runChecks([
    {
      field: cName,
      msg: cNameMsg,
      test: function () {
        return isValidName(cName.value);
      },
      text: "Please enter your full name.",
    },
    {
      field: cEmail,
      msg: cEmailMsg,
      test: function () {
        return isValidEmail(cEmail.value);
      },
      text: "Please enter a valid email.",
    },
    {
      field: cHospital,
      msg: cHospitalMsg,
      test: function () {
        return cHospital.value !== "";
      },
      text: "Please choose a hospital.",
    },
    {
      field: cDept,
      msg: cDeptMsg,
      test: function () {
        return cDept.value !== "";
      },
      text: "Please choose a department.",
    },
    {
      field: cMethod,
      msg: cMethodMsg,
      test: function () {
        return cMethod.value !== "";
      },
      text: "Please choose a contact method.",
    },
  ]);

  if (!valid) {
    consultationResult.hidden = true;
    return;
  }

  consultationResult.replaceChildren();

  const heading = document.createElement("h4");
  heading.textContent = "Consultation enquiry reviewed";

  const details = buildList([
    "Hospital: " + cHospital.value,
    "Department: " + cDept.value,
    "Preferred contact method: " + cMethod.value,
  ]);

  const note = document.createElement("p");
  note.className = "result-note";
  note.textContent =
    "This enquiry has NOT been sent to a hospital or doctor. " +
    "No consultation has been scheduled.";

  const next = document.createElement("p");
  next.textContent =
    "Visit the hospital's official website to learn about its " +
    "actual online consultation arrangements.";

  consultationResult.append(heading, details, note, next);
  consultationResult.hidden = false;
  consultationResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* =====================================
   7. SMART CONTACT FORM
===================================== */
const contactForm = $("contactForm");
const contactResult = $("contactResult");
const contactName = $("contactName");
const contactEmail = $("contactEmail");
const contactMessage = $("contactMessage");
const contactNameMsg = $("contactNameMsg");
const contactEmailMsg = $("contactEmailMsg");
const contactMessageMsg = $("contactMessageMsg");
const messageCounter = $("messageCounter");
const MAX_MESSAGE = 200;

/* Live character counter (input event) */

/* Live character counter (input event) */
function updateMessageCounter() {
  const length = contactMessage.value.length;

  messageCounter.textContent = length + " / " + MAX_MESSAGE;

  messageCounter.classList.toggle(
    "limit",
    length >= MAX_MESSAGE
  );

  clearError(contactMessage, contactMessageMsg);
}

contactMessage.addEventListener("input", updateMessageCounter);

// Initialize the counter on page load
updateMessageCounter();

clearOnInput([
  [contactName, contactNameMsg],
  [contactEmail, contactEmailMsg],
]);


clearOnInput([
  [contactName, contactNameMsg],
  [contactEmail, contactEmailMsg],
]);

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const valid = runChecks([
    {
      field: contactName,
      msg: contactNameMsg,
      test: function () {
        return contactName.value.trim().length >= 3 &&
               contactName.value.trim().length <= 100;
      },
      text: "Please enter your full name.",
    },
    {
      field: contactEmail,
      msg: contactEmailMsg,
      test: function () {
        return isValidEmail(contactEmail.value);
      },
      text: "Please enter a valid email.",
    },
    {
      field: contactMessage,
      msg: contactMessageMsg,
      test: function () {
        return contactMessage.value.trim().length >= 10 &&
               contactMessage.value.length <= MAX_MESSAGE;
      },
      text: "Tell us a little more (10+ characters).",
    },
  ]);

  if (!valid) {
    contactResult.hidden = true;
    return;
  }

  /* textContent keeps any <b> tags as plain text, so nothing breaks */
  const name = contactName.value.trim();

  contactResult.replaceChildren();
  contactResult.className = "form-result success";

  const heading = document.createElement("h4");
  heading.textContent = "Thank you, " + name + "!";

  const text = document.createElement("p");
  text.textContent =
    "Your message looks good. This is a demo, so it has not been " +
    "sent anywhere, but we would reply to " +
    contactEmail.value.trim() +
    ".";

  contactResult.append(heading, text);
  contactResult.hidden = false;

  contactForm.reset();
  messageCounter.textContent = "0 / " + MAX_MESSAGE;
  messageCounter.classList.remove("limit");
  contactResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

/* =====================================
   8. LANGUAGE SELECTOR
   Uses Google Translate; internet is required.
===================================== */

(function setupLanguageSelector() {
  const header = document.querySelector(".header-inner");
  if (!header) return;

  // Create the selector without replacing existing HTML.
  const languageSelect = document.createElement("select");
  languageSelect.className = "language-switcher";
  languageSelect.id = "languageSelect";
  languageSelect.setAttribute("aria-label", "Choose website language");

  const languages = [
    { value: "en", label: "English" },
    { value: "ur", label: "اردو (Urdu)" },
    { value: "ps", label: "پښتو (Pashto)" },
    { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "bal", label: "بلوچی (Balochi)" },
    { value: "sd", label: "سنڌي (Sindhi)" }
  ];

  languages.forEach(function (language) {
    const option = document.createElement("option");
    option.value = language.value;
    option.textContent = language.label;
    languageSelect.appendChild(option);
  });

  const translateContainer = document.createElement("div");
  translateContainer.id = "google_translate_element";

  const themeButton = document.getElementById("themeToggle");

  if (themeButton && themeButton.parentNode === header) {
    header.insertBefore(languageSelect, themeButton);
  } else {
    header.appendChild(languageSelect);
  }

  document.body.appendChild(translateContainer);

  // Mark the currently selected language's reading direction.
  function updateDirection(language) {
    const rtlLanguages = ["ur", "ps", "bal", "sd"];

    document.documentElement.lang = language;
    document.documentElement.dir =
      rtlLanguages.includes(language) ? "rtl" : "ltr";
  }

  languageSelect.addEventListener("change", function () {
    const language = languageSelect.value;
    updateDirection(language);

    const googleSelect = document.querySelector(".goog-te-combo");

    if (googleSelect) {
      googleSelect.value = language;
      googleSelect.dispatchEvent(new Event("change"));
    }
  });

  // Keep the dropdown aligned if Google Translate has already
  // stored a language choice in its translation cookie.
  languageSelect.value = "en";
  updateDirection("en");

  // Load the translation widget.
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,ur,ps,pa,bal,sd",
        autoDisplay: false
      },
      "google_translate_element"
    );

    // Apply a saved dropdown choice once the widget is ready.
    const savedLanguage = languageSelect.value;
    if (savedLanguage !== "en") {
      const googleSelect = document.querySelector(".goog-te-combo");
      if (googleSelect) {
        googleSelect.value = savedLanguage;
        googleSelect.dispatchEvent(new Event("change"));
      }
    }
  };

  const translateScript = document.createElement("script");
  translateScript.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  translateScript.async = true;
  translateScript.onerror = function () {
    console.warn("The translation service could not be loaded.");
  };

  document.head.appendChild(translateScript);
})();

