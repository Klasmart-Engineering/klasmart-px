import { Area } from "react-easy-crop/types";

const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.addEventListener(`load`, () => resolve(image));
        image.addEventListener(`error`, error => reject(error));
        image.setAttribute(`crossOrigin`, `anonymous`);
        image.src = url;
    });

function getRadianAngle (degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg (imageSrc: string, pixelCrop: Area, rotation = 0) {
    const image: HTMLImageElement = await createImage(imageSrc);
    const canvas = document.createElement(`canvas`);
    const ctx = canvas.getContext(`2d`);

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    if (ctx) {
        // translate canvas context to a central location on image to allow rotating around the center.
        ctx.fillStyle = `#ffffff`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate(getRadianAngle(rotation));
        ctx.translate(-safeArea / 2, -safeArea / 2);

        // draw rotated image and store data.
        ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // paste generated rotate image with correct offsets for x,y crop values.
        ctx.putImageData(data, Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x), Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y));
    }

    const base64 = canvas.toDataURL(`image/jpeg`);
    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(file => {
            if (!file) {
                reject(file);
                return;
            }
            resolve(file);
        }, `image/jpeg`);
    });
    const file = new File([ blob ], `croppedImage`, {
        type: `image/jpeg`,
    });

    return {
        base64,
        blob,
        file,
    };
}
