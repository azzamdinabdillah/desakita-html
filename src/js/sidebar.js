document.addEventListener("DOMContentLoaded", function () {
  // Sidebar toggle button (if exists)
  const sidebarToggleBtn = document.getElementById("toggle-sidebar");
  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener("click", function () {
      // Dispatch a custom event to toggle the sidebar
      window.dispatchEvent(new CustomEvent("toggleSidebar"));
    });
  }

  // Handle menu click events
  const menuItems = document.querySelectorAll(".menu");
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function (event) {
      const clickedElement = event.target;
      const currentMenu = event.currentTarget;

      // If the click is inside a sub-menu, do nothing
      if (clickedElement.closest(".sub-menu")) {
        return;
      }

      const hasSubmenu =
        currentMenu.getAttribute("data-has-submenu") === "true";
      const menuLink = currentMenu.getAttribute("data-menu-link");
      const menuItemName = currentMenu.getAttribute("data-menu-item");

      if (hasSubmenu) {
        // Toggle sub-menu visibility
        const subMenu = document.querySelector(
          `[data-submenu="${menuItemName}"]`
        );
        const toggleIcon = currentMenu.querySelector(
          `[data-menu-toggle="${menuItemName}"]`
        );
        if (subMenu && toggleIcon) {
          const isOpen =
            subMenu.style.maxHeight && subMenu.style.maxHeight !== "0px";
          subMenu.style.maxHeight = isOpen ? "0px" : "400px";
          toggleIcon.style.transform = isOpen
            ? "rotate(0deg)"
            : "rotate(180deg)";
          currentMenu.setAttribute("data-menu-expanded", (!isOpen).toString());
        }
      } else if (menuLink) {
        // Navigate to the link if no sub-menu
        window.location.href = menuLink;
      }
    });
  });

  // Expand sub-menu if current page matches a sub-menu link
  const currentPath = window.location.pathname;
  const subMenus = document.querySelectorAll(".sub-menu");
  subMenus.forEach(function (subMenu) {
    const links = subMenu.querySelectorAll("a");
    let isActive = false;
    links.forEach(function (link) {
      if (link.getAttribute("href") === currentPath) {
        isActive = true;
      }
    });
    if (isActive) {
      subMenu.style.maxHeight = "400px";
      const submenuName = subMenu.getAttribute("data-submenu");
      const toggleIcon = document.querySelector(
        `[data-menu-toggle="${submenuName}"]`
      );
      const parentMenu = document.querySelector(
        `[data-menu-item="${submenuName}"]`
      );
      if (toggleIcon) {
        toggleIcon.style.transform = "rotate(180deg)";
      }
      if (parentMenu) {
        parentMenu.setAttribute("data-menu-expanded", "true");
      }
    }
  });
});
