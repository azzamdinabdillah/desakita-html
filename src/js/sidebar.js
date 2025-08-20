document.addEventListener("DOMContentLoaded", function () {
  // Get sidebar element
  const sidebar = document.querySelector('[class*="translate-x-0"]');

  // Mobile sidebar toggle button (outside sidebar)
  const mobileSidebarToggle = document.getElementById("sidebar-toggle");

  // Desktop sidebar toggle button (inside sidebar)
  const sidebarToggleBtn = document.getElementById("toggle-sidebar");

  // Function to toggle sidebar
  function toggleSidebar() {
    if (sidebar) {
      const isOpen = !sidebar.classList.contains("-translate-x-full");
      if (isOpen) {
        // Close sidebar
        sidebar.classList.add("-translate-x-full");
        sidebar.classList.remove("translate-x-0");
      } else {
        // Open sidebar
        sidebar.classList.remove("-translate-x-full");
        sidebar.classList.add("translate-x-0");
      }
    }
  }

  // Mobile toggle button event listener
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener("click", function () {
      toggleSidebar();
    });
  }

  // Desktop toggle button event listener
  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener("click", function () {
      toggleSidebar();
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (event) {
    if (window.innerWidth < 1024) {
      // Only on mobile (lg breakpoint)
      const isClickInsideSidebar = sidebar && sidebar.contains(event.target);
      const isClickOnToggle =
        (mobileSidebarToggle && mobileSidebarToggle.contains(event.target)) ||
        (sidebarToggleBtn && sidebarToggleBtn.contains(event.target));

      if (
        !isClickInsideSidebar &&
        !isClickOnToggle &&
        sidebar &&
        !sidebar.classList.contains("-translate-x-full")
      ) {
        sidebar.classList.add("-translate-x-full");
        sidebar.classList.remove("translate-x-0");
      }
    }
  });

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
        // Close sidebar on mobile after navigation
        if (window.innerWidth < 1024 && sidebar) {
          sidebar.classList.add("-translate-x-full");
          sidebar.classList.remove("translate-x-0");
        }
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

  // Initialize sidebar state for mobile
  if (window.innerWidth < 1024 && sidebar) {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
  }
});
