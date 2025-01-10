import React, { useState, useEffect } from 'react';

import PortugueseTranslation from './translations/PT';
import EnglishTranslation from './translations/EN';
import SimplenizeHeaderLogo from './images/simplenize-logo.png';
import AnimatedThemeToggle from './Components/AnimatedThemeToggle';
import LanguageDropdown from './Components/LanguageDropdown';

const TRANSLATION = {
    PT: PortugueseTranslation,
    EN: EnglishTranslation,
};

const localStorageLanguage = localStorage.getItem ( 'language' );

const WEB_USER_LANGUAGE = navigator.language.split ( '-' )[ 0 ].toUpperCase () as 'PT' | 'EN';

let WEB_TRANSLATION = TRANSLATION[ localStorageLanguage as 'EN' | 'PT' ] || TRANSLATION[ WEB_USER_LANGUAGE ] || TRANSLATION.EN;

const SUPERSCRIPTS = {
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

export default function App () {
    const [ input, setInput ] = useState ( '' );
    const [ output, setOutput ] = useState ( '' );
    const [ copySuccess, setCopySuccess ] = useState ( false );
    const [ selectedTransformation, setSelectedTransformation ] = useState<string> ( '' );
    const [ language, setLanguage ] = useState ( localStorageLanguage as 'EN' | 'PT' || WEB_USER_LANGUAGE || TRANSLATION.EN );
    const [ textTransformationOptions, setTextTransformationOptions ] = useState ( [
        WEB_TRANSLATION.transformationOptions.upperCase,
        WEB_TRANSLATION.transformationOptions.lowerCase,
        WEB_TRANSLATION.transformationOptions.capitalize,
        WEB_TRANSLATION.transformationOptions.paragraphsToOneLine,
        WEB_TRANSLATION.transformationOptions.superscript,
    ] );

    const setTransformation = ( transformation: string ) => {
        setSelectedTransformation ( prev => prev === transformation ? '' : transformation );
    };

    useEffect ( () => {
        WEB_TRANSLATION = TRANSLATION[ language as 'EN' | 'PT' ];
        setTextTransformationOptions ( [
                WEB_TRANSLATION.transformationOptions.upperCase,
                WEB_TRANSLATION.transformationOptions.lowerCase,
                WEB_TRANSLATION.transformationOptions.capitalize,
                WEB_TRANSLATION.transformationOptions.paragraphsToOneLine,
                WEB_TRANSLATION.transformationOptions.superscript,
            ],
        );
    }, [ language ] );

    useEffect ( () => {
        let transformedOutput = input;

        switch ( selectedTransformation ) {
            case WEB_TRANSLATION.transformationOptions.paragraphsToOneLine:
                transformedOutput = transformedOutput.replace ( /\s+|\n/g, ' ' ).trim ();
                break;
            case WEB_TRANSLATION.transformationOptions.upperCase:
                transformedOutput = transformedOutput.toUpperCase ();
                break;
            case WEB_TRANSLATION.transformationOptions.lowerCase:
                transformedOutput = transformedOutput.toLowerCase ();
                break;
            case WEB_TRANSLATION.transformationOptions.superscript:
                let superscriptResult = '';
                for ( let index = 0; index < transformedOutput.length; index++ ) {
                    let character = transformedOutput[ index ];
                    if ( character.toLowerCase () in SUPERSCRIPTS ) {
                        superscriptResult += SUPERSCRIPTS[ character.toLowerCase () as keyof typeof SUPERSCRIPTS ];
                    } else {
                        superscriptResult += character;
                    }
                }
                transformedOutput = superscriptResult;

                break;
            case WEB_TRANSLATION.transformationOptions.capitalize:
                const result: string[] = [];
                const textWords = transformedOutput.split ( ' ' );
                for ( const word of textWords ) {
                    if ( word.length ) {
                        const capitalizedWord = word.slice ( 1 );
                        result.push ( word[ 0 ].toUpperCase () + capitalizedWord );
                    }
                }

                const finalResult: string[] = [];
                const multipleLinesSplit = result.join ( ' ' ).split ( '\n' );

                for ( const word of multipleLinesSplit ) {
                    if ( word.length ) {
                        const capitalizedWord = word.slice ( 1 );
                        const lastCharacter = selectedTransformation.includes ( WEB_TRANSLATION.transformationOptions.paragraphsToOneLine ) ? ' ' : '\n';
                        finalResult.push ( word[ 0 ].toUpperCase () + capitalizedWord + lastCharacter );
                    }
                }

                transformedOutput = finalResult.join ( '' );
                break;
        }

        setOutput ( transformedOutput );
    }, [ input, selectedTransformation ] );

    const copyToClipboard = () => {
        navigator.clipboard.writeText ( output ).then ( () => {
            setCopySuccess ( true );
            setTimeout ( () => {
                setCopySuccess ( false );
            }, 2500 );
        } ).catch ( ( err ) => {
            console.error ( 'Falha ao copiar texto: ', err );
        } );
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-700">
            <header className="w-full py-6 bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:relative">
                        <div className="mb-4 sm:mb-0">
                            <img className="h-10 w-auto" src={ SimplenizeHeaderLogo } alt="Simplenize"/>
                        </div>
                        <div className="flex items-center justify-center space-x-4 sm:absolute sm:right-4">
                            <LanguageDropdown language={ language } setLanguage={ setLanguage }/>
                            <AnimatedThemeToggle/>
                        </div>
                    </div>
                </div>
            </header>


            <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto relative">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                        <div className="p-8 space-y-8">
                            <div>
                                <label htmlFor="multiline"
                                       className="block text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    { WEB_TRANSLATION.textToTransform }
                                </label>
                                <textarea
                                    id="multiline"
                                    value={ input }
                                    onChange={ ( e ) => setInput ( e.target.value ) }
                                    rows={ 6 }
                                    className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                    placeholder={ WEB_TRANSLATION.placeholder }
                                />
                            </div>

                            <div>
                                <h2 className="block text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    { WEB_TRANSLATION.selectATransformation }
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    { textTransformationOptions.map ( ( option ) => (
                                        <button
                                            key={ option }
                                            className={ `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                                                selectedTransformation === option
                                                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }` }
                                            onClick={ () => setTransformation ( option ) }
                                        >
                                            { option }
                                        </button>
                                    ) ) }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="singleline"
                                       className="block text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    { WEB_TRANSLATION.output }
                                </label>
                                <div className="flex">
                                    <textarea
                                        readOnly
                                        value={ output }
                                        className="flex-grow p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                    />
                                    <button
                                        aria-label="Copy to clipboard"
                                        onClick={ copyToClipboard }
                                        className="flex items-center justify-center border-0 px-6 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none  focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 }
                                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            { copySuccess && (
                                <p className="text-green-600 dark:text-green-400 text-sm text-center font-medium animate-pulse"
                                   role="alert">{ WEB_TRANSLATION.clipboardMessage }</p>
                            ) }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
        ;
}

