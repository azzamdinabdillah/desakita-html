// Bank Selection Accordion Script
document.addEventListener("DOMContentLoaded", function () {
  // Find the accordion container
  const accordionContainer = document.querySelector(".accordion-container");

  if (!accordionContainer) return;

  // Find the arrow icon
  const arrowIcon = accordionContainer.querySelector(
    ".accordion-container .arrow-icon"
  );

  // State to track if accordion is expanded
  let isExpanded = false;

  // Function to toggle accordion
  function toggleAccordion() {
    isExpanded = !isExpanded;

    if (isExpanded) {
      // Expand accordion
      accordionContainer.style.maxHeight = "500px";
      accordionContainer.style.overflow = "visible";
      arrowIcon.style.transform = "rotate(180deg)";
    } else {
      // Collapse accordion
      accordionContainer.style.maxHeight = "52px";
      accordionContainer.style.overflow = "hidden";
      arrowIcon.style.transform = "rotate(0deg)";
    }
  }

  // Add click event listener to the entire accordion container
  accordionContainer.addEventListener("click", function (e) {
    // Don't trigger if clicking on radio inputs or labels
    if (
      e.target.type === "radio" ||
      e.target.tagName === "LABEL" ||
      e.target.closest("label")
    ) {
      return;
    }

    toggleAccordion();
  });

  // Initialize accordion state with transitions
  accordionContainer.style.maxHeight = "52px";
  accordionContainer.style.overflow = "hidden";
  accordionContainer.style.transition =
    "max-height 0.3s ease-in-out, overflow 0.3s ease-in-out";
  arrowIcon.style.transition = "transform 0.3s ease-in-out";
});
