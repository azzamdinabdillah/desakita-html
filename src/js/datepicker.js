// Fungsi untuk menghitung umur berdasarkan tanggal lahir
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  // Jika belum ulang tahun tahun ini, kurangi 1 tahun
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Fungsi untuk memformat tanggal ke format Indonesia
function formatDateToIndonesian(dateString) {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

// Fungsi untuk menginisialisasi datepicker
function initializeDatepicker() {
  // Cari semua input date
  const dateInputs = document.querySelectorAll('input[type="date"]');

  dateInputs.forEach(function (dateInput, index) {
    // Cari target umur berdasarkan index terlebih dahulu
    let ageDisplay = findAgeDisplayByIndex(dateInput, index);

    // Jika tidak ditemukan berdasarkan index, cari yang terdekat
    if (!ageDisplay) {
      ageDisplay = findNearestAgeDisplay(dateInput);
    }

    if (dateInput && ageDisplay) {
      // Tambahkan event listener untuk perubahan tanggal
      dateInput.addEventListener("change", function () {
        const selectedDate = this.value;

        if (selectedDate) {
          // Hitung umur
          const age = calculateAge(selectedDate);

          // Update tampilan umur
          ageDisplay.textContent = age;

          // Format tanggal ke bahasa Indonesia untuk ditampilkan
          const formattedDate = formatDateToIndonesian(selectedDate);
          this.setAttribute("data-formatted-date", formattedDate);

          // Tambahkan class untuk styling
          this.classList.add("has-value");
        } else {
          // Reset umur jika tidak ada tanggal
          ageDisplay.textContent = "0";
          this.classList.remove("has-value");
        }
      });

      // Tambahkan event listener untuk focus (opsional - untuk UX yang lebih baik)
      dateInput.addEventListener("focus", function () {
        this.showPicker && this.showPicker();
      });

      // Tambahkan event listener untuk input (untuk real-time update)
      dateInput.addEventListener("input", function () {
        const selectedDate = this.value;

        if (selectedDate) {
          const age = calculateAge(selectedDate);
          ageDisplay.textContent = age;
        } else {
          ageDisplay.textContent = "0";
        }
      });
    }
  });
}

// Fungsi untuk mencari target umur yang terdekat
function findNearestAgeDisplay(dateInput) {
  // Coba cari berdasarkan data-age-target terlebih dahulu
  const ageTargetId = dateInput.getAttribute("data-age-target");
  if (ageTargetId) {
    const targetElement = document.getElementById(ageTargetId);
    if (targetElement) {
      return targetElement;
    }
  }

  // Cari parent container yang berisi input dan umur
  let parentContainer = dateInput.closest(".flex.flex-col.md\\:flex-row");
  if (!parentContainer) {
    parentContainer = dateInput.closest(".col-span-3");
  }
  if (!parentContainer) {
    parentContainer = dateInput.parentElement;
  }

  if (parentContainer) {
    // Cari span dengan data-age-display dalam container yang sama
    const ageSpan = parentContainer.querySelector("[data-age-display]");
    if (ageSpan) {
      return ageSpan;
    }

    // Cari div yang berisi teks "Umur:" dan span angka
    const ageContainer = parentContainer.querySelector("div:has(span)");
    if (ageContainer) {
      const spans = ageContainer.querySelectorAll("span");
      for (let span of spans) {
        if (
          span.textContent.trim() === "0" ||
          !isNaN(span.textContent.trim())
        ) {
          return span;
        }
      }
    }
  }

  // Fallback: cari span dengan data-age-display di seluruh halaman
  const allAgeDisplays = document.querySelectorAll("[data-age-display]");
  if (allAgeDisplays.length > 0) {
    // Cari yang terdekat berdasarkan posisi dalam DOM
    let closestDisplay = null;
    let minDistance = Infinity;

    allAgeDisplays.forEach((display) => {
      const distance = Math.abs(dateInput.compareDocumentPosition(display));
      if (distance < minDistance) {
        minDistance = distance;
        closestDisplay = display;
      }
    });

    return closestDisplay;
  }

  return null;
}

// Fungsi untuk mencari target umur berdasarkan index
function findAgeDisplayByIndex(dateInput, index) {
  const allAgeDisplays = document.querySelectorAll("[data-age-display]");
  if (allAgeDisplays[index]) {
    return allAgeDisplays[index];
  }
  return null;
}

// Inisialisasi saat DOM sudah siap
document.addEventListener("DOMContentLoaded", function () {
  initializeDatepicker();
});

// Export fungsi untuk penggunaan global jika diperlukan
window.DatepickerUtils = {
  calculateAge,
  formatDateToIndonesian,
  initializeDatepicker,
};
