import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "preview"];

  preview() {
    const input = this.inputTarget;
    const files = input.files;
    const previewContainer = this.previewTarget;
    previewContainer.innerHTML = ""; // 既存のプレビューをクリア

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 200; // リサイズ後の最大幅
          const maxHeight = 200; // リサイズ後の最大高さ
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/png");
          const outputImg = document.createElement("img");
          outputImg.src = dataUrl;
          previewContainer.appendChild(outputImg);
        };
      };

      reader.readAsDataURL(file);
    });
  }
}
