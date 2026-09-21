// Resizes and compresses an uploaded image before it's converted to a
// base64 string. This is important because localStorage has a hard size
// limit (usually 5-10MB total per site) — uncompressed phone photos can
// be several MB each, and a few of those would silently break saving.
// Shrinking to a reasonable max width + JPEG compression keeps each
// image tiny (usually under 100KB) while still looking fine in the UI.
export function compressImage(file, maxWidth = 500, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Output as JPEG regardless of input format — much smaller than PNG
        // for photos, and quality=0.7 is a good size/quality balance.
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error('Could not load image for compression'));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}