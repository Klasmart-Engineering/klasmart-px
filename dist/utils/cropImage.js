"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createImage = (url) => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(`load`, () => resolve(image));
    image.addEventListener(`error`, error => reject(error));
    image.setAttribute(`crossOrigin`, `anonymous`);
    image.src = url;
});
function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}
async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement(`canvas`);
    const ctx = canvas.getContext(`2d`);
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    canvas.width = safeArea;
    canvas.height = safeArea;
    if (ctx) {
        ctx.fillStyle = `#ffffff`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate(getRadianAngle(rotation));
        ctx.translate(-safeArea / 2, -safeArea / 2);
        ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
        const data = ctx.getImageData(0, 0, safeArea, safeArea);
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        ctx.putImageData(data, Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x), Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y));
    }
    const base64 = canvas.toDataURL(`image/jpeg`);
    const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(file => {
            if (!file) {
                reject(file);
                return;
            }
            resolve(file);
        }, `image/jpeg`);
    });
    const file = new File([blob], `croppedImage`, {
        type: `image/jpeg`,
    });
    return {
        base64,
        blob,
        file,
    };
}
exports.default = getCroppedImg;
