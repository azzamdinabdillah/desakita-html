# Replace Path Script

Script JavaScript untuk mengubah path pada elemen `<a href>`, `<img src>`, dan atribut `data-menu-link` secara otomatis.

## Fitur

1. **Mengubah path `<a href>`**: Menambahkan prefix `/src/pages` pada path yang dimulai dengan `/`
2. **Mengubah path `<img src>`**: Menambahkan prefix `/public` pada path yang dimulai dengan `/`
3. **Mengubah path `data-menu-link`**: Menambahkan prefix `/src/pages` pada path yang dimulai dengan `/`
4. **Auto-execution**: Script berjalan otomatis saat halaman dimuat
5. **Manual execution**: Dapat dipanggil secara manual jika diperlukan
6. **Logging**: Menampilkan log perubahan path di console
7. **Konfigurasi Dinamis**: Variabel global untuk mengubah prefix path dengan mudah
8. **Auto HTML Extension**: Otomatis menambahkan ekstensi `.html` pada path pages jika belum ada

## Konfigurasi Path

Script menggunakan variabel global `PATH_CONFIG` yang dapat diubah sesuai kebutuhan:

```javascript
const PATH_CONFIG = {
  // Prefix untuk link dan data-menu-link
  PAGES_PREFIX: "/src/pages",

  // Prefix untuk image
  PUBLIC_PREFIX: "/public",
};
```

### Mengubah Konfigurasi

#### 1. Mengubah Langsung di Script

Edit nilai variabel di bagian atas file `replace-path.js`:

```javascript
const PATH_CONFIG = {
  PAGES_PREFIX: "/pages", // Ubah sesuai kebutuhan
  PUBLIC_PREFIX: "/assets", // Ubah sesuai kebutuhan
};
```

#### 2. Mengubah Secara Dinamis

Gunakan fungsi `updatePathConfig()` untuk mengubah konfigurasi saat runtime:

```javascript
// Mengubah kedua prefix
updatePathConfig("/pages", "/assets");

// Mengubah hanya pages prefix
updatePathConfig("/pages", null);

// Mengubah hanya public prefix
updatePathConfig(null, "/assets");
```

#### 3. Melihat Konfigurasi Saat Ini

```javascript
const config = getPathConfig();
console.log(config);
// Output: { PAGES_PREFIX: "/src/pages", PUBLIC_PREFIX: "/public" }
```

## Cara Penggunaan

### 1. Include Script di HTML

```html
<script src="src/js/replace-path.js"></script>
```

### 2. Script Akan Berjalan Otomatis

Script akan otomatis mengubah path saat halaman dimuat.

### 3. Penggunaan Manual (Opsional)

```javascript
// Mengubah semua path
replacePaths();

// Mengubah path secara spesifik
replaceSpecificPaths();

// Mengubah path dengan parameter kustom
replacePathManually("a[href]", "href", "/src/pages");
replacePathManually("img[src]", "src", "/public");
replacePathManually("[data-menu-link]", "data-menu-link", "/src/pages");

// Mengubah konfigurasi
updatePathConfig("/pages", "/assets");

// Melihat konfigurasi
const config = getPathConfig();

// Test fungsi HTML extension
addHtmlExtension("/path/without/extension"); // Returns: "/path/without/extension.html"
addHtmlExtension("/path/with/extension.html"); // Returns: "/path/with/extension.html"
```

## Contoh Perubahan Path

### Link (`<a href>`)

**Sebelum:**

```html
<a href="/head-village/dashboard/dashboard.html">Dashboard</a>
<a href="/head-village/head-house/head-house">Head House</a>
```

**Sesudah:**

```html
<a href="/src/pages/head-village/dashboard/dashboard.html">Dashboard</a>
<a href="/src/pages/head-village/head-house/head-house.html">Head House</a>
```

### Data-menu-link

**Sebelum:**

```html
<div
  data-menu-link="/head-village/dashboard/dashboard.html"
  data-menu-item="Dashboard"
>
  Dashboard Menu Item
</div>
<div
  data-menu-link="/head-village/head-house/create-head-house"
  data-menu-item="Create Head House"
>
  Create Head House Menu Item
</div>
```

**Sesudah:**

```html
<div
  data-menu-link="/src/pages/head-village/dashboard/dashboard.html"
  data-menu-item="Dashboard"
>
  Dashboard Menu Item
</div>
<div
  data-menu-link="/src/pages/head-village/head-house/create-head-house.html"
  data-menu-item="Create Head House"
>
  Create Head House Menu Item
</div>
```

### Image (`<img src>`)

**Sebelum:**

```html
<img src="/images/login-logo.png" alt="Login Logo" />
<img src="/images/profile-1.png" alt="Profile 1" />
```

**Sesudah:**

```html
<img src="/public/images/login-logo.png" alt="Login Logo" />
<img src="/public/images/profile-1.png" alt="Profile 1" />
```

## Auto HTML Extension

Script secara otomatis menambahkan ekstensi `.html` pada path pages (link dan data-menu-link) jika belum ada:

- `/head-village/dashboard/dashboard` → `/src/pages/head-village/dashboard/dashboard.html`
- `/head-village/dashboard/dashboard.html` → `/src/pages/head-village/dashboard/dashboard.html` (tidak berubah)

**Catatan:** Fitur ini hanya berlaku untuk path pages, tidak untuk path image.

## Path yang Tidak Akan Diubah

Script ini **TIDAK** akan mengubah path berikut:

1. **Path yang sudah benar:**

   - `/src/pages/...` (untuk link dan data-menu-link)
   - `/public/...` (untuk image)

2. **External links:**

   - `https://...`
   - `http://...`

3. **Special protocols:**

   - `mailto:...`
   - `tel:...`

4. **Relative paths:**
   - `./file.html`
   - `../folder/file.html`

## Output Console

Script akan menampilkan log di console browser:

```
Link path diubah: /head-village/dashboard/dashboard -> /src/pages/head-village/dashboard/dashboard.html
Link path diubah: /head-village/head-house/head-house.html -> /src/pages/head-village/head-house/head-house.html
Data-menu-link path diubah: /head-village/head-house/create-head-house -> /src/pages/head-village/head-house/create-head-house.html
Image path diubah: /images/login-logo.png -> /public/images/login-logo.png
Proses pengubahan path selesai! Total: 4 link, 3 data-menu-link, dan 3 image diubah.
```

## Fungsi yang Tersedia

1. **`replacePaths()`**: Fungsi utama untuk mengubah semua path
2. **`replaceSpecificPaths()`**: Fungsi untuk mengubah path secara spesifik
3. **`replacePathManually(selector, attribute, prefix)`**: Fungsi untuk mengubah path dengan parameter kustom
4. **`autoReplacePaths()`**: Fungsi untuk menjalankan script otomatis
5. **`updatePathConfig(newPagesPrefix, newPublicPrefix)`**: Fungsi untuk mengubah konfigurasi path
6. **`getPathConfig()`**: Fungsi untuk mendapatkan konfigurasi path saat ini
7. **`addHtmlExtension(path)`**: Fungsi untuk menambahkan ekstensi .html pada path

## Testing

Buka file `example-usage.html` di browser untuk melihat contoh penggunaan script ini, termasuk cara mengubah konfigurasi path dan test fitur HTML extension.

## Catatan

- Script ini hanya mengubah path yang dimulai dengan `/`
- Pastikan struktur folder sesuai dengan path yang diubah
- Script berjalan di client-side (browser)
- Gunakan Developer Tools (F12) untuk melihat log perubahan
- Konfigurasi path dapat diubah secara dinamis menggunakan `updatePathConfig()`
- Ekstensi `.html` otomatis ditambahkan pada path pages jika belum ada
