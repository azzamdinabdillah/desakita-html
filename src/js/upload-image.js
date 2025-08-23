/**
 * Upload Image Preview Function
 * Simple function for handling image upload and preview via Upload button
 */

class ImageUploadPreview {
  constructor() {
    this.init();
  }

  init() {
    this.setupUploadListeners();
  }

  setupUploadListeners() {
    // Find all upload buttons
    const uploadButtons = document.querySelectorAll('button[type="button"]');

    uploadButtons.forEach((button) => {
      const buttonText = button.textContent.toLowerCase();

      // Check if button contains "upload" text
      if (buttonText.includes("upload")) {
        this.setupSingleUpload(button);
      }
    });
  }

  setupSingleUpload(uploadButton) {
    // Find the associated file input and preview image
    const container = uploadButton.closest("div");
    const fileInput = container.querySelector('input[type="file"]');
    const previewImage = container.querySelector("img");

    if (fileInput && previewImage) {
      // Add click event to button to trigger file input
      uploadButton.addEventListener("click", () => {
        fileInput.click();
      });

      // Add change event to file input for preview
      fileInput.addEventListener("change", (e) => {
        this.handleFileSelect(e, previewImage, fileInput);
      });
    }
  }

  handleFileSelect(event, previewImage, fileInput) {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!this.isValidImageFile(file)) {
        alert("Please select a valid image file (JPG, PNG, GIF, SVG)");
        fileInput.value = "";
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        fileInput.value = "";
        return;
      }

      // Create preview
      this.createImagePreview(file, previewImage);
    }
  }

  isValidImageFile(file) {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    return validTypes.includes(file.type);
  }

  createImagePreview(file, previewImage) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.objectFit = "cover";
    };

    reader.readAsDataURL(file);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.imageUploadPreview = new ImageUploadPreview();
});
