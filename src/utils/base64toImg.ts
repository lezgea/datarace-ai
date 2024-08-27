
const getImgFromBase64 = (base64Data: string | undefined) => {
    // Create an image element
    return `data:image/png;base64,${base64Data}`;
}

export default getImgFromBase64;

