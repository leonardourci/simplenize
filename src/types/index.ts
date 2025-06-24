export type Language = 'EN' | 'PT';

export interface Translation {
    textToTransform: string;
    inputPlaceholder: string;
    selectATransformation: string;
    clipboardMessage: string;
    autoClipboardMessage: string;
    outputPlaceholder: string;
    allRightsReserved: string;
    moreInfo: {
        exploreOurText: string;
        transformations: string;
    };
    subHeader: {
        simpleYourText: string;
        transformations: string;
    };
    transformationOptions: {
        upperCase: string;
        lowerCase: string;
        capitalize: string;
        paragraphsToOneLine: string;
        superscript: string;
        camelCase: string;
        snakeCase: string;
        pascalCase: string;
    };
    transformationDescriptions: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
}

export interface TransformationDescription {
    key: string;
    title: string;
    description: string;
}

export interface LanguageOption {
    id: Language;
    name: string;
    flag: string;
}

export interface PromotionalContent {
    bgImage: string;
    link: string;
} 