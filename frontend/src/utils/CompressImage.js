export const compressImage = (file, quality = 0.7, maxWidth = 800) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      return reject("Invalid file type");
    }

    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    reader.onerror = () => reject("File reading failed");

    img.onload = () => {
      const canvas = document.createElement("canvas");

      let width = img.width;
      let height = img.height;

      // resize if too large
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Compression failed");
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => reject("Image load failed");
  });
};