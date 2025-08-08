
export const updatePreview = (img, previewField, setValue) => {
    if (img && img.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img[0]);
        fileReader.addEventListener("load", function () {
            setValue(previewField, this.result);
        });
    }
};

export const updateMultiplePreview = (images, previewField, setValue) => {
    if (images && images.length > 0) {
        const previews = [];
        Array.from(images).forEach((img) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(img);
            fileReader.addEventListener("load", function () {
                previews.push(this.result);
                if (previews.length === images.length) {
                    setValue(previewField, previews);
                }
            });
        });
    }
};
