import { Language } from '../types';
import { PAGE_INFO } from '../constants';

export const updatePageInfo = (language: Language): void => {
    const htmlElement = document.documentElement;
    const titleElement = document.querySelector('title');
    const descriptionElement = document.querySelector('meta[name="description"]');

    const pageInfo = PAGE_INFO[language];

    htmlElement.setAttribute('lang', pageInfo.lang);

    if (titleElement) {
        titleElement.textContent = pageInfo.title;
    }

    if (descriptionElement) {
        descriptionElement.setAttribute('content', pageInfo.description);
    }
};

export const detectUserLanguage = (): Language => {
    const browserLanguage = navigator.language.split('-')[0].toUpperCase() as Language;
    return browserLanguage === 'PT' ? 'PT' : 'EN';
};

export const getStoredLanguage = (): Language | null => {
    const stored = localStorage.getItem('language');
    return stored as Language | null;
};

export const setStoredLanguage = (language: Language): void => {
    localStorage.setItem('language', language);
}; 