import { LanguageOption } from '../types';

export const COPY_TO_CLIPBOARD_TIMES_BEFORE_OPEN_MODAL = 5;
export const COPY_SUCCESS_DISPLAY_DURATION = 2500;
export const MODAL_CLOSE_DELAY = 500;

export const SUPERSCRIPTS: Record<string, string> = {
    ' ': ' ',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '+': '⁺',
    '-': '⁻',
    'a': 'ᵃ',
    'b': 'ᵇ',
    'c': 'ᶜ',
    'd': 'ᵈ',
    'e': 'ᵉ',
    'f': 'ᶠ',
    'g': 'ᵍ',
    'h': 'ʰ',
    'i': 'ⁱ',
    'j': 'ʲ',
    'k': 'ᵏ',
    'l': 'ˡ',
    'm': 'ᵐ',
    'n': 'ⁿ',
    'o': 'ᵒ',
    'p': 'ᵖ',
    'r': 'ʳ',
    's': 'ˢ',
    't': 'ᵗ',
    'u': 'ᵘ',
    'v': 'ᵛ',
    'w': 'ʷ',
    'x': 'ˣ',
    'y': 'ʸ',
    'z': 'ᶻ',
    '(': '⁽',
    ')': '⁾',
    '=': '⁼',
    '.': '˙',
    '/': 'ᐟ',
    ',': '˒',
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    { id: 'PT', name: 'Portuguese', flag: '🇧🇷' },
    { id: 'EN', name: 'English', flag: '🇺🇸' },
];

export const PAGE_INFO = {
    EN: {
        lang: 'en',
        title: 'Simplenize - Online Text Transformation Tool',
        description: 'Simplenize: Free online tool for text formatting and transformation. Convert case, camelCase, snakeCase and more. Ideal for developers and marketing professionals.',
    },
    PT: {
        lang: 'pt-BR',
        title: 'Simplenize - Ferramenta Online de Transformação de Texto',
        description: 'Simplenize: Ferramenta online gratuita para formatação e transformação de texto. Converta maiúsculas/minúsculas, camelCase, snakeCase e mais. Ideal para desenvolvedores',
    },
} as const; 