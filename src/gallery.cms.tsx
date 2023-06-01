
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
                    widget: 'images',
                    choose_url: false,
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
        const imagesData = JSON.parse(match[1]);
        return { images: imagesData };
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
