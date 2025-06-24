import { SUPERSCRIPTS } from '../constants';

export const transformText = (text: string, transformation: string): string => {
    switch (transformation) {
        case 'paragraphs to one line':
        case 'parágrafos para uma linha':
            return text.replace(/\s+|\n/g, ' ').trim();

        case 'UPPERCASE':
        case 'MAIÚSCULAS':
            return text.toUpperCase();

        case 'lowercase':
        case 'minúsculas':
            return text.toLowerCase();

        case 'superˢᶜʳⁱᵖᵗ':
        case 'sobreˢᶜʳⁱᵗᵒ':
            return convertToSuperscript(text);

        case 'camelCase':
            return convertToCamelCase(text);

        case 'snake_case':
            return convertToSnakeCase(text);

        case 'PascalCase':
            return convertToPascalCase(text);

        case 'First Capitalized':
        case 'Primeiras Em Maiúsculas':
            return capitalizeFirstLetter(text);

        default:
            return text;
    }
};

const convertToSuperscript = (text: string): string => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        const lowerChar = character.toLowerCase();
        if (lowerChar in SUPERSCRIPTS) {
            result += SUPERSCRIPTS[lowerChar];
        } else {
            result += character;
        }
    }
    return result;
};

const convertToCamelCase = (text: string): string => {
    return text
        .split(' ')
        .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
};

const convertToSnakeCase = (text: string): string => {
    const words = text.toLowerCase().split(' ');
    return words.join('_');
};

const convertToPascalCase = (text: string): string => {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
};

const capitalizeFirstLetter = (text: string): string => {
    const words = text.split(' ');
    const result: string[] = [];

    for (const word of words) {
        if (word.length) {
            const capitalizedWord = word.slice(1);
            result.push(word[0].toUpperCase() + capitalizedWord);
        }
    }

    const finalResult: string[] = [];
    const multipleLinesSplit = result.join(' ').split('\n');

    for (const word of multipleLinesSplit) {
        if (word.length) {
            const capitalizedWord = word.slice(1);
            const lastCharacter = text.includes('paragraphs to one line') || text.includes('parágrafos para uma linha') ? ' ' : '\n';
            finalResult.push(word[0].toUpperCase() + capitalizedWord + lastCharacter);
        }
    }

    return finalResult.join('');
}; 