'use client';

import { useEffect } from 'react';

// Component for selecting language (Portuguese/English)
export default function LanguageSelector ( { language, setLanguage }: any ) {
    // State to manage the currently selected language

    // Handler function for when the language is changed
    const handleLanguageChange = ( event: any ) => {
        const selectedLanguage = event.target.value;
        setLanguage ( selectedLanguage );
        updateLocalStorage ( selectedLanguage );
    };

    // Initializes the language based on local storage or default setting
    useEffect ( () => {
        const storedLanguage = localStorage.getItem ( 'language' );
        if ( storedLanguage ) {
            setLanguage ( storedLanguage );
        }
    }, [] );

    // Updates localStorage with the current language setting
    const updateLocalStorage = ( languageValue: any ) => {
        localStorage.setItem ( 'language', languageValue );
    };

    return (
        <select
            value={ language }
            onChange={ handleLanguageChange }
            className="absolute right-14 p-2 top-1/2 rounded-t-2xl transform -translate-y-1/2 "
            name="select your language"
            aria-label="Select Language"
        >
            <option value="PT">🇧🇷</option>
            <option value="EN">🇺🇸</option>
        </select>
    );
}