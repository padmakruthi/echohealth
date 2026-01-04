/*************************************************
 * ECHO HEALTH – FINAL MASTER JS FILE
 * Static | Stable | Hackathon-Ready
 *************************************************/

/* =================================
   1️⃣ WRONG PRESCRIPTION DETECTION
================================= */
function checkPrescription() {
  const symptoms = document.getElementById("symptoms")?.value
    .toLowerCase()
    .trim();
  const med = document.getElementById("prescription")?.value
    .toLowerCase()
    .trim();
  const result = document.getElementById("result");

  if (!symptoms || !med || !result) return;

  if (symptoms.includes("fever") && !med.includes("para")) {
    result.innerText =
      "⚠️ Warning: This medicine may not be suitable for fever.";
    result.style.color = "red";
  } else if (symptoms.includes("cold") && med.includes("antibiotic")) {
    result.innerText =
      "⚠️ Warning: Antibiotics are usually not required for cold.";
    result.style.color = "red";
  } else {
    result.innerText = "✅ Prescription looks appropriate.";
    result.style.color = "green";
  }
}

/* =================================
   2️⃣ WRONG MEDICINE DETECTION (USP)
================================= */
function scanMedicine() {
  const medicine = document.getElementById("medicine")?.value
    .toLowerCase()
    .trim();
  const result = document.getElementById("medicineResult");

  if (!medicine || !result) return;

  const prescribedMedicines = [
    "paracetamol",
    "vitamin d",
    "calcium",
    "cetirizine",
  ];

  if (!prescribedMedicines.includes(medicine)) {
    result.innerText =
      "⚠️ ALERT: This medicine is NOT part of the prescription!";
    result.style.color = "red";
  } else {
    result.innerText = "✅ Medicine is safe to take.";
    result.style.color = "green";
  }
}

/* =================================
   3️⃣ VOICE ALERT
   English: Dynamic TTS
   Telugu/Hindi: Static Audio
================================= */
function playAlert() {
  const name = document.getElementById("name")?.value.trim();
  const med = document.getElementById("med")?.value.trim();
  const lang = document.getElementById("lang")?.value;

  if (!name || !med || !lang) {
    alert("Please enter patient name and medicine name");
    return;
  }

  // ENGLISH – dynamic voice
  if (lang === "en-IN") {
    const text = `${name}, please take your medicine ${med} now.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    return;
  }

  // TELUGU / HINDI – static audio
  let audioPath = "assets/alert-en.mp3";
  if (lang === "te-IN") audioPath = "assets/alert-te.mp3";
  if (lang === "hi-IN") audioPath = "assets/alert-hi.mp3";

  const audio = document.getElementById("alertAudio");
  if (!audio) return;
  audio.src = audioPath;
  audio.load();
  audio.play();
}

/* =================================
   4️⃣ GOOGLE-STYLE UI TRANSLATION
================================= */
function translateUI() {
  const lang = document.getElementById("lang")?.value;
  const name = document.getElementById("name")?.value || "Patient";
  const med = document.getElementById("med")?.value || "your medicine";
  const display = document.getElementById("displayMsg");

  if (!display || !lang) return;

  if (lang === "te-IN") {
    display.innerText = `${name} గారు: దయచేసి మీ మందు ${med} తీసుకోండి.`;
  } else if (lang === "hi-IN") {
    display.innerText = `${name}: कृपया अपनी दवा ${med} लें।`;
  } else {
    display.innerText = `Reminder for ${name}: Please take your medicine ${med}.`;
  }
}

/* =================================
   5️⃣ AUTO MEDICINE SCHEDULE (DEMO)
================================= */
function generateSchedule() {
  const box = document.getElementById("scheduleResult");
  if (!box) return;

  box.innerHTML = `
    <ul>
      <li>☀️ Morning (8:00 AM) – Paracetamol</li>
      <li>🌤 Afternoon (2:00 PM) – Vitamin D</li>
      <li>🌙 Night (8:00 PM) – Calcium</li>
    </ul>
  `;
}

/* =================================
   6️⃣ NEARBY PHARMACY (MOCK DATA)
================================= */
function showPharmacy() {
  const box = document.getElementById("pharmacyResult");
  if (!box) return;

  box.innerHTML = `
    <ul>
      <li>🏥 Apollo Pharmacy – 0.5 km</li>
      <li>🏥 MedPlus – 0.8 km</li>
      <li>🏥 Local Medical Store – 1.2 km</li>
    </ul>
  `;
}

/* =================================
   7️⃣ REAL-TIME MEDICINE NOTIFICATIONS
   (Browser Notifications – Demo)
================================= */

let medicineNotifyInterval = null;

function startMedicineNotification() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  if (medicineNotifyInterval) return;

  medicineNotifyInterval = setInterval(() => {
    if (Notification.permission === "granted") {
      new Notification("💊 Echo Health Reminder", {
        body: "It’s time to take your medicine.",
        icon: "assets/logo.jpeg"
      });
    }
  }, 2000); // every 2 seconds (demo)
}

function stopMedicineNotification() {
  if (medicineNotifyInterval) {
    clearInterval(medicineNotifyInterval);
    medicineNotifyInterval = null;
  }
}
