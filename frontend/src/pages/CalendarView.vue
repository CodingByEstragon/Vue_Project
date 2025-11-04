<template>
  <div>
    <div class="projectSchedule">
      <h2>Streaming-Zeitplan:</h2>

      <!-- Navigation Buttons -->
      <div class="calendarControls">
        <button class="btn" @click="goToToday">Heute</button>
        <button class="btn" @click="goToPreviousWeek">
          <i class="pi pi-angle-left"></i>
        </button>
        <button class="btn" @click="goToNextWeek">
          <i class="pi pi-angle-right"></i>
        </button>

        <!-- Datepicker -->
        <div class="datepicker-wrapper">
          <button class="btn" @click="toggleDatePicker">
            <i class="pi pi-calendar"></i>
          </button>
          <div v-if="showDatepicker" class="datepicker-popup">
            <Datepicker
              :inline="true"
              :model-value="selectedWeekStart.value"
              @update:model-value="handleDateSelect"
              :enable-time-picker="false"
              :locale="de"
              :auto-apply="true"
            />
          </div>
        </div>

        <!-- Datumsbereich -->
        <div class="week-range-display">
          {{ weekRangeFormatted }}
        </div>
      </div>

      <!-- Zeitplan Tabelle -->
      <table class="calendarTable">
        <thead>
          <tr>
            <th class="cornerCell">GMT+2</th>
            <th
              v-for="hour in hours"
              :key="hour"
              class="timeCell"
              :class="{ currentHour: hour === currentHourFormatted }"
            >
              {{ hour }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in weekDays" :key="format(day, 'yyyy-MM-dd')">
            <!-- Tag & Datum -->
            <td class="dayCell" :class="{ today: isToday(day) }">
              <div>{{ format(day, "EE", { locale: de }) }}</div>
              <div>{{ format(day, "d.M.") }}</div>
            </td>

            <!-- Eine Zelle über die ganze Zeitbreite -->
            <td
              class="slotCell"
              colspan="7"
              :class="{ selected: isDaySelected(day), today: isToday(day) }"
              @click="toggleDaySlot(day)"
            >
              <div
                v-for="stream in getStreamsForDay(day)"
                :key="stream.title + stream.time"
                class="stream-entry"
              >
                <div v-if="stream.title" class="stream-title">
                  {{ stream.title }}
                </div>
                <div v-if="stream.kategorie" class="stream-meta">
                  {{ stream.kategorie }}
                </div>
                <div class="stream-meta">
                  {{ formatStreamFullTime(stream.start, stream.end) }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="streambtn" @click="showPopup = true">
          Stream hinzufügen
        </button>

        <!-- Popup Fenster -->
        <div v-if="showPopup" class="overlay">
          <div class="popup">
            <!-- Close Icon -->
            <button class="close-btn" @click="showPopup = false">
              <i class="pi pi-times"></i>
            </button>

            <h3 class="popup-title">Stream hinzufügen</h3>

            <!-- Titel -->
            <div class="field-row">
              <div class="field-label">
                <label for="title">Titel</label>
                <small>optional</small>
              </div>
              <div class="field-input-group">
                <input
                  type="text"
                  id="title"
                  v-model="streamTitle"
                  @input="handleTitleInput"
                  :maxlength="140"
                  placeholder="Sag deinen Zuschauern, was sie erwartet."
                />
                <div class="char-hint">Maximal 140 Zeichen</div>
              </div>
            </div>
            <!-- Kategorie -->
            <div class="field-row">
              <div class="field-label">
                <label for="title">Kategorie</label>
                <small>optional</small>
              </div>
              <div>
                <input
                  type="text"
                  id="kategorie"
                  v-model="streamKategorie"
                  placeholder="Nach einer Kategorie suchen"
                />
              </div>
            </div>

            <!-- Neue kompakte Zeile: Zeit + Dauer -->
            <div class="zeit-label">Zeit</div>
            <div class="zeit-dauer-zeile">
              <!-- Zeit -->
              <div class="zeit-block">
                <div class="dropdown-label" @click="toggleTimeDropdown">
                  {{ formatTimeDisplay(popupTimeFrom) }}
                </div>
                <div v-if="showTimeDropdown" class="time-options">
                  <div
                    v-for="time in timeOptions"
                    :key="time"
                    class="time-option"
                    :class="{ selected: time === popupTimeFrom }"
                    @click.stop="selectTimeOption(time)"
                    @mouseenter="hideHoursDropdown"
                  >
                    {{ time }}
                    <i
                      v-if="time === popupTimeFrom"
                      class="pi pi-check check-icon"
                    ></i>
                  </div>
                </div>
              </div>

              <!-- für -->
              <span class="fuer-label">für</span>

              <!-- Stunden -->
              <div class="dropdown-select-wrapper">
                <div class="dropdown-label-time" @click="toggleHoursDropdown">
                  {{
                    durationHours === -1
                      ? "Ich bin mir nicht sicher."
                      : durationHours === 1
                      ? "1 Stunde"
                      : durationHours + " Stunden"
                  }}
                </div>
                <div v-if="showHoursDropdown" class="time-options top-position">
                  <div
                    class="time-option"
                    :class="{ selected: durationHours === -1 }"
                    @click.stop="selectHours(-1)"
                  >
                    Ich bin mir nicht sicher.
                  </div>
                  <div
                    v-for="h in 24"
                    :key="h"
                    class="time-option"
                    :class="{ selected: h - 1 === durationHours }"
                    @click.stop="selectHours(h - 1)"
                  >
                    {{ h - 1 === 1 ? "1 Stunde" : h - 1 + " Stunden" }}
                  </div>
                </div>
              </div>

              <!-- Minuten -->
              <div v-if="durationHours !== -1" class="dropdown-select-wrapper">
                <div class="dropdown-label-time" @click="toggleMinutesDropdown">
                  {{ durationMinutes + " Minuten" }}
                </div>
                <div v-if="showMinutesDropdown" class="time-options">
                  <div
                    v-for="m in minuteOptions"
                    :key="m"
                    class="time-option"
                    :class="{ selected: durationMinutes === m }"
                    @click.stop="selectMinutes(m)"
                  >
                    {{ m + " Minuten" }}
                  </div>
                </div>
              </div>
            </div>
            <div class="char-hint">
              Zeiten werden in deiner aktuellen Zeitzone gespeichert (GMT+2).
            </div>

            <!-- Wochentag Auswahl -->
            <div class="weekday-buttons">
              <div class="frequency">Häufigkeit</div>
              <button
                v-for="(day, i) in weekdays"
                :key="i"
                class="weekday-btn"
                :class="{ active: selectedWeekday === i }"
                @click="selectedWeekday = i"
              >
                <div class="weekday-text">
                  <div>Jeden</div>
                  <div>{{ day }}</div>
                </div>
              </button>
            </div>

            <!-- Buttons -->
            <div class="popup-buttons">
              <button
                class="btn"
                @click="addStreamFromPopup"
                :disabled="selectedWeekday === null"
              >
                Änderungen speichern
              </button>
              <button class="btn" @click="closePopup">Abbrechen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { startOfWeek, addDays, subWeeks, addWeeks, format } from "date-fns";
import { de } from "date-fns/locale";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "primeicons/primeicons.css";

const now = new Date();
const currentHour = now.getHours();
const currentHourFormatted = String(currentHour).padStart(2, "0") + ":00";

const hours = computed(() => {
  const list = [];
  for (let i = -3; i <= 3; i++) {
    let h = (currentHour + i + 24) % 24;
    list.push(String(h).padStart(2, "0") + ":00");
  }
  return list;
});

const selectedWeekStart = ref(startOfWeek(new Date(), { weekStartsOn: 1 }));
const showDatepicker = ref(false);

const weekDays = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(selectedWeekStart.value, i));
  }
  return days;
});

const selectedSlots = ref([]);

const weekRangeFormatted = computed(() => {
  const start = format(selectedWeekStart.value, "d. MMMM yyyy", { locale: de });
  const end = format(addDays(selectedWeekStart.value, 6), "d. MMM yyyy", {
    locale: de,
  });
  return `${start} – ${end}`;
});

const showPopup = ref(false);
const popupDate = ref(new Date());
const popupTimeFrom = ref("12:00pm");

const streamTitle = ref("");
const streamKategorie = ref("");
const durationHours = ref(4);
const durationMinutes = ref(0);
const selectedWeekday = ref(null);

const weekdays = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

const showTimeDropdown = ref(false);
const showHoursDropdown = ref(false);
const showMinutesDropdown = ref(false);

const timeOptions = computed(() => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h % 12 === 0 ? 12 : h % 12;
      const meridian = h < 12 ? "am" : "pm";
      const minutes = String(m).padStart(2, "0");
      times.push(`${hour}:${minutes}${meridian}`);
    }
  }
  return times;
});

const minuteOptions = [0, 15, 30, 45];
const recurringStreams = ref([]);

// Schließen aller Dropdowns bei Klick außerhalb
function handleClickOutside(event) {
  const popup = document.querySelector(".zeit-dauer-zeile");
  if (popup && !popup.contains(event.target)) {
    showTimeDropdown.value = false;
    showHoursDropdown.value = false;
    showMinutesDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function isDaySelected(day) {
  const dateStr = format(day, "yyyy-MM-dd");
  return selectedSlots.value.some((slot) => slot.date === dateStr);
}

function toggleDaySlot(day) {
  const dateStr = format(day, "yyyy-MM-dd");
  const hasSlots = selectedSlots.value.some((slot) => slot.date === dateStr);
  if (hasSlots) {
    selectedSlots.value = selectedSlots.value.filter(
      (slot) => slot.date !== dateStr
    );
  } else {
    hours.value.forEach((hour) => {
      selectedSlots.value.push({ date: dateStr, hour });
    });
  }
}

function goToPreviousWeek() {
  selectedWeekStart.value = subWeeks(selectedWeekStart.value, 1);
}

function goToNextWeek() {
  selectedWeekStart.value = addWeeks(selectedWeekStart.value, 1);
}

function goToToday() {
  selectedWeekStart.value = startOfWeek(new Date(), { weekStartsOn: 1 });
}

function toggleDatePicker() {
  showDatepicker.value = !showDatepicker.value;
}

function handleDateSelect(date) {
  selectedWeekStart.value = startOfWeek(date, { weekStartsOn: 1 });
  showDatepicker.value = false;
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function closePopup() {
  showPopup.value = false;
  selectedWeekday.value = null;
  streamTitle.value = "";
  streamKategorie.value = "";
  durationHours.value = 4;
  durationMinutes.value = 0;
  popupTimeFrom.value = "12:00pm";
}

function addStreamFromPopup() {
  const baseDate = startOfWeek(popupDate.value, { weekStartsOn: 1 });
  const dayDate = addDays(baseDate, selectedWeekday.value);
  const dateStr = format(dayDate, "yyyy-MM-dd");

  const fromHour = popupTimeFrom.value.slice(0, 2);
  const fromMinute = popupTimeFrom.value.slice(3, 5);
  const start = new Date(dayDate);
  start.setHours(+fromHour, +fromMinute);

  const totalMinutes = durationHours.value * 60 + durationMinutes.value;
  const slotsToAdd = [];

  for (let i = 0; i <= totalMinutes / 60; i++) {
    const h = new Date(start);
    h.setMinutes(0);
    h.setHours(h.getHours() + i);
    const hourFormatted = String(h.getHours()).padStart(2, "0") + ":00";
    if (hours.value.includes(hourFormatted)) {
      slotsToAdd.push({ date: dateStr, hour: hourFormatted });
    }
  }

  slotsToAdd.forEach((slot) => {
    if (
      !selectedSlots.value.some(
        (s) => s.date === slot.date && s.hour === slot.hour
      )
    ) {
      selectedSlots.value.push(slot);
    }
  });
  if (selectedWeekday.value === null) return;

  recurringStreams.value.push({
    title: streamTitle.value,
    kategorie: streamKategorie.value,
    time: popupTimeFrom.value,
    durationH: durationHours.value,
    durationM: durationMinutes.value,
    weekday: selectedWeekday.value,
    start: start,
    end: new Date(start.getTime() + totalMinutes * 60 * 1000),
  });
  closePopup();
}

function formatStreamFullTime(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dayFormatted = format(startDate, "EEEE, d. MMMM yyyy", { locale: de });
  const startTime = format(startDate, "HH:mm");
  const endTime = format(endDate, "HH:mm");

  return `${dayFormatted} ${startTime} – ${endTime} GMT+2`;
}

function handleTitleInput(event) {
  if (event.target.value.length > 140) {
    streamTitle.value = event.target.value.slice(0, 140);
  }
}

function formatTimeDisplay(value) {
  return value || "Zeit auswählen";
}

function toggleTimeDropdown() {
  showTimeDropdown.value = !showTimeDropdown.value;
  showHoursDropdown.value = false;
  showMinutesDropdown.value = false;
}

function selectTimeOption(time) {
  popupTimeFrom.value = time;
  showTimeDropdown.value = false;
}

function toggleHoursDropdown() {
  showHoursDropdown.value = !showHoursDropdown.value;
  showTimeDropdown.value = false;
  showMinutesDropdown.value = false;
}

function selectHours(h) {
  durationHours.value = h;
  showHoursDropdown.value = false;
}

function toggleMinutesDropdown() {
  showMinutesDropdown.value = !showMinutesDropdown.value;
  showTimeDropdown.value = false;
  showHoursDropdown.value = false;
}

function selectMinutes(min) {
  durationMinutes.value = min;
  showMinutesDropdown.value = false;
}

function hideHoursDropdown() {
  showHoursDropdown.value = false;
}

function getStreamsForDay(day) {
  const weekdayIndex = day.getDay() === 0 ? 6 : day.getDay() - 1; // 0=Sonntag → 6
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  // Nur Streams anzeigen, wenn der Tag in dieser Woche oder in der Zukunft liegt
  if (day < currentWeekStart) return [];

  return recurringStreams.value.filter(
    (stream) => stream.weekday === weekdayIndex
  );
}

// function formatDuration(h, m) {
//   const parts = [];
//   if (h > 0) parts.push(h + (h === 1 ? " Stunde" : " Stunden"));
//   if (m > 0) parts.push(m + " Minuten");
//   return parts.join(" ");
// }
</script>

<style scoped>
.projectSchedule {
  margin: 2rem auto;
  padding: 0 20px;
}

.calendarControls {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: flex-start;
}

.btn {
  background-color: #2b2b2f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.btn:hover {
  background-color: #3b3b3f;
}

.pi {
  font-size: 16px;
}

.datepicker-wrapper {
  position: relative;
  display: inline-block;
}

.datepicker-popup {
  position: absolute;
}

.week-range-display {
  font-size: 16px;
  margin-left: 10px;
  white-space: nowrap;
  background: transparent;
}

.calendarTable {
  width: 100%;
  border-collapse: collapse;
  color: white;
  font-family: Arial, sans-serif;
  table-layout: fixed;
  white-space: nowrap;
  margin-top: 1rem;
  border-radius: 12px;
  overflow: hidden;
}

th,
td {
  border: 1px solid #444; /* calendar view trennstriche */
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  white-space: nowrap;
}

.cornerCell {
  background-color: #2b2b2f;
  color: #adadb8;
  width: 20px;
  font-weight: bold;
  border-top-left-radius: 12px;
}

.timeCell {
  background-color: #2b2b2f;
  font-weight: bold;
  width: 80px;
}

/* Datum Mo. - So. im calendar view */
.dayCell {
  background-color: #1f1f23;
  font-weight: bold;
  text-align: center;
  padding-left: 10px;
  white-space: nowrap;
}

.dayCell.today {
  /* background-color: #1f8ef1; */
  background-color: #2f2f35;
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: red;
  color: white;
}

/* alle Zeilen im calendar view */
.slotCell {
  background-color: #333338;
  /* cursor: pointer; */
  transition: background-color 0.3s;
  height: 40px;
}

.slotCell.today {
  background-color: #3a3a40; /* etwas heller als Standard */
}

/* .slotCell:hover {
  background-color: #55555a;
} */

/* .slotCell.selected {
  background-color: #1f8ef1;
} */

.streambtn {
  background-color: #2b2b2f;
  color: white;
  border: none;
  padding: 6px 12px;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay.no-scroll {
  overflow: hidden;
}

.popup {
  position: relative;
  background: #1f1f23;
  color: white;
  padding: 32px 28px 28px;
  border-radius: 12px;
  width: 1000px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.popup-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.popup input[type="text"],
.popup input[type="time"],
.popup input[type="number"] {
  padding: 10px;
  background: #2b2b2f;
  border: 1px solid #444;
  border-radius: 6px;
  color: white;
  width: 100%;
  font-size: 14px;
}

.field-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.field-label {
  display: flex;
  flex-direction: column;
  min-width: 80px;
}

.field-label label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
}

.field-label small {
  font-size: 16px;
  color: #aaa;
}

.field-input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.field-input-group-kategorie {
  width: 250px;
}

.char-hint {
  font-size: 16px;
  color: #aaa;
  margin-top: 4px;
  text-align: left;
}

.zeit-dauer-zeile {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
}

.zeit-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.zeit-label {
  font-size: 16px;
  font-weight: bold;
}

.fuer-label {
  font-size: 14px;
  white-space: nowrap;
}

.time-dropdown-wrapper {
  position: relative;
  width: fit-content;
  margin-bottom: 1rem;
}

/* 12pm Label */
.dropdown-label {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2b2b2f;
  border: 1px solid #444;
  padding: 6px 10px;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  width: 70px;
  /* background-color: red; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.time-options {
  position: absolute;
  top: 100%;
  left: 0;
  background: #2b2b2f;
  border: 1px solid #444;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  width: 180px;
  z-index: 1001;
  margin-top: 4px;
}

.time-option {
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

.time-option:hover {
  background: #1f8ef1;
}

.time-option.selected {
  color: white;
}

.check-icon {
  font-size: 12px;
}

.duration-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.duration-label {
  display: inline-block;
  min-width: 30px;
  font-size: 14px;
  color: #aaa;
  white-space: nowrap;
}

.duration-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.duration-inputs input {
  flex: 1;
}

.dropdown-select-wrapper {
  position: relative;
  width: 160px;
}

/* 4 Stunden und 0 Minuten Label */
.dropdown-label-time {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  background: #2b2b2f;
  border: 1px solid #444;
  padding: 6px 10px;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Stunden Label  */
.time-options.top-position {
  bottom: 100%;
  top: auto;
  margin-bottom: 4px;
}

.weekday-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.frequency {
  margin-right: 80px;
}

.weekday-btn {
  background: #2b2b2f;
  color: white;
  padding: 20px 30px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.weekday-btn.active {
  border: 2px solid white;
}

.weekday-text > div {
  line-height: 1.2;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.btn:disabled {
  background-color: #444;
  cursor: not-allowed;
  opacity: 0.5;
}

.custom-time-dropdown {
  background: #2b2b2f;
  border: 1px solid #444;
  color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 14px;
  width: 160px;
}

.dropdown-icon {
  font-size: 12px;
}

.fixed-dropdown {
  position: absolute !important;
}

.stream-entry {
  background-color: #444;
  color: white;
  margin: 4px 0;
  padding: 4px 10px;
  border-radius: 4px;
  text-align: left;
  font-size: 13px;
}

.stream-title {
  font-weight: bold;
}

.stream-meta {
  font-size: 12px;
  color: #ccc;
}
</style>
