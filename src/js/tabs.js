// Tabs functionality for React Tabs generated HTML
class TabsManager {
  constructor() {
    this.tabsContainers = [];
    this.init();
  }

  init() {
    // Find all tab containers with data-rttabs="true"
    const containers = document.querySelectorAll('[data-rttabs="true"]');

    containers.forEach((container) => {
      this.setupTabs(container);
    });
  }

  setupTabs(container) {
    const tabs = container.querySelectorAll('[data-rttab="true"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    if (tabs.length === 0) return;

    // Initialize first tab as active if no tab is currently active
    const activeTab = container.querySelector('[aria-selected="true"]');
    if (!activeTab && tabs.length > 0) {
      this.switchTab(container, 0);
    }

    // Add click event listeners to all tabs
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchTab(container, index);
      });

      // Add keyboard navigation
      tab.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.switchTab(container, index);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex = (index + 1) % tabs.length;
          this.switchTab(container, nextIndex);
          tabs[nextIndex].focus();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex = (index - 1 + tabs.length) % tabs.length;
          this.switchTab(container, prevIndex);
          tabs[prevIndex].focus();
        }
      });
    });

    // Store container reference
    this.tabsContainers.push({
      container,
      tabs,
      panels,
    });
  }

  switchTab(container, activeIndex) {
    const tabs = container.querySelectorAll('[data-rttab="true"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');

    // Update all tabs
    tabs.forEach((tab, index) => {
      const isActive = index === activeIndex;

      // Update ARIA attributes
      tab.setAttribute("aria-selected", isActive.toString());
      tab.setAttribute("tabindex", isActive ? "0" : "-1");

      // Update classes
      if (isActive) {
        tab.classList.add("bg-black", "text-white");
        tab.classList.remove("text-secondary-text-color");
      } else {
        tab.classList.remove("bg-black", "text-white");
        tab.classList.add("text-secondary-text-color");
      }
    });

    // Update all panels
    panels.forEach((panel, index) => {
      const isActive = index === activeIndex;

      if (isActive) {
        panel.classList.add("react-tabs__tab-panel--selected");
        panel.style.display = "flex";
      } else {
        panel.classList.remove("react-tabs__tab-panel--selected");
        panel.style.display = "none";
      }
    });
  }

  // Method to programmatically switch tabs
  switchToTab(containerIndex, tabIndex) {
    if (this.tabsContainers[containerIndex]) {
      this.switchTab(this.tabsContainers[containerIndex].container, tabIndex);
    }
  }

  // Method to get active tab index for a container
  getActiveTabIndex(containerIndex) {
    if (this.tabsContainers[containerIndex]) {
      const container = this.tabsContainers[containerIndex];
      const activeTab = container.container.querySelector(
        '[aria-selected="true"]'
      );
      return Array.from(container.tabs).indexOf(activeTab);
    }
    return -1;
  }
}

// Initialize tabs when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.tabsManager = new TabsManager();
});

// Also initialize for dynamically loaded content
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.tabsManager = new TabsManager();
  });
} else {
  window.tabsManager = new TabsManager();
}

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = TabsManager;
}
