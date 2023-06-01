
export const AppStoreCmsEditorComponent = {
    id: 'AppStore',
    label: 'App Store',
    fields: [
        {
            label: 'Link Google Play',
            name: 'googleApp',
            widget: 'string'
        },
        {
            label: 'Image Google Play ',
            name: 'srcGoogle',
            widget: 'images',
            choose_url: false,
        },
        {
            label: 'Alt Text',
            name: 'altGoogleImage',
            widget: 'string',
        },
        {
            label: 'Link App Store',
            name: 'appStore',
            widget: 'string'
        },
        {
            label: 'Image App Store ',
            name: 'srcAppStore',
            widget: 'images',
            choose_url: false,
        },
        {
            label: 'Alt Text',
            name: 'altAppStoreImage',
            widget: 'string',
        },

    ],
    pattern: /^<AppStore\s+googleApp=['"](.*?)['"]\s+srcGoogle=['"](.*?)['"]\s+altGoogleImage=['"](.*?)['"]\s+appStore=['"](.*?)['"]\s+srcAppStore=['"](.*?)['"]\s+altAppStoreImage=['"](.*?)['"]\s*\/>$/,
    fromBlock(match: RegExpMatchArray) {
        return {
            googleApp: match[1],
            srcGoogle: match[2],
            altGoogleImage: match[3],
            appStore: match[4],
            srcAppStore: match[5],
            altAppStoreImage: match[6],
        };
    },
    toBlock(props: {
        googleApp: string;
        srcGoogle: string;
        altGoogleImage: string;
        appStore: string;
        srcAppStore: string;
        altAppStoreImage: string;
    }) {
        return `<AppStore googleApp='${props.googleApp}' srcGoogle='${props.srcGoogle}' altGoogleImage='${props.altGoogleImage}' appStore='${props.appStore}' srcAppStore='${props.srcAppStore}' altAppStoreImage='${props.altAppStoreImage}' />`;
    },
    toPreview(props: {
        googleApp: string;
        srcGoogle: string;
        altGoogleImage: string;
        appStore: string;
        srcAppStore: string;
        altAppStoreImage: string;
    }) {
        return this.toBlock(props)
    },
}
