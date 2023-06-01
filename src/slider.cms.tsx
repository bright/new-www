
export const SliderCmsEditorComponent = {
    id: 'TextSlider',
    label: 'Slider',
    fields: [
        {
            label: 'Slider Elements',
            name: 'sliderElements',
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
    pattern: /^<SliderText\s+sliderElements=['"](.*?)['"]\s*\/>$/,
    fromBlock(match: RegExpMatchArray) {
        const sliderElementsData = JSON.parse(match[1]);
        return { sliderElements: sliderElementsData };
    },
    toBlock({ sliderElements }: { sliderElements: { title: string; description: string }[] }) {
        const sliderElementsString = JSON.stringify(sliderElements);
        return `<SliderText sliderElements='${sliderElementsString}' />`;
    },
    toPreview({ sliderElements }: { sliderElements: { title: string; description: string }[] }) {
        const sliderElementsHTML = sliderElements
            .map((sliderElement) => `<img src="${sliderElement.title}" alt="${sliderElement.title}" />`)
            .join('');
        return `<div>${sliderElementsHTML}</div>`;

    },
}
