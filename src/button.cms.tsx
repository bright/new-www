export const AnchorLinkCmsEditorComponent = {
    id: 'AnchorLink',
    label: 'Anchor Link',
    fields: [
        {
            label: 'Text',
            name: 'text',
            widget: 'string'
        },
        {
            label: 'Href',
            name: 'href',
            widget: 'string',
        },
    ],
    pattern: /^<AnchorLink\s+text=['"](.*?)['"]\s+href=['"](.*?)['"]\s*\/>$/,
    fromBlock(match: RegExpMatchArray) {
        return {
            text: match[1],
            href: match[2],
        };
    },
    toBlock(props: {
        text: string;
        href: string;
    }) {
        return `<AnchorLink text='${props.text}' href='${props.href}' />`;
    },
    toPreview(props: {
        text: string;
        href: string;
    }) {
        return this.toBlock(props);
    },
};
