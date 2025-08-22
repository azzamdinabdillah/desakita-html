// ========================================
// KONFIGURASI PATH PREFIX
// ========================================
// Ubah nilai variabel di bawah ini sesuai kebutuhan
const PATH_CONFIG = {
  // Prefix untuk link dan data-menu-link
  PAGES_PREFIX: "/src/pages",

  // Prefix untuk image
  PUBLIC_PREFIX: "/public",
};

// ========================================
// SCRIPT UTAMA
// ========================================

// Fungsi untuk menambahkan ekstensi .html jika belum ada
function addHtmlExtension(path) {
  // Jika path sudah memiliki ekstensi .html, return path asli
  if (path.endsWith(".html")) {
    return path;
  }

  // Jika path tidak memiliki ekstensi, tambahkan .html
  return path + ".html";
}

// Script untuk mengubah path pada elemen <a href> dan <img src>
function replacePaths() {
  let linkCount = 0;
  let imageCount = 0;
  let dataMenuLinkCount = 0;

  // Mengubah semua path pada elemen <a href>
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    const href = link.getAttribute("href");

    // Hanya ubah path yang dimulai dengan / dan bukan sudah ada prefix yang dikonfigurasi
    if (
      href &&
      href.startsWith("/") &&
      !href.startsWith(PATH_CONFIG.PAGES_PREFIX) &&
      !href.startsWith("http") &&
      !href.startsWith("mailto:") &&
      !href.startsWith("tel:")
    ) {
      // Tambahkan prefix dan ekstensi .html jika belum ada
      const pathWithHtml = addHtmlExtension(href);
      const newHref = PATH_CONFIG.PAGES_PREFIX + pathWithHtml;
      link.setAttribute("href", newHref);
      linkCount++;
      // console.log(`Link path diubah: ${href} -> ${newHref}`);
    }
  });

  // Mengubah semua path pada elemen <img src>
  const images = document.querySelectorAll("img[src]");
  images.forEach((img) => {
    const src = img.getAttribute("src");

    // Hanya ubah path yang dimulai dengan / dan bukan sudah ada prefix yang dikonfigurasi
    if (
      src &&
      src.startsWith("/") &&
      !src.startsWith(PATH_CONFIG.PUBLIC_PREFIX) &&
      !src.startsWith("http")
    ) {
      const newSrc = PATH_CONFIG.PUBLIC_PREFIX + src;
      img.setAttribute("src", newSrc);
      imageCount++;
      // console.log(`Image path diubah: ${src} -> ${newSrc}`);
    }
  });

  // Mengubah semua path pada atribut data-menu-link
  const dataMenuLinks = document.querySelectorAll("[data-menu-link]");
  dataMenuLinks.forEach((element) => {
    const dataMenuLink = element.getAttribute("data-menu-link");

    // Hanya ubah path yang dimulai dengan / dan bukan sudah ada prefix yang dikonfigurasi
    if (
      dataMenuLink &&
      dataMenuLink.startsWith("/") &&
      !dataMenuLink.startsWith(PATH_CONFIG.PAGES_PREFIX) &&
      !dataMenuLink.startsWith("http") &&
      !dataMenuLink.startsWith("mailto:") &&
      !dataMenuLink.startsWith("tel:")
    ) {
      // Tambahkan prefix dan ekstensi .html jika belum ada
      const pathWithHtml = addHtmlExtension(dataMenuLink);
      const newDataMenuLink = PATH_CONFIG.PAGES_PREFIX + pathWithHtml;
      element.setAttribute("data-menu-link", newDataMenuLink);
      dataMenuLinkCount++;
      // console.log(
      //   `Data-menu-link path diubah: ${dataMenuLink} -> ${newDataMenuLink}`
      // );
    }
  });

  // console.log(
  //   `Proses pengubahan path selesai! Total: ${linkCount} link, ${imageCount} image, dan ${dataMenuLinkCount} data-menu-link diubah.`
  // );
}

// Fungsi untuk mengubah path secara manual dengan parameter
function replacePathManually(selector, attribute, prefix) {
  const elements = document.querySelectorAll(selector);
  let count = 0;

  elements.forEach((element) => {
    const value = element.getAttribute(attribute);

    if (
      value &&
      value.startsWith("/") &&
      !value.startsWith(prefix) &&
      !value.startsWith("http") &&
      !value.startsWith("mailto:") &&
      !value.startsWith("tel:")
    ) {
      let newValue;

      // Jika ini adalah pages path (link atau data-menu-link), tambahkan .html
      if (prefix === PATH_CONFIG.PAGES_PREFIX) {
        const pathWithHtml = addHtmlExtension(value);
        newValue = prefix + pathWithHtml;
      } else {
        newValue = prefix + value;
      }

      element.setAttribute(attribute, newValue);
      count++;
      // console.log(`${attribute} path diubah: ${value} -> ${newValue}`);
    }
  });

  return count;
}

// Fungsi untuk menjalankan script secara otomatis saat halaman dimuat
function autoReplacePaths() {
  // Tunggu sampai DOM selesai dimuat
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", replacePaths);
  } else {
    // DOM sudah dimuat, langsung jalankan
    replacePaths();
  }
}

// Fungsi untuk mengubah path secara spesifik
function replaceSpecificPaths() {
  // Mengubah link paths
  const linkCount = replacePathManually(
    "a[href]",
    "href",
    PATH_CONFIG.PAGES_PREFIX
  );

  // Mengubah image paths
  const imageCount = replacePathManually(
    "img[src]",
    "src",
    PATH_CONFIG.PUBLIC_PREFIX
  );

  // Mengubah data-menu-link paths
  const dataMenuLinkCount = replacePathManually(
    "[data-menu-link]",
    "data-menu-link",
    PATH_CONFIG.PAGES_PREFIX
  );

  // console.log(
  //   `Pengubahan path spesifik selesai! Total: ${linkCount} link, ${imageCount} image, dan ${dataMenuLinkCount} data-menu-link diubah.`
  // );
}

// Fungsi untuk mengubah konfigurasi path secara dinamis
function updatePathConfig(newPagesPrefix, newPublicPrefix) {
  if (newPagesPrefix) {
    PATH_CONFIG.PAGES_PREFIX = newPagesPrefix;
    // console.log(`Pages prefix diubah menjadi: ${newPagesPrefix}`);
  }
  if (newPublicPrefix) {
    PATH_CONFIG.PUBLIC_PREFIX = newPublicPrefix;
    // console.log(`Public prefix diubah menjadi: ${newPublicPrefix}`);
  }
}

// Fungsi untuk mendapatkan konfigurasi path saat ini
function getPathConfig() {
  return { ...PATH_CONFIG };
}

// Jalankan script secara otomatis
autoReplacePaths();

// Export fungsi untuk penggunaan manual jika diperlukan
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    replacePaths,
    autoReplacePaths,
    replacePathManually,
    replaceSpecificPaths,
    updatePathConfig,
    getPathConfig,
    addHtmlExtension,
    PATH_CONFIG,
  };
}
