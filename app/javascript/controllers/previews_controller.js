import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="previews"
export default class extends Controller {
  static targets = ["input", "preview"];

  connect() {
    this.displayPreviews();
  }

  preview() {
    this.displayPreviews();
  }

  displayPreviews() {
    const input = this.inputTarget;
    const files = input.files;
    this.previewTarget.innerHTML = ""; // 既存のプレビューをクリア

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = document.createElement("img");
        img.src = reader.result;
        img.classList.add("preview-image"); // 必要に応じてスタイルクラスを追加
        this.previewTarget.appendChild(img);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }
}
