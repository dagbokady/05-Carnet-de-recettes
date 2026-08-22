export const MAX_VIDEO_MB = 60;

/** Redimensionne une image en dataURL (max 1200px, JPEG 0.8) pour tenir dans localStorage. */
export function compressImage(file, max = 1200) {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            const ratio = Math.min(1, max / Math.max(img.width, img.height));
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(img.width * ratio);
            canvas.height = Math.round(img.height * ratio);
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Image illisible."));
        };
        img.src = url;
    });
}
