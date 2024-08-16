
export const BoxesCmsEditorComponent = {
    id: 'Boxes',
    label: 'Boxes',
    fields: [
        {
            label: 'Boxes',
            name: 'boxes',
            widget: 'list',
            fields: [
                {
                    label: 'Title',
                    name: 'title',
                    widget: 'string',

                },
                {
                    label: 'Description',
                    name: 'description',
                    widget: 'string',
                },
            ],
        },
    ],
    pattern: /^<Boxes\s+boxes=['"](.*?)['"]\s*\/>$/,

    fromBlock(match: RegExpMatchArray) {
        if (match[1] !== 'undefined') {
            const boxes = JSON.parse(match[1]);
            return { boxes: boxes };
        } else {
            console.error("No match or match[1] found");
            return { boxes: [] };
        }
    },
    toBlock({ boxes }: { boxes: { title: string; description: string }[] }) {
        if (!boxes) {
            console.error("Boxes is undefined");
            return `<Boxes boxes='[]' />`;
        }
        const boxedString = JSON.stringify(boxes);
        return `<Boxes boxes='${boxedString}' />`;
    },
    toPreview({ boxes }: { boxes: { title: string; description: string }[] }) {
        const boxesHTML = boxes
            .map((box) => `<div><div>${box.title}</div><div>${box.description}</div></div>`)
            .join('');
        return `<div>${boxesHTML}</div>`;

    },
}
