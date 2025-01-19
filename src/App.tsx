import React, { useState, useEffect } from 'react';

import SimplenizeHeaderLogo from './images/simplenize-logo.png';
import PortugueseTranslation from './translations/PT';
import EnglishTranslation from './translations/EN';
import AnimatedThemeToggle from './Components/AnimatedThemeToggle';
import LanguageDropdown from './Components/LanguageDropdown';
import Modal from './Components/Modal';

const TRANSLATION = {
    PT: PortugueseTranslation,
    EN: EnglishTranslation,
};

const changePageInfoByLang = (language: 'EN' | 'PT')=> {
    const htmlElement = document.documentElement;

    const titleElement = document.querySelector('title');
    const descriptionElement = document.querySelector('meta[name="description"]');

    if (language === 'EN') {
        htmlElement.setAttribute('lang', 'en');

        if (titleElement) {
            titleElement.textContent = 'Simplenize - Online Text Transformation Tool';
        }

        if (descriptionElement) {
            descriptionElement.setAttribute('content', 'Simplenize: Free online tool for text formatting and transformation. Convert case, camelCase, snakeCase and more. Ideal for developers and marketing professionals.');
        }

        // Palavras-chave (você pode adicionar isso como um comentário ou em uma meta tag separada)
        // 'text formatter', 'case converter', 'string manipulation', 'developer tools', 'marketing text tools'
    } else if (language === 'PT') {
        // Configurações para Português
        htmlElement.setAttribute ( 'lang', 'pt-BR' );

        if ( titleElement ) {
            titleElement.textContent = 'Simplenize - Ferramenta Online de Transformação de Texto';
        }

        if ( descriptionElement ) {
            descriptionElement.setAttribute ( 'content', 'Simplenize: Ferramenta online gratuita para formatação e transformação de texto. Converta maiúsculas/minúsculas, camelCase, snakeCase e mais. Ideal para desenvolvedores' );
        }
    }
}

changePageInfoByLang('EN');

const localStorageLanguage = localStorage.getItem ( 'language' );

const WEB_USER_LANGUAGE = navigator.language.split ( '-' )[ 0 ].toUpperCase () as 'PT' | 'EN';

let WEB_TRANSLATION = TRANSLATION[ localStorageLanguage as 'EN' | 'PT' ] || TRANSLATION[ WEB_USER_LANGUAGE ] || TRANSLATION.EN;

const COPY_TO_CLIPBOARD_TIMES_BEFORE_OPEN_MODAL = 5;

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
    const location = window.location.search;
    const urlParams = location.split ( '?' );

    let willOpenModalForDevMode: undefined | boolean = undefined;
    const isUserFromBrazil = WEB_USER_LANGUAGE === 'PT';
    if ( urlParams.includes ( 'devMode=true' ) || !isUserFromBrazil ) {
        willOpenModalForDevMode = false;
    }

    const [ isModalOpen, setIsModalOpen ] = useState ( willOpenModalForDevMode ?? true );

    const [ copyToClipboardTimes, setCopyToClipboardTimes ] = useState ( 1 );
    const [ input, setInput ] = useState ( '' );
    const [ output, setOutput ] = useState ( '' );
    const [ copySuccess, setCopySuccess ] = useState ( false );
    const [ selectedTransformation, setSelectedTransformation ] = useState<string> ( '' );
    const [ language, setPageLanguage ] = useState ( localStorageLanguage as 'EN' | 'PT' || WEB_USER_LANGUAGE || TRANSLATION.EN );
    const [ textTransformationOptions, setTextTransformationOptions ] = useState ( [
        WEB_TRANSLATION.transformationOptions.upperCase,
        WEB_TRANSLATION.transformationOptions.lowerCase,
        WEB_TRANSLATION.transformationOptions.capitalize,
        WEB_TRANSLATION.transformationOptions.paragraphsToOneLine,
        WEB_TRANSLATION.transformationOptions.superscript,
        WEB_TRANSLATION.transformationOptions.camelCase,
        WEB_TRANSLATION.transformationOptions.snakeCase,
        WEB_TRANSLATION.transformationOptions.pascalCase,
    ] );

    const setLanguage = (language: 'EN' | 'PT') => {
        changePageInfoByLang(language)

        setPageLanguage(language)
    }

    const setTransformation = ( transformation: string ) => {
        setSelectedTransformation ( prev => prev === transformation ? '' : transformation );
    };

    const getTransformationDescriptions = ( language: 'EN' | 'PT' ) => {
        const translations = TRANSLATION[ language ].transformationDescriptions;
        return Object.keys ( translations ).map ( ( key ) => ( {
            key,
            title      : translations[ key as keyof typeof translations ].title,
            description: translations[ key as keyof typeof translations ].description,
        } ) );
    };

    const transformationDescriptions = getTransformationDescriptions ( language );

    useEffect ( () => {
        WEB_TRANSLATION = TRANSLATION[ language as 'EN' | 'PT' ];
        setTextTransformationOptions ( [
                WEB_TRANSLATION.transformationOptions.upperCase,
                WEB_TRANSLATION.transformationOptions.lowerCase,
                WEB_TRANSLATION.transformationOptions.capitalize,
                WEB_TRANSLATION.transformationOptions.paragraphsToOneLine,
                WEB_TRANSLATION.transformationOptions.superscript,
                WEB_TRANSLATION.transformationOptions.camelCase,
                WEB_TRANSLATION.transformationOptions.snakeCase,
                WEB_TRANSLATION.transformationOptions.pascalCase,
            ],
        );
    }, [ language ] );

    const openModal = () => {
        if ( ( willOpenModalForDevMode === undefined || willOpenModalForDevMode ) && copyToClipboardTimes >= COPY_TO_CLIPBOARD_TIMES_BEFORE_OPEN_MODAL ) {
            setCopyToClipboardTimes ( 0 );
            setIsModalOpen ( true );
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText ( output ).then ( () => {
            setCopySuccess ( true );
            setTimeout ( () => {
                setCopySuccess ( false );
            }, 2500 );
        } ).catch ( ( err ) => {
            console.error ( 'Falha ao copiar texto: ', err );
        } );

        setCopyToClipboardTimes ( copyToClipboardTimes + 1 );
        openModal ();
    };

    useEffect ( () => {
        let transformedOutput = input;

        switch ( selectedTransformation ) {
            case WEB_TRANSLATION.transformationOptions.paragraphsToOneLine:
                transformedOutput = transformedOutput.replace ( /\s+|\n/g, ' ' ).trim ();
                break;

            case WEB_TRANSLATION.transformationOptions.upperCase: {
                transformedOutput = transformedOutput.toUpperCase ();
                break;
            }

            case WEB_TRANSLATION.transformationOptions.lowerCase: {

                transformedOutput = transformedOutput.toLowerCase ();
                break;
            }

            case WEB_TRANSLATION.transformationOptions.superscript: {

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
            }

            case WEB_TRANSLATION.transformationOptions.camelCase: {
                transformedOutput = transformedOutput
                    .split ( ' ' )
                    .map ( ( word, index ) => {
                        if ( index === 0 ) {
                            return word.toLowerCase (); // First word is lowercase
                        }
                        return word.charAt ( 0 ).toUpperCase () + word.slice ( 1 ).toLowerCase (); // Capitalize subsequent words
                    } )
                    .join ( '' );
                break;
            }

            case WEB_TRANSLATION.transformationOptions.snakeCase: {
                let result = '';

                const splitedWords = transformedOutput.toLowerCase ().split ( ' ' );
                for ( let i = 0; i < splitedWords.length; i++ ) {
                    const word = splitedWords[ i ];
                    if ( i === splitedWords.length - 1 ) {
                        result += word;
                        continue;
                    }
                    result += word + '_';
                }
                transformedOutput = result;
                break;
            }

            case WEB_TRANSLATION.transformationOptions.pascalCase: {

                transformedOutput = transformedOutput
                    .split ( ' ' )
                    .map ( word => word.charAt ( 0 ).toUpperCase () + word.slice ( 1 ).toLowerCase () ) // Capitalize each word
                    .join ( '' ); // Join without spaces
                break;
            }

            case WEB_TRANSLATION.transformationOptions.capitalize: {
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

        }

        setOutput ( transformedOutput );
    }, [ input, selectedTransformation ] );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-700">
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

            <header className="w-full py-3 bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center sm:flex-row sm:justify-center sm:relative">
                        <div className="mb-4 sm:mb-0">
                            <img className="h-10 w-auto" src={SimplenizeHeaderLogo} alt="Simplenize Logo" />
                        </div>
                        <nav className="flex items-center justify-center space-x-4 sm:absolute sm:right-4">
                            <LanguageDropdown language={language} setLanguage={setLanguage} />
                            <AnimatedThemeToggle />
                        </nav>
                    </div>
                </div>
            </header>

            <main>
                <section className="text-center mt-4">
                    <h1 className="font-mono font-extrabold md:gap-3.5 text-2xl w-full flex flex-col md:flex-row justify-center items-center">
                        <span className="text-cyan-600">{WEB_TRANSLATION.subHeader.simpleYourText}</span>
                        <span className="text-orange-500">{WEB_TRANSLATION.subHeader.transformations}</span>
                    </h1>
                </section>

                <section className="py-4 mx-4">
                    <div className="min-w-full mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                            <div className="py-8 px-5 space-y-2">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {WEB_TRANSLATION.selectATransformation}
                                </h2>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {textTransformationOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                                                selectedTransformation === option
                                                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                            onClick={() => setTransformation(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative flex flex-col md:flex-row gap-2">
                            <textarea
                                id="input-text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                rows={6}
                                className="w-full lg:h-80 md:w-1/2 p-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                placeholder={WEB_TRANSLATION.inputPlaceholder}
                                aria-label="Input text"
                            />

                                    <div className="flex w-full md:w-1/2">
                                <textarea
                                    id="output-text"
                                    placeholder={WEB_TRANSLATION.outputPlaceholder}
                                    readOnly
                                    value={output}
                                    className="flex-grow p-4 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out resize-none"
                                    aria-label="Output text"
                                />
                                        <button
                                            aria-label="Copy to clipboard"
                                            onClick={copyToClipboard}
                                            className="flex items-center justify-center border-0 px-3 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-105"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {copySuccess && (
                                    <p className="text-green-600 dark:text-green-400 text-sm text-center font-medium animate-pulse" role="alert">
                                        {WEB_TRANSLATION.clipboardMessage}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4">
                    <h2 className="flex text-center flex-col md:flex-row md:gap-4 my-4 font-extrabold font-mono text-2xl w-full justify-center items-center">
                        <span className="text-cyan-600">{WEB_TRANSLATION.moreInfo.exploreOurText}</span>
                        <span className="text-orange-500">{WEB_TRANSLATION.moreInfo.transformations}</span>
                    </h2>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transformationDescriptions.map((transformationDescription) => (
                            <li key={transformationDescription.key} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {transformationDescription.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {transformationDescription.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="bottom-0 mt-4 dark:text-white w-full text-center py-4 sm:py-4">
                <p>&copy; {new Date().getFullYear()} <a className="cursor-default" href="?devMode=true">SimpleNize</a>. {WEB_TRANSLATION.allRightsReserved}</p>
            </footer>
        </div>
    );
}

