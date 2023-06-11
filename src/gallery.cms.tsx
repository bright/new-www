
export const GalleryCmsEditorComponent = {
    id: 'Gallery',
    label: 'Gallery',
    fields: [
        {
            label: 'Images',
            name: 'images',
            widget: 'list',
            fields: [
                {
                    label: 'Source',
                    name: 'src',
                    widget: 'image',

                },
                {
                    label: 'Alt Text',
                    name: 'alt',
                    widget: 'string',
                },
            ],
        },
    ],
    pattern: /^<Gallery\s+images=['"](.*?)['"]\s*\/>$/,
    fromBlock(match: RegExpMatchArray) {
        if (match[1] !== 'undefined') {

            const imagesData = JSON.parse(match[1]);
            return { images: imagesData };

        } else {
            console.error("No match or match[1] found");
            return { images: [] };
        }
    },
    toBlock({ images }: { images: { src: string; alt: string }[] }) {
        const imagesString = JSON.stringify(images);
        return `<Gallery images='${imagesString}' />`;
    },
    toPreview({ images }: { images: { src: string; alt: string }[] }) {
        const imagesHTML = images
            .map((image) => `<img src="${image.src}" alt="${image.alt}" />`)
            .join('');
        return `<div>${imagesHTML}</div>`;
    },
}
