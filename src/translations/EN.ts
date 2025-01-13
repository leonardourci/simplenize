import PT from './PT';

const EN: typeof PT = {
    textToTransform              : 'Text to transform:',
    inputPlaceholder             : 'Write here the text you want to transform...',
    selectATransformation        : 'Select a transformation:',
    clipboardMessage             : 'Text copied to clipboard!',
    outputPlaceholder            : 'Output of your text transformation will appear here...',
    allRightsReserved            : 'All Rights Reserved.',
    moreInfo: {
        exploreOurText: 'Explore our text',
        transformations: 'transformations',
    },
    subHeader                    : {
        simpleYourText : 'Simple your text',
        transformations: 'transformations',
    },
    transformationOptions        : {
        upperCase          : 'UPPERCASE',
        lowerCase          : 'lowercase',
        paragraphsToOneLine: 'paragraphs to one line',
        capitalize         : 'First Capitalized',
        superscript        : 'superˢᶜʳⁱᵖᵗ',
        camelCase          : 'camelCase',
        snakeCase          : 'snake_case',
        pascalCase         : 'PascalCase',
    },
    transformationDescriptions   : {
        paragraphsToOneLine: {
            title      : 'Paragraphs to One Line',
            description: 'Convert multiple paragraphs into a single, seamless line of text. Perfect for formatting code or creating compact content.',
        },
        upperCase          : {
            title      : 'UPPERCASE',
            description: 'Transform your text into all uppercase letters. Ideal for headings or emphasizing important information.',
        },
        lowerCase          : {
            title      : 'lowercase',
            description: 'Convert your text to all lowercase letters. Great for creating uniform, clean text.',
        },
        superscript        : {
            title      : 'Superscript',
            description: 'Turn your text into superscript format. Perfect for mathematical expressions or footnotes.',
        },
        camelCase          : {
            title      : 'camelCase',
            description: 'Convert your text into camelCase format. Essential for coding and variable naming.',
        },
        snakeCase          : {
            title      : 'snake_case',
            description: 'Transform your text into snake_case format. Commonly used in programming and file naming.',
        },
        pascalCase         : {
            title      : 'PascalCase',
            description: 'Convert your text into PascalCase format. Ideal for class names and proper nouns.',
        },
        capitalize         : {
            title      : 'Capitalize',
            description: 'Capitalize the first letter of each word. Perfect for titles and headings.',
        },
    },
};

export default EN;
