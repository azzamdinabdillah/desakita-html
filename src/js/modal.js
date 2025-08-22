// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all modal elements
  const modals = document.querySelectorAll(".modal");

  // Function to open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("opacity-0", "pointer-events-none");
      modal.classList.add("opacity-100");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  }

  // Function to close modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("opacity-0", "pointer-events-none");
      modal.classList.remove("opacity-100");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }

  // Event listeners for opening modals
  document.addEventListener("click", function (e) {
    const openButton = e.target.closest("[data-open-modal]");
    if (openButton) {
      const modalId = openButton.getAttribute("data-open-modal");
      openModal(modalId);
    }
  });

  // Event listeners for closing modals
  document.addEventListener("click", function (e) {
    // Close button (X icon)
    const closeButton = e.target.closest("[data-close-modal]");
    if (closeButton) {
      const modalId = closeButton.getAttribute("data-close-modal");
      closeModal(modalId);
    }

    // Close when clicking outside modal
    if (e.target.classList.contains("modal")) {
      const modalId = e.target.id;
      closeModal(modalId);
    }

    // Close button with "Batal" text
    if (e.target.textContent.trim() === "Batal") {
      const modal = e.target.closest(".modal");
      if (modal) {
        closeModal(modal.id);
      }
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const openModal = document.querySelector(".modal:not(.opacity-0)");
      if (openModal) {
        closeModal(openModal.id);
      }
    }
  });

  // Close modal when clicking on close icon (img with close-modal.svg)
  document.addEventListener("click", function (e) {
    if (
      e.target.tagName === "IMG" &&
      e.target.src.includes("close-modal.svg")
    ) {
      const modal = e.target.closest(".modal");
      if (modal) {
        closeModal(modal.id);
      }
    }
  });
});
