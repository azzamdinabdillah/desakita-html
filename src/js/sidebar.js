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

  // Function to normalize path for comparison
  function normalizePath(path) {
    // Remove leading slash and ensure consistent format
    return path.replace(/^\/+/, "").replace(/\/+$/, "");
  }

  // Function to check if current path matches menu link
  function isCurrentPath(menuLink) {
    if (!menuLink) return false;

    const currentPath = normalizePath(window.location.pathname);
    const menuPath = normalizePath(menuLink);

    // Split paths into segments
    const currentSegments = currentPath
      .split("/")
      .filter((segment) => segment !== "");
    const menuSegments = menuPath
      .split("/")
      .filter((segment) => segment !== "");

    // Remove .html from the last segment if it exists
    if (
      currentSegments.length > 0 &&
      currentSegments[currentSegments.length - 1].endsWith(".html")
    ) {
      currentSegments[currentSegments.length - 1] = currentSegments[
        currentSegments.length - 1
      ].replace(".html", "");
    }
    if (
      menuSegments.length > 0 &&
      menuSegments[menuSegments.length - 1].endsWith(".html")
    ) {
      menuSegments[menuSegments.length - 1] = menuSegments[
        menuSegments.length - 1
      ].replace(".html", "");
    }

    // Take the path up to the second-to-last segment for comparison
    const currentPathToCompare = currentSegments.slice(0, -1).join("/");
    const menuPathToCompare = menuSegments.slice(0, -1).join("/");

    // Check if the paths match up to the second-to-last segment
    return (
      currentPathToCompare === menuPathToCompare && currentPathToCompare !== ""
    );
  }

  // Set active states for main menu items
  const menuItems = document.querySelectorAll(".menu");
  menuItems.forEach(function (menuItem) {
    const menuLink = menuItem.getAttribute("data-menu-link");
    const hasSubmenu = menuItem.getAttribute("data-has-submenu") === "true";

    // Check if this menu item is active
    if (menuLink && isCurrentPath(menuLink)) {
      // Add active background
      menuItem.classList.add("bg-foreshadow");

      // Update text color for active state
      const menuText = menuItem.querySelector("h3");
      if (menuText) {
        menuText.classList.remove(
          "text-secondary-text-color",
          "group-hover:text-dark-green",
          "group-hover:font-medium"
        );
        menuText.classList.add("text-dark-green", "font-medium");
      }
    } else {
      // Remove active classes for inactive menu items
      menuItem.classList.remove("bg-foreshadow");

      // Reset text color for inactive state
      const menuText = menuItem.querySelector("h3");
      if (menuText) {
        menuText.classList.remove("text-dark-green", "font-medium");
        menuText.classList.add("text-secondary-text-color");
      }
    }
  });

  // Handle menu click events
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
    let activeLink = null;

    links.forEach(function (link) {
      const href = link.getAttribute("href");
      if (href && isCurrentPath(href)) {
        isActive = true;
        activeLink = link;
      }
    });

    if (isActive) {
      // Expand the sub-menu
      subMenu.style.maxHeight = "400px";

      // Set active state for the active sub-menu link
      if (activeLink) {
        const linkText = activeLink.querySelector("p");
        if (linkText) {
          linkText.classList.remove("text-secondary-text-color");
          linkText.classList.add("text-dark-green", "font-medium");
        }
      }

      // Set active state for parent menu
      const submenuName = subMenu.getAttribute("data-submenu");
      const parentMenu = document.querySelector(
        `[data-menu-item="${submenuName}"]`
      );
      const toggleIcon = document.querySelector(
        `[data-menu-toggle="${submenuName}"]`
      );

      if (parentMenu) {
        parentMenu.setAttribute("data-menu-expanded", "true");
        // Add active background for parent menu
        parentMenu.classList.add("bg-foreshadow");

        // Update text color for active state
        const menuText = parentMenu.querySelector("h3");
        if (menuText) {
          menuText.classList.remove(
            "text-secondary-text-color",
            "group-hover:text-dark-green",
            "group-hover:font-medium"
          );
          menuText.classList.add("text-dark-green", "font-medium");
        }
      }

      if (toggleIcon) {
        toggleIcon.style.transform = "rotate(180deg)";
      }
    }
  });

  // Initialize sidebar state for mobile
  if (window.innerWidth < 1024 && sidebar) {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
  }
});
