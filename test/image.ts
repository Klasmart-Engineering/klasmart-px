export function b64toBlob (b64Data: string, contentType: string, sliceSize?: number) {
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = Array.from(slice)
            .map(c => c.charCodeAt(0));

        byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, {
        type: contentType,
    });
}

// Smallest possible image (~35 bytes) for testing speed
export const gif = b64toBlob(`R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=`, `image/gif`);
