// Dashboard Event Reminder Script
class DashboardEventReminder {
  constructor() {
    this.currentDate = new Date();
    this.selectedDateIndex = 0; // Index dari tanggal yang dipilih (0-6)
    this.dates = [];

    // Data event untuk 7 hari ke depan
    this.events = {
      // Format: 'YYYY-MM-DD': { name, time, image }
      // Hanya 2 tanggal yang memiliki event
    };

    this.init();
  }

  init() {
    this.generateDates();
    this.generateSampleEvents();
    this.renderCalendar();
    this.renderEvents();
    this.bindEvents();
  }

  generateDates() {
    this.dates = [];
    const today = new Date(this.currentDate);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.dates.push(date);
    }
  }

  generateSampleEvents() {
    // Reset events
    this.events = {};

    // Tambahkan event pada hari ke-2 dan ke-5
    const eventDate1 = new Date(this.dates[1]);
    const eventDate2 = new Date(this.dates[4]);

    this.events[this.formatDate(eventDate1)] = {
      name: "Learn Coding Together",
      time: "11:30 AM",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
    };

    this.events[this.formatDate(eventDate2)] = {
      name: "Village Coordination Meeting",
      time: "2:00 PM",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    };
  }

  formatDate(date) {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  getIndonesianDayName(date) {
    const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    return days[date.getDay()];
  }

  getIndonesianMonthName(date) {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months[date.getMonth()];
  }

  renderCalendar() {
    // Update month/year display
    const monthYearElement = document.getElementById("calendar-month-year");
    if (monthYearElement) {
      const firstDate = this.dates[0];
      monthYearElement.textContent = `${this.getIndonesianMonthName(
        firstDate
      )} ${firstDate.getFullYear()}`;
    }

    // Render dates
    const calendarDatesElement = document.getElementById("calendar-dates");
    if (calendarDatesElement) {
      calendarDatesElement.innerHTML = "";

      this.dates.forEach((date, index) => {
        const dateElement = document.createElement("div");
        dateElement.className =
          "gap-3 flex flex-col items-center flex-grow cursor-pointer hover:opacity-80 transition-all";
        dateElement.setAttribute("data-date-index", index);

        const isSelected = index === this.selectedDateIndex;
        const hasEvent = this.events[this.formatDate(date)];

        // Add additional classes
        if (isSelected) {
          dateElement.classList.add("selected-date");
        }
        if (hasEvent) {
          dateElement.classList.add("date-with-event");
        }

        dateElement.innerHTML = `
          <div class="rounded-full w-[46px] h-[46px] text-16 font-medium flex justify-center items-center transition-all ${
            isSelected
              ? "text-white bg-dark-green"
              : hasEvent
              ? "text-dark-green bg-yellow/20 border-2 border-yellow"
              : "text-dark-green bg-foreshadow"
          }">
            ${date.getDate()}
          </div>
          <p class="text-14 font-medium text-secondary-text-color">
            ${this.getIndonesianDayName(date)}
          </p>
        `;

        dateElement.addEventListener("click", () => {
          this.selectedDateIndex = index;
          this.renderCalendar();
          this.renderEvents();
        });

        calendarDatesElement.appendChild(dateElement);
      });
    }
  }

  renderEvents() {
    const selectedDate = this.dates[this.selectedDateIndex];
    const dateKey = this.formatDate(selectedDate);
    const event = this.events[dateKey];

    // Update event title
    const eventTitleElement = document.getElementById("event-title");
    if (eventTitleElement) {
      const eventCount = event ? 1 : 0;
      eventTitleElement.textContent = `Upcoming Events (${eventCount})`;
    }

    // Show/hide event display with fade animation
    const noEventElement = document.getElementById("no-event");
    const eventDisplayElement = document.getElementById("event-display");

    if (event) {
      // Show event
      if (noEventElement) {
        noEventElement.style.opacity = "0";
        setTimeout(() => {
          noEventElement.classList.add("hidden");
        }, 200);
      }

      if (eventDisplayElement) {
        // Update event details first
        const eventNameElement = document.getElementById("event-name");
        const eventTimeElement = document.getElementById("event-time");
        const eventImageElement = document.getElementById("event-image");

        if (eventNameElement) eventNameElement.textContent = event.name;
        if (eventTimeElement) eventTimeElement.textContent = event.time;
        if (eventImageElement) eventImageElement.src = event.image;

        // Then show with fade in
        eventDisplayElement.classList.remove("hidden");
        eventDisplayElement.style.opacity = "0";
        setTimeout(() => {
          eventDisplayElement.style.opacity = "1";
        }, 50);
      }
    } else {
      // Show no event
      if (eventDisplayElement) {
        eventDisplayElement.style.opacity = "0";
        setTimeout(() => {
          eventDisplayElement.classList.add("hidden");
        }, 200);
      }

      if (noEventElement) {
        noEventElement.classList.remove("hidden");
        noEventElement.style.opacity = "0";
        setTimeout(() => {
          noEventElement.style.opacity = "1";
        }, 50);
      }
    }
  }

  navigateCalendar(direction) {
    // direction: -1 untuk mundur, 1 untuk maju
    const newDate = new Date(this.currentDate);
    newDate.setDate(this.currentDate.getDate() + direction * 7);

    this.currentDate = newDate;
    this.selectedDateIndex = 0; // Reset ke tanggal pertama
    this.generateDates();
    this.generateSampleEvents();
    this.renderCalendar();
    this.renderEvents();
  }

  navigateEvents(direction) {
    // Cari event terdekat berdasarkan direction
    let newIndex = this.selectedDateIndex;

    if (direction === 1) {
      // Cari event selanjutnya
      for (let i = this.selectedDateIndex + 1; i < this.dates.length; i++) {
        if (this.events[this.formatDate(this.dates[i])]) {
          newIndex = i;
          break;
        }
      }
    } else {
      // Cari event sebelumnya
      for (let i = this.selectedDateIndex - 1; i >= 0; i--) {
        if (this.events[this.formatDate(this.dates[i])]) {
          newIndex = i;
          break;
        }
      }
    }

    if (newIndex !== this.selectedDateIndex) {
      this.selectedDateIndex = newIndex;
      this.renderCalendar();
      this.renderEvents();
    }
  }

  bindEvents() {
    // Calendar navigation
    const calendarPrevElement = document.getElementById("calendar-prev");
    const calendarNextElement = document.getElementById("calendar-next");

    if (calendarPrevElement) {
      calendarPrevElement.addEventListener("click", () => {
        this.navigateCalendar(-1);
      });
    }

    if (calendarNextElement) {
      calendarNextElement.addEventListener("click", () => {
        this.navigateCalendar(1);
      });
    }

    // Event navigation
    const eventPrevElement = document.getElementById("event-prev");
    const eventNextElement = document.getElementById("event-next");

    if (eventPrevElement) {
      eventPrevElement.addEventListener("click", () => {
        this.navigateEvents(-1);
      });
    }

    if (eventNextElement) {
      eventNextElement.addEventListener("click", () => {
        this.navigateEvents(1);
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new DashboardEventReminder();
});
